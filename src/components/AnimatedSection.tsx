import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * A component that fades and slides in its children
 * when it becomes visible in the viewport.
 */
export const AnimatedSection: React.FC<Props> = ({
  children,
  className,
  delay = 0,
}) => {
  const ref = useRef(null);
  // Trigger animation when 20% of the element is in view, and only run it once.
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      ref={ref}
      variants={variants}
      initial="hidden"
      // Animate to 'visible' when isInView becomes true
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration: 0.5,
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};