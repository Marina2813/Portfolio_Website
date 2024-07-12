"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "./common/Navbar";
import Landing from "./common/Landing";
import MainLanding from "./homepage/mainLanding";
import LetsWork from "./homepage/LetsWork";
import Certificate from "./homepage/Certificate";
import Skills from "./homepage/skills";


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
  <div ref={overlayRef} className="fixed inset-4 bg-redaccent z-50"></div>
      <Navbar />

      <div className=" bg-redbg h-full px-[100px] pt-40">
      <MainLanding/>
      <LetsWork/>
      <Certificate/>
      <Skills/>
      </div>
    </div>
  );
};

export default Page;
