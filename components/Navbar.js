"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const showNav = ["/"].includes(pathname);
  return (
    <>
      {showNav && (
        <nav className="flex justify-between z-10 fixed top-[3.5vw] left-1/2 -translate-x-1/2  container px-4 py-4 bg-white rounded-full ">
          <div className="flex items-center pl-4">
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-7"
              >
                <path d="m13.511 5.853 4.005-4.117 2.325 2.381-4.201 4.005h5.909v3.305h-5.937l4.229 4.108-2.325 2.334-5.741-5.769-5.741 5.769-2.325-2.325 4.229-4.108H2V8.122h5.909L3.708 4.117l2.325-2.381 4.005 4.117V0h3.473v5.853zM10.038 16.16h3.473v7.842h-3.473V16.16z"></path>
              </svg>
            </Link>
            <ul className="gap-1 text-[rgb(103,107,95)] hidden lg:flex">
              <li className="px-4 py-3 font-semibold rounded-lg hover:bg-[rgb(239,240,236)]">
                Templates
              </li>
              <li className="px-4 py-3 font-semibold rounded-lg hover:bg-[rgb(239,240,236)]">
                Marketplace
              </li>
              <li className="px-4 py-3 font-semibold rounded-lg hover:bg-[rgb(239,240,236)]">
                Discover
              </li>
              <li className="px-4 py-3 font-semibold rounded-lg hover:bg-[rgb(239,240,236)]">
                Pricing
              </li>
              <li className="px-4 py-3 font-semibold rounded-lg hover:bg-[rgb(239,240,236)]">
                Learn
              </li>
            </ul>
          </div>
          <div className="flex gap-2">
            <Link  href="/login">
            <button className="bg-[rgb(239,240,236)] text-black px-7 py-4 rounded-lg font-semibold hover:bg-[rgb(233,233,233)]">
              Log in
            </button>
            </Link>
            <Link href={'/signup'}>
            <button className="bg-[rgb(30,35,48)] text-white px-7 py-4 rounded-full font-semibold hover:bg-[rgb(48,53,65)]">
              Sign up free
            </button>
            </Link>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
