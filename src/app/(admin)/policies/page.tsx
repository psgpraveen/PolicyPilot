"use client";

import { useState, useEffect } from "react";
import { fetchPolicies, fetchClients, fetchCategories } from "@/lib/api-client";
import { PoliciesClientPage } from "./components/policies-client-page";
import { TableSkeleton } from "@/components/loading-states";
import type { Policy, Client, Category } from "@/lib/definitions";

function getPoliciesWithDetails(
  policies: Policy[],
  clients: Client[],
  categories: Category[]
) {
  const clientMap = new Map(clients.map((c) => [c.id, c.name]));
  const categoryMap = new Map(categories.map((c) => [c.id, c.name]));

  return policies.map((policy) => ({
    ...policy,
    clientName: clientMap.get(policy.clientId) || "Unknown Client",
    categoryName: categoryMap.get(policy.categoryId) || "Unknown Category",
  }));
}

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    const [policiesData, clientsData, categoriesData] = await Promise.all([
      fetchPolicies(),
      fetchClients(),
      fetchCategories(),
    ]);
    setPolicies(policiesData);
    setClients(clientsData);
    setCategories(categoriesData);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <TableSkeleton rows={8} />
      </div>
    );
  }

  const policiesWithDetails = getPoliciesWithDetails(
    policies,
    clients,
    categories
  );

  return (
    <PoliciesClientPage
      policies={policiesWithDetails}
      clients={clients}
      categories={categories}
      onUpdate={() => loadData(true)}
      isRefreshing={isRefreshing}
    />
  );
}
