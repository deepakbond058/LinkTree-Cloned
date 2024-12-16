import { Autoplay, EffectFade } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

const Featureslider = () => {
  const featureArr = [
    { name: "TC", src: "1.avif" },
    { name: "INSIDER", src: "2.avif" },
    { name: "MASABLE", src: "3.avif" },
    { name: "FORTUNE", src: "4.avif" },
    { name: "FORBES", src: "5.avif" },
  ];
  return (
    <Swiper
      className="lg:w-1/2 p-7 rounded-full bg-white"
      modules={[Autoplay, EffectFade]}
      effect={"fade"}
      fadeEffect={{ crossFade: true }}
      spaceBetween={0}
      slidesPerView={'auto'}
      loop={true}
      autoplay={{ delay: 3000 }}
    >
      {featureArr.map((item, index) => (
        <SwiperSlide key={index} className="justify-items-center " >     
            <img  src={`/feature/${item.src}`} alt={item.name} />
        </SwiperSlide>
      ))} 
    </Swiper>
  );
};

export default Featureslider;
