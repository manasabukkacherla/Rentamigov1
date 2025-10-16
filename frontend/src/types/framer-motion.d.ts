declare module "framer-motion" {
  import * as React from "react";

  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
  }

  export const motion: {
    nav: React.ForwardRefExoticComponent<MotionProps>;
    button: React.ForwardRefExoticComponent<MotionProps>;
    div: React.ForwardRefExoticComponent<MotionProps>;
    span: React.ForwardRefExoticComponent<MotionProps>;
  };

  export const AnimatePresence: React.FC<{
    children?: React.ReactNode;
  }>;
}
