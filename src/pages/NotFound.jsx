import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-12">
      <div className="max-w-xl text-center">
        <h1 className="text-7xl font-extrabold text-emerald-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Page Not Found</h2>
        <p className="text-slate-600 mb-6">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-emerald-700 transition"
        >
          <FiArrowLeft className="text-lg" />
          Go Back Home
        </Link>
      </div>
    </section>
  );
}
