"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminProvider } from "@/Components/Admin/AdminContext";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SideNav from "@/Components/Admin/SideNav";
import PreviewPane from "@/Components/Admin/PreviewPane";

export const AdminLayout = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [previewBtn, setPreviewBtn] = useState(false);
  const [sessionLoader, setSessionLoader] = useState(true); //on page landing

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      setSessionLoader(false);
    }
  }, [status]);

  return (
    <AdminProvider>
      <div>
        {sessionLoader ? (
          <div className="flex h-screen items-center justify-center">
            <img src="/loader.gif" className="w-20 invert" />
          </div>
        ) : (
          <div className="font-[family-name:var(--font-intervariable)] bg-[#f3f3f1]">
            {/* main center content*/}
            <main
              className={`px-4 py-2 transition-all min-h-[150vh] md:mr-[30vw] md:ml-[20vw] 2xl:ml-[12vw] border border-gray-300 pb-[20vh] ${
                previewBtn ? "hidden md:block" : "block"
              }`}
            >
              {/* Top COPY Tab */}
              <div className=" rounded-3xl bg-[#dfe8f9] items-center flex flex-wrap xl:flex-nowrap p-3 gap-3 justify-between">
                <div className="text-sm flex flex-wrap max-w-max">
                  <span className="font-semibold">
                    🔥 Your Linktree is live:
                  </span>
                  <Link
                    target="_blank"
                    href={`${process.env.NEXT_PUBLIC_HOST}/${session?.user.username}`}
                    className="underline"
                  >{`${process.env.NEXT_PUBLIC_HOST.split("://")[1]}/${
                    session?.user.username
                  }`}</Link>
                </div>
                <button
                  className="min-w-max p-3 font-semibold rounded-full bg-white hover:bg-[#f6f7f5]"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${process.env.NEXT_PUBLIC_HOST}/${session?.user.username}`
                    );
                  }}
                >
                  Copy your Linktree URL
                </button>
              </div>

              {/* children here */}
              {children}
            </main>

            {/* Left nav sidebar */}
            <nav className="transition-all fixed w-full md:w-[20vw] 2xl:w-[12vw] md:h-full bottom-0 md:top-0 p-2 md:p-3 md:py-4 text-sm font-medium bg-white md:bg-inherit">
              <SideNav />
            </nav>

            {/* right preview pane */}
            <section
              className={`transition-all duration-300 overflow-hidden ${
                previewBtn
                  ? "scale-100 translate-y-0"
                  : " scale-0 md:scale-100 translate-y-full md:translate-y-0 "
              } h-full fixed w-full md:w-[30vw] right-0 top-0`}
            >
              <PreviewPane />
            </section>

            {/* right preview bUtton */}
            <button
              className={`fixed z-0 transition-all duration-300 md:hidden left-1/2 -translate-x-1/2 font-semibold  bg-white rounded-full shadow-2xl ${
                previewBtn ? "p-4 bottom-7" : "bottom-20 py-3 px-5"
              }`}
              onClick={() => {
                setPreviewBtn(!previewBtn);
              }}
            >
              {!previewBtn && (
                <div className="flex justify-center items-center gap-3">
                  <img src="/eye.svg" className="h-4 box-content" alt="eye" />
                  <span>Preview</span>
                </div>
              )}
              {previewBtn && (
                <img src="/x.svg" className="h-5 aspect-square " />
              )}
            </button>
          </div>
        )}
      </div>
    </AdminProvider>
  );
};

export default AdminLayout;
