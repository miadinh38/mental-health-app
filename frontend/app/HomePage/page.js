

import Image from "next/image";

const HomePage = () => {
    return (
        <div
            className="bg-cover bg-no-repeat h-screen"
            style={{
                backgroundImage:
                    "url('https://magazine.medlineplus.gov/images/uploads/main_images/Teens_are_talking.jpg')",
            }}
        >
            <nav className="flex justify-between items-center bg-zinc-400 text-xl p-4">
                <Image
                    className="dark:invert"
                    src="https://skillhat.ca/wp-content/uploads/2023/06/skillhat-whitelogo.png"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
                <ul className="flex list-none">
                    <li className="ml-4">
                        <a href="active" className="text-black no-underline hover:underline">
                            Home
                        </a>
                    </li>
                    <li className="ml-4">
                        <a href="#" className="text-black no-underline hover:underline">
                            About
                        </a>
                    </li>
                    <li className="ml-4">
                        <a href="#" className="text-black no-underline hover:underline">
                            Services
                        </a>
                    </li>
                    <li className="ml-4">
                        <a href="#" className="text-black no-underline hover:underline">
                            Feedback
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="text-center mt-12">
                <div className="text-center">
                    <h1 className="text-black text-6xl font-bold w-[900px] mx-auto">
                        Welcome to our page
                    </h1>
                    <h3 className="text-black text-base  mx-auto font-style: italic">
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
};

export default HomePage;
