import getCurrentUser from "@/actions/getCurrentUser";

import Homepage from "@/components/Homepage/Homepage";
import MediaProcessingPanel from "@/components/Panels/MediaProcessingPanel";

const Page = async () => {
  const currentUser = await getCurrentUser();
  return (
    <section className="container relative grid h-[75vh] items-center gap-1 overflow-hidden md:h-[82vh] md:py-9 md:pt-6">
      {!currentUser ? <Homepage /> : <MediaProcessingPanel />}
    </section>
  );
};

export default Page;
