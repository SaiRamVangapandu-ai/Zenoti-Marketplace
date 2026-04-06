interface ReviewCardProps {
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ReviewCard({ userName, rating, comment, date }: ReviewCardProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-50 text-sm font-semibold text-violet-600">
            {userName.charAt(0)}
          </div>
          <span className="text-sm font-medium text-gray-900">{userName}</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-amber-500">★</span>
          <span className="font-medium text-gray-700">{rating}</span>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">{comment}</p>
      <p className="mt-2 text-xs text-gray-400">{date}</p>
    </div>
  );
}
