import { useLayoutEffect, useRef } from 'react'

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const Card = ({i,elem}) => {
    const boxref = useRef(null)
    useLayoutEffect(()=>{
    gsap.to(boxref.current,{
      scale:0.7,
      opacity:0,
      scrollTrigger:{
        trigger:boxref.current,
        start:"top 15%",
        end:"bottom 15%",
        markers:true,
        scrub:true,
      }
    })
  },[])
  return (
    <>
    <div  ref={boxref}  className="card sticky top-[15vh] w-[25vw] px-5 flex flex-col rounded-[25px] py-[15vh] gap-4 items-center bg-[#43392f]">
      <img src={`/${(i+1)}.png`} alt="" className="w-[150px] aspect-sqaure" />
      <h1 className="text-5xl font-thin">
        The <br />
        <span className="font-bold">{`${elem}`}</span>
      </h1>
      <p className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A, nihil.
      </p>
    </div>
    </>
  );
};

export default Card;
