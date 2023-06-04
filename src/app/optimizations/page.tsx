"use server";

import getCurrentUser from "@/actions/getCurrentUser";
import Avatar from "@/components/UI/Avatar";
import Profile from "@/components/UI/Profile";

const OptimizationsPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="container grid grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-1 min-h-screen py-4 md:min-h-[82vh] md:h-[82vh] gap-3">
      <div className="flex flex-col gap-3">
        <div className="bg-zinc-800/50 p-4 rounded-2xl h-full flex justify-center items-center aspect-square">
          <Profile src={currentUser?.image} />
        </div>
        <div className="bg-zinc-800/50 grid grid-flow-row p-4 rounded-2xl h-full text-md">
          <div className="p-1">Bharath</div>
          <div className="p-1">Bharathxxd@gmail.com</div>
          <div className="p-1">3 Optimizations so far</div>
        </div>
      </div>
      <div className="bg-zinc-800/50 col-span-2 p-4 rounded-2xl">
        <div>
          Optimizations
          <div>Iterative optimizations</div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationsPage;
