"use client";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { logout, isAuth, currentUser } = useAuth();

  return (
    <nav className="flex justify-between items-center py-4 px-24 bg-purple-50">
      <Link href="/">
        <Image
          src="/Mindora-logo.png"
          alt="Mindora logo"
          width={150}
          height={32}
          priority
          className="max-w-full"
        />
      </Link>

      <ul className="flex flex-1 justify-start h-full gap-8 flexCenter md:hidden">
        {["articles", "FAQ", "about", "contact", "community"].map(
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

      {!isAuth ? (
        <ul className="flex gap-2 md:hidden">
          {["login", "sign up"].map((button, index) => (
            <Link
              key={index}
              href={`/${button === "sign up" ? "signup" : "login"}`}
            >
              <Button
                type="button"
                title={`${button}`}
                variant={`${
                  button === "login" ? "btn_white" : "btn_purple"
                } capitalize w-[123px]`}
              />
            </Link>
          ))}
        </ul>
      ) : (
        <>
          <p className="pr-4 regular-16">{currentUser?.name}</p>
          <Button
            type="button"
            title="Logout"
            variant="btn_purple capitalize"
            onClick={logout}
          />
        </>
      )}
    </nav>
  );
};
export default Navbar;
