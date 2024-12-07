import { TiLocationArrow } from "react-icons/ti"
import Button from "./Button"
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from 'react-use'
import clsx from "clsx"
import gsap from "gsap";

const navItems = ["Nexus", "About", "Features", "Story", "Contact"];

const NavBar = () => {
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();

  const toggleAudioIndicator = () => {
    setIsAudioPlaying(p => !p)
    setIsIndicatorActive(p => !p)
  }

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying])

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY])

  useEffect(() => {
    gsap.to(navContainerRef.current ,{
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    })
  }, [isNavVisible])

  const scrollToId = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'instant', // Ensures smooth scrolling
      block: 'start', // Aligns the element to the top of the viewport
    });
  };

  return(
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-3"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />

            <Button
              id="product-button"
              title={"Products"}
              rightIcon={<TiLocationArrow />}
              containerClass={"!bg-blue-50 md:flex hidden items-center justify-center gap-1"}
            />
          </div>
          <div className="flex items-center h-full">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToId(item)}
                  className="nav-hover-btn"
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio 
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map(bar => (
                <div
                  key={bar}
                  className={clsx("indicator-line", { active: isIndicatorActive})}
                  style={{ animationDelay: `${bar * 0.1}s`}}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default NavBar