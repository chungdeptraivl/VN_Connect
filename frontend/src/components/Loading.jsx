import { LoaderIcon } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoaderIcon className="animate-spin size-14 text-primary" />
    </div>
  );
};

export default Loading;
