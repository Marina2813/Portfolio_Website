import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "../common/button";

gsap.registerPlugin(ScrollTrigger);

const LetsWork = () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const animatedDivRef = useRef(null);
  const scrollDivRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      paragraphRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.to(animatedDivRef.current, {
      width: "10%",
      duration: 1,
      ease: "power2.out",
    });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#oval",
          start: "top center",
        },
      })
      .to("#oval", {
        y: -30,
        duration: 0.5,
        ease: "power1.out",
      })
      .to("#oval", {
        y: 0,
        duration: 0.75,
        ease: "bounce.out",
      });

      gsap.fromTo(
        scrollDivRef.current,
        { opacity: 1, },
        {
          opacity: 0,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scrollDivRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
  }, []);
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className="h-[80vh]">
      <div id="HEADINGS" ref={headingRef}>
        <h1 className=" text-5xl flex items-end">
          <div className="font-bold">Let's Work Together</div>
          <div
            className={`h-4 w-4 mb-2 ml-2 bg-redaccent rounded-full`}
            id="oval"></div>
        </h1>
        <div
          ref={animatedDivRef}
          className={`bg-redaccent h-1 w-full mt-6 rounded-xl`}
          id="line"
        ></div>
      </div>
      <p className="text-2xl w-3/5 py-10" ref={paragraphRef}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab eum perspiciatis dolor pariatur modi delectus, similique magnam quis porro reiciendis ipsam unde repellendus cumque quidem aperiam iste dolorem accusamus numquam!
      </p>
      <AnimatedButton text="My Works"/>
      <div className="h-full w-full ml-20" id="scroll">
        <div className="h-full w-full py-24 font-mono tracking-[5px] px-16 text-black/50" ref={scrollDivRef}>
          SCROLL
          <div className="w-[1px] h-1/2 bg-black/50 mx-8 my-4"></div>
        </div>
      </div>
    </div>
    </div>
  )
};

export default LetsWork
