export type ServiceData = {
  slug: string;
  title: string;
  heroSubtitle: string;
  overview: string;
  techStack: string[];
  idealFor: string[];
  benefits: {
    title: string;
    desc: string;
  }[];
  whyChoose: string[];
  ctaTitle: string;
  ctaDescription: string;
};

export const servicesData: Record<string, ServiceData> = {
  "ai-automation": {
    slug: "ai-automation",
    title: "AI Automation Solutions",
    heroSubtitle: "Intelligence that Scales with Your Business",
    overview: "We implement cutting-edge AI workflows and LLMs to automate repetitive tasks and boost efficiency.",
    techStack: ["OpenAI", "Python", "LangChain", "Node.js"],
    idealFor: ["E-commerce", "SaaS Startups", "Logistics"],
    benefits: [
      { title: "Cost Reduction", desc: "Save up to 40% on operational costs." },
      { title: "24/7 Efficiency", desc: "Automated systems that never sleep." }
    ],
    whyChoose: ["Custom LLM Training", "Seamless Integration", "Future-proof Tech"],
    ctaTitle: "Automate Your Future",
    ctaDescription: "Let's build an intelligent system for your brand."
  },

  "web-apps": {
    slug: "web-apps",
    title: "Web App & Website Development",
    heroSubtitle: "High-Performance Digital Assets",
    overview: "Modern, fast, and SEO-optimized web applications built with Next.js for real business growth.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    idealFor: ["Corporate", "Marketplaces", "SaaS"],
    benefits: [
      { title: "Lightning Fast", desc: "Optimized for Core Web Vitals." },
      { title: "Scalable Architecture", desc: "Built to handle millions of users." }
    ],
    whyChoose: ["Modern UI/UX", "SEO-First Approach", "Fast Turnaround"],
    ctaTitle: "Build Your Website",
    ctaDescription: "Ready to scale your online presence?"
  },

  "mobile-apps": {
    slug: "mobile-apps",
    title: "Mobile App Development",
    heroSubtitle: "Native Experience on Every Screen",
    overview: "High-quality iOS and Android apps that offer smooth performance and great user experience.",
    techStack: ["React Native", "Expo", "Firebase", "Redux"],
    idealFor: ["FinTech", "Health & Fitness", "Service Delivery"],
    benefits: [
      { title: "Cross-Platform", desc: "One codebase for both iOS and Android." },
      { title: "Offline Support", desc: "Functions seamlessly without internet." }
    ],
    whyChoose: ["Native Performance", "User-Centric Design", "App Store Optimization"],
    ctaTitle: "Launch Your App",
    ctaDescription: "Turn your idea into a high-rating mobile app."
  },

  "saas-platforms": {
    slug: "saas-platforms",
    title: "SaaS Ecosystems",
    heroSubtitle: "Robust Multi-Tenant Platforms",
    overview: "Scalable software-as-a-service products with subscription and payment integrations built-in.",
    techStack: ["Next.js", "Stripe", "Clerk", "AWS"],
    idealFor: ["B2B Platforms", "Startups", "Enterprise Tools"],
    benefits: [
      { title: "Revenue Automation", desc: "Seamless Stripe subscription management." },
      { title: "Data Security", desc: "Enterprise-grade multi-tenant security." }
    ],
    whyChoose: ["Fast Time-to-Market", "Scalable Backend", "Auth Integration"],
    ctaTitle: "Start Your SaaS",
    ctaDescription: "Build a product that generates recurring revenue."
  },

  // ✅ YE MISSING THA - ADDED NOW
  "cloud-solutions": {
    slug: "cloud-solutions",
    title: "Cloud Infrastructure & DevOps",
    heroSubtitle: "Scalable, Secure, and High-Availability Systems",
    overview: "We architect robust cloud environments that ensure your applications are always online and lightning fast.",
    techStack: ["AWS", "Docker", "Kubernetes", "Terraform"],
    idealFor: ["High-Traffic Sites", "Enterprise Apps", "FinTech"],
    benefits: [
      { title: "99.9% Uptime", desc: "Rock-solid reliability for your mission-critical apps." },
      { title: "Auto-Scaling", desc: "Infrastructure that grows with your traffic." }
    ],
    whyChoose: ["DevOps Automation", "Cost Optimization", "Enhanced Security"],
    ctaTitle: "Optimize Your Cloud",
    ctaDescription: "Ready for a zero-downtime infrastructure?"
  }
};