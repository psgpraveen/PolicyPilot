"use client";

import { useState, useEffect } from "react";
import { fetchClients, fetchCategories, fetchPolicies } from "@/lib/api-client";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Users,
  FolderKanban,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  Calendar,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatCardSkeleton } from "@/components/loading-states";
import {
  differenceInDays,
  isBefore,
  format,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from "date-fns";
import type { Client, Category, Policy } from "@/lib/definitions";

export default function AdminDashboardPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [clientsData, categoriesData, policiesData] = await Promise.all([
      fetchClients(),
      fetchCategories(),
      fetchPolicies(),
    ]);
    setClients(clientsData);
    setCategories(categoriesData);
    setPolicies(policiesData);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <PageHeader
          title="Dashboard"
          description="Welcome back! Here's an overview of your policy management system."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      </div>
    );
  }

  const totalPolicies = policies.length;
  const today = new Date();

  const activePolicies = policies.filter(
    (p) => !isBefore(p.expiryDate, today)
  ).length;

  const expiredPolicies = totalPolicies - activePolicies;

  const expiringSoon = policies.filter((p) => {
    const daysUntilExpiry = differenceInDays(p.expiryDate, today);
    return daysUntilExpiry > 0 && daysUntilExpiry <= 30;
  }).length;

  const expiringThisWeek = policies.filter((p) => {
    const daysUntilExpiry = differenceInDays(p.expiryDate, today);
    return daysUntilExpiry > 0 && daysUntilExpiry <= 7;
  }).length;

  const totalValue = policies.reduce((sum, p) => sum + p.amount, 0);
  const activeValue = policies
    .filter((p) => !isBefore(p.expiryDate, today))
    .reduce((sum, p) => sum + p.amount, 0);

  const thisMonthPolicies = policies.filter((p) =>
    isWithinInterval(p.issueDate, {
      start: startOfMonth(today),
      end: endOfMonth(today),
    })
  ).length;

  const averagePolicyValue = totalPolicies > 0 ? totalValue / totalPolicies : 0;

  const policiesByCategory = categories
    .map((cat) => ({
      name: cat.name,
      count: policies.filter((p) => p.categoryId === cat.id).length,
      value: policies
        .filter((p) => p.categoryId === cat.id)
        .reduce((sum, p) => sum + p.amount, 0),
    }))
    .sort((a, b) => b.count - a.count);

  const topCategory = policiesByCategory[0] || { name: "N/A", count: 0 };

  const recentPolicies = [...policies]
    .sort(
      (a, b) =>
        new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
    )
    .slice(0, 5);

  const clientsWithPolicies = clients.filter((c) =>
    policies.some((p) => p.clientId === c.id)
  ).length;

  const clientsWithoutPolicies = clients.length - clientsWithPolicies;

  const stats = [
    {
      title: "Total Clients",
      value: clients.length,
      icon: Users,
      description: `${clientsWithPolicies} with active policies`,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: clientsWithPolicies > 0 ? "up" : "neutral",
      trendValue:
        clientsWithPolicies > 0
          ? `${Math.round((clientsWithPolicies / clients.length) * 100)}%`
          : "0%",
    },
    {
      title: "Total Policies",
      value: totalPolicies,
      icon: FileText,
      description: `${activePolicies} active, ${expiredPolicies} expired`,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: activePolicies > expiredPolicies ? "up" : "down",
      trendValue: `${thisMonthPolicies} this month`,
    },
    {
      title: "Categories",
      value: categories.length,
      icon: FolderKanban,
      description: `${topCategory.name} is most popular`,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "neutral",
      trendValue: `${topCategory.count} policies`,
    },
    {
      title: "Total Value",
      value: `$${(totalValue / 1000).toFixed(1)}K`,
      icon: DollarSign,
      description: `Avg: $${averagePolicyValue.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      })}`,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "up",
      trendValue: `$${(activeValue / 1000).toFixed(1)}K active`,
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8 animate-in fade-in duration-700">
      <PageHeader
        title="Dashboard"
        description="Real-time overview of your policy management system with comprehensive analytics"
      />

      {/* Main Stats Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon =
            stat.trend === "up"
              ? ArrowUpRight
              : stat.trend === "down"
              ? ArrowDownRight
              : Activity;

          return (
            <Card
              key={stat.title}
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover-lift group"
              style={{
                animationDelay: `${index * 100}ms`,
              }}>
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold tracking-tight">
                      {stat.value}
                    </h3>
                    {stat.trend !== "neutral" && (
                      <span
                        className={`flex items-center text-xs font-medium ${
                          stat.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}>
                        <TrendIcon className="h-3 w-3 mr-0.5" />
                        {stat.trendValue}
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className={`${stat.bgColor} p-3 rounded-xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent className="relative z-10 pb-4">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alerts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {expiringSoon > 0 && (
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-amber-900">
                      Expiring Soon
                    </CardTitle>
                    <p className="text-xs text-amber-700 mt-0.5">
                      Requires attention
                    </p>
                  </div>
                </div>
                <Badge
                  variant="warning"
                  className="shadow-sm text-base px-3 py-1">
                  {expiringSoon}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-amber-800 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Expiring this week
                  </span>
                  <span className="font-semibold text-amber-900">
                    {expiringThisWeek}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-amber-800 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Expiring within 30 days
                  </span>
                  <span className="font-semibold text-amber-900">
                    {expiringSoon}
                  </span>
                </div>
                <a
                  href="/policies"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-purple-600 transition-colors mt-2">
                  View policies
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <CardTitle className="text-lg text-emerald-900">
                    Active Policies
                  </CardTitle>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Currently valid
                  </p>
                </div>
              </div>
              <Badge className="bg-emerald-600 hover:bg-emerald-700 shadow-sm text-base px-3 py-1">
                {activePolicies}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-800 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Total active value
                </span>
                <span className="font-semibold text-emerald-900">
                  ${(activeValue / 1000).toFixed(1)}K
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-800 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Coverage rate
                </span>
                <span className="font-semibold text-emerald-900">
                  {totalPolicies > 0
                    ? Math.round((activePolicies / totalPolicies) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {expiredPolicies > 0 && (
          <Card className="border-red-200 bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-red-900">
                      Expired Policies
                    </CardTitle>
                    <p className="text-xs text-red-700 mt-0.5">Need renewal</p>
                  </div>
                </div>
                <Badge
                  variant="destructive"
                  className="shadow-sm text-base px-3 py-1">
                  {expiredPolicies}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-800">
                {expiredPolicies}{" "}
                {expiredPolicies === 1 ? "policy has" : "policies have"} expired
                and may need renewal or archival.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Detailed Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Category Breakdown */}
        <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FolderKanban className="h-5 w-5 text-purple-600" />
              Top Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            {policiesByCategory.length > 0 ? (
              <div className="space-y-3">
                {policiesByCategory.slice(0, 5).map((cat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{cat.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ${(cat.value / 1000).toFixed(1)}K value
                      </p>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {cat.count}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No categories yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Client Statistics */}
        <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Client Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
              <span className="text-sm font-medium text-blue-900">
                With Policies
              </span>
              <span className="text-lg font-bold text-blue-600">
                {clientsWithPolicies}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm font-medium">Without Policies</span>
              <span className="text-lg font-bold text-muted-foreground">
                {clientsWithoutPolicies}
              </span>
            </div>
            {clients.length > 0 && (
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Engagement Rate</span>
                  <span className="font-semibold">
                    {Math.round((clientsWithPolicies / clients.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-500 engagement-bar"
                    data-width={(clientsWithPolicies / clients.length) * 100}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              Recent Policies
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentPolicies.length > 0 ? (
              <div className="space-y-3">
                {recentPolicies.map((policy, idx) => (
                  <div
                    key={policy.id}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {policy.policyName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(policy.issueDate), "MMM dd, yyyy")}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-green-600">
                      ${(policy.amount / 1000).toFixed(1)}K
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No policies yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Policy Status Summary */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Policy Portfolio Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-xl bg-green-50 border border-green-200">
              <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-700">
                {activePolicies}
              </p>
              <p className="text-xs text-green-600 font-medium uppercase tracking-wide">
                Active
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-amber-50 border border-amber-200">
              <Clock className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-amber-700">
                {expiringSoon}
              </p>
              <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">
                Expiring Soon
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-red-50 border border-red-200">
              <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-700">
                {expiredPolicies}
              </p>
              <p className="text-xs text-red-600 font-medium uppercase tracking-wide">
                Expired
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-blue-50 border border-blue-200">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-700">
                {totalPolicies}
              </p>
              <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">
                Total
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
