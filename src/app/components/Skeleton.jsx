export default function Skeleton() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-300 rounded w-3/4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        <div className="h-64 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  );
}
