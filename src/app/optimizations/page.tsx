"use server";

import getCurrentUser from "@/actions/getCurrentUser";
import getUserOptimizations from "@/actions/getUserOptimizations";
import Profile from "@/components/Profile/Profile";
import ProfileDetails from "@/components/Profile/ProfileDetails";
import UserOptimizations from "@/components/Profile/UserOptimizations";
import formatDate from "@/utils/formatDate";
import { Metadata } from "next";
import Head from "next/head";
import { Fragment } from "react";

export const generateMetadata = async (): Promise<Metadata> => {
  const currentUser = await getCurrentUser();
  const title = `${currentUser?.name}'s Optimizations`;
  return {
    title: title,
  };
};

const OptimizationsPage = async () => {
  const currentUser = await getCurrentUser();
  const optimizations = await getUserOptimizations();
  return (
    <div className="container grid grid-cols-1 grid-rows-2 md:grid-cols-4 md:grid-rows-1 py-4 md:min-h-[82vh] gap-0 md:gap-2 overflow-hidden no-scrollbar overflow-y-scroll">
      <div className="flex flex-col gap-2 mb-4 w-full md:mb-0 overflow-y-scroll">
        <div className="bg-zinc-800/50 p-4 rounded-2xl rounded-b-sm md:rounded-r-sm rounded-bl-sm h-fit flex justify-center items-center aspect-square shadow-lg">
          <Profile src={currentUser?.image} />
        </div>
        <ProfileDetails
          name={currentUser?.name}
          email={currentUser?.email}
          optimizations={Number(currentUser?.optimizedImages.length)}
          joinedOn={currentUser?.createdAt}
        />
      </div>
      <div className="col-span-3 flex flex-col rounded-2xl gap-2 overflow-scroll rounded-t-2xl md:rounded-l-sm">
        <UserOptimizations optimizations={optimizations} />
      </div>
    </div>
  );
};

export default OptimizationsPage;
