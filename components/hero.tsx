import Link from "next/link"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* Decorative background blocks */}
      <div className="absolute right-0 top-0 -z-10 h-full w-full opacity-10 pointer-events-none">
        <div className="absolute top-20 right-20 h-40 w-40 bg-primary opacity-50"></div>
        <div className="absolute top-80 right-60 h-64 w-64 bg-primary opacity-50"></div>
        <div className="absolute bottom-20 left-10 h-32 w-32 bg-primary opacity-50"></div>
        <div className="absolute top-40 left-20 h-48 w-48 bg-dark-grey opacity-20"></div>
      </div>
      
      <div className="mx-auto max-w-5xl px-6 lg:px-12 w-full flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-8">
          <div className="space-y-8 flex flex-col items-center">
            <span className="inline-block bg-primary px-6 py-2 text-sm font-bold uppercase tracking-[0.2em] text-white border-2 border-dark-grey box-shadow-solid">
                Full-Stack Developer
            </span>
            <h1 className="text-6xl font-black uppercase leading-[0.9] tracking-tighter text-dark-grey md:text-8xl lg:text-[10rem]">
                Youseef <br/> <span className="text-primary">Tareq</span>
            </h1>
            <p className="max-w-2xl text-xl font-medium leading-relaxed text-dark-grey/80 mt-4">
                Crafting high-performance digital experiences with precision, logic, and a solid technical foundation.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <Link className="no-round border-4 border-dark-grey bg-dark-grey px-12 py-6 text-sm font-black uppercase tracking-widest text-white hover:bg-primary hover:border-primary hover:text-white transition-all text-center box-shadow-solid-primary" href="#projects">
                View Projects
            </Link>
            <Link className="no-round border-4 border-dark-grey bg-white px-12 py-6 text-sm font-black uppercase tracking-widest text-dark-grey hover:bg-flat-grey transition-all text-center box-shadow-solid" href="#contact">
                Let's Talk
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
