"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Textslider from "@/components/Textslider";
import Imageslider from "@/components/Imageslider";
import Testimonialslider from "@/components/testimonialslider";
import Featureslider from "@/components/featureslider";
import Footer from "@/components/Footer";


export default function Home() {
  const router = useRouter();
  const [usernameText, setUsernameText] = useState("");

  return (
    <main>
      <section className="bg-[#254f1a]">
        <div className="container px-10 mx-auto min-h-[130vh] flex-col lg:flex-row flex items-center justify-center gap-5">
          <div className="flex flex-col gap-10 w-full pt-[25vh] pb-[20vh] lg:py-0">
            <h1 className=" text-5xl 2xl:text-8xl  text-[rgb(210,232,35)] font-extrabold">
              Everything you are. In one, simple link in bio.
            </h1>
            <p className="text-[rgb(210,232,35)] text-xl 2xl:text-3xl font-bold">
              Join 50M+ people using LinkTree for their link in bio. One link
              to help you share everything you create, curate and sell from your
              Instagram, TikTok, Twitter, YouTube and other social media
              profiles.
            </p>
            <div className="flex flex-wrap gap-4">
              <input
                className="transition-all ease-[cubic-bezier(0,2.51,1,3)] w-fit py-5 pl-4 pr-10 outline-none 
                outline-offset-0 focus:outline-offset-2 focus:outline-2 focus:outline-white rounded-lg text-[#254f1a] "
                type="text"
                value={usernameText ? `Linktr.ee/${usernameText}` : "Linktr.ee/"}
                onChange={(e) => {
                  setUsernameText(e.target.value.split("Linktr.ee/")[1]);
                }}
                placeholder="yourname"
              />
              <button
                onClick={() => {
                  usernameText
                    ? router.push(`/signup/?username=${usernameText}`)
                    : router.push("/signup");
                }}
                className="w-fit rounded-full py-5 px-10 font-semibold bg-[rgb(233,192,233)] hover:bg-[rgb(227,186,228)]"
              >
                Claim your LinkTree
              </button>
            </div>
          </div>
          <div className="w-full">
            <img
              className="object-contain w-full h-full"
              src="/profile1.png"
              alt="pic"
            />
          </div>
        </div>
      </section>
      <section className="bg-[rgb(233,192,233)]">
        <div className="container px-10 mx-auto min-h-[130vh] flex-col lg:flex-row-reverse flex items-center justify-center gap-5">
          <div className="flex flex-col gap-10 w-full py-[20vh] lg:py-0">
            <h2 className="text-4xl lg:text-5xl text-[#502274] font-extrabold">
              Create and customize your LinkTree in minutes
            </h2>
            <p className="text-[#502274] text-xl 2xl:text-3xl font-bold">
              Connect your TikTok, Instagram, Twitter, website, store, videos,
              music, podcast, events and more. It all comes together in a link
              in bio landing page designed to convert.
            </p>
            <div className="flex flex-col items-center md:flex-row gap-4">
              <button
                onClick={() => {
                  router.push(`/signup`);
                }}
                className="rounded-full py-5 px-10 font-semibold bg-[#502274] text-[rgb(233,192,233)] hover:bg-[#5e347f]"
              >
                Get started for free
              </button>
            </div>
          </div>
          <div className="w-full">
            <img
              className="object-contain w-full h-full"
              src="/profile2.png"
              alt="pic"
            />
          </div>
        </div>
      </section>
      <section className="bg-[#780016]">
        <div className="container px-10 mx-auto min-h-[130vh] flex-col lg:flex-row flex items-center justify-center gap-5">
          <div className="flex flex-col gap-10 w-full py-[20vh] lg:py-0">
            <h2 className="text-4xl lg:text-5xl text-[#e9c0e9] font-extrabold">
              Share your LinkTree from your Instagram, TikTok, Twitter and
              other h2ios
            </h2>
            <p className="text-[#e9c0e9] text-xl 2xl:text-3xl font-bold">
              Add your unique LinkTree URL to all the platforms and places
              you find your audience. Then use your QR code to drive your
              offline traffic online.
            </p>
            <div className="flex flex-col items-center md:flex-row gap-5">
              <button
                onClick={() => {
                  router.push(`/signup`);
                }}
                className="rounded-full py-5 px-10 font-semibold bg-[#e9c0e9] text-[#780016] hover:bg-[rgb(227,186,228)]"
              >
                Get started for free
              </button>
            </div>
          </div>
          <div className="w-full">
            <img
              className="object-contain w-full h-full"
              src="/profile3.png"
              alt="pic"
            />
          </div>
        </div>
      </section>
      <section className="bg-[rgb(243,243,241)]">
        <div className="container px-10 mx-auto min-h-[130vh] flex-col lg:flex-row-reverse flex items-center justify-center gap-5">
          <div className="flex flex-col gap-10 w-full py-[20vh] lg:py-0">
            <h2 className="text-4xl lg:text-5xl  text-[rgb(30,35,48)] font-extrabold">
              Analyze your audience and keep your followers engaged
            </h2>
            <p className="text-[rgb(30,35,48)] text-xl 2xl:text-3xl font-bold">
              Track your engagement over time, monitor revenue and learn what’s
              converting your audience. Make informed updates on the fly to keep
              them coming back.
            </p>
            <div className="flex flex-col items-center md:flex-row gap-5">
              <button
                onClick={() => {
                  router.push(`/signup`);
                }}
                className="rounded-full py-5 px-10 font-semibold bg-[rgb(233,192,233)] text-[#1E2330] hover:bg-[rgb(227,186,228)]"
              >
                Get started for free
              </button>
            </div>
          </div>
          <div className="w-full">
            <img
              className="object-contain w-full h-full"
              src="/profile4.png"
              alt="pic"
            />
          </div>
        </div>
      </section>
      <section className="bg-[rgb(243,243,241)] flex flex-col gap-20 py-10">
        <div className="flex flex-col gap-5 items-center px-10">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-center">
            The only link in bio trusted by 50M+
          </h2>
          <Textslider />
        </div>
        <div>
          <imgslider />
        </div>
        <div className="grid lg:grid-cols-2 gap-5 px-10">
          <div className="bg-[rgb(210,232,35)] rounded-3xl overflow-hidden p-10 flex-col justify-between flex gap-5">
            <img src="/grid2.png" alt="pic" />
            <h3 className="text-4xl cursor-pointer underline text-[#502274]">
              Connect all your links in one place, effortlessly.
            </h3>
          </div>
          <div className="bg-[rgb(120,0,22)] row-start-3 lg:row-start-1 lg:col-start-2 row-span-2 rounded-3xl overflow-hidden p-10 flex-col justify-between flex gap-5">
            <img src="/grid3.png" alt="pic" />
            <h3 className="text-4xl cursor-pointer underline text-[#e9c0e9]">
              Grow, own and engage your audience by unifying them in one place.
            </h3>
          </div>
          <div className="bg-[rgb(233,192,233)] rounded-3xl overflow-hidden p-10 flex-col justify-between flex gap-5">
            <img src="/grid1.png" alt="pic" />
            <h3 className="text-4xl cursor-pointer underline text-[#1e2330]">
              Your digital hub for everything you care about.
            </h3>
          </div>
        </div>
        <div className="flex flex-col gap-10 items-center px-10">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-center">
            The fast, friendly and powerful link in bio tool.
          </h2>
          <button
            onClick={() => {
              router.push(`/signup`);
            }}
            className="rounded-full py-5 px-10 font-semibold bg-[rgb(233,192,233)] text-[#1E2330] hover:bg-[rgb(227,186,228)]"
          >
            Explore all plans
          </button>
        </div>
        <div className="grid lg:grid-cols-3 gap-10 px-10 place-content-center">
          <div className=" rounded-3xl p-10 flex flex-col items-center justify-between bg-white text-[#1e2330]">
            <img src="/lord1.gif" alt="" />
            <h4 className="text-center text-2xl">
              Seamlessly connect your Linktree with the tools you already use.
            </h4>
          </div>
          <div className=" rounded-3xl p-10 flex flex-col items-center justify-between bg-white text-[#1e2330]">
            <img src="/lord2.gif" alt="" />
            <h4 className="text-center text-2xl">
              Customize your Linktree to match your brand. Make it feel like
              you.
            </h4>
          </div>
          <div className=" rounded-3xl p-10 flex flex-col items-center justify-between bg-white text-[#1e2330]">
            <img src="/lord3.gif" alt="" />
            <h4 className="text-center text-2xl">
              Manage, update and schedule content with our quick, easy editor.
            </h4>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-4xl lg:text-5xl  font-extrabold text-center">
            As featured in...
          </h2>
          <div className="w-full px-10"><Featureslider /></div>
        </div>
        <div className="px-10">
          <Testimonialslider />
        </div>
        <div className="px-10"></div>
      </section>
      <Footer/>
    </main>
  );
}
