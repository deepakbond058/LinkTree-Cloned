import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchdatafromDB } from "@/actions/userActions";
import { useEffect, useState } from "react";
import Link from "next/link";

import "swiper/css";
import "swiper/css/autoplay";

export default function ImagesSlider() {
  const [docArr, setDocArr] = useState(null);
  const fetchdata = async () => {
    const doc = await fetchdatafromDB();
    for(const x of doc){
      x.color=generateRandomHexColor();
    }
    setDocArr(doc)
  };
  function generateRandomHexColor() {
    // Generate a random number between 0 and 16777215 (0xFFFFFF)
    const randomNumber = Math.floor(Math.random() * 16777215);
    // Convert the number to a hexadecimal string and pad it with leading zeros if necessary
    const hexColor = `#${randomNumber.toString(16).padStart(6, '0')}`;
    return hexColor;
  }
  
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      {docArr && (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          speed={5000}
          autoplay={{
            delay: 0,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1, // 1 slide for screens >= 640px
            },
            768: {
              slidesPerView: 2, // 2 slides for screens >= 768px
            },
            1024: {
              slidesPerView: 3, // 3 slides for screens >= 1024px
            },
            1440: {
              slidesPerView: 4, // 3 slides for screens >= 1024px
            },
            2560: {
              slidesPerView: 5, // 3 slides for screens >= 1024px
            },
          }}
        >
          {docArr.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative perspective-1000 group w-full h-[50vh]">
                {/* Card container for rotation */}
                <div className="relative w-full h-full transform-style-preserve-3d group-hover:rotate-y-180 transition-transform duration-700">
                  {/* Front side */}
                  <div className="absolute w-full h-full backface-hidden">
                    <img
                      
                      src={item.profilepic}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  </div>
                  {/* Back side */}
                  <Link target="_blank" href={`/${item.username}`} style={{backgroundColor:item.color}} className="absolute w-full h-full text-white flex items-center justify-center rounded-3xl transform rotate-y-180 backface-hidden">
                  <div className="flex-row flex rounded-full p-2 bg-white text-black">

                  <svg xmlns="http://www.w3.org/2000/svg" className="aspect-square w-5" viewBox="0 0 24 24"><path d="m13.511 5.853 4.005-4.117 2.325 2.381-4.201 4.005h5.909v3.305h-5.937l4.229 4.108-2.325 2.334-5.741-5.769-5.741 5.769-2.325-2.325 4.229-4.108H2V8.122h5.909L3.708 4.117l2.325-2.381 4.005 4.117V0h3.473v5.853zM10.038 16.16h3.473v7.842h-3.473V16.16z"></path></svg>/{item.username}
                  </div>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};
