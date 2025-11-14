import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Send,
  Coffee,
  MessageCircle,
  Calendar,
} from "lucide-react";
// --- NEW IMPORTS ---
import { useState } from "react"; // Import useState for manual form handling
// For animations - using direct URL import to avoid resolution errors
import { motion } from "framer-motion";
// --- REMOVED: @formspree/react import ---

// Constants moved outside component (best practice)
const contactInfo = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "contact.pawan62.com",
    href: "mailto:contact.pawan62.com",
  },
  {
    icon: <MapPin className="w-4 h-4" />,
    label: "Location",
    value: "Bhopal MadhyaPradesh India",
    href: "#", // Added href: "#" to match the logic in ContactItemWrapper
  },
];

const socialLinks = [
  {
    icon: <Github className="w-5 h-5" />,
    label: "GitHub",
    username: "@Pawankush6261",
    href: "https://github.com/Pawankush6261",
    color: "group-hover:text-gray-400",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    label: "LinkedIn",
    username: "Pawan Kushwaha",
    href: "https://www.linkedin.com/in/pawan-kushwaha-ai",
    color: "group-hover:text-blue-400",
  },
];

const Contact = () => {
  // --- MANUAL FORMSPREE STATE ---
  // Replace "YOUR_FORM_ID" with your actual Formspree form ID
  const FORMSPREE_ID = "mgvrveyo";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  // --- MANUAL FORMSPREE SUBMIT HANDLER ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset(); // Clear the form on success
      } else {
        const data = await response.json();
        setError(data.errors?.map((e: any) => e.message).join(", ") || "Something went wrong.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };


  // Component to render link or div
  const ContactItemWrapper = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    if (href === "#") {
      return (
        <div className="flex items-center gap-3 p-3 rounded-lg group">
          {children}
        </div>
      );
    }
    return (
      <a
        href={href}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors group"
      >
        {children}
      </a>
    );
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- ANIMATED HERO SECTION --- */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Badge
            variant="secondary"
            className="px-4 py-3 mb-6 bg-secondary/50 backdrop-blur-sm"
          >
            Contact
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Let's{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind or just want to chat about technology? I'd
            love to hear from you. Let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* --- ANIMATED CONTACT FORM --- */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <h3 className="text-2xl font-bold">Send me a message</h3>
                <p className="text-muted-foreground">
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </p>
              </CardHeader>
              <CardContent>
                {/* --- FORMSPREE SUCCESS MESSAGE --- */}
                {isSuccess ? (
                  <div className="text-center p-8">
                    <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thanks for reaching out. I'll get back to you as soon as
                      possible.
                    </p>
                  </div>
                ) : (
                  /* --- FORMSPREE FORM --- */
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName" // Added name attribute
                        placeholder="John"
                        className="bg-background/50 border-border"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName" // Added name attribute
                        placeholder="Doe"
                        className="bg-background/50 border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        name="email" // Added name attribute (required for Formspree reply-to)
                        placeholder="john@example.com"
                        className="bg-background/50 border-border"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject" // Added name attribute
                        placeholder="Project Inquiry"
                        className="bg-background/50 border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message" // Added name attribute
                        placeholder="Tell me about your project..."
                        rows={6}
                        className="bg-background/50 border-border resize-none"
                        required
                      />
                    </div>

                    {/* --- ERROR MESSAGE --- */}
                    {error && (
                      <div className="text-red-500 text-sm">
                        Error: {error}
                      </div>
                    )}


                    <Button
                      type="submit"
                      variant="hero"
                      className="w-full group"
                      disabled={isSubmitting} // Disable button while submitting
                    >
                      {/* Show different text based on submitting state */}
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* --- ANIMATED CONTACT INFO & QUICK ACTIONS --- */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Contact Information */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <h4 className="text-xl font-semibold">Contact Information</h4>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info) => (
                  <ContactItemWrapper key={info.label} href={info.href}>
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {info.label}
                      </div>
                      <div className="font-medium group-hover:text-primary transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </ContactItemWrapper>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <h4 className="text-xl font-semibold">Follow Me</h4>
              </CardHeader>
              <CardContent className="space-y-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors group"
                  >
                    <div
                      className={`text-muted-foreground transition-colors ${social.color}`}
                    >
                      {social.icon}
                    </div>
                    <div>
                      <div className="font-medium">{social.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {social.username}
                      </div>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <h4 className="text-xl font-semibold">Quick Actions</h4>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a
                    href="https://calendly.com/contact-pawan62"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Coffee className="w-4 h-4 mr-2" />
                    Schedule a Coffee Chat
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a
                    href="https://wa.me/918602236251"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp Message
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a
                    href="https://calendly.com/contact-pawan62"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book a Meeting
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="bg-gradient-secondary border-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-semibold mb-2">Quick Response</h4>
                <p className="text-sm text-muted-foreground">
                  I typically respond to emails within 24 hours. For urgent
                  matters, feel free to call or WhatsApp.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;