import { Button, buttonVariants } from "../Inputs/Button";

const Footer = () => {
  return (
    <div className="justify-between sticky h-auto md:h-[10vh] p-3 md:p-auto bottom-0 left-0 right-0 container flex flex-col-reverse gap-2  md:gap-2 border-t-zinc-200 border-t dark:border-t-zinc-700 text-zinc-900 dark:bg-zinc-900 md:flex-row-reverse">
      <p className="text-sm flex items-center text-center md:text-left text-zinc-400 py-3 md:py-auto">
        All images are used solely for image optimization and are automatically
        deleted after 24h.
      </p>
      <div className="flex items-center justify-center justify-auto gap-4">
        <Button
          href="/terms"
          className={buttonVariants({ variant: "link", size: "sm" })}
        >
          Terms
        </Button>
        <Button
          href="/privacy-policy"
          className={buttonVariants({ variant: "link", size: "sm" })}
        >
          Privacy Policy
        </Button>
      </div>
    </div>
  );
};

export default Footer;
