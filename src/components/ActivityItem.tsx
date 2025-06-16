// app/_components/ActivityItem.tsx
import React from "react";

export interface ActivityItemProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  timestamp: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  title,
  description,
  timestamp,
}) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="mt-1">
        {React.cloneElement(icon, {
          className: `${icon.props.className} w-5 h-5`,
        })}
      </div>
      <div className="flex-1 flex flex-col sm:flex-row justify-between">
        <div>
          <p className="font-semibold text-gray-800">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <p className="text-sm text-gray-400 mt-1 sm:mt-0 sm:text-right">
          {timestamp}
        </p>
      </div>
    </div>
  );
};
