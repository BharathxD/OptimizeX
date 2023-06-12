import { Fragment } from "react";

const HomepageHeader = () => {
  return (
    <Fragment>
      <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-zinc-200 to-zinc-400 font-extrabold text-center text-3xl tracking-tighter leading-tight sm:text-3xl md:text-5xl lg:text-6xl">
        Streamline Image Optimization with <br className="hidden sm:inline" />
        OptimizeX
      </h1>
      <p className="text-zinc-400 w-full text-lg sm:text-xl text-center">
        Effortlessly bulk-generate optimized versions of your images with our
        free and open-source tool.
      </p>
    </Fragment>
  );
};

export default HomepageHeader;
