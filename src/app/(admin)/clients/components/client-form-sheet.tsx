"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useTransition } from "react";
import { Loader } from "@/components/ui/loader";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ClientSchema } from "@/lib/schemas";
import { createClient, updateClient } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import type { Client } from "@/lib/definitions";

type ClientFormSheetProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  client?: Client | null;
};

export function ClientFormSheet({
  isOpen,
  onOpenChange,
  client,
}: ClientFormSheetProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const isEditMode = !!client;

  const form = useForm<z.infer<typeof ClientSchema>>({
    resolver: zodResolver(ClientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (client) {
      form.reset({
        name: client.name,
        email: client.email,
        phone: client.phone,
      });
    } else {
      form.reset({
        name: "",
        email: "",
        phone: "",
      });
    }
  }, [client, form]);

  const onSubmit = (values: z.infer<typeof ClientSchema>) => {
    startTransition(async () => {
      const result = isEditMode
        ? await updateClient(client.id, values)
        : await createClient(values);

      if (result.success) {
        toast({
          title: "Success",
          description: `Client ${
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
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {isEditMode ? "Edit Client" : "Add a New Client"}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="123-456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4">
              <SheetClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto">
                  Cancel
                </Button>
              </SheetClose>
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
                  "Create Client"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
