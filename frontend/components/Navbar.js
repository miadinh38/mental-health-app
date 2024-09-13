import Image from "next/image";


const Navbar = () => {
  return (
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
          <a href="/" className="text-black no-underline hover:underline">
            Home
          </a>
        </li>
        <li className="ml-4">
          <a href="/about" className="text-black no-underline hover:underline">
            About
          </a>
        </li>
        <li className="ml-4">
          <a
            href="/services"
            className="text-black no-underline hover:underline"
          >
            Services
          </a>
        </li>
        <li className="ml-4">
          <a
            href="/feedback"
            className="text-black no-underline hover:underline"
          >
            Feedback
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
