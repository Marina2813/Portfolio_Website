"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "../common/Navbar";
import LoginPage from "./components/LoginForm";

const Page = () => {
  const overlayRef = useRef(null);

  useEffect(() => {
    gsap.to(overlayRef.current, {
      y: "120%",
      duration: 1,
      ease: "power3.inOut",
    });
  }, []);

  return (
    <div className="relative">
  <div ref={overlayRef} className="fixed inset-4 bg-greenaccent z-50"></div>
      <Navbar />

      <div className=" bg-greenbg h-full px-[100px] pt-40">
      <LoginPage/>
      </div>
    </div>
  );
};

export default Page;
