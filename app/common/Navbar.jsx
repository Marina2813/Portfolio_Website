import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import logo from "../../public/assets/logo.svg";
import Image from "next/image";
import gsap from "gsap";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navLinksRef = useRef([]);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      gsap.to(menuRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.fromTo(
        navLinksRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.3,
        }
      );
    } else {
      gsap.to(menuRef.current, {
        y: "-100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [menuOpen]);

  const getAccentColor = () => {
    console.log(pathname);
    switch (pathname) {
      case "/work":
        return "bg-redaccent brighteness-0";
      case "/about":
        return "bg-greenaccent";
      case "/contact":
        return "bg-yellowaccent";
      case "/admin":
        return "bg-yellowaccent";
      default:
        return "bg-white";
    }
  };

  return (
    <div>
      <div className="fixed left-0 top-10 justify-between flex items-center w-full px-[100px] z-20">
        <div id="left" className="flex justify-start items-center w-1/2 p-5">
          <Image src={logo} width={70} height={70} alt="logo" />
          <span className="px-4">|</span>
          <button
            onClick={toggleMenu}
            className="font-bold tracking-[3px] hover:scale-110"
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
        <div
          id="right"
          className="w-1/2 flex items-center justify-end text-right font-bold tracking-[3px]"
        >
          <a href="">
            <h1>HIRE ME</h1>
          </a>
        </div>
      </div>
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 w-full h-full ${getAccentColor()} flex flex-col items-start p-20 px-[100px] font-bold justify-center transform -translate-y-full z-10 `}
      >
        <div className="h-full w-full flex">
          <div className="bg-textcolor h-1 w-[10%] mt-24 mb-4 "></div>

        </div>
        <Link
          ref={(el) => (navLinksRef.current[0] = el)}
          href="/"
          className="hover:text-white text-5xl py-6 mb-4"
        >
          HOME
        </Link>
        <Link
          ref={(el) => (navLinksRef.current[1] = el)}
          href="/about"
          className="hover:text-white text-5xl py-6 mb-4"
        >
          ABOUT
        </Link>
        <Link
          ref={(el) => (navLinksRef.current[2] = el)}
          href="/work"
          className="hover:text-white text-5xl py-6 mb-4"
        >
          WORK
        </Link>
        <Link
          ref={(el) => (navLinksRef.current[3] = el)}
          href="/contact"
          className="hover:text-white text-5xl py-6 mb-4"
        >
          CONTACT
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
