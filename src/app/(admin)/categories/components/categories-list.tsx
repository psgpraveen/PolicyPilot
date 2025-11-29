"use client";

import { FolderKanban, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Category } from "@/lib/definitions";

type CategoriesListProps = {
  data: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

export function CategoriesList({
  data,
  onEdit,
  onDelete,
}: CategoriesListProps) {
  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
      <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-purple-500/5">
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-purple-600 shadow-md">
            <FolderKanban className="h-4 w-4 text-white" />
          </div>
          <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Policy Categories
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.map((category) => (
              <div
                key={category.id}
                className="group relative flex items-center justify-between gap-2 p-4 rounded-xl border-2 bg-gradient-to-br from-card to-card/50 hover:from-primary/5 hover:to-purple-500/5 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-purple-600/10 group-hover:from-primary/20 group-hover:to-purple-600/20 transition-colors">
                    <FolderKanban className="h-4 w-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="font-semibold truncate group-hover:text-primary transition-colors">
                    {category.name}
                  </span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onEdit(category)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => onDelete(category)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-4 animate-in fade-in duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-600/10 border-2 border-dashed border-primary/30">
                <FolderKanban className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div className="text-center space-y-1">
              <p className="text-base font-semibold text-muted-foreground">
                No categories found
              </p>
              <p className="text-sm text-muted-foreground/70">
                Create your first category using the button above to get started
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
