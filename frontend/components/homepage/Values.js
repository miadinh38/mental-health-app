"use client";
import Image from "next/image";
import Button from "../Button";
import { VALUES } from "../../constants";

export default function Values() {
  return (
    <section className="relative">
      <Image
        src="/vector4.png"
        width={225}
        height={486}
        className="w-[200px] h-[264px] absolute bottom-0 left-0"
        alt="vector 5"
      />
      {/* Middle Layer (2/3 width with linear background) */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-r from-white to-purple-300" />

      <div className="relative z-10 max-container padding-container">
        <div className="border border-purple-100 w-1/3 flex flexCenter mx-auto mb-10"/>
        <p className="flex flexCenter semibold-32 text-purple-700">
          Our values
        </p>

        <ul className="z-20 flex m-6 pb-10">
          {VALUES.map((value, index) => (
            <li
              key={index}
              className="flex flex-col flexCenter py-3 px-7 gap-2"
            >
              <Image
                src={value.icon}
                width={20}
                height={20}
                alt="icon"
              />
              <p className="semibold-16 uppercase">
                {value.title}
              </p>
              <p className="regular-14 text-center">
                {value.description}
              </p>
            </li>
          ))}
        </ul>

        {/* <div className="flex flexCenter pb-7">
          <Button
            type="button"
            title="Vent Now"
            variant="btn_purple w-[169px]"
            size="big"
          />
        </div> */}
      </div>

    </section>
  );
}
