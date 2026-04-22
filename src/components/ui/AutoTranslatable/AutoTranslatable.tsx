"use client";

import React from "react";
import { useAutoTranslate } from "@/hooks/useAutoTranslate";

interface AutoTranslatableProps {
  text: string | null | undefined;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A simple wrapper component that automatically translates its text content
 * based on the current site language, using the useAutoTranslate hook.
 */
const AutoTranslatable: React.FC<AutoTranslatableProps> = ({ 
  text, 
  as: Component = "span", 
  className,
  style
}) => {
  const { translated } = useAutoTranslate(text);
  
  if (!text) return null;

  return (
    <Component className={className} style={style}>
      {translated}
    </Component>
  );
};

export default AutoTranslatable;
