"use server";

import getCurrentUser from "@/actions/getCurrentUser";
import getUserOptimizations from "@/actions/getUserOptimizations";
import Profile from "@/components/UI/Profile";
import ProfileDetails from "@/components/UI/ProfileDetails";
import UserOptimizations from "@/components/UI/UserOptimizations";

const OptimizationsPage = async () => {
  const currentUser = await getCurrentUser();
  const optimizations = await getUserOptimizations();
  return (
    <div className="container grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 min-h-screen py-4 md:min-h-[82vh] md:h-[82vh] gap-0 md:gap-2">
      <div className="flex flex-col gap-3 mb-4 md:mb-0">
        <div className="bg-zinc-800/50 p-4 rounded-2xl h-full flex justify-center items-center aspect shadow-lg">
          <Profile src={currentUser?.image} />
        </div>
        <ProfileDetails
          name={currentUser?.name}
          email={currentUser?.email}
          optimizations={Number(currentUser?.optimizedImages.length)}
        />
      </div>
      <div className="md:hidden w-full flex justify-center items-center">
        <div className="w-[99%] bg-zinc-700 h-[1px]"></div>
      </div>
      <div className="col-span-2 h-full flex flex-col rounded-2xl gap-2 overflow-scroll">
        <UserOptimizations optimizations={optimizations} />
      </div>
    </div>
  );
};

export default OptimizationsPage;
