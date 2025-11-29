"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useTransition } from "react";
import { Loader } from "@/components/ui/loader";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CategorySchema } from "@/lib/schemas";
import { createCategory, updateCategory } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import type { Category } from "@/lib/definitions";

type CategoryFormDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  category?: Category | null;
};

export function CategoryFormDialog({
  isOpen,
  onOpenChange,
  category,
}: CategoryFormDialogProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const isEditMode = !!category;

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (category) {
      form.reset({ name: category.name });
    } else {
      form.reset({ name: "" });
    }
  }, [category, form]);

  const onSubmit = (values: z.infer<typeof CategorySchema>) => {
    startTransition(async () => {
      const result = isEditMode
        ? await updateCategory(category.id, values)
        : await createCategory(values);

      if (result.success) {
        toast({
          title: "Success",
          description: `Category ${
            isEditMode ? "updated" : "created"
          } successfully.`,
        });
        onOpenChange(false);
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Category" : "Add a New Category"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Health Insurance, Auto Insurance"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter a descriptive name for this policy category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-2 sm:gap-0">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto">
                {isPending ? (
                  <>
                    <Loader className="mr-2" size={16} />
                    {isEditMode ? "Saving..." : "Creating..."}
                  </>
                ) : isEditMode ? (
                  "Save Changes"
                ) : (
                  "Create Category"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
