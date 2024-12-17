import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

export default function TestimonialsSlider() {
  const swipeRef = useRef(null);
  const docArr = useRef([
    {
      name: "Riley Lemon",
      title: "Youtuber, Content Creator",
      testimonial:
        "“LinkTree makes it effortless for creators to showcase all aspects of their work through one unified link.”",
    },
    {
      name: "Patti Chimkire",
      title: "Founder and Pastry Chef, Mali Bakes",
      testimonial:
        "“LinkTree guides my clients exactly where they need to be, quickly and seamlessly.”",
    },
    {
      name: "Luke Kidgell",
      title: "Comedian",
      testimonial:
        "“I rely on LinkTree’s insights to learn more about my audience and what drives engagement.”",
    },
    {
      name: "Risa Utama",
      title: "TV Reporter and Producer",
      testimonial:
        "“My LinkTree profile stood out, helping me land my first full-time position as a news anchor!”",
    },
    {
      name: "Connor Toki",
      title: "Founder, Connor Toki Health & Performance",
      testimonial:
        "“LinkTree has enabled me to grow my community without needing a full-fledged website.”",
    },
    {
      name: "Sophia Lee",
      title: "Digital Artist",
      testimonial:
        "“LinkTree empowers creators to organize their digital world into one simple, shareable link.”",
    },
    {
      name: "Nathan Hill",
      title: "Fitness Coach",
      testimonial:
        "“With LinkTree, I’ve streamlined how I share my content, making it easier than ever for my audience.”",
    },
    {
      name: "Ava Carter",
      title: "Travel Blogger",
      testimonial:
        "“LinkTree helped me gain more visibility for my brand while keeping everything in one place.”",
    },
    {
      name: "Jack Thompson",
      title: "Musician",
      testimonial:
        "“Using LinkTree has been a game-changer for connecting followers to all my platforms effortlessly.”",
    },
    {
      name: "Emma Wilson",
      title: "Entrepreneur",
      testimonial:
        "“LinkTree simplifies my digital presence, helping me focus more on creating and less on managing links.”",
    },
  ]);

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      onSwiper={(s) => {
        swipeRef.current = s;
      }}
    >
      {docArr.current.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="text-center flex items-center flex-col gap-5">
            <img src={`/testimonials/${index + 1}.avif`} alt="pic" />
            <h2 className=" text-4xl lg:text-5xl text-[#1e2330] font-extrabold">
              {item.testimonial}
            </h2>
            <div className="flex-col flex">
              <h2 className="text-xl text-slate-700">{item.name}</h2>
              <h2 className="text-xl text-slate-700">{item.title}</h2>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className=" flex gap-5 justify-center py-5">
        <button
          className="hover:bg-[#1E2330] border-2 border-[#1E2330] rounded-3xl "
          onClick={() => {
            swipeRef.current.slidePrev();
          }}
        >
          <svg
            className="w-16 2xl:w-30 hover:invert"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M6 12H18M6 12L11 7M6 12L11 17"
                stroke="#1E2330"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
        <button
          className=" hover:bg-[#1E2330] border-2 border-[#1E2330] rounded-3xl "
          onClick={() => {
            swipeRef.current.slideNext();
          }}
        >
          <svg
            className="w-16 2xl:w-30 hover:invert"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M6 12H18M18 12L13 7M18 12L13 17"
                stroke="#1E2330"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </button>
      </div>
    </Swiper>
  );
}
