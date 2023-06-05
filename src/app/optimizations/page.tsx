"use server";

import getCurrentUser from "@/actions/getCurrentUser";
import getUserOptimizations from "@/actions/getUserOptimizations";
import Profile from "@/components/Profile/Profile";
import ProfileDetails from "@/components/Profile/ProfileDetails";
import UserOptimizations from "@/components/Profile/UserOptimizations";

const OptimizationsPage = async () => {
  const currentUser = await getCurrentUser();
  const optimizations = await getUserOptimizations();
  return (
    <div className="container grid grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-1 py-4 md:h-[82vh] gap-0 md:gap-2">
      <div className="flex flex-col gap-2 mb-4 md:mb-0">
        <div className="bg-zinc-800/50 p-4 rounded-2xl rounded-b-sm md:rounded-r-sm rounded-bl-sm h-full flex justify-center items-center aspect shadow-lg">
          <Profile src={currentUser?.image} />
        </div>
        <ProfileDetails
          name={currentUser?.name}
          email={currentUser?.email}
          optimizations={Number(currentUser?.optimizedImages.length)}
        />
      </div>
      <div className="col-span-2 flex flex-col rounded-2xl gap-2 overflow-scroll rounded-t-2xl md:rounded-l-sm">
        <UserOptimizations optimizations={optimizations} />
      </div>
    </div>
  );
};

export default OptimizationsPage;
