import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, Sparkles, Code, Palette } from "lucide-react"; // --- NEW: Added Code and Palette ---
import heroPortrait from "@/assets/pawan-profile.png";
import { motion, Variants } from "framer-motion"; // --- FIX: Import Variants --- // --- NEW: Import framer-motion ---

// --- Stats constant moved outside the component ---
const stats = [
  { number: "5+", label: "Projects Completed" },
  { number: "1+", label: "Years Experience" },
  { number: "2+", label: "Happy Clients" },
];

// --- NEW: Animation variants for staggered text content ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Stagger animation for each child
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen bg-gradient-hero relative overflow-hidden pt-16 flex items-center">
      
      {/* --- IMPROVED: Animated background elements --- */}
      <div className="absolute inset-0 opacity-30">
        {/* --- IMPROVED: Using smoother 'pulse-slow' animation --- */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow motion-reduce:animate-none"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow delay-1000 motion-reduce:animate-none"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-primary rounded-full blur-3xl animate-pulse-slow delay-500 motion-reduce:animate-none"></div>

        {/* --- NEW: Floating Icons --- */}
        <Code className="absolute top-1/4 left-1/3 w-24 h-24 text-primary/20 animate-float-slow blur-sm motion-reduce:animate-none" />
        <Palette className="absolute bottom-1/3 right-1/4 w-20 h-20 text-accent/20 animate-float blur-sm motion-reduce:animate-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* --- NEW: Left Content Animated Container --- */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Greeting Badge */}
            <motion.div variants={itemVariants}>
              <Badge variant="secondary" className="py-3 px-3 w-fit bg-secondary/50 backdrop-blur-sm border border-border/50">
                <Sparkles className="w-4 h-4 mr-2 text-primary" />
                Hello, I'm Pawan
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-foreground">Creative</span>
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Designer
                </span>{" "}
                <span className="text-foreground">&</span>
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Developer
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed">
                I craft beautiful digital experiences through thoughtful design and clean code.
                Currently pursuing B.Tech CSE while helping brands tell their stories through
                innovative solutions.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="hero"
                size="lg"
                className="group"
                asChild
              >
                <a href="#work">
                  View My Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </a>
              </Button>
              
              {/* TODO: Update href to the correct path of your CV */}
              <Button variant="outline" size="lg" className="border-border hover:bg-secondary/50" asChild>
                <a href="/CV_Pawan.pdf" download="Pawan_CV.pdf">
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* --- NEW: Right Content (Image) Animated --- */}
          <motion.div
            className="relative h-[600px] lg:h-full hidden lg:block rounded-full overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: 100 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              y: [0, -10, 0], // Subtle float animation
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.4, ease: "easeOut" },
              x: { duration: 0.8, delay: 0.4, ease: "easeOut" },
              y: { 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1, // Start floating after fade-in
              }
            }}
          >
            <img
              src={heroPortrait}
              alt="A portrait of Pawan, the site author"
              className="absolute inset-0 w-full h-full object-cover object-top"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/20 to-transparent"></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce motion-reduce:animate-none">
        <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse motion-reduce:animate-none"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;