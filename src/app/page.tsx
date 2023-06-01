import HomepageActions from "@/components/UI/HomepageActions";
import HomepageHeader from "@/components/UI/HomepageHeader";
import HomepageImage from "@/components/UI/HomepageImage";

const Page = () => {
  return (
    <section className="container grid items-center gap-5 md:pt-6 md:py-9 h-screen md:h-[90vh] overflow-hidden">
      <div className="flex w-full gap-4 flex-col items-center">
        <HomepageHeader />
        <HomepageActions />
      </div>
      <div className="flex w-full flex-col gap-4 items-center">
        <HomepageImage />
      </div>
    </section>
  );
};

export const metadata = {
  title: "OptimizeX",
};

export default Page;
