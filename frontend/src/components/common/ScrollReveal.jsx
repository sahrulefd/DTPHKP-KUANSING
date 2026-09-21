import { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal Component
 * Reusable component for animating elements on scroll when entering viewport.
 * 
 * Props:
 * - animation: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'fade' (default: 'fade-up')
 * - delay: number in ms (default: 0)
 * - duration: number in ms (default: 600)
 * - threshold: number 0-1 (default: 0.15)
 * - once: boolean (default: true)
 * - className: string
 * - children: ReactNode
 */
export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.15,
  once = true,
  className = '',
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Fallback if IntersectionObserver is not supported
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, once]);

  // Initial hidden transform styles based on animation type
  const getInitialStyle = () => {
    switch (animation) {
      case 'fade-up':
        return 'translate-y-10 opacity-0';
      case 'fade-down':
        return '-translate-y-10 opacity-0';
      case 'fade-left':
        return 'translate-x-10 opacity-0';
      case 'fade-right':
        return '-translate-x-10 opacity-0';
      case 'zoom-in':
        return 'scale-90 opacity-0';
      case 'fade':
      default:
        return 'opacity-0';
    }
  };

  const visibleStyle = 'translate-x-0 translate-y-0 scale-100 opacity-100';

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`will-change-transform transition-all ${
        isVisible ? visibleStyle : getInitialStyle()
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
