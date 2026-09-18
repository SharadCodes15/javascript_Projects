import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 221

const BOX_DATA = [
  {
    title: "Explore the unknown",
    text: "Every journey begins with a single step. Look beyond the familiar, follow your curiosity, and discover what waits beyond the horizon."
  },
  {
    title: "Keep moving forward",
    text: "Progress is built one moment at a time. Stay patient, embrace the challenge, and let each new perspective shape the path ahead."
  },
  {
    title: "Unveiling new horizons",
    text: "When you dare to question the status quo, the world opens up with infinite possibilities and breathtaking vistas."
  },
  {
    title: "Embrace the rhythm",
    text: "Like the steady flow of time, consistency transforms the ordinary into masterpieces of resilience and grace."
  },
  {
    title: "Seek deeper truths",
    text: "Beneath the surface of everyday life lies an intricate web of connections waiting to be understood and appreciated."
  },
  {
    title: "Cultivate inner calm",
    text: "Amidst the noise and rush of modern existence, finding your center allows you to navigate storms with effortless poise."
  },
  {
    title: "Ignite your passion",
    text: "Fuel your daily endeavors with relentless enthusiasm and watch how obstacles effortlessly melt into stepping stones."
  },
  {
    title: "Chart new pathways",
    text: "Do not follow where the path may lead. Go instead where there is no path and leave a trail of inspiration."
  },
  {
    title: "Reflect and evolve",
    text: "Growth requires quiet moments of introspection to evaluate where you have been and align with where you wish to go."
  },
  {
    title: "Arrive at greatness",
    text: "Every chapter culminates in a grand synthesis of experience, wisdom, and the courage to begin anew."
  }
]

const App = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const boxes = gsap.utils.toArray('.animated-box')
      
      boxes.forEach((box) => {
        gsap.fromTo(
          box,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: box,
              start: 'top 80%',
              end: 'top 50%',
              scrub: true,
              markers: false,
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const framestate = { frame: 0 }
    const frameImages = []

    const renderFrame = (frameIndex) => {
      const img = frameImages[frameIndex]
      if (img?.complete && img.naturalWidth > 0) {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight)
        context.drawImage(img, 0, 0, window.innerWidth, window.innerHeight)
      }
    }

    const frameLoadHandlers = []
    for (let index = 1; index <= TOTAL_FRAMES; index++) {
      const img = new Image()
      const handleLoad = () => renderFrame(Math.round(framestate.frame))
      img.addEventListener('load', handleLoad)
      img.src = `/frames/frame_${index.toString().padStart(4, '0')}.jpg`
      frameImages.push(img)
      frameLoadHandlers.push({ img, handleLoad })
    }

    const resizeCanvas = () => {
      const scale = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * scale
      canvas.height = window.innerHeight * scale
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(scale, 0, 0, scale, 0, 0)
      renderFrame(framestate.frame)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const frameTween = gsap.to(framestate, {
      frame: TOTAL_FRAMES - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
      onUpdate: () => renderFrame(Math.round(framestate.frame)),
    })

    return () => {
      frameTween.kill()
      window.removeEventListener('resize', resizeCanvas)
      frameLoadHandlers.forEach(({ img, handleLoad }) => {
        img.removeEventListener('load', handleLoad)
      })
    }
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
    <main style={styles.page} ref={containerRef}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Immersive Scroll Experience</h1>
        <p style={styles.headerSubtitle}>Scroll down to explore {TOTAL_FRAMES} frames of cinematic transition</p>
      </header>

      <section style={styles.scrollArea}>
        {BOX_DATA.map((item, index) => {
          const isEven = index % 2 === 0
          const boxStyle = {
            ...styles.box,
            ...(isEven ? styles.leftBox : styles.rightBox),
          }

          return (
            <React.Fragment key={index}>
              <article className="animated-box" style={boxStyle}>
                <span style={styles.badge}>0{index + 1}</span>
                <h2 style={styles.boxTitle}>{item.title}</h2>
                <p style={styles.boxText}>{item.text}</p>
              </article>
              {index < BOX_DATA.length - 1 && <div style={styles.verticalSpace} aria-hidden="true" />}
            </React.Fragment>
          )
        })}
      </section>
    </main>
    </div>
  )
}

export default App

const styles = {
  page: {
    minHeight: '100vh',
    position: 'relative',
    zIndex: 1,
    background: 'transparent',
    color: '#fff',
    padding: '0 8vw',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflowX: 'hidden',
  },
  header: {
    textAlign: 'center',
    paddingTop: '8vh',
    paddingBottom: '4vh',
  },
  headerTitle: {
    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
    fontWeight: 700,
    marginBottom: '10px',
    background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  headerSubtitle: {
    fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
    color: '#94a3b8',
  },
  scrollArea: {
    position: 'relative',
    paddingTop: '10vh',
    paddingBottom: '20vh',
  },
  box: {
    width: 'min(400px, 85vw)',
    padding: '32px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.04)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
    lineHeight: 1.7,
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease, background 0.3s ease',
  },
  leftBox: {
    marginRight: 'auto',
  },
  rightBox: {
    marginLeft: 'auto',
  },
  verticalSpace: {
    height: '110vh',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#38bdf8',
    background: 'rgba(56, 189, 248, 0.1)',
    borderRadius: '20px',
    marginBottom: '14px',
    letterSpacing: '1px',
  },
  boxTitle: {
    fontSize: '1.35rem',
    fontWeight: 600,
    marginBottom: '12px',
    color: '#f8fafc',
  },
  boxText: {
    fontSize: '0.95rem',
    color: '#cbd5e1',
    margin: 0,
  },
}