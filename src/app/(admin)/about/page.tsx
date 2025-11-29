"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Globe,
  ExternalLink,
  Code2,
  Briefcase,
  Award,
  TrendingUp,
} from "lucide-react";
import { developerData, type DeveloperProject } from "@/lib/developer-data";

export default function AboutPage() {
  const [filter, setFilter] = useState<string>("All");

  const filteredProjects =
    filter === "All"
      ? developerData.projects
      : developerData.projects.filter(
          (p: DeveloperProject) => p.category === filter
        );

  const categories = ["All", "Web Development", "Frontend", "IoT"];

  return (
    <div className="space-y-8">
      <PageHeader
        title="About Developer"
        description="Meet the creator of PolicyPilot - A passionate full-stack developer building modern web solutions"
      />

      {/* Developer Profile Card */}
      <Card className="border-2 border-primary/20 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-transparent" />
        <CardContent className="relative p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary to-purple-600 p-1 shadow-2xl">
                <div className="h-full w-full rounded-full bg-background flex items-center justify-center text-4xl font-bold bg-gradient-to-br from-primary to-purple-600 bg-clip-text text-transparent">
                  PK
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {developerData.name}
                </h2>
                <p className="text-muted-foreground font-medium mt-1">
                  {developerData.title}
                </p>
              </div>

              <p className="text-foreground leading-relaxed">
                {developerData.bio}
              </p>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`mailto:${developerData.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  {developerData.email}
                </a>
                <a
                  href={`tel:${developerData.phone}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  {developerData.phone}
                </a>
                <a
                  href={developerData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Globe className="h-4 w-4" />
                  psgpraveen.me
                </a>
                <a
                  href={developerData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Github className="h-4 w-4" />
                  GitHub Profile
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-2 flex-wrap pt-2">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={developerData.github}
                    target="_blank"
                    rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={developerData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={developerData.website}
                    target="_blank"
                    rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Portfolio
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover-lift">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-2">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold">
              {developerData.stats.totalProjects}
            </div>
            <p className="text-sm text-muted-foreground">Total Projects</p>
          </CardContent>
        </Card>
        <Card className="hover-lift">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-2">
              <Code2 className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold">
              {developerData.stats.webProjects}
            </div>
            <p className="text-sm text-muted-foreground">Web Projects</p>
          </CardContent>
        </Card>
        <Card className="hover-lift">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-2">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold">
              {developerData.stats.iotProjects}
            </div>
            <p className="text-sm text-muted-foreground">IoT Projects</p>
          </CardContent>
        </Card>
        <Card className="hover-lift">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-2">
              <Award className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold">
              {developerData.stats.openSource}
            </div>
            <p className="text-sm text-muted-foreground">Open Source</p>
          </CardContent>
        </Card>
      </div>

      {/* Skills Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            Technical Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground">
              Frontend
            </h3>
            <div className="flex flex-wrap gap-2">
              {developerData.skills.frontend.map((skill: string) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground">
              Backend
            </h3>
            <div className="flex flex-wrap gap-2">
              {developerData.skills.backend.map((skill: string) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-green-50 text-green-700 hover:bg-green-100">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground">
              Other Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {developerData.skills.other.map((skill: string) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Featured Projects
          </CardTitle>
          <div className="flex gap-2 flex-wrap mt-4">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(cat)}
                className="text-xs">
                {cat}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project: DeveloperProject) => (
              <Card
                key={project.id}
                className="hover-lift group overflow-hidden">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech: string) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </a>
                    </Button>
                    {project.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.name} on GitHub`}
                          title="View source code">
                          <Github className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
