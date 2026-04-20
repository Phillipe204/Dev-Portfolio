import Link from "next/link";

export const metadata = {
  title: "Felipe Mota | Blog",
};

export default function BlogPage() {
  return (
    <div className="py-20 pt-28 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white mb-4">Blog</h1>
      <p className="text-gray-500 mb-8">Coming soon.</p>
      <Link
        href="/"
        className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
