import getCurrentUser from "@/actions/getCurrentUser";
import Homepage from "@/components/Homepage/Homepage";
import MediaProcessingPanel from "@/components/Panels/MediaProcessingPanel";

const Page = async () => {
  const currentUser = await getCurrentUser();
  return (
    <section className="container grid items-center gap-1 md:pt-6 md:py-9 h-screen md:h-[82vh] overflow-hidden relative">
      {!currentUser && <Homepage />}
      {currentUser && <MediaProcessingPanel />}
    </section>
  );
};

export const metadata = {
  title: "OptimizeX",
};

export default Page;
