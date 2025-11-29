"use client";

import { useState, useTransition, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { ClientFormSheet } from "./components/client-form-sheet";
import { ClientsTable } from "./components/clients-table";
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog";
import { TableSkeleton } from "@/components/loading-states";
import { useToast } from "@/hooks/use-toast";
import { deleteClient } from "@/lib/actions";
import { fetchClients } from "@/lib/api-client";
import type { Client } from "@/lib/definitions";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    const data = await fetchClients();
    setClients(data);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  const handleAdd = () => {
    setSelectedClient(null);
    setFormOpen(true);
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setFormOpen(true);
  };

  const handleDelete = (client: Client) => {
    setSelectedClient(client);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedClient) return;

    startTransition(async () => {
      const result = await deleteClient(selectedClient.id);
      if (result.success) {
        toast({
          title: "Success",
          description: "Client deleted successfully.",
        });
        setDeleteDialogOpen(false);
        setSelectedClient(null);
        loadClients(true);
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
      loadClients(true);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader title="Clients" description="Manage your clients.">
        <Button
          onClick={handleAdd}
          className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-md hover:shadow-lg transition-all">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </PageHeader>

      {isLoading ? (
        <TableSkeleton rows={5} />
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
          <ClientsTable
            data={clients}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      <ClientFormSheet
        isOpen={isFormOpen}
        onOpenChange={handleFormClose}
        client={selectedClient}
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
