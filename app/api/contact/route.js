import axios from 'axios';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create and configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSKEY, 
  },
});

// Escape user-supplied strings before embedding them in HTML
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// In-memory rate limiter: max 5 requests per IP per 15 minutes (defense-in-depth)
const rateLimitMap = new Map();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

// Verify a reCAPTCHA token with Google's API
async function verifyCaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error('reCAPTCHA secret key is not configured.');
    return false;
  }
  try {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;
    const res = await axios.post(url);
    return res.data.success === true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error.message);
    return false;
  }
}

// Helper function to send a message via Telegram
async function sendTelegramMessage(token, chat_id, message) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const res = await axios.post(url, {
      text: message,
      chat_id,
    });
    return res.data.ok;
  } catch (error) {
    console.error('Error sending Telegram message:', error.response?.data || error.message);
    return false;
  }
};

// HTML email template — all user values are HTML-escaped before insertion
const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${escapeHtml(userMessage)}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
    </div>
  </div>
`;

// Helper function to send an email via Nodemailer
async function sendEmail(payload, message) {
  const { name, email, message: userMessage } = payload;
  
  const mailOptions = {
    from: "Portfolio", 
    to: process.env.EMAIL_ADDRESS, 
    subject: `New Message From ${name.substring(0, 100)}`, 
    text: message, 
    html: generateEmailTemplate(name, email, userMessage), 
    replyTo: email, 
  };
  
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error while sending email:', error.message);
    return false;
  }
};

// Basic email format check
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  try {
    // Rate limit by IP (defense-in-depth; primary bot protection is reCAPTCHA below)
    // Use the RIGHTMOST (last) entry from x-forwarded-for, which is appended by the
    // trusted infrastructure proxy (Vercel edge / reverse-proxy). Clients can inject
    // arbitrary IPs at the start of the header but cannot remove what the proxy appends,
    // so the last entry is the one that reflects the actual upstream-seen client address.
    // This prevents rate-limit bypass via spoofed forwarding headers (taking the first
    // entry is unsafe because it is fully attacker-controlled).
    // NOTE: x-real-ip is intentionally NOT used as a fallback because it is also
    // a client-settable header that can be spoofed unless the proxy explicitly strips
    // and rewrites it. Trusting the infrastructure-appended x-forwarded-for last hop
    // is the safer approach across proxy configurations.
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',').at(-1).trim() : 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json({
        success: false,
        message: 'Too many requests. Please try again later.',
      }, { status: 429 });
    }

    const payload = await request.json();
    const { name, email, message: userMessage, captchaToken } = payload;

    // Verify reCAPTCHA before any side effects
    if (!captchaToken) {
      return NextResponse.json({
        success: false,
        message: 'CAPTCHA verification is required.',
      }, { status: 400 });
    }

    const captchaValid = await verifyCaptcha(captchaToken);
    if (!captchaValid) {
      return NextResponse.json({
        success: false,
        message: 'CAPTCHA verification failed. Please try again.',
      }, { status: 403 });
    }

    // Server-side input validation
    if (!name || !email || !userMessage) {
      return NextResponse.json({
        success: false,
        message: 'All fields are required.',
      }, { status: 400 });
    }

    if (typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
      return NextResponse.json({
        success: false,
        message: 'Invalid name.',
      }, { status: 400 });
    }

    if (typeof email !== 'string' || !isValidEmail(email) || email.length > 100) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email address.',
      }, { status: 400 });
    }

    if (typeof userMessage !== 'string' || userMessage.trim().length === 0 || userMessage.length > 500) {
      return NextResponse.json({
        success: false,
        message: 'Invalid message.',
      }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chat_id = process.env.TELEGRAM_CHAT_ID;

    // Validate environment variables
    if (!token || !chat_id) {
      return NextResponse.json({
        success: false,
        message: 'Telegram token or chat ID is missing.',
      }, { status: 400 });
    }

    const message = `New message from ${name}\n\nEmail: ${email}\n\nMessage:\n\n${userMessage}\n\n`;

    // Send Telegram message
    const telegramSuccess = await sendTelegramMessage(token, chat_id, message);

    // Send email
    const emailSuccess = await sendEmail(payload, message);

    if (telegramSuccess && emailSuccess) {
      return NextResponse.json({
        success: true,
        message: 'Message and email sent successfully!',
      }, { status: 200 });
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to send message or email.',
    }, { status: 500 });
  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({
      success: false,
      message: 'Server error occurred.',
    }, { status: 500 });
  }
};
