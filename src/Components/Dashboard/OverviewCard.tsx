import React from "react";

interface OverviewCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  bgColor?: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  value,
  icon,
  bgColor = "bg-white",
}) => {
  return (
    <div className={`${bgColor} p-6 rounded-xl shadow flex items-center gap-4`}>
      {icon && <div className="text-3xl">{icon}</div>}
      <div>
        <h3 className="text-gray-500 font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default OverviewCard;
