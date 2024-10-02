"use client";
import { useState } from "react";
import Image from "next/image";

const Contact = () => {
  // Estado para manejar el acordeón
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="contact-container my-8">
      <h1 className="text-center text-2xl font-bold">Contact</h1>
      {/* Accordion */}
      <div className="accordion mt-5 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Accordion Item 1 */}
        <div className="border-b border-slate-200">
          <button
            onClick={() => toggleAccordion(1)}
            className="w-full flex justify-between items-center py-5 text-slate-800"
          >
            <span>How to contact us</span>
            <span className="text-slate-800 transition-transform duration-300">
              {openIndex === 1 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
          </button>
          {openIndex === 1 && (
            <div className="overflow-hidden transition-all duration-300 ease-in-out">
              <div className="pb-5 text-sm text-slate-500">
                Where are we located? <br />
                Our team works across Canada. <br />
                <br />
                Need to mail something to us? Our mailing address is as follows:{" "}
                <br />
                Teenvent <br />
                400-601 West Broadway <br />
                Vancouver, BC, V5Z 4C2 <br />
                <br />
                To reach us by phone, our telephone number is +1123456789.
              </div>
            </div>
          )}
        </div>

        {/* Accordion Item 2 */}
        <div className="border-b border-slate-200">
          <button
            onClick={() => toggleAccordion(2)}
            className="w-full flex justify-between items-center py-5 text-slate-800"
          >
            <span>Lorem ipsum dolor sit amet</span>
            <span className="text-slate-800 transition-transform duration-300">
              {openIndex === 2 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
          </button>
          {openIndex === 2 && (
            <div className="overflow-hidden transition-all duration-300 ease-in-out">
              <div className="pb-5 text-sm text-slate-500">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </div>
            </div>
          )}
        </div>

        {/* Accordion Item 3 */}
        <div className="border-b border-slate-200">
          <button
            onClick={() => toggleAccordion(3)}
            className="w-full flex justify-between items-center py-5 text-slate-800"
          >
            <span>Lorem ipsum dolor sit amet</span>
            <span className="text-slate-800 transition-transform duration-300">
              {openIndex === 3 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
          </button>
          {openIndex === 3 && (
            <div className="overflow-hidden transition-all duration-300 ease-in-out">
              <div className="pb-5 text-sm text-slate-500">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </div>
            </div>
          )}
        </div>
         {/* Accordion Item 4 */}
         <div className="border-b border-slate-200">
          <button
            onClick={() => toggleAccordion(4)}
            className="w-full flex justify-between items-center py-5 text-slate-800"
          >
            <span>Lorem ipsum dolor sit amet</span>
            <span className="text-slate-800 transition-transform duration-300">
              {openIndex === 4 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
          </button>
          {openIndex === 4 && (
            <div className="overflow-hidden transition-all duration-300 ease-in-out">
              <div className="pb-5 text-sm text-slate-500">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </div>
            </div>
            
          )}
        </div>

         {/* Accordion Item 5 */}
         <div className="border-b border-slate-200">
          <button
            onClick={() => toggleAccordion(5)}
            className="w-full flex justify-between items-center py-5 text-slate-800"
          >
            <span>Lorem ipsum dolor sit amet</span>
            <span className="text-slate-800 transition-transform duration-300">
              {openIndex === 5 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
          </button>
          {openIndex === 5 && (
            <div className="overflow-hidden transition-all duration-300 ease-in-out">
              <div className="pb-5 text-sm text-slate-500">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </div>
            </div>
            
          )}
        </div>
      </div>

      <div className="mt-12"></div>

      <div className="mt-12"></div>


      <div className="flex justify-center mt-8">
        <Image
          src="/images/teenvent3.jpg" 
          alt="TeenVent event"
          width={500} 
          height={300} 
          className="rounded-lg" 
        />
      </div>
    </div>
  );
};

export default Contact;
