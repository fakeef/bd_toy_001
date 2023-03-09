import Link from "next/link";

export default function Header() {
  return (
    <header className="text-gray-600 body-font bg-sky-100 border-4 border-b-sky-800">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-xl">새고기 토이 #1</span>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link className="mr-5 hover:text-gray-900" href="/">
            Home
          </Link>
          <Link className="mr-5 hover:text-gray-900" href="/about">
            About Us
          </Link>
          <Link className="mr-5 hover:text-gray-900" href="/signin">
            Sign in
          </Link>
        </nav>
        <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          DARK
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
