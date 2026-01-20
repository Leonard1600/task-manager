import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-4 left-0 w-full pointer-events-none">
      <div className="flex flex-col items-center justify-center text-gray-200">
        <div className="flex items-center gap-2 text-sm font-medium tracking-wide">
          <span className="text-blue-300 text-base">✦</span>
          <span>Leonard Figuera</span>
        </div>

        <p className="text-[11px] text-gray-300 opacity-80 mt-1">
          © 2026 · Task Manager · Full-Stack Project
        </p>
      </div>
    </footer>
  );
};

export default Footer;


