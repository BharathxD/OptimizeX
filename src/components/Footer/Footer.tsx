import { Button, buttonVariants } from "../Inputs/Button";

const Footer = () => {
  return (
    <div className="justify-between sticky h-min md:min-h-[10vh] p-3 md:p-auto bottom-0 left-0 px-5 right-0 container flex flex-col-reverse gap-2 md:gap-2 border-t border-t-zinc-700 bg-zinc-950 md:flex-row-reverse">
      <p className="text-sm flex items-center text-center md:text-left text-zinc-400 py-3 md:py-auto transition-colors">
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
