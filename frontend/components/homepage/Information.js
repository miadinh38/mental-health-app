"use client";

import { INFORMATION } from "../../constants";

export default function Information() {
  return (
    <section className="h-[771px] relative bg-purple-50 pt-20">
      <p className="w-3/4 text-purple-700 mx-auto text-center semibold-40">
        The Difference between Venting and Emotional Dumping?
      </p>

      <ul className="flex flex-col mx-auto gap-3 w-3/4 mt-14">
        {INFORMATION.map((info, index) => (
          <li key={index} className="flex flex-col gap-5 py-2">
            <div className="flex flexCenter gap-5">

            <p className='text-white rounded-full w-16 h-16 border-4 border-purple-700 bg-purple-700 flex flexCenter semibold-32'>{index + 1}</p>
            <p className='text-purple-700 flex-1 semibold-32 w-1/3'>{info.title}</p>
            <p className='flex flex-1 regular-14'>{info.description}</p>
            </div>
            <div className={`border border-gray-200 w-full ${index === INFORMATION.length - 1 ? 'border-none' : ''}`}/>
          </li>
        ))}
      </ul>
    </section>
  );
}
