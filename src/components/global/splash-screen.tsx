import React from "react";
import { Loader2 } from "lucide-react";

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <Loader2 className="w-12 h-12 text-black animate-spin" />
    </div>
  );
};

export default SplashScreen;
