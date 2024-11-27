import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="h-[380px] relative flex flex-col">
      <div className="absolute w-full h-full flexCenter mb-24 flex flex-col">
        <div className="flex w-3/4">
          <Link href="/">
            <Image
              src="/logo-xl.png"
              alt="Mindora logo"
              width={259}
              height={68}
              priority
              className="max-w-full"
            />
          </Link>

          <div className="flex flex-1 ml-20">
            <ul className="flex flex-col justify-start h-full gap-4 items-start md:hidden">
              {["articles", "FAQ", "contact", "community"].map(
                (label, index) => (
                  <Link
                    key={index}
                    href={`${label}`}
                    className="capitalize regular-16 text-purple-900 flexCenter cursor-point 
                    transition-all hover:font-bold"
                  >
                    {label}
                  </Link>
                )
              )}
            </ul>

            <div className="flex flex-col flex-1 ml-20 justify-between">
              <p className="regular-16">
                Not quite ready for savvy? <br />
                Join our online no-code community for free. No spam. Ever
              </p>
              <div className="flex justify-between items-center">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  className="w-3/4 border border-gray-400 border-r-transparent px-5 py-3 rounded-l-5xl placeholder-gray-300 regular-16"
                />
                <button
                  type="submit"
                  className="flex flex-1 flexCenter text-white bg-purple-700 border border--transparent 
                  border-gray-400 px-2 py-3 rounded-r-5xl cursor-pointer hover:bg-black regular-16"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="regular-12 w-3/4 mx-auto text-end text-gray-30 mt-auto mb-5">
        @2024 Mindora. All rights reserved
      </p>
    </footer>
  );
};
export default Footer;
