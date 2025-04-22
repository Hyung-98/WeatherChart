import React from "react";

interface WeatherLayoutProps {
  children: React.ReactNode;
}

const WeatherLayout: React.FC<WeatherLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center md:p-8">
      <div className="h-full w-full max-w-7xl flex flex-1">
        {/* PC 버전 그리드 레이아웃 */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {React.Children.map(children, (child) => (
            <div className="transform transition-transform hover:scale-105">{child}</div>
          ))}
        </div>

        {/* 모바일 버전 단일 컬럼 레이아웃 */}
        <div className="w-full md:hidden space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default WeatherLayout;
