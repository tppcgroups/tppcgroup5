import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
      <h2 className="text-6xl font-bold text-black">404</h2>
      <p className="mt-4 text-xl text-gray-700">Page Not Found</p>
      <p className="mt-2 text-gray-500">
        We couldn't find the page you were looking for.
      </p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition cursor-pointer"
      >
        Return Home
      </Link>
    </div>
  );
}
