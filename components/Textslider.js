import { Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import "swiper/css/autoplay";

const Textslider = () => {
  const textArr = [
    "creators",
    "influencers",
    "small businesses",
    "athletes",
    "models",
    "monetizers",
    "health educators",
    "streamers",
    "vloggers",
    "fitness coaches",
    "ecommerce sellers",
    "retailers",
    "products",
    "wellness leaders",
    "musicians",
    "bands",
    "DJs",
    "podcasters",
    "fashion designers",
    "culture creators",
    "merch sellers",
    "writers",
  ];
  return (
    <Swiper
      className="h-20"
      direction="vertical"
      modules={[Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 1000 }}
    >
      {textArr.map((item, index) => (
        <SwiperSlide key={index}>
          <p className="text-[rgb(38,101,214)] font-extrabold text-4xl lg:text-5xl text-center">
            {item}
          </p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Textslider;
