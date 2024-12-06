import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const VideoPreview = ({children}) => {
  const [isHovering, setIsHovering] = useState(false);

  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const handleMouseMove = ({clientX, clientY, currentTarget}) => {
    const rect = currentTarget.getBoundingClientRect();

    const XOffset = clientX - ( rect.left + rect.width / 2 );
    const YOffset = clientY - ( rect.top + rect.height / 2 );

    if (isHovering) {
      gsap.to(sectionRef.current, {
        x: XOffset,
        y: YOffset,
        rotationY: XOffset / 2,
        rotationX: -YOffset / 2,
        transformPerspective: 500, 
        duration: 1,
        ease: "power1.out"
      })

      gsap.to(contentRef.current, {
        x: -XOffset,
        y: -YOffset,
        duration: 1,
        ease: "power1.out"
      })
    }
  }

  useEffect(() => {
    if (!isHovering) {
      gsap.to(sectionRef.current, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 1,
        ease: "power1.out"
      });
      
      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power1.out"
      });
    }
  
  }, [isHovering])
  
  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="absolute z-50 size-full rounded-lg overflow-hidden"
      style={{
        perspective: "500px"
      }}
    >
      <div
        ref={contentRef}
        className="origin-center rounded-lg"
        style={{
          transformStyle: "preserve-3d"
        }}
      >
        {children}
      </div>
    </section>
  )
}

export default VideoPreview