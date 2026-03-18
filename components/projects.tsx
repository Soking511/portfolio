import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "EG-Pricey",
    description: "Egyptian price-tracking platform featuring real-time updates on currencies, gold, fuel, and food prices. Includes interactive financial tools for loans and investments.",
    link: "https://eg-pricey.com/",
    tags: ["Full-Stack", "Real-Time", "Financial"],
  },
  {
    title: "XTranslator SaaS",
    description: "Translation platform supporting multiple languages and regions. Integrated with Lemon Squeezy for secure global payment processing and strict rate-limiting for high performance.",
    link: "https://xtranslator.app/",
    tags: ["SaaS", "Payments", "Performance"],
  },
  {
    title: "TileGreen Web",
    description: "Official website for a pioneering Egyptian startup transforming non-recyclable plastic waste into sustainable, carbon-negative building materials.",
    link: "https://tilegreen.org/",
    tags: ["Frontend", "Sustainable", "Startup"],
  },
  {
    title: "Faculty of Nursing",
    description: "Developed the official website for the Faculty of Nursing at Damanhour University, showcasing its academic identity and institutional accreditation.",
    link: "https://nursing.dmu.edu.eg/",
    tags: ["Institution", "Frontend", "Academic"],
  }
]

export function Projects() {
  return (
    <section className="bg-white py-32 border-y-8 border-dark-grey overflow-hidden" id="projects">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-20 flex flex-col items-start gap-6 relative">
          {/* Decorative background block behind title */}
          <div className="absolute -left-4 -top-4 w-48 h-20 bg-primary border-4 border-dark-grey lg:block hidden"></div>
          
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-dark-grey relative z-10 bg-white border-4 border-dark-grey px-8 py-4 box-shadow-solid">
            Selected Works
          </h2>
        </div>
        
        <div className="grid gap-12 md:grid-cols-2">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group flex flex-col bg-flat-grey border-4 border-dark-grey box-shadow-solid hover:-translate-y-2 hover:translate-x-2 transition-all duration-300 relative"
            >
              <div className="flex-1 p-8 md:p-10 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-black uppercase tracking-widest bg-dark-grey text-white px-3 py-1 border-2 border-dark-grey">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-dark-grey mb-4">
                  {project.title}
                </h3>
                
                <p className="mt-2 flex-1 text-lg font-bold leading-relaxed text-dark-grey/80 border-l-4 border-primary pl-4">
                  {project.description}
                </p>
              </div>
              
              <div className="border-t-4 border-dark-grey">
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white px-8 py-6 text-lg font-black uppercase tracking-widest text-dark-grey hover:bg-primary hover:text-white transition-colors flex items-center justify-between group-hover:bg-primary group-hover:text-white"
                >
                  <span>Visit Project</span>
                  <ExternalLink strokeWidth={3} className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
