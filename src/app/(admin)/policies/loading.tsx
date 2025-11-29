import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function PoliciesLoading() {
  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 animate-pulse">
      {/* Header with button and filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-4 w-72" />
          </div>
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-full flex-shrink-0" />
          ))}
        </div>
      </div>

      {/* Table Skeleton */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <div className="p-6 space-y-4 min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-7 gap-4 pb-4 border-b">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Table Rows */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="grid grid-cols-7 gap-4 py-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
