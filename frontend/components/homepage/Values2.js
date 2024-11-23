"use client";
import Image from "next/image";
import { VALUES2 } from "../../constants";

export default function Values2() {
  return (
    <section className="relative h-[740px] pt-16">
      <div
        className="absolute inset-0 bg-bg-img-1 h-[740px] bg-cover bg-no-repeat 
        filter grayscale opacity-10 bg-[position:center_50px] z-0"
      ></div>

      <div className="flex flex-col flexCenter relative z-20 gap-36">
        <div className="flex flex-col fexCenter gap-3">
          <p className="semibold-20 flex flexCenter text-center text-purple-700">
            Uplifting each other is at the heart of our mission
          </p>
          <p className="regular-18 flex mx-auto text-center w-2/3">
            Whether you're venting, giving advice, or just listening, we&apos;ve got
            each other&apos;s backs. Positive vibes only!
          </p>
        </div>

        <ul className="z-20 flex gap-8 px-32 relative">
          {VALUES2.map((value, index) => (
            <li
              key={index}
              className="flex flex-col flexBetween px-7 gap-7 border border-purple-300 bg-purple-50 bg-opacity-60 rounded-xl shadow-xl pt-28 pb-14 flex-1"
            >
              <Image
                src={value.img}
                width={170}
                height={170}
                alt="image"
                className="absolute bottom-[240px]"
              />
              <p className="semibold-16 uppercase">{value.title}</p>
              <p className="regular-14 text-center px-5">{value.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
