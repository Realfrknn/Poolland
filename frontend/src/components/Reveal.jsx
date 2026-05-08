import { useEffect, useRef } from "react";
import useInView from "@/hooks/useInView";

export default function Reveal({ children, delay = 0, y = 18, as: Tag = "div", className, style, ...rest }) {
  const [ref, inView] = useInView();
  const innerRef = useRef(null);

  useEffect(() => {
    if (inView && innerRef.current) {
      innerRef.current.style.opacity = 1;
      innerRef.current.style.transform = "translateY(0)";
    }
  }, [inView]);

  return (
    <Tag ref={ref} className={className} style={{ ...style }} {...rest}>
      <div
        ref={innerRef}
        style={{
          opacity: 0,
          transform: `translateY(${y}px)`,
          transition: `opacity 900ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 900ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        }}
      >
        {children}
      </div>
    </Tag>
  );
}
