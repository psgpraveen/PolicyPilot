"use client";

import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-gradient-to-r from-muted/30 to-muted/10 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              PolicyPilot
            </span>
            <span>©</span>
            <span>{new Date().getFullYear()}</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">All rights reserved</span>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
            <span>by PolicyPilot Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
