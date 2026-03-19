import { Code2, Server, Database, Container, Cloud, Layout, MonitorSmartphone, TerminalSquare } from "lucide-react"

const skills = [
  { name: "Angular", icon: MonitorSmartphone, category: "Frontend" },
  { name: "TypeScript", icon: Code2, category: "Language" },
  { name: "Tailwind CSS", icon: Layout, category: "Styling" },
  { name: "Node.js", icon: TerminalSquare, category: "Backend" },
  { name: "Express", icon: Server, category: "Backend" },
  { name: "MongoDB", icon: Database, category: "Database" },
  { name: "Docker", icon: Container, category: "DevOps" },
  { name: "Cloudflare", icon: Cloud, category: "Infrastructure" },
  { name: "Linux / VPS", icon: Server, category: "Infrastructure" },
]

export function TechStack() {
  return (
    <section className="bg-flat-grey py-32 border-y-4 border-dark-grey" id="stack">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-20 text-center flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-dark-grey bg-white px-8 py-4 border-4 border-dark-grey box-shadow-solid rotate-1 inline-block">
            Tech Stack
          </h2>
          <p className="mt-8 font-black uppercase tracking-widest text-primary text-sm md:text-lg border-2 border-dark-grey bg-dark-grey text-white px-6 py-2 -rotate-1">
            Weapons of Choice
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <div 
                key={index} 
                className="flat-card bg-white p-8 flex flex-col items-center text-center gap-6 hover:-translate-y-2 hover:translate-x-2 transition-transform duration-300 relative group"
              >
                {/* Decorative corner accent */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary border-4 border-dark-grey opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="p-4 bg-flat-grey border-4 border-dark-grey group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="w-10 h-10" strokeWidth={2.5} />
                </div>
                
                <div className="space-y-2 mt-2">
                  <h3 className="text-xl font-black uppercase tracking-widest text-dark-grey">
                    {skill.name}
                  </h3>
                  <div className="inline-block bg-dark-grey text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 mt-2">
                    {skill.category}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
