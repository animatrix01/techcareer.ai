"use client";

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#ECECEC]">
      {/* Toolbar Skeleton */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="h-8 w-24 bg-slate-200 rounded animate-pulse" />
            <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-slate-200 rounded animate-pulse" />
            <div className="h-8 w-20 bg-slate-200 rounded animate-pulse" />
            <div className="h-8 w-8 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-slate-200 rounded animate-pulse" />
            <div className="h-8 w-28 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col items-center justify-center pt-16 pb-16 px-4">
        {/* Loading Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-slate-600">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-600 border-t-transparent" />
            <span className="text-sm font-medium">Preparing Preview...</span>
          </div>
        </div>

        {/* Paper Skeleton */}
        <div className="relative">
          <div 
            className="bg-white shadow-2xl rounded-lg p-12 animate-pulse"
            style={{
              width: "794px", // A4 width
              height: "1123px", // A4 height
              maxWidth: "90vw",
              maxHeight: "80vh",
            }}
          >
            {/* Header Skeleton */}
            <div className="space-y-4 mb-8">
              <div className="h-8 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="h-4 bg-slate-200 rounded w-1/3" />
            </div>

            {/* Section Skeletons */}
            {[1, 2, 3, 4].map((section) => (
              <div key={section} className="mb-8">
                <div className="h-6 bg-slate-200 rounded w-1/4 mb-4" />
                <div className="space-y-2">
                  <div className="h-4 bg-slate-100 rounded w-full" />
                  <div className="h-4 bg-slate-100 rounded w-5/6" />
                  <div className="h-4 bg-slate-100 rounded w-4/6" />
                </div>
              </div>
            ))}
          </div>

          {/* Page Counter Skeleton */}
          <div className="absolute -top-6 right-0">
            <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}