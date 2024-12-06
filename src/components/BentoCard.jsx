import { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti"

const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({x: 0, y: 0});
  const [hoverOpacity, setHoverOpacity] = useState(0)
  const hoverButtonRef = useRef(null)

  const handleMouseMove = (event) => {
    if(!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect()

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }
  const handleMouseEnter = () => setHoverOpacity(1)
  const handleMouseLeave = () => setHoverOpacity(0)

  return (
    <div className="relative size-full">
      <video 
        src={src}
        loop
        muted
        autoPlay
        className="absolute top-0 left-0 size-full object-cover"
      />
      <div className="relative z-10 p-5 size-full text-blue-50 flex flex-col justify-between">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (<p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>)}
        </div>
        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`
              }}
            />
            <TiLocationArrow className="relative z-20"/>
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BentoCard