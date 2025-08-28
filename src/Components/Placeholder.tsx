// src/components/Placeholder.tsx
import React from "react";

interface PlaceholderProps {
  title: string;
  height?: string;
  bgColor?: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  title,
  height = "h-64",
  bgColor = "bg-gray-100",
}) => {
  return (
    <div
      className={`${height} ${bgColor} flex items-center justify-center border border-dashed border-gray-300`}
    >
      <h3 className="text-xl font-semibold text-gray-600">{title}</h3>
    </div>
  );
};

export default Placeholder;
