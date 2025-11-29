export interface DeveloperProject {
  id: number;
  name: string;
  description: string;
  category: string;
  technologies: string[];
  url: string;
  github?: string;
}

export interface DeveloperData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;
  stats: {
    totalProjects: number;
    webProjects: number;
    iotProjects: number;
    openSource: number;
  };
  skills: {
    frontend: string[];
    backend: string[];
    other: string[];
  };
  projects: DeveloperProject[];
}

export const developerData: DeveloperData = {
  name: "Praveen Kumar Gupta",
  title: "Full Stack Developer | Technophile | Mechatronician | Innovator | Automator | Techie",
  bio: "🚀 Crafting professional websites and web applications for clients worldwide. Specializing in custom solutions using Next.js, React, and modern technologies with responsive design and SEO optimization. Working remotely to transform your digital vision into reality.",
  email: "psgpraveen0804@gmail.com",
  phone: "+91 7985942726",
  website: "https://psgpraveen.me",
  github: "https://github.com/psgpraveen",
  linkedin: "https://www.linkedin.com/in/psgpraveen",
  
  stats: {
    totalProjects: 11,
    webProjects: 6,
    iotProjects: 3,
    openSource: 7,
  },
  
  skills: {
    frontend: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Responsive Design",
      "UI/UX",
      "SEO",
    ],
    backend: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "SQL",
      "Firebase",
      "REST API",
      "Socket.io",
      "WebRTC",
    ],
    other: [
      "Git",
      "GitHub",
      "VS Code",
      "IoT",
      "Arduino",
      "C++",
      "Electronics",
      "API Integration",
    ],
  },
  
  projects: [
    {
      id: 1,
      name: "Linktree Clone",
      description: "A fully responsive Linktree clone with custom animations and theme options.",
      category: "Web Development",
      technologies: ["Next.js", "React", "Tailwind CSS"],
      url: "https://linktree-psgpraveen.vercel.app/",
      github: "https://github.com/psgpraveen/Linktree",
    },
    {
      id: 2,
      name: "Bulk Email Sender",
      description: "A web application for sending personalized bulk emails with analytics and scheduling features.",
      category: "Web Development",
      technologies: ["Next.js", "Node.js", "MongoDB"],
      url: "https://bulkemails.vercel.app/",
    },
    {
      id: 3,
      name: "Form Builder",
      description: "Create custom forms with drag-and-drop interface, validation rules, and response analytics.",
      category: "Web Development",
      technologies: ["React", "TypeScript", "Firebase"],
      url: "https://forms-creater.vercel.app/",
      github: "https://github.com/psgpraveen/FormBuilder",
    },
    {
      id: 4,
      name: "Movies Blocks",
      description: "Modern movie catalog with dynamic sorting, filtering, and responsive grid layout.",
      category: "Frontend",
      technologies: ["JavaScript", "CSS3", "HTML5"],
      url: "https://psgpraveen.github.io/Movies-Blocks/",
      github: "https://github.com/psgpraveen/Movies-Blocks.git",
    },
    {
      id: 5,
      name: "E-Commerce Website",
      description: "A responsive e-commerce platform with product filtering, cart functionality, and payment integration.",
      category: "Web Development",
      technologies: ["JavaScript", "CSS3", "HTML5"],
      url: "https://psgpraveen.github.io/E-commerce-website-/",
      github: "https://github.com/psgpraveen/E-commerce-website-.git",
    },
    {
      id: 6,
      name: "News Hub",
      description: "Real-time news aggregator with customizable categories and social sharing.",
      category: "Frontend",
      technologies: ["JavaScript", "API Integration", "Responsive Design"],
      url: "https://psgpraveen.github.io/News-Hub/",
      github: "https://github.com/psgpraveen/News-Hub.git",
    },
    {
      id: 7,
      name: "Live Chat",
      description: "Real-time messaging platform with typing indicators, read receipts, and media sharing.",
      category: "Web Development",
      technologies: ["Socket.io", "Node.js", "Express"],
      url: "https://psgpraveen.github.io/chat/",
      github: "https://github.com/psgpraveen/chat.git",
    },
    {
      id: 8,
      name: "Video Conferencing",
      description: "High-quality video conferencing solution with screen sharing and recording capabilities.",
      category: "Web Development",
      technologies: ["WebRTC", "JavaScript", "CSS3"],
      url: "https://psgpraveen.github.io/video_/",
      github: "https://github.com/psgpraveen/video_.git/",
    },
    {
      id: 9,
      name: "Robotic Arm",
      description: "IoT-based robotic arm with precision control and programmable movement patterns.",
      category: "IoT",
      technologies: ["Arduino", "C++", "Electronics"],
      url: "https://psgpraveen.me/ROBO",
    },
    {
      id: 10,
      name: "Tesla Coil",
      description: "Wireless electricity transmission project based on Tesla's principles for educational demonstrations.",
      category: "IoT",
      technologies: ["Electronics", "Physics", "Power Systems"],
      url: "https://psgpraveen.me/Tesla",
    },
    {
      id: 11,
      name: "Smart Street Light",
      description: "Energy-efficient street lighting system with ambient light sensing and motion detection.",
      category: "IoT",
      technologies: ["Arduino", "Sensors", "Automation"],
      url: "https://psgpraveen.me/Ldr",
    },
  ],
};
