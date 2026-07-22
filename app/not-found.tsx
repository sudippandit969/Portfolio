import Link from "next/link";
import { ArrowLeft, Home, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-4 text-center text-slate-100">
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 shadow-glow-cyan mb-6">
        <Terminal className="h-12 w-12 text-cyan-400" />
      </div>

      <span className="font-mono text-xs font-semibold text-cyan-400 uppercase tracking-widest">
        404 // Page Not Found
      </span>

      <h1 className="mt-2 font-sans text-4xl sm:text-6xl font-extrabold text-white">
        Lost in <span className="text-gradient-cyan">Cyberspace</span>
      </h1>

      <p className="mt-4 max-w-md text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
        The route or resource you are searching for does not exist or has been moved.
      </p>

      <div className="mt-8 flex items-center space-x-4">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-xs font-mono font-semibold text-white shadow-glow-cyan transition-all hover:scale-105"
        >
          <Home className="h-4 w-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
