import { ChangeEvent, FormEvent, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { Star, MessageSquare } from 'lucide-react';
import StarRatingInput from './StarRatingInput';
import {
  useGetReviewsQuery,
  useAddReviewMutation,
} from '@/redux/features/products/productApi';
import { useAppSelector } from '@/redux/hook';
import { IReview } from '@/types/globalTypes';
import { toast } from './ui/use-toast';

interface IProps {
  id: string;
}

export default function ProductReview({ id }: IProps) {
  const { user } = useAppSelector((state) => state.user);
  const [addReview, { isLoading }] = useAddReviewMutation();
  const { data } = useGetReviewsQuery(id, { refetchOnMountOrArgChange: true });
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim() || selectedRating === 0 || !user?.email) return;
    try {
      await addReview({
        productId: id,
        data: {
          authorEmail: user.email,
          authorName: user.email.split('@')[0],
          rating: selectedRating,
          comment: inputValue,
        },
      }).unwrap();
      setInputValue('');
      setSelectedRating(0);
      toast({
        description: 'Review submitted successfully!',
      });
    } catch (err) {
      toast({
        description: 'Failed to submit review. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const reviews: IReview[] = data?.data || [];

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => r.rating === rating).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { rating, count, percentage };
  });

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-teal-500',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <p className="text-sm text-gray-500">
            {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Reviews Summary */}
      {reviews.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-8 mb-10 pb-10 border-b border-gray-100">
          {/* Average Rating */}
          <div className="flex flex-col items-center justify-center sm:min-w-[160px]">
            <span className="text-5xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </span>
            <div className="flex items-center gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-4">{rating}</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Write a Review Form */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <StarRatingInput value={selectedRating} onChange={setSelectedRating} />
          <Textarea
            className="min-h-[120px] bg-white border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            placeholder={
              user?.email
                ? 'Share your experience with this product...'
                : 'Log in to write a review'
            }
            value={inputValue}
            onChange={handleChange}
            disabled={!user?.email}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!user?.email || isLoading || !inputValue.trim() || selectedRating === 0}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-xl"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <FiSend className="w-4 h-4" />
                  Submit Review
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12 flex-shrink-0">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.authorName)}&background=random`} />
                  <AvatarFallback className={`${getAvatarColor(review.authorName)} text-white font-semibold`}>
                    {getInitials(review.authorName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900">
                      {review.authorName}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`w-4 h-4 ${
                              index < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>
    </div>
  );
}
