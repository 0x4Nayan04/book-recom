export function LoadingSkeleton() {
  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white/60 dark:bg-black/60 rounded-3xl overflow-hidden"
        >
          <div className="h-64 bg-primary/10" />
          <div className="p-8 space-y-4">
            <div className="h-8 bg-primary/10 rounded-lg w-3/4" />
            <div className="h-4 bg-primary/10 rounded-lg w-1/2" />
            <div className="space-y-2">
              <div className="h-4 bg-primary/10 rounded-lg" />
              <div className="h-4 bg-primary/10 rounded-lg w-5/6" />
              <div className="h-4 bg-primary/10 rounded-lg w-4/6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 