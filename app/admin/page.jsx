"use client"
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // Corrected import path
import gsap from "gsap";
import Navbar from "../common/Navbar";
import AdminLanding from "./components/AdminLanding";
import { useAuth } from "@/app/providers/context"; // Import useAuth hook

const Page = () => {
  const overlayRef = useRef(null);
  const router = useRouter();
  const { isAuthenticated } = useAuth(); // Use useAuth hook to access isAuthenticated

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login"); // Redirect if not authenticated
    } else {
      gsap.to(overlayRef.current, {
        y: "120%",
        duration: 1,
        ease: "power3.inOut",
      });
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; // Optionally render nothing or a loader while checking auth state

  return (
    <div className="relative">
      <div ref={overlayRef} className="fixed inset-4 bg-greenaccent z-50"></div>
      <Navbar />
      <div className="bg-greenbg h-full px-[100px] pt-40">
        <AdminLanding />
      </div>
    </div>
  );
};

export default Page;