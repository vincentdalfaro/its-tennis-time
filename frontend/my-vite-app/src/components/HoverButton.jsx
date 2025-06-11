import { useRef, useState, useEffect } from "react";

export default function HoverButton({
  defaultImg,
  hoverImg,
  children,
  onClick,
  width = "300px",
  style = {},
}) {
  const [imgSrc, setImgSrc] = useState(defaultImg);
  const [isClicked, setIsClicked] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsClicked(false);
        setImgSrc(defaultImg);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [defaultImg]);

  const handleClick = () => {
    setIsClicked(true);
    setImgSrc(hoverImg);
    if (onClick) onClick();
  };

  return (
    <button
      ref={buttonRef}
      className="button"
      style={{ width, color: "#999999", ...style }}
      onMouseEnter={() => setImgSrc(hoverImg)}
      onMouseLeave={() => {
        if (!isClicked) setImgSrc(defaultImg);
      }}
      onClick={handleClick}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={imgSrc} alt="icon" style={{ width: "20px", marginRight: "5px" }} />
        {children}
      </div>
    </button>
  );
}