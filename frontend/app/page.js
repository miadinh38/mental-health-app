"use client";
import Button from "../components/Button";

export default function HomePage() {
  return (
    <div
      className="bg-cover bg-no-repeat h-screen flex flex-col"
      style={{
        backgroundImage:
          "url('https://magazine.medlineplus.gov/images/uploads/main_images/Teens_are_talking.jpg')",
      }}
    >
      <div className="text-center flex flex-col justify-center items-center mt-20">
        <div className="text-center">
          <h1 className="text-black text-6xl font-bold w-[900px] mx-auto">
            Welcome to TeenVent
          </h1>
          <h3 className="text-black text-base mx-auto font-style: italic">
            A safe, supportive, compassionate environment made with love.
          </h3>
        </div>

        <div className="mt-5 flex gap-5">
          <Button type="button" title="Explore more" variant="btn_white" />

          <Button type="button" title="Subcribe" variant="btn_white" />
        </div>
      </div>
    </div>
  );
}
