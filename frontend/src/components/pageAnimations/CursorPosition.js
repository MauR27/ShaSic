import { useState, useEffect } from "react";

const CursorPosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const bgColor = `radial-gradient(circle at ${position.x}px ${position.y}px, rgb(52, 79, 167) 1%, transparent 250px)`;

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const offsetX = window.scrollX || document.documentElement.scrollLeft;
    const offsetY =
      window.screenY + (window.scrollY || document.documentElement.scrollTop);
    setPosition({ x: clientX + offsetX, y: clientY + offsetY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return bgColor;
};

export default CursorPosition;
