"use client";

import { useState, useTransition, useMemo } from "react";
import { PlusCircle, Search } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { deletePolicy } from "@/lib/actions";
import type { Policy, Client, Category } from "@/lib/definitions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PoliciesTable } from "./policies-table";
import { PolicyFormSheet } from "./policy-form-sheet";
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog";

type EnrichedPolicy = Policy & { clientName: string; categoryName: string };

type PoliciesClientPageProps = {
  policies: EnrichedPolicy[];
  clients: Client[];
  categories: Category[];
  onUpdate?: () => void;
  isRefreshing?: boolean;
};

export function PoliciesClientPage({
  policies,
  clients,
  categories,
  onUpdate,
  isRefreshing = false,
}: PoliciesClientPageProps) {
  const [isFormSheetOpen, setFormSheetOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [clientFilter, setClientFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  // Filter and search policies
  const filteredPolicies = useMemo(() => {
    return policies.filter((policy) => {
      const matchesSearch =
        searchQuery === "" ||
        policy.policyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesClient =
        clientFilter === "all" || policy.clientId === clientFilter;

      const matchesCategory =
        categoryFilter === "all" || policy.categoryId === categoryFilter;

      return matchesSearch && matchesClient && matchesCategory;
    });
  }, [policies, searchQuery, clientFilter, categoryFilter]);

  const handleAdd = () => {
    setSelectedPolicy(null);
    setFormSheetOpen(true);
  };

  const handleEdit = (policy: Policy) => {
    setSelectedPolicy(policy);
    setFormSheetOpen(true);
  };

  const handleDelete = (policy: Policy) => {
    setSelectedPolicy(policy);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedPolicy) return;

    startTransition(async () => {
      const result = await deletePolicy(selectedPolicy.id);
      if (result.success) {
        toast({
          title: "Success",
          description: "Policy deleted successfully.",
        });
        setDeleteDialogOpen(false);
        setSelectedPolicy(null);
        onUpdate?.();
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
    setFormSheetOpen(open);
    if (!open && onUpdate) {
      onUpdate();
    }
  };

  return (
    <>
      <PageHeader
        title="Policies"
        description="Manage your insurance policies.">
        <Button
          onClick={handleAdd}
          className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-md hover:shadow-lg transition-all">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Policy
        </Button>
      </PageHeader>

      <Card className="border-0 shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-3 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search policies, clients, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-muted-foreground/20 focus:border-primary"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Select value={clientFilter} onValueChange={setClientFilter}>
                <SelectTrigger className="w-full border-muted-foreground/20">
                  <SelectValue placeholder="All Clients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full border-muted-foreground/20">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-4 text-sm text-muted-foreground">
            Showing {filteredPolicies.length} of {policies.length} policies
          </div>

          <div className="relative">
            {isRefreshing && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-lg border">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <span className="text-sm font-medium">Refreshing...</span>
                </div>
              </div>
            )}
            <PoliciesTable
              data={filteredPolicies}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </CardContent>
      </Card>

      <PolicyFormSheet
        isOpen={isFormSheetOpen}
        onOpenChange={handleFormClose}
        policy={selectedPolicy}
        clients={clients}
        categories={categories}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        isPending={isPending}
      />
    </>
  );
}
