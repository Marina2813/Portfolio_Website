"use client";
import {useRouter} from "next/navigation";
import Navbar from "./common/Navbar";

export default function Home() {
  const router = useRouter();
  return (
    
    <div className="bg-primarybg h-screen w-screen flex justify-center">
      <Navbar/>
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="text-left md:w-1/2 pl-16">
          <h1 className="text-textcolor text-4xl md:text-6xl font-normal">
            Hi, my name is <br />
            <span className="block font-extrabold mt-4">Marina Rose</span>
          </h1>
          <p className="text-black text-sm md:text-base mt-2">
            Crafting code, cooking recipes, and smashing <br/>
            shuttlecocks—B.Tech CSE student at MITS! 🏸👩‍💻🍳
          </p>
        </div>
    </div>
    </div>
  );
}
