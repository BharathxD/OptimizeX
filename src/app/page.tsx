import getCurrentUser from "@/actions/getCurrentUser";
import HomepageActions from "@/components/UI/HomepageActions";
import HomepageHeader from "@/components/UI/HomepageHeader";
import HomepageImage from "@/components/UI/HomepageImage";
import { Fragment } from "react";

const Page = async () => {
  const currentUser = await getCurrentUser();
  return (
    <section className="container grid items-center gap-1 md:pt-6 md:py-9 h-screen md:h-[82vh] overflow-hidden">
      {!currentUser && (
        <Fragment>
          <div className="flex w-full gap-4 flex-col items-center">
            <HomepageHeader />
            <HomepageActions />
          </div>
          <div className="flex w-full flex-col items-center">
            <HomepageImage />
          </div>
        </Fragment>
      )}
    </section>
  );
};

export const metadata = {
  title: "OptimizeX",
};

export default Page;
