import { useState, useRef, useEffect } from "react";

const LazyImage = ({ src, alt, className }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {visible && <img src={src} alt={alt} className="w-full h-full object-cover" />}
    </div>
  );
};

export default LazyImage;