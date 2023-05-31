export default function Home() {
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-3">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Simplify Image Optimization with <br className="hidden sm:inline" />
          OptimizeX
        </h1>
        <p className="max-w-[700px] text-lg text-zinc-700 dark:text-zinc-400 sm:text-xl">
          Effortlessly bulk-generate optimized versions of your images with our
          free and open-source tool.
        </p>
      </div>
      <div className="flex gap-4"></div>
      <div className="flex flex-col gap-4 mt-12"></div>
    </section>
  );
}
