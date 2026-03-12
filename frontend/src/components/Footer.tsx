import { Link } from "react-router-dom";

export default function Footer() {

  return (
    <footer className="bg-white border-t mt-10">

      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo / Brand */}
        <div className="text-lg font-semibold text-gray-800">
          SwiftCash
        </div>

        {/* Navigation */}
        <nav className="flex gap-6 text-sm text-gray-600">

          <Link
            to=""
            className="hover:text-blue-600 transition"
          >
            about
          </Link>

          <Link
            to=""
            className="hover:text-blue-600 transition"
          >
            contacts
          </Link>

          <Link
            to=""
            className="hover:text-blue-600 transition"
          >
            currency
          </Link>

        </nav>

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} SwiftCash. All rights reserved.
        </p>

      </div>

    </footer>
  );
}