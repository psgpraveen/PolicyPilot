import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b-2 border-gradient-to-r from-primary/20 to-purple-600/20 animate-in slide-in-from-top duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent animate-gradient">
          {title}
        </h1>
        {description && (
          <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex-shrink-0 w-full sm:w-auto animate-in slide-in-from-right duration-500">
          {children}
        </div>
      )}
    </div>
  );
}
