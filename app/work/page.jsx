"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "../common/Navbar";
import Image from "next/image";
import Landing from "../common/landing";
import Projects from "./components/projects";
import GetInTouch from "./components/GetInTouch";

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
        
        <Landing heading={"About my work"} description={"From interaction design to scaleable design systems, single-page apps to something more experimental with WebGL. I help awesome people to build ambitious yet accessible web projects - the wilder, the better"} accentcolor={"redaccent"} />
        <Projects />
        <GetInTouch />
      </div>
    </div>
  );
};

export default Page;
