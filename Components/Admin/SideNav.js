import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [dropdownShow, setDropdownShow] = useState(false);
  const [signOutLoader, setSignOutLoader] = useState(false);

  //based on the pathname adds a active class
  useEffect(() => {
    const navBtns = document.getElementsByClassName("navLink");
    for (const x of navBtns) {
      //finding active link
      if (x.href.split("/admin")[1] === pathname.split("/admin")[1]) {
        //applying active link
        if (!x.className.includes("activeLink")) {
          x.classList.toggle("activeLink");
        }
      } else {
        //removing inactive links
        if (x.className.includes("activeLink")) {
          x.classList.toggle("activeLink");
        }
      }
    }
  }, [pathname]);

  return (
    <div className="flex h-full md:flex-col justify-around md:justify-between">
      <div className="flex justify-around md:justify-normal items-center md:items-stretch w-full md:flex-col">
        <Link href="/" className="w-fit p-2 mb-2 hidden md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 25"
            height="20"
            className="w-fit h-5"
          >
            <title>Linktree Logo</title>
            <desc>Linktree Logo Symbol</desc>
            <path
              d="M13.5108 5.85343L17.5158 1.73642L19.8404 4.11701L15.6393 8.12199H21.5488V11.4268H15.6113L19.8404 15.5345L17.5158 17.8684L11.7744 12.099L6.03299 17.8684L3.70842 15.5438L7.93745 11.4361H2V8.12199H7.90944L3.70842 4.11701L6.03299 1.73642L10.038 5.85343V0H13.5108V5.85343ZM10.038 16.16H13.5108V24.0019H10.038V16.16Z"
              fill="#000000"
            ></path>
          </svg>
        </Link>
        <Link
          href="/admin"
          className="navLink flex gap-2 hover:bg-gray-200 rounded-lg p-2  hover:text-[#8129d9] transition-all duration-300"
        >
          <svg
            className=" text-[rgb(115,115,115)] h-[18px] w-5"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g fill="currentColor">
              <path d="M24 5.25L0 5.25V3.75L24 3.75V5.25Z"></path>
              <path d="M24 5.3H0V3.8h24v1.5Z"></path>
              <path d="m0 9.5.8-.8h22.4l.8.8v5l-.8.8H.9l-.8-.8v-5Zm1.5.8v3.4h21v-3.4h-21Z"></path>
              <path d="M0 20.3h24v-1.6H0v1.6Z"></path>
            </g>
          </svg>
          <span className="hidden md:block">Links</span>
        </Link>
        <Link
          href={"/admin/Supporters"}
          className="navLink group flex gap-2 hover:bg-gray-200 rounded-lg p-2  hover:text-[#8129d9] transition-all duration-300"
        >
          <svg
            className="transition-all duration-300 fill-[#f3f3f1] group-hover:fill-red-700"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.12"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.9932 5.13581C9.9938 2.7984 6.65975 2.16964 4.1547 4.31001C1.64964 6.45038 1.29697 10.029 3.2642 12.5604C4.89982 14.6651 9.84977 19.1041 11.4721 20.5408C11.6536 20.7016 11.7444 20.7819 11.8502 20.8135C11.9426 20.8411 12.0437 20.8411 12.1361 20.8135C12.2419 20.7819 12.3327 20.7016 12.5142 20.5408C14.1365 19.1041 19.0865 14.6651 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31001C17.2835 2.19216 13.9925 2.7984 11.9932 5.13581Z"
              fill="none"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.9932 5.13581C9.9938 2.7984 6.65975 2.16964 4.1547 4.31001C1.64964 6.45038 1.29697 10.029 3.2642 12.5604C4.89982 14.6651 9.84977 19.1041 11.4721 20.5408C11.6536 20.7016 11.7444 20.7819 11.8502 20.8135C11.9426 20.8411 12.0437 20.8411 12.1361 20.8135C12.2419 20.7819 12.3327 20.7016 12.5142 20.5408C14.1365 19.1041 19.0865 14.6651 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31001C17.2835 2.19216 13.9925 2.7984 11.9932 5.13581Z"
              stroke="#676b5f"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="hidden md:block">Supporters</span>
        </Link>
        <Link
          href={"/admin/Appearance"}
          className="navLink flex gap-2 hover:bg-gray-200 rounded-lg p-2  hover:text-[#8129d9] transition-all duration-300"
        >
          <svg
            className=" text-[rgb(115,115,115)] h-[18px] w-5"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill="currentColor"
              d="m9 9.8.8-.7h13.4l.8.7v13.5l-.8.8H9.8l-.8-.8V9.8Zm1.5.8v12h12v-12h-12ZM1.5 9.3c0-4.4 3.4-7.8 7.4-7.8V0C4 0 0 4.2 0 9.3 0 14 3.5 18 8 18.5V17a7.6 7.6 0 0 1-6.5-7.7ZM17.8 8h-1.6A7.5 7.5 0 0 0 9 1.5V0a9 9 0 0 1 8.9 8Z"
            ></path>
          </svg>
          <span className="hidden md:block">Appearance</span>
        </Link>
        <Link
          href={"/admin/Social_Planner"}
          className="navLink md:gap-2 hover:bg-gray-200 rounded-lg p-2  hover:text-[#8129d9] transition-all duration-300 hidden md:flex"
        >
          <svg
            className=" text-[rgb(115,115,115)] h-[18px] w-5"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clipPath="url(#a)">
              <path
                stroke="currentColor"
                strokeLinejoin="bevel"
                strokeWidth="1.499"
                d="M9.644 18.236H.648V2.245h17.99V11.5"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="square"
                strokeLinejoin="round"
                strokeWidth="1.499"
                d="M14.885 0v3.745M4.383 0v3.745"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="bevel"
                strokeWidth="1.613"
                d="M10.264 11.532h12.922V23.18H10.264V11.532Z"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="bevel"
                strokeWidth="1.613"
                d="m10.264 20.951 5.416-5.172s5.752 5.771 6.698 6.726"
              ></path>
              <circle
                cx="19.441"
                cy="14.467"
                r="0.994"
                fill="currentColor"
              ></circle>
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h24v24H0z"></path>
              </clipPath>
            </defs>
          </svg>
          <span className="hidden md:block">Social Planner</span>
        </Link>
        <Link
          href={"/admin/Analytics"}
          className="navLink flex gap-2 hover:bg-gray-200 rounded-lg p-2  hover:text-[#8129d9] transition-all duration-300"
        >
          <svg
            className=" text-[rgb(115,115,115)] h-[18px] w-5"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              fill="currentColor"
              d="M1.5 10.5 0 12v9.7l1.5 1.5h21l1.5-1.5V2.3L22.5.8h-6l-1.4 1.5v3.4H9L7.4 7.2v3.3h-6Zm15-8.2h6v19.4h-6V2.3ZM15 7.2H9v14.5h6V7.2ZM7.4 12H1.5v9.7h6V12Z"
            ></path>
          </svg>
          <span className="hidden md:block">Analytics</span>
        </Link>
        <Link
          href={"/admin/Settings"}
          className="navLink flex gap-2 hover:bg-gray-200 rounded-lg p-2  hover:text-[#8129d9] transition-all duration-300"
        >
          <svg
            className=" text-[rgb(115,115,115)] h-[18px] w-5"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g fill="currentColor">
              <path d="M12 7.3A4.6 4.6 0 0 0 7.5 12c0 2.5 2 4.7 4.5 4.7s4.5-2.2 4.5-4.7-2-4.7-4.5-4.7ZM9 12a3 3 0 0 1 3-3.2 3 3 0 0 1 3 3.2 3 3 0 0 1-3 3.2A3 3 0 0 1 9 12Z"></path>
              <path d="m0 12.4 5.7 10.2.6.4h11.4l.6-.4L24 12.4v-.8L18.3 1.4l-.6-.4H6.3l-.6.4L0 11.6v.8Zm17.2 9.1H6.8L1.5 12l5.3-9.5h10.4l5.3 9.5-5.3 9.5Z"></path>
            </g>
          </svg>
          <span className="hidden md:block">Settings</span>
        </Link>
      </div>
      <div className="relative">
        <button
          className="transition-all ring-0 focus:ring-2 ring-gray-800 w-full flex items-center gap-0 md:gap-2 p-1 rounded-3xl hover:bg-[#e7e7e5]"
          onBlur={() => {
            setTimeout(() => {
              setDropdownShow(false);
            }, 400);
          }}
          onClick={() => {
            setDropdownShow(!dropdownShow);
          }}
        >
          <div className="w-10 aspect-square rounded-full overflow-hidden">
            {signOutLoader ? (
              <img
                src="/loader.gif"
                alt="loader"
                className="w-full h-full object-cover invert"
              />
            ) : (
              <img
                className="w-full h-full object-cover object-top"
                src={session?.user.image}
                alt="user photo"
              />
            )}
          </div>

          <span className="truncate hidden md:block">
            {session?.user.name
              ? session?.user.name
              : `@${session?.user.username}`}
          </span>
        </button>

        {/* <!-- Dropdown menu --> */}
        <div
          className={`absolute -top-2 right-0 w-fit md:w-auto -translate-y-full ${
            dropdownShow ? "" : "hidden"
          } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 text-end`}
        >
          <div className="px-4 py-3 text-sm text-gray-900 ">
            <div className="font-medium ">Welcome</div>
            <div className="w-20 sm:w-30 xl:w-full truncate">
              {session?.user.email}
            </div>
          </div>
          <ul className="py-2 text-sm text-gray-700 ">
            <li>
              <Link
                href="/admin"
                className="block px-4 py-2 hover:bg-[#e7e7e5]"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin"
                className="block px-4 py-2 hover:bg-[#e7e7e5]"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                href="/admin"
                className="block px-4 py-2 hover:bg-[#e7e7e5]"
              >
                Earnings
              </Link>
            </li>
          </ul>
          <div className="py-2 flex items-center justify-end gap-2 px-4 text-sm hover:bg-[#e7e7e5] ">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-hidden="false"
              aria-labelledby="ltclid97_title "
            >
              <title id="ltclid97_title">Log Out</title>
              <path
                fill="currentColor"
                d="M5.5 0h8l.5.5v15l-.5.5H5v-1h8V1H5V0h.5ZM2.7 7.5l3.15-3.15.36-.35-.71-.7-.35.35-4 4v.7l4 4 .35.36.7-.71-.35-.35L2.71 8.5h7.46v-1H2.7Z"
              ></path>
            </svg>
            <button
              onClick={async () => {
                setSignOutLoader(true);
                await signOut();
                setSignOutLoader(false);
              }}
              className=" text-gray-700"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
