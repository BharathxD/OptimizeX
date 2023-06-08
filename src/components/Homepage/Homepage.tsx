import { Fragment, useState, useEffect } from "react";
import HomepageActions from "./HomepageActions";
import HomepageHeader from "./HomepageHeader";
import HomepageImage from "./HomepageImage";

const Homepage = () => {
  return (
    <div>
      <div className="flex w-full gap-4 flex-col items-center">
        <HomepageHeader />
        <HomepageActions />
      </div>
      <div className="flex w-full flex-col items-center">
        <HomepageImage />
      </div>
    </div>
  );
};

export default Homepage;
