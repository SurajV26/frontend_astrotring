import { ArrowLeft, Home, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-3xl border border-amber-100 bg-white p-8 text-center shadow-xl shadow-amber-100/60 sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <Search className="h-10 w-10" />
        </div>
        <p className="mt-6 text-7xl font-black tracking-tight text-amber-500">404</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500 sm:text-base">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-400 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-amber-200 transition hover:bg-amber-600"
          >
            <Home className="h-4 w-4" />
            Go home
          </Link>
        </div>
      </section>
    </main>
  );
};

export default PageNotFound;
