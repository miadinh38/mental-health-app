"use client";
import Image from "next/image";
import { FEEDBACK } from "../../constants";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import { useState } from "react";

export default function Feedback() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? FEEDBACK.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === FEEDBACK.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="h-[771px] relative">
      <div className="relative w-full h-full z-0">
        <Image
          src="/vector6.png"
          alt="vector 6"
          width={231}
          height={448}
          className="absolute top-0 right-0 opacity-30"
        />
        <Image
          src="/vector7.png"
          alt="vector 7"
          width={256}
          height={259}
          className="absolute bottom-0 left-0 opacity-30"
        />

        <div className="flex flex-col flexCenter padding-container max-container relative z-10 pt-20">
          <p className="text-purple-700 semibold-32">What Others Are Saying?</p>

          <div className="mt-14 flex flex-col flexCenter w-2/3">
            <div className="flex flexCenter">
              <BsArrowLeftCircle
                onClick={goToPrev}
                className="text-3xl text-gray-300 cursor-pointer m-5"
              />
              <div className="flex">
                <Image
                  src={FEEDBACK[currentIndex].img}
                  alt="feedback image"
                  width={300}
                  height={447}
                />
              </div>
              <BsArrowRightCircle
                onClick={goToNext}
                className="text-3xl text-gray-300 cursor-pointer m-5"
              />
            </div>

            <p className="regular-16 text-center mt-10">
              "{FEEDBACK[currentIndex].content}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
