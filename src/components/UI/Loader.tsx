"use client";

import { MoonLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex h-[82vh] items-center justify-center">
      <MoonLoader size={50} color="white" />
    </div>
  );
};

export default Loader;
