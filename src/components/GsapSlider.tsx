"use client";
import { HERO_LIST, ICONS_LIST } from "@/utils/Helper";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const GsapSlider = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = HERO_LIST.length;

  const updateProgressBar = () => {
    if (sliderRef.current && lineRef.current && circleRef.current) {
      const slideWidth = 100 / totalSlides;
      const progress = (currentSlide + 1) * slideWidth;
      gsap.to(lineRef.current, {
        width: `${progress}%`,
        duration: 1,
        ease: "linear",
      });
      gsap.to(circleRef.current, {
        left: `${progress}%`,
        duration: 1,
        ease: "linear",
      });
    }
  };

  useEffect(() => {
    updateProgressBar();

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [currentSlide, totalSlides]);

  return (
    <div className="bg-off-black overflow-hidden max-xl:px-4 py-20 max-lg:py-16 max-md:py-10 relative">
      <Image
        src="/assets/images/top-layer.webp"
        alt="shadow"
        width={199}
        height={199}
        className=" absolute top-10 right-0"
      />
      <div>
        <h1 className="text-center font-medium text-5xl text-white leading-[57.6px] max-w-[830px] mx-auto max-lg:text-4xl max-md:text-3xl font-montserrat">
          Transforming Secure, Modern
          <span className="text-gardient"> Development</span> with AdaptsAI
        </h1>
      </div>
      <div className="max-w-[1440px] mx-auto justify-between mt-[60px] max-lg:mt-10 max-md:mt-6 px-4">
        <div className="flex items-center justify-between ">
          {ICONS_LIST.map((item, index) => (
            <p
              className={`flex items-center justify-center size-[58px] border border-solid border-white bg-[#FAFAFA0A] border-[#407BFF3D] rounded-[6px] transition-all duration-500 ${
                currentSlide === index
                  ? "bg-gradient-to-r from-off-violet to-sky-400 hover-svg"
                  : "bg-transparent"
              }`}
              key={index}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
      <div
        className="w-full my-3 h-[2px] bg-gradient-to-r from-off-violet to-sky-400 relative flex items-center"
        ref={lineRef}
      >
        <div
          className="size-3 bg-gradient-r from-off-violet to-sky-400 bg-circle rounded-full absolute"
          ref={circleRef}
        ></div>
      </div>

      <div className="relative mt-[60px] max-lg:mt-10 max-md:mt-8 max-sm:mt-5">
        <div
          className="flex transition-transform duration-1000 ease-in-out max-w-[1440px] mx-auto max-lg:flex-wrap"
          ref={sliderRef}
        >
          {HERO_LIST.map((obj, index) => (
            <div
              className={`flex items-center max-w-[1440px] max-lg:flex-wrap mx-auto transition-opacity duration-1000 ease-in-out ${
                currentSlide === index
                  ? "opacity-100 block"
                  : "opacity-0 hidden"
              }`}
              key={index}
            >
              <div className="flex flex-col w-6/12 max-lg:w-full text-center">
                <Image
                  src={obj.number}
                  alt="number"
                  width={297}
                  height={182}
                  className="mb-6 max-lg:max-w-[100px]"
                />
                <h2 className="text-3xl font-montserrat font-bold leading-[39.6px] text-white max-w-[461px] max-lg:max-w-full text-start mb-4 max-lg:text-2xl max-md:text-xl">
                  {obj.title}
                </h2>
                <p className="text-base font-normal mb-2 max-w-[461px] max-lg:max-w-full text-start text-[#FAFAFA]">
                  {obj.discription}
                </p>
                <p className="text-base font-normal max-w-[461px] max-lg:max-w-full text-start mt-6 text-[#FAFAFA]">
                  {obj.discriptionTwo}
                </p>
              </div>
              <div className="w-6/12 max-lg:w-full flex items-center">
                <Image
                  src={obj.slide}
                  alt="slide"
                  width={614}
                  height={247}
                  className="max-w-[614px] max-lg:mx-auto h-[427px] max-h-full object-cover max-md:h-full max-xl:w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GsapSlider;
