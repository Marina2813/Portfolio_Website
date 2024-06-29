import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Web Development",
    description:"No two projects are the same and I take a pragmatic approach to each job I take on, focussing on delivering work that is as accessible and optimised as possible.More than a decade of experience building complex interfaces means that I'm happy to deliver anything from single-page apps to scaleable design systems. I can help you identify the most appropriate technology for your project and, whilst I love a good framework, you can be sure that I will never use tech for tech's sake",
    icon: "/assets/project1.svg",
  },
  {
    title: "Web Development",
    description:
      "From interaction design to scaleable design systems, single-page apps to something more experimental with WebGL, I help awesome people to build ambitious yet accessible web projects - the wilder, the better.",
    icon: "/assets/project2.svg",
  },
];

const ProjectCard = ({ index, title, description, icon }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div
      key={index}
      className={`flex ${
        index % 2 != 0 ? "flex-row" : "flex-row-reverse"
      } items-center gap-8 mb-8 justify-between `}
        ref={cardRef}
    >
      <div className="w-1/2">
        <Image src={icon} alt={`${title} icon`} width={500} height={500} />
      </div>
      <div className={`w-1/2 ${index%2!=0?"text-right":"text-left"}`}>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-xl">{description}</p>
      </div>
    </div>
  );
};

const Projects = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="grid grid-cols-1  gap-8">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          index={index} // Pass the index as a prop here
          title={project.title}
          description={project.description}
          icon={project.icon}
        />
      ))}
    </div>
  </div>
);

export default Projects;
