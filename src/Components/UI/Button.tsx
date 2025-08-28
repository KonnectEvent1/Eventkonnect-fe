import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "outline";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
}) => {
  const baseClasses =
    "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105";

  const variantClasses = {
    primary: "bg-green-700 text-white hover:bg-green-800",
    secondary:
      "bg-transparent text-green-700 border-2 border-green-700 hover:bg-green-100",
    accent: "bg-yellow-500 text-white hover:bg-yellow-600",
    outline:
      "bg-transparent text-white border-2 border-white hover:bg-white hover:text-green-700",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
