import { Fragment } from "react";

const HomepageHeader = () => {
  return (
    <Fragment>
      <h1 className="bg-gradient-to-br from-zinc-200 to-zinc-400 bg-clip-text text-center text-3xl font-extrabold leading-tight tracking-tighter text-transparent sm:text-3xl md:text-5xl lg:text-6xl">
        Streamline Image Optimization with <br className="hidden sm:inline" />
        OptimizeX
      </h1>
      <p className="w-full text-center text-lg text-zinc-400 sm:text-xl">
        Effortlessly bulk-generate optimized versions of your images with our
        free and open-source tool.
      </p>
    </Fragment>
  );
};

export default HomepageHeader;
