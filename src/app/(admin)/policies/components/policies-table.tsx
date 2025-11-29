import { format, isAfter, isBefore, differenceInDays } from "date-fns";
import {
  MoreHorizontal,
  FileText,
  Download,
  Calendar,
  DollarSign,
  User,
  FolderKanban,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Policy, Client, Category } from "@/lib/definitions";

type EnrichedPolicy = Policy & { clientName: string; categoryName: string };

type PoliciesTableProps = {
  data: EnrichedPolicy[];
  onEdit: (policy: Policy) => void;
  onDelete: (policy: Policy) => void;
};

function getPolicyStatus(expiryDate: Date) {
  const today = new Date();
  const daysUntilExpiry = differenceInDays(expiryDate, today);

  if (isBefore(expiryDate, today)) {
    return { label: "Expired", variant: "destructive" as const };
  } else if (daysUntilExpiry <= 30) {
    return { label: "Expiring Soon", variant: "warning" as const };
  } else {
    return { label: "Active", variant: "success" as const };
  }
}

export function PoliciesTable({ data, onEdit, onDelete }: PoliciesTableProps) {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div>
      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-lg border-2 border-border/50 overflow-hidden shadow-lg bg-card/50">
        <div className="overflow-x-auto scrollbar-thin">
          <Table className="min-w-[800px]">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[180px]">Policy Name</TableHead>
                <TableHead className="min-w-[150px]">Client</TableHead>
                <TableHead className="min-w-[130px]">Category</TableHead>
                <TableHead className="min-w-[120px]">Issue Date</TableHead>
                <TableHead className="min-w-[120px]">Expiry Date</TableHead>
                <TableHead className="min-w-[120px]">Status</TableHead>
                <TableHead className="text-right min-w-[120px]">
                  Amount
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.map((policy) => {
                  const status = getPolicyStatus(policy.expiryDate);
                  return (
                    <TableRow key={policy.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {policy.policyName}
                        </div>
                      </TableCell>
                      <TableCell>{policy.clientName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{policy.categoryName}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(policy.issueDate, "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(policy.expiryDate, "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {currencyFormatter.format(policy.amount)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={() => onEdit(policy)}>
                              Edit Policy
                            </DropdownMenuItem>
                            {policy.attachmentUrl && (
                              <DropdownMenuItem asChild>
                                <a
                                  href={`${process.env.NEXT_PUBLIC_API_URL}${policy.attachmentUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download Attachment
                                </a>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onSelect={() => onDelete(policy)}
                              className="text-destructive focus:text-destructive">
                              Delete Policy
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 animate-in fade-in duration-500">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                        <FileText className="h-10 w-10 text-primary/70 relative" />
                      </div>
                      <div>
                        <p className="font-semibold text-muted-foreground">
                          No policies found
                        </p>
                        <p className="text-sm text-muted-foreground/70 mt-1">
                          Add your first policy to get started
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden space-y-4">
        {data.length > 0 ? (
          data.map((policy) => {
            const status = getPolicyStatus(policy.expiryDate);
            return (
              <Card
                key={policy.id}
                className="overflow-hidden border-2 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-base truncate">
                          {policy.policyName}
                        </p>
                        <Badge variant={status.variant} className="mt-1">
                          {status.label}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="-mr-2 flex-shrink-0">
                          <MoreHorizontal className="h-5 w-5" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={() => onEdit(policy)}>
                          Edit Policy
                        </DropdownMenuItem>
                        {policy.attachmentUrl && (
                          <DropdownMenuItem asChild>
                            <a
                              href={`${process.env.NEXT_PUBLIC_API_URL}${policy.attachmentUrl}`}
                              target="_blank"
                              rel="noopener noreferrer">
                              <Download className="mr-2 h-4 w-4" />
                              Download Attachment
                            </a>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onSelect={() => onDelete(policy)}
                          className="text-destructive focus:text-destructive">
                          Delete Policy
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="truncate">{policy.clientName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FolderKanban className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <Badge variant="outline" className="truncate">
                        {policy.categoryName}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span>
                        Issue: {format(policy.issueDate, "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span>
                        Expiry: {format(policy.expiryDate, "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium col-span-1 sm:col-span-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span>{currencyFormatter.format(policy.amount)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-12 border-2 border-border/50 rounded-lg">
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <FileText className="h-10 w-10 text-primary/70 relative" />
              </div>
              <div>
                <p className="font-semibold text-muted-foreground">
                  No policies found
                </p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Add your first policy to get started
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
