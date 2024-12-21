import { useContext, useEffect, useRef, useState } from "react";
import { AdminContext } from "./AdminContext";
import { useSession } from "next-auth/react";
import { updatingUserData, updatingUserLinks } from "@/actions/userActions";
import Link from "next/link";

const PreviewPane = () => {
  const { data: session, status } = useSession();
  const { linkArr, userBiodata, userBiosaved } = useContext(AdminContext);
  const iframeRef = useRef(null);
  const [iframeLoader, setIframeLoader] = useState(false);

  const linkArrUpdaterInDB = async () => {
    setIframeLoader(true);
    await updatingUserLinks(session?.user.email, linkArr);
    setIframeLoader(false);
    forceIframeReload();
  };

  const userBiodataUpdaterInDB = async () => {
    setIframeLoader(true);
    await updatingUserData({
      email: session?.user.email,
      ...userBiodata,
      profilepic: userBiodata?.profilepic
        ? userBiodata?.profilepic
        : process.env.NEXT_PUBLIC_PIC,
    });
    setIframeLoader(false);
    forceIframeReload();
  };

  useEffect(() => {
    if (status === "authenticated" && linkArr) {
      linkArrUpdaterInDB();
    }
  }, [linkArr]);

  useEffect(() => {
    if (status === "authenticated" && userBiodata) {
      userBiodataUpdaterInDB();
    }
  }, [userBiosaved]);

  const forceIframeReload = () => {
    //to force reload of iframe the
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.location.reload();
    }
  };

  return (
    <div className="h-full md:p3 grid grid-rows-[1fr_9fr] place-items-center">
      <div className="flex h-full p-2 items-center justify-self-end bg-white w-full md:w-fit justify-between md:justify-start md:bg-inherit">
        <Link href="/" className="p-3 md:hidden cursor-pointer">
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
        <div className="flex gap-3 items-center">
          <div className="p-3 cursor-pointer aspect-square bg-white hover:bg-[#f6f7f5] shadow-2xl rounded-full">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.0293 2V3.24985V21.2179V22.4677L18.9264 21.8797L10.5526 17.4147V21.7794V22.5294H9.80258H6.64336H5.89336V21.7794V16.9143H2.43011H1.68011V16.1643V8.30333V7.55333H2.43011H9.61416L18.9264 2.58805L20.0293 2ZM18.5293 19.968L10.5526 15.7148V8.86486V8.75288L18.5293 4.49971V19.968ZM9.05258 15.4143V9.05333H3.18011V15.4143H9.05258ZM9.05258 21.0294V16.9143H7.39336V21.0294H9.05258ZM20.8199 9.42622V15.0412H22.3199V9.42622H20.8199Z"
                fill="black"
              ></path>
            </svg>
          </div>

          <div className="flex cursor-pointer p-3 gap-3 items-center bg-white hover:bg-[#f6f7f5] shadow-2xl rounded-full">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
            >
              <path
                fillRule="evenodd"
                fill="currentColor"
                d="M13 1a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-3 2a3 3 0 1 1 .58 1.77L5.87 7.12a3 3 0 0 1 0 1.76l4.7 2.35a3 3 0 1 1-.44.9l-4.7-2.36a3 3 0 1 1 0-3.54l4.7-2.35A3 3 0 0 1 10 3ZM3 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
              ></path>
            </svg>
            <span className="font-semibold">Share</span>
          </div>
        </div>
      </div>
      <div className="relative w-full h-full md:h-5/6 md:w-10/12 xl:w-5/6">
        <iframe
          className={`scale-100 w-full h-full md:scale-50 md:w-[200%] md:h-[200%]  origin-top-left  border-0 md:border-4 border-white md:shadow-2xl md:rounded-3xl`}
          ref={iframeRef}
          src={`/${session?.user.username}`}
        ></iframe>
        {iframeLoader && (
          <img
            src="/loader.gif"
            alt="loading"
            className=" absolute top-3 left-3 h-6"
          />
        )}
      </div>
    </div>
  );
};

export default PreviewPane;
