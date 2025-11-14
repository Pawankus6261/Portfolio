import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarDays, MapPin, ExternalLink } from "lucide-react";
// --- NEW: Import motion and Variants ---
import { motion, Variants } from "framer-motion";

// --- Constants (unchanged) ---
const experiences = [
  {
    title: "Freelance Full-Stack Developer & Graphic Designer",
    company: "Self-Employed",
    location: "Remote",
    period: "2023 – Present",
    type: "Freelance",
    description:
      "Designing and developing complete digital solutions — from responsive websites to custom web applications and creative brand designs. Managing end-to-end project delivery with focus on performance, aesthetics, and user experience.",
    achievements: [
      "Successfully completed 25+ projects across various domains including portfolios, business sites, and dashboards",
      "Delivered visually engaging designs and scalable full-stack applications with high client satisfaction",
      "Implemented responsive layouts and intuitive interfaces improving overall user engagement"
    ],
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "Canva",
      "Figma",
      "Photoshop",
    ]
  },
  {
    title: "Freelance Visual & Branding Designer",
    company: "Independent Projects",
    location: "Remote",
    period: "2022 – Present",
    type: "Freelance",
    description:
      "Creating brand identities, social-media content, and marketing visuals for startups, student communities, and local businesses.",
    achievements: [
      "Designed logos, brand kits, and promotional materials for 15+ clients",
      "Built strong visual branding strategies enhancing digital reach",
      "Maintained consistent brand identity and visual harmony across platforms"
    ],
    skills: [
      "Canva",
      "Figma",
      "Photoshop",
      "Illustrator",
      "Branding",
      "Logo Design",
      "Social Media Graphics"
    ]
  }
];

const education = [
  { degree: "Bachelor of Technology in Computer Science Engineering - AIML", school: "Bansal Institute Of Science And Technology, Bhopal", location: "India", period: "2024 - 2028", grade: "CGPA: 7.81/10", description: "Relevant coursework: Data Structures, Algorithms..." },
  { degree: "Higher Secondary Education", school: "Govt. Higher Secondary School", location: "India", period: "2022 - 2024", grade: "87% - 70%", description: "Science stream with Computer Science..." },
];
const certifications = [
  
    {
      name: "AWS Academy Graduate - Cloud Foundations",
      issuer: "Amazon Web Services",
      date: "2025",
      credentialId: "48be5be9-7dc0-492e-aeed-adf734448498",
      url: "https://www.credly.com/badges/48be5be9-7dc0-492e-aeed-adf734448498/public_url"
    },
    {
      name: "JavaScript Essentials 1",
      issuer: "Cisco Networking Academy",
      date: "2025",
      credentialId: "a31e2d55-d0a0-4940-b235-af5514f4e4b0",
      url: "https://www.credly.com/badges/a31e2d55-d0a0-4940-b235-af5514f4e4b0/public_url"
    },
    {
      name: "SQL Basics",
      issuer: "HackerRank",
      date: "2025",
      credentialId: "8bb4a978450f",
      url: "https://www.hackerrank.com/certificates/8bb4a978450f"
    },
    {
      name: "C++ Essential 1",
      issuer: "Cisco Networking Academy",
      date: "2025",
      credentialId: "ee1a52a2-f411-43dc-a23d-c0fbbeaf7960",
      url: "https://www.credly.com/badges/ee1a52a2-f411-43dc-a23d-c0fbbeaf7960/public_url"  
    }
   
];

// --- NEW: Animation Variants ---

// Reusable variant for simple fade-in-up animation
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

// Variant for the list container to stagger its children
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Each child animates 0.1s after the previous
    },
  },
};

// Variant for list items sliding in from the left
const staggerItemLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

// Variant for list items sliding in from the right
const staggerItemRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const Experience = () => {
  return (
    // --- NEW: Added overflow-hidden ---
    <section id="experience" className="py-20 bg-secondary/20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- NEW: Animated Hero Section --- */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Badge variant="secondary" className="py-3 px-4 mb-6 bg-secondary/50 backdrop-blur-sm">
            Experience
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            My{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A timeline of my professional experience, education, and continuous
            learning in the world of technology and development.
          </p>
        </motion.div>

        {/* Experience Section */}
        <div className="mb-20">
          {/* --- NEW: Animated h3 --- */}
          <motion.h3
            className="text-3xl font-bold mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            Professional Experience
          </motion.h3>

          {/* --- NEW: Stagger container for cards --- */}
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {experiences.map((exp) => (
              // --- NEW: Wrapper for stagger item ---
              <motion.div key={exp.title} variants={staggerItemLeft}>
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xl font-semibold text-foreground">
                          {exp.title}
                        </h4>
                        <p className="text-primary font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex flex-col lg:items-end gap-2">
                        <Badge variant="outline" className="w-fit">
                          {exp.type}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground gap-4">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="w-4 h-4" />
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {exp.description}
                    </p>
                    <div className="mb-4">
                      <h5 className="font-medium mb-2">Key Achievements:</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {exp.achievements.map((achievement) => (
                          <li key={achievement}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Technologies:</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-secondary/50"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Education & Certifications Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education Section */}
          <div>
            {/* --- NEW: Animated h3 --- */}
            <motion.h3
              className="text-3xl font-bold mb-8"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              Education
            </motion.h3>

            {/* --- NEW: Stagger container --- */}
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {education.map((edu) => (
                // --- NEW: Wrapper for stagger item ---
                <motion.div key={edu.degree} variants={staggerItemLeft}>
                  <Card className="bg-card/50 backdrop-blur-sm border-border">
                    <CardHeader>
                      <h4 className="text-lg font-semibold">{edu.degree}</h4>
                      <p className="text-primary font-medium">{edu.school}</p>
                      <div className="flex items-center text-sm text-muted-foreground gap-4">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="w-4 h-4" />
                          {edu.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {edu.location}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-3">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {edu.grade}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {edu.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Certifications Section */}
          <div>
            {/* --- NEW: Animated h3 --- */}
            <motion.h3
              className="text-3xl font-bold mb-8"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              Certifications
            </motion.h3>

            {/* --- NEW: Stagger container --- */}
            <motion.div
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {certifications.map((cert) => (
                // --- NEW: Changed <a> to motion.a and added variants ---
                <motion.a
                  key={cert.name}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
                  variants={staggerItemRight} // <-- Slides in from the right
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300 group">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          {cert.name}
                        </h4>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-sm text-primary">{cert.issuer}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{cert.date}</span>
                        <Badge variant="outline" className="text-xs">
                          {cert.credentialId}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;