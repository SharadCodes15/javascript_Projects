import React from 'react'
import {motion,useScroll} from "motion/react"

const App = () => {

  const {scrollYProgress} = useScroll();

  return (
    <>
    

    <motion.div 
    style={{
      scaleX:scrollYProgress
    }}
    className="scroll">
a
    </motion.div>

      {/* <motion.div 
      initial={{
        x:500
      }}
      animate={{
        x:200,
        rotate:180,
        // scale:0.5
      }}
      transition={{
        // duration:3
      }}
      whileHover={{
        backgroundColor:"green",
      }}
      whileTap={{
        scale:0.8
      }}
      drag
      whileDrag={{
        // scale:0.6
      }}
      dragConstraints={{
        left:0,
         top:0,
         right:500,
         bottom:500
      }}
      dragDirectionLock="true"
      className="box">

      </motion.div> */}

      <h1 className="h1">Sheriayans</h1>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam omnis voluptates optio, cupiditate provident, est impedit obcaecati saepe at molestiae blanditiis consectetur ipsum iure aliquam. Quos tempore dolore ut dolores assumenda fugit quod blanditiis, repellendus optio molestias ullam a cupiditate saepe distinctio omnis accusantium atque voluptatum exercitationem provident inventore doloribus illo. Vel, reprehenderit, id libero eius enim aliquid dolore quia saepe veritatis, voluptates earum laudantium. Tenetur quia odio eos, sapiente doloremque, facere odit esse architecto neque fugit perferendis eaque ea a! Magnam odio enim, <br/>quis voluptates nobis eius porro sequi qui nihil nisi quod illum, excepturi, facilis architecto atque quisquam?</p>
      <br />
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam omnis voluptates optio, cupiditate provident, est impedit obcaecati saepe at molestiae blanditiis consectetur ipsum iure aliquam. Quos tempore dolore ut dolores assumenda fugit quod blanditiis, repellendus optio molestias ullam a cupiditate saepe distinctio omnis accusantium atque voluptatum exercitationem provident inventore doloribus illo. Vel, reprehenderit, id libero eius enim aliquid dolore quia saepe veritatis, voluptates earum laudantium. Tenetur quia odio eos, sapiente doloremque, facere odit esse architecto neque fugit perferendis eaque ea a! Magnam odio enim, <br/>quis voluptates nobis eius porro sequi qui nihil nisi quod illum, excepturi, facilis architecto atque quisquam?</p>
      <br />
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam omnis voluptates optio, cupiditate provident, est impedit obcaecati saepe at molestiae blanditiis consectetur ipsum iure aliquam. Quos tempore dolore ut dolores assumenda fugit quod blanditiis, repellendus optio molestias ullam a cupiditate saepe distinctio omnis accusantium atque voluptatum exercitationem provident inventore doloribus illo. Vel, reprehenderit, id libero eius enim aliquid dolore quia saepe veritatis, voluptates earum laudantium. Tenetur quia odio eos, sapiente doloremque, facere odit esse architecto neque fugit perferendis eaque ea a! Magnam odio enim, <br/>quis voluptates nobis eius porro sequi qui nihil nisi quod illum, excepturi, facilis architecto atque quisquam?</p>


    </>
  )
}

export default App