import { Fragment } from "react";
import HomepageActions from "./HomepageActions";
import HomepageHeader from "./HomepageHeader";
import HomepageImage from "./HomepageImage";

const Homepage = () => {
  return (
    <Fragment>
      <div className="flex w-full gap-4 flex-col items-center">
        <HomepageHeader />
        <HomepageActions />
      </div>
      <div className="flex w-full flex-col items-center">
        <HomepageImage />
      </div>
    </Fragment>
  );
};

export default Homepage;
