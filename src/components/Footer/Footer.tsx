import { Button, buttonVariants } from "../Inputs/Button";

const Footer = () => {
  return (
    <div className="md:p-auto container sticky bottom-0 left-0 right-0 flex h-min flex-col-reverse justify-between gap-2 border-t border-t-zinc-700 bg-zinc-950 p-3 px-5 md:min-h-[10vh] md:flex-row-reverse md:gap-2">
      <p className="md:py-auto flex items-center py-3 text-center text-sm text-zinc-400 transition-colors md:text-left">
        All images are used solely for image optimization and are automatically
        deleted after 24h.
      </p>
      <div className="justify-auto flex items-center justify-center gap-4">
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
