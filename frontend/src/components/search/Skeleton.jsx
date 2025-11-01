
export function CardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-1">
        <div className="animate-pulse rounded-xl shadow-sm bg-gray-200 min-h-17 w-full"> </div>
    </div>
  );
}

export function ImageSkeleton() {
  return(
  <>
  {[0,1,2].map((_, i) => (
            <div key={i} className="animate-pulse h-24 w-full bg-gray-50 rounded-md" />
          ))}
  </>)
}