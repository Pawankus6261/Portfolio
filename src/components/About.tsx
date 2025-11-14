import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Palette, Rocket, Heart, Download, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion"; // --- NEW: Import motion and Variants ---

// --- Constants (unchanged) ---
const skills = [
  { category: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"] },
  { category: "Backend", items: ["Node.js", "Python", "Express", "PostgreSQL", "MongoDB"] },
  { category: "Design & Graphic Design", items: ["Figma",  "Photoshop", "Illustrator", "Branding", "Typography", "UI/UX Design"] },
  { category: "Tools", items: ["Git", "Docker", "AWS", "Vercel", "Webpack", "Postman"] },
  
];

const values = [
  { icon: <Code className="w-6 h-6" />, title: "Clean Code", description: "I believe in writing maintainable, scalable code that stands the test of time." },
  { icon: <Palette className="w-6 h-6" />, title: "User-Centered Design", description: "Every design decision is made with the end user's experience in mind." },
  { icon: <Rocket className="w-6 h-6" />, title: "Innovation", description: "I love exploring new technologies and pushing the boundaries of what's possible." },
  { icon: <Heart className="w-6 h-6" />, title: "Passion", description: "I'm genuinely passionate about creating digital experiences that matter." },
];

// --- NEW: Animation Variants ---

// Reusable 'fade in and slide up' variant
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

// Container variant for staggering children
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger each child by 0.1s
    },
  },
};

// Child variant for the staggered cards (scale in)
const cardScaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// --- End of new variants ---


const About = () => {
  return (
    <section id="about" className="py-20 bg-background overflow-hidden"> {/* --- NEW: Added overflow-hidden --- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- NEW: Animated Hero Section --- */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger when 30% is visible
        >
          <Badge variant="secondary" className="mb-6 bg-secondary/50 backdrop-blur-sm">
            About Me
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Passionate About{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Creating
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm a creative developer who bridges the gap between design and technology.
            Currently pursuing B.Tech in Computer Science Engineering while building
            amazing digital experiences.
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">

          {/* --- NEW: Animated Story (Left) --- */}
          <motion.div
            className="space-y-6"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-3xl font-bold">My Story</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                My journey into the world of technology began during my early college days
                when I discovered the perfect intersection of creativity and logic in web development.
              </p>
              <p>
                What started as curiosity about how websites work has evolved into a passion
                for creating meaningful digital experiences. I love the challenge of taking
                complex problems and turning them into simple, elegant solutions.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new design trends, contributing
                to open-source projects, or mentoring fellow students who are just starting
                their tech journey.
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="hero" asChild>
                <a href="#contact">
                  Get In Touch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/CV_Pawan.pdf" download="Pawan_CV.pdf">
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </a>
              </Button>
            </div>
          </motion.div>

          {/* --- NEW: Animated Quick Facts (Right) --- */}
          <motion.div
            className="relative"
            variants={fadeInUp} // Re-using the same simple fade-in
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="bg-gradient-secondary rounded-3xl p-8 border border-border">
              <h4 className="text-xl font-semibold mb-6">Quick Facts</h4>
              <dl className="space-y-4">
                {/* ...dl content... */}
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Location</dt>
                  <dd>India</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Education</dt>
                  <dd>B.Tech CSE-AIML</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Experience</dt>
                  <dd>1+ Years</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Interests</dt>
                  <dd>AI & Automation , RAG ,Full Stack</dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          {/* --- NEW: Animated Title --- */}
          <motion.h3
            className="text-3xl font-bold text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            What Drives Me
          </motion.h3>

          {/* --- NEW: Animated Staggered Grid --- */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the grid is visible
          >
            {values.map((value, index) => (
              // --- NEW: Added motion.div wrapper for each card ---
              <motion.div key={index} variants={cardScaleIn}>
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300 h-full"> {/* --- NEW: Added h-full for consistency --- */}
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 text-primary-foreground">
                      {value.icon}
                    </div>
                    <h4 className="font-semibold mb-2">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills Section */}
        <div>
          {/* --- NEW: Animated Title --- */}
          <motion.h3
            className="text-3xl font-bold text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            Skills & Technologies
          </motion.h3>

          {/* --- NEW: Animated Staggered Grid --- */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // Trigger even earlier
          >
            {skills.map((skillGroup, index) => (
              // --- NEW: Added motion.div wrapper for each card ---
              <motion.div key={index} variants={cardScaleIn}>
                <Card className="bg-card/50 backdrop-blur-sm border-border h-full"> {/* --- NEW: Added h-full --- */}
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4 text-primary">{skillGroup.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-secondary/50"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;