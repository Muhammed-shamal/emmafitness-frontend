import Skeleton from 'react-loading-skeleton'

export default function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="bg-white p-2 rounded shadow flex flex-col gap-2">
          <Skeleton height={120} />
          <Skeleton height={20} width="80%" />
          <Skeleton height={20} width="60%" />
          <Skeleton height={20} width="40%" />
        </div>
      ))}
    </div>
  )
}