"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Users,
  FolderKanban,
  LogOut,
  ShieldCheck,
  LayoutDashboard,
  Menu,
  X,
  Info,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/policies", icon: FileText, label: "Policies" },
  { href: "/clients", icon: Users, label: "Clients" },
  { href: "/categories", icon: FolderKanban, label: "Categories" },
  { href: "/about", icon: Info, label: "About" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-background border shadow-lg hover:bg-muted transition-colors"
        aria-label="Toggle menu">
        {isMobileOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 border-r bg-gradient-to-b from-background to-muted/20 shadow-lg transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center gap-2 border-b px-6 bg-gradient-to-r from-primary/10 to-purple-500/10">
            <div className="bg-gradient-to-br from-primary to-purple-600 p-2 rounded-lg shadow-md">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              PolicyPilot
            </h1>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 relative overflow-hidden group",
                    isActive
                      ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/50 scale-105"
                      : "text-muted-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-600/10 hover:text-foreground hover:scale-102 hover:shadow-md"
                  )}>
                  {!isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                  <item.icon
                    className={cn(
                      "h-4 w-4 relative z-10",
                      isActive && "animate-pulse"
                    )}
                  />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t p-4 bg-muted/30">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-auto p-3 hover:bg-muted/50 rounded-xl transition-all">
                  <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                    <AvatarImage src="https://psgpraveen.me/_next/image?url=%2Fimg%2Fpraveen.jpg&w=96&q=75" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white font-semibold">
                      PK
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold">Praveen Kumar</p>
                    <p className="text-xs text-muted-foreground">
                      psgpraveen0804@gmail.com
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <form action={logout}>
                  <DropdownMenuItem asChild>
                    <button type="submit" className="w-full cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </DropdownMenuItem>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
    </>
  );
}
