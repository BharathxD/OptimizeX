"use server";

import getCurrentUser from "@/actions/getCurrentUser";
import getUserOptimizations from "@/actions/getUserOptimizations";
import { Button, buttonVariants } from "@/components/Inputs/Button";
import Avatar from "@/components/UI/Avatar";
import Profile from "@/components/UI/Profile";
import ProfileDetails from "@/components/UI/ProfileDetails";
import Typography from "@/components/static/Typegraphy";
import Link from "next/link";

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
      <div className="col-span-2 flex flex-col rounded-2xl gap-2">
        <div className="bg-zinc-800/50 p-4 flex rounded-lg">
          <Typography type="heading">Optimization History</Typography>
        </div>
        <div className="flex flex-col bg-zinc-800/50 p-4 rounded-lg gap-4">
          <div className="flex flex-row justify-between">
            <Typography
              type="subheading"
              className="flex justify-center items-center text-xl"
            >
              File name
            </Typography>
            <div className="flex justify-center items-center text-md">
              Today at 5:33 PM
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex justify-center items-center text-md">
              It&apos;s a PNG
            </div>
            <Button
              className={buttonVariants({
                variant: "default",
              })}
              href={"https://www.bharathbandi.com"}
              newTab
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationsPage;
