export default function LoadingSkeleton() {
  return (
    <div className="space-y-4 w-full animate-pulse">
      {[1, 2, 3].map((n) => (
        <div key={n} className="p-5 border border-slate-200 rounded-xl bg-white flex justify-between items-center">
          <div className="space-y-3 flex-1">
            <div className="h-5 bg-slate-200 rounded-md w-1/3"></div>
            <div className="h-4 bg-slate-100 rounded-md w-1/2"></div>
          </div>
          <div className="flex space-x-2">
            <div className="h-9 w-9 bg-slate-200 rounded-lg"></div>
            <div className="h-9 w-9 bg-slate-200 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
