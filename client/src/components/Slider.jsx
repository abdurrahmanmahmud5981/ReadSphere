import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import banner1 from "../assets/banner/banner_1.jpg";
import banner2 from "../assets/banner/banner_2.jpg";
import banner3 from "../assets/banner/banner_3.jpg";

const Slider = () => {
  // Banner data
  const bannerSlides = [
    {
      image: banner1,
      title: "Welcome to Our Library",
      description: "Discover thousands of books across various categories",
    },
    {
      image: banner2,
      title: "Study Space Available",
      description: "Comfortable reading areas for all members",
    },
    {
      image: banner3,
      title: "New Arrivals Weekly",
      description: "Check out our latest collection",
    },
  ];
  return (
    <div>
      {/* Banner Section */}
      <section className="w-full">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="w-full h-[600px] rounded-xl overflow-hidden"
        >
          {bannerSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-4">
                  <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-xl">{slide.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Slider;
