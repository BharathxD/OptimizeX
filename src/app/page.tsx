import { Button, buttonVariants } from "@/components/UI/Button";
import Image from "next/image";
import { GoMarkGithub } from "react-icons/go";

const Page = () => {
  return (
    <section className="container grid items-center gap-5 md:pt-6 md:py-9 h-screen md:h-[90vh]">
      <div className="flex w-full flex-col items-center gap-5">
        <h1 className="font-extrabold text-center text-3xl tracking-tighter leading-tight sm:text-3xl md:text-5xl lg:text-6xl">
          Streamline Image Optimization with <br className="hidden sm:inline" />
          OptimizeX
        </h1>
        <p className="text-zinc-700 dark:text-zinc-400 w-full text-lg sm:text-xl text-center">
          Effortlessly bulk-generate optimized versions of your images with our
          free and open-source tool.
        </p>
        <div className="flex flex-col w-full gap-3 md:flex-row md:w-auto">
          <Button
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className: "md:w-fit font-bold text-md w-full",
            })}
          >
            Get Started
          </Button>
          <Button
            className={buttonVariants({
              variant: "special",
              size: "lg",
              className: "md:w-fit font-bold text-md w-full",
            })}
            icon={GoMarkGithub}
          >
            Shine a Star
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <Image
          src="/images/homepage.png"
          alt="Homepage Image"
          width={100}
          unoptimized={true}
          height={100}
          priority={true}
          className="hidden md:block aspect-video w-full md:w-[103vh] md:-ml-7 rounded-lg"
        />
      </div>
    </section>
  );
};

export const metadata = {
  title: "OptimizeX",
};

export default Page;
