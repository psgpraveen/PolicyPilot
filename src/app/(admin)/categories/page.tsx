"use client";

import { useState, useTransition, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { CategoryFormDialog } from "./components/category-form-dialog";
import { CategoriesList } from "./components/categories-list";
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog";
import { CategoryGridSkeleton } from "@/components/loading-states";
import { useToast } from "@/hooks/use-toast";
import { deleteCategory } from "@/lib/actions";
import { fetchCategories } from "@/lib/api-client";
import type { Category } from "@/lib/definitions";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    const data = await fetchCategories();
    setCategories(data);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setFormOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setFormOpen(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedCategory) return;

    startTransition(async () => {
      const result = await deleteCategory(selectedCategory.id);
      if (result.success) {
        toast({
          title: "Success",
          description: "Category deleted successfully.",
        });
        setDeleteDialogOpen(false);
        setSelectedCategory(null);
        loadCategories(true);
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    });
  };

  const handleFormClose = (open: boolean) => {
    setFormOpen(open);
    if (!open) {
      loadCategories(true);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader
        title="Policy Categories"
        description="Manage the types of policies you offer.">
        <Button
          onClick={handleAdd}
          className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-md hover:shadow-lg transition-all">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </PageHeader>

      {isLoading ? (
        <CategoryGridSkeleton items={6} />
      ) : (
        <div className="relative">
          {isRefreshing && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-lg border">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span className="text-sm font-medium">Refreshing...</span>
              </div>
            </div>
          )}
          <CategoriesList
            data={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      <CategoryFormDialog
        isOpen={isFormOpen}
        onOpenChange={handleFormClose}
        category={selectedCategory}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        isPending={isPending}
      />
    </div>
  );
}
