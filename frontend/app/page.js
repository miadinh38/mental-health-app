export default function Home() {
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
            Welcome to our page
          </h1>
          <h3 className="text-black text-base mx-auto font-style: italic">
            A safe, supportive, compassionate environment made with love.
          </h3>
        </div>

        <div className="mt-5">
          <button className="px-5 py-2 bg-blue-500 text-white border-none cursor-pointer hover:bg-blue-700 mr-3">
            Explore more
          </button>
          <button className="px-5 py-2 bg-blue-500 text-white border-none cursor-pointer hover:bg-blue-700">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
