export function LinkSkeleton() {
  return (
    <div className="bg-[#273469] rounded-lg p-4 border border-[rgba(228,217,255,0.1)] space-y-3 animate-pulse">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-[#1e2749] rounded w-2/3"></div>
          <div className="h-3 bg-[#1e2749] rounded w-full"></div>
        </div>
        <div className="h-8 w-8 bg-[#1e2749] rounded"></div>
      </div>
      <div className="flex gap-1.5">
        <div className="h-6 bg-[#1e2749] rounded w-20"></div>
        <div className="h-6 bg-[#1e2749] rounded w-20"></div>
        <div className="h-6 bg-[#1e2749] rounded w-24"></div>
      </div>
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="bg-[#273469] rounded-lg p-4 border border-[rgba(228,217,255,0.1)] text-center space-y-2 animate-pulse">
      <div className="w-5 h-5 mx-auto bg-[#1e2749] rounded"></div>
      <div className="h-6 bg-[#1e2749] rounded w-8 mx-auto"></div>
      <div className="h-3 bg-[#1e2749] rounded w-16 mx-auto"></div>
    </div>
  );
}

export function WorkspaceSkeleton() {
  return (
    <div className="bg-[#273469] rounded-lg p-5 border border-[rgba(228,217,255,0.1)] space-y-4 animate-pulse">
      <div className="space-y-2">
        <div className="h-5 bg-[#1e2749] rounded w-1/2"></div>
        <div className="h-3 bg-[#1e2749] rounded w-1/3"></div>
      </div>
      <div className="space-y-3">
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <div className="h-4 bg-[#1e2749] rounded w-20"></div>
            <div className="h-4 bg-[#1e2749] rounded w-10"></div>
          </div>
          <div className="h-1.5 bg-[#1e2749] rounded-full"></div>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <div className="h-4 bg-[#1e2749] rounded w-20"></div>
            <div className="h-4 bg-[#1e2749] rounded w-10"></div>
          </div>
          <div className="h-1.5 bg-[#1e2749] rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
