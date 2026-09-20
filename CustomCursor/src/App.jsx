import { gsap } from "gsap";
import { useRef, useLayoutEffect } from "react";

const App = () => {
  const main = useRef(null);
  const cursor = useRef(null);
  const imgdiv = useRef(null);
  useLayoutEffect(() => {
    const mouseEventFX = (dets) => {
      // console.log(dets);
      gsap.to(cursor.current, {
        x: dets.x,
        y: dets.y,
        duration: 0.5,
        ease: "power2",
      });
    };

    const imageDivEnter = () => {
      cursor.current.innerHTML = "View More"
      gsap.to(cursor.current, {
        width:"70px",
        height:"70px",
        // scale: 2,
        duration: 1,
      });
    };
    const imageDivLeave = () => {
      cursor.current.innerHTML = ""
      gsap.to(cursor.current, {
        width:"20px",
        height:"20px",
        // scale: 1,
        duration: 1,
      });
    };
    main.current.addEventListener("mousemove", mouseEventFX);
    imgdiv.current.addEventListener("mouseenter", imageDivEnter);
    imgdiv.current.addEventListener("mouseleave", imageDivLeave);

    const ctx = gsap.context(() => {});
    return () => {
      main.current.removeEventListener("mousemove", mouseEventFX);
      imgdiv.current.removeEventListener("mouseenter", imageDivEnter);
      imgdiv.current.removeEventListener("mouseleave", imageDivLeave);

      ctx.revert();
    };
  },[]);

  return (
    <>
      <div ref={cursor} className="cursor"></div>
      <div ref={main} className="main">
        <div ref={imgdiv} className="img">
          <div className="overlay"></div>
          <img src="https://images.pexels.com/photos/2017021/pexels-photo-2017021.jpeg" alt="" />
        </div>
      </div>
    </>
  );
};

export default App;
