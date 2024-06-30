"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "../common/Navbar";
import Landing from "../common/Landing";
import ContactForm from "./components/ContactForm";

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
  <div ref={overlayRef} className="fixed inset-4 bg-yellowaccent z-50"></div>
      <Navbar />

      <div className=" bg-yellowbg h-full px-[100px] pt-40">
        <Landing heading={"Connect Me"} description={"I'm a developer, designer who has been building for the web in some capacity since 2020. I specialise in accessibility, performance and usability without sacrificing creativity."} accentcolor={"yellowaccent"}/>
        <ContactForm/>
      </div>
    </div>
  );
};

export default Page;
