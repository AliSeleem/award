import { useRef, useState } from "react"

const BentoTilt = ({ children, className = ""}) => {
  const [transformStyle, setTransformStyle] = useState("")
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef) return;

    const {left, top, width, height} = itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    setTransformStyle(`perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`)
  }

  const handleMouseLeave = () => setTransformStyle("")
  
  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  )
}

export default BentoTilt