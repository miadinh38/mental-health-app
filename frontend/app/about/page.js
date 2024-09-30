import React from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const About = () => {
  const teamData = [
    {
      title: "Olumuyiwa Tubi",
      description: "Project Manager",
    },
    {
      title: "Ola Ariba",
      description: "Project Manager",
    },
    {
      title: "Monet Williams",
      description: "Product Manager",
    },
    {
      title: "Mia Dinh",
      description: "Fullstack Developer",
    },
  ];

  return (
    <div className={poppins.className}>
      {" "}
      <div className="flex justify-center items-center min-h-[50vh] bg-gray-100 space-x-4">
        <div className="text-left lg:w-2/5">
          <h1 className={`${poppins.className} text-4xl font-bold mb-4`}>
            Teenvent
          </h1>
          <p className="text-lg text-justify">
            TeenVent is a mental health and wellness app for teens that delivers
            services and resources meant to improve the quality of life for
            those dealing with mental and emotional health struggles. It is safe
            and inclusive digital platform designed to support teens facing
            mental health challenges
          </p>
        </div>

        <div>
          <Image
            src="/images/teenvent1.png"
            width={500}
            height={500}
            alt="Teenvent Image"
            className="w-80 h-auto rounded-full shadow-lg"
          />
        </div>
      </div>
      <div className="my-8 border-t border-gray-200"></div>
      {/* Purpose */}
      <div className="bg-gray-100 p-10">
        <h1 className="text-4xl font-bold mb-4 text-center">Our purpose</h1>
        <p className="text-lg text-center">
          TeenVent provides Gamified Stress Management, Parent/Guardian
          Educational resources, and Mood and Progress Tracking for teens
          dealing with mental and emotional health struggles.
        </p>
      </div>
      <div className="flex justify-center">
        <Image
          src="/images/teenvent2.jpg"
          width={500}
          height={500}
          alt="Teenvent Image"
          className="mx-auto w-96 h-96 object-cover rounded-full shadow-lg"
        />
      </div>
      <div className="my-8 border-t border-gray-200"></div>
      {/* Array of cards */}
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-14 text-center">Our team</h1>
        <div className="flex space-x-0">
          {teamData.map((member, index) => (
            <div
              key={index}
              className="relative flex w-60 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
            >
              <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <div className="p-6">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased flex justify-center">
                  {member.title}
                </h5>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased flex justify-center">
                  {member.description}
                </p>
              </div>
              <div className="p-6 pt-0 flex justify-center">
                <button
                  type="button"
                  className="select-none rounded-lg btn_dark_green py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
