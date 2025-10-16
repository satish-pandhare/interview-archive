import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex items-baseline justify-between">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                <Skeleton className="h-4 w-24" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Skeleton className="h-8 w-20" />
              <div className="mt-2">
                <Skeleton className="h-3 w-28" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base md:text-lg">
            <Skeleton className="h-5 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Skeleton className="h-28 w-full" />
          <div className="mt-3 flex justify-between">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-24" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
