import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-lg text-center">
        <p className="text-7xl font-bold text-primary">404</p>

        <h1 className="mt-4 text-2xl font-semibold text-gray-900">
          Page not found
        </h1>

        <p className="mt-2 text-muted">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-lg bg-primary px-5 py-2.5 font-medium text-white transition hover:opacity-90"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
