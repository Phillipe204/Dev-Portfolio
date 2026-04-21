"use client";
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useRef, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({ name: "", email: "", message: "" });
  const recaptchaRef = useRef(null);

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    const captchaToken = recaptchaRef.current?.getValue();
    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA before sending.");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post("/api/contact", { ...userInput, captchaToken });
      toast.success("Message sent. I'll get back to you soon.");
      setUserInput({ name: "", email: "", message: "" });
      recaptchaRef.current?.reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong.");
      recaptchaRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  const inputBase =
    "w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/30 focus:bg-white/[0.05] outline-none transition-all duration-200 px-4 py-3 text-[14px] text-white placeholder-white/30 rounded-xl";

  return (
    <form
      onSubmit={handleSendMail}
      className="glass rounded-2xl p-6 sm:p-8 space-y-5"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-[11px] uppercase tracking-[0.16em] text-white/40 font-medium mb-2"
          >
            Name
          </label>
          <input
            id="contact-name"
            className={inputBase}
            type="text"
            maxLength="100"
            required
            placeholder="Your name"
            value={userInput.name}
            onChange={(e) =>
              setUserInput({ ...userInput, name: e.target.value })
            }
            onBlur={checkRequired}
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-[11px] uppercase tracking-[0.16em] text-white/40 font-medium mb-2"
          >
            Email
          </label>
          <input
            id="contact-email"
            className={inputBase}
            type="email"
            maxLength="100"
            required
            placeholder="your@email.com"
            value={userInput.email}
            onChange={(e) =>
              setUserInput({ ...userInput, email: e.target.value })
            }
            onBlur={() => {
              checkRequired();
              setError({ ...error, email: !isValidEmail(userInput.email) });
            }}
          />
          {error.email && (
            <p className="text-[11px] text-red-400/80 mt-1.5">
              Please provide a valid email.
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-[11px] uppercase tracking-[0.16em] text-white/40 font-medium mb-2"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          className={`${inputBase} resize-none`}
          maxLength="500"
          name="message"
          required
          placeholder="Tell me a bit about your project, role, or question…"
          value={userInput.message}
          onChange={(e) =>
            setUserInput({ ...userInput, message: e.target.value })
          }
          onBlur={checkRequired}
          rows="5"
        />
      </div>

      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
        <div className="flex justify-center">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            theme="dark"
          />
        </div>
      )}

      <div className="flex items-center justify-between gap-3 pt-1">
        {error.required ? (
          <p className="text-[11px] text-red-400/80">
            All fields are required.
          </p>
        ) : (
          <p className="text-[11px] text-white/35">
            I usually respond within a couple of days.
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-[13px] font-medium rounded-full hover:bg-white/90 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send message
              <Send size={13} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
