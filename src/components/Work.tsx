import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "ChatFlow.AI",
    description:
      "An intelligent chatbot SaaS platform for businesses to create, customize, and integrate chat assistants effortlessly.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    tags: ["React", "Flask", "MongoDB", "OpenAI API"],
    category: "Full-stack",
    liveUrl: "https://chatflow-ai.vercel.app",
    githubUrl: "https://github.com/Pawankush6261/chatflow-ai",
  },
  {
    id: 2,
    title: "Vaitra",
    description:
      "A smart healthcare web platform featuring doctor listings, appointment booking, medicine availability, and patient dashboards.",
    image:
      "https://images.unsplash.com/photo-1588776814546-548b5e4c043c?w=600&h=400&fit=crop",
    tags: ["React", "Flask", "PostgreSQL", "REST API"],
    category: "Full-stack",
    liveUrl: "https://vaitra.vercel.app",
    githubUrl: "https://github.com/Pawankush6261/vaitra",
  },
  {
    id: 3,
    title: "AVTAAR 3D",
    description:
      "A futuristic 3D asset platform built for game developers, animators, and digital artists to explore and share models.",
    image:
      "https://images.unsplash.com/photo-1614064643993-10c87e05d8b4?w=600&h=400&fit=crop",
    tags: ["React", "Three.js", "Tailwind", "3D Viewer"],
    category: "Frontend",
    liveUrl: "https://avtaar3d.vercel.app",
    githubUrl: "https://github.com/Pawankush6261/avtaar-3d",
  },
  {
    id: 4,
    title: "Journal Editor",
    description:
      "An advanced online writing platform like Google Docs, featuring autosave, export options, and user profiles.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    tags: ["React", "Firebase", "Quill.js", "Framer Motion"],
    category: "Frontend",
    liveUrl: "#",
    githubUrl: "https://github.com/Pawankush6261/journal-editor",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description:
      "A personal portfolio crafted with elegant animations and responsive design to showcase my work and achievements.",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&h=400&fit=crop",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    category: "Frontend",
    liveUrl: "#",
    githubUrl: "https://github.com/Pawankush6261",
  },
  {
    id: 6,
    title: "Face Recognition System",
    description:
      "A Python-based AI project capable of detecting and recognizing human faces with real-time accuracy.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    tags: ["Python", "OpenCV", "Machine Learning"],
    category: "Backend",
    liveUrl: "#",
    githubUrl: "#",
  },
];

const categories = ["All", "Frontend", "Backend", "Full-stack"];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const Work = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="work" className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Badge variant="secondary" className="mb-6 bg-secondary/50 backdrop-blur-sm">
            My Work
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Featured{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of real-world projects I’ve built — from AI systems to
            full-stack platforms, each crafted with passion and precision.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex justify-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex bg-secondary/20 backdrop-blur-md p-2 rounded-full border border-border shadow-inner">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                variant={selectedCategory === cat ? "default" : "ghost"}
                className={`mx-1 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-glow-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <AnimatePresence>
            {filteredProjects.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Card className="group bg-card/50 border-border hover:shadow-lg hover:bg-card/70 transition-all duration-300 overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-secondary/80 backdrop-blur-sm">
                        {p.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="icon" variant="secondary" className="bg-secondary/80 backdrop-blur-sm" asChild>
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button size="icon" variant="secondary" className="bg-secondary/80 backdrop-blur-sm" asChild>
                        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <Badge key={t} variant="outline" className="text-xs border-border/50">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center bg-gradient-secondary rounded-3xl p-12 border border-border shadow-lg"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-3xl font-bold mb-4">Let's Build Something Great</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have a vision or project in mind? Let's connect and bring your
            imagination to life through technology and creativity.
          </p>
          <Button variant="hero" size="lg" className="group" asChild>
            <a href="#contact" className="inline-flex items-center">
              Start a Project
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Work;
