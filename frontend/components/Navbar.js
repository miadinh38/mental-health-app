"use client";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { logout, isAuth, currentUser } = useAuth();

  return (
    <nav className="flex justify-between items-center text-xl py-2 px-8">
      <Image
        src="/teenvent-logo.png"
        alt="Teenvent logo"
        width={150}
        height={32}
        priority
      />

      <ul className="flex flex-1 justify-start h-full pl-16 gap-12">
        {["home", "about", "services", "contact"].map((label, index) => (
          <Link
            key={index}
            href={label === "home" ? `/` : `${label}`}
            className="capitalize regular-18 text-gray-600 flexCenter cursor-point 
            transition-all hover:font-bold"
          >
            {label}
          </Link>
        ))}
      </ul>

      {!isAuth ? (
        <ul className="flex gap-3">
          {["login", "register"].map((button, index) => (
            <Link key={index} href={`${button}`}>
              <Button
                type="button"
                title={`${button}`}
                variant="btn_dark_green capitalize"
              />
            </Link>
          ))}
        </ul>
      ) : (
        <>
          <p className="pr-4 regular-18">{currentUser?.name}</p>
          <Button
            type="button"
            title="Logout"
            variant="btn_dark_green capitalize"
            onClick={logout}
          />
        </>
      )}
    </nav>
  );
};
export default Navbar;
