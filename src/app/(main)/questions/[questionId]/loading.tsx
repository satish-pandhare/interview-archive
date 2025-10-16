import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Clock, User } from "lucide-react";

// Skeleton component for loading states
const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-muted ${className}`}
      {...props}
    />
  );
};

export default function QuestionPageSkeleton() {
  return (
    <div className="w-full min-h-screen p-4">
      <div className="mx-auto space-y-6 max-w-7xl mt-12">
        {/* Main Question Card Skeleton */}
        <Card className="shadow-sm w-full">
          <CardHeader className="space-y-4">
            {/* Title Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-8 md:h-10 lg:h-12 w-3/4" />
              {/* Tags Skeleton */}
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-14" />
              </div>
            </div>
            <Separator />
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Question Content Skeleton */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                Question
              </h2>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>

            <Separator />

            {/* Creator Information Skeleton */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                Created By
              </h3>

              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Timestamps Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <CalendarDays className="h-4 w-4" />
                  Created
                </div>
                <Skeleton className="h-4 w-24 ml-6" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Clock className="h-4 w-4" />
                  Last Updated
                </div>
                <Skeleton className="h-4 w-24 ml-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information Card Skeleton */}
        <Card className="shadow-sm w-full">
          <CardHeader>
            <h3 className="text-lg font-semibold">Additional Information</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 text-sm">
              <div>
                <span className="font-medium text-foreground">
                  Question ID:
                </span>
                <Skeleton className="h-3 w-full mt-1" />
              </div>

              <div>
                <span className="font-medium text-foreground">Role:</span>
                <Skeleton className="h-3 w-20 mt-1" />
              </div>

              <div>
                <span className="font-medium text-foreground">Company:</span>
                <Skeleton className="h-3 w-24 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Component Skeleton */}
        <Card className="shadow-sm w-full">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>

        {/* Answers Section Skeleton */}
        <Card className="shadow-sm w-full">
          <CardHeader>
            <div className="flex gap-4 items-center">
              <h3 className="text-lg font-semibold">Answers</h3>
              <Skeleton className="h-8 w-24" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Answer Card Skeletons */}
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="border-muted">
                <CardContent className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex-1 w-full">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 mt-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-3 w-16 mt-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
