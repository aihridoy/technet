import { ChangeEvent, FormEvent, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { Star } from 'lucide-react';
import StarRatingInput from './StarRatingInput';
import {
  useGetReviewsQuery,
  useAddReviewMutation,
} from '@/redux/features/products/productApi';
import { useAppSelector } from '@/redux/hook';
import { IReview } from '@/types/globalTypes';

interface IProps {
  id: string;
}

export default function ProductReview({ id }: IProps) {
  const { user } = useAppSelector((state) => state.user);
  const [addReview, { isLoading }] = useAddReviewMutation();
  const { data } = useGetReviewsQuery(id, { refetchOnMountOrArgChange: true });
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim() || selectedRating === 0 || !user?.email) return;
    addReview({
      productId: id,
      data: {
        authorEmail: user.email,
        authorName: user.email.split('@')[0],
        rating: selectedRating,
        comment: inputValue,
      },
    });
    setInputValue('');
    setSelectedRating(0);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const reviews: IReview[] = data?.data || [];

  return (
    <div className="max-w-7xl mx-auto mt-5 px-4 md:px-0 mb-5">
      <form
        className="flex flex-col gap-3 border border-gray-200 rounded-lg p-4"
        onSubmit={handleSubmit}
      >
        <StarRatingInput value={selectedRating} onChange={setSelectedRating} />
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-end sm:items-center">
          <Textarea
            className="flex-1 min-h-[60px] sm:min-h-[40px]"
            placeholder={
              user?.email ? 'Write a review...' : 'Log in to write a review'
            }
            value={inputValue}
            onChange={handleChange}
            disabled={!user?.email}
          />
          <Button
            type="submit"
            disabled={!user?.email || isLoading}
            className="rounded-full h-10 w-10 p-2 text-[25px] flex-shrink-0"
          >
            <FiSend />
          </Button>
        </div>
      </form>

      <div className="mt-8 space-y-5">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="flex gap-3 items-start bg-gray-50 p-3 rounded-lg"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {review.authorName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm sm:text-base">
                  {review.authorName}
                </span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`w-3.5 h-3.5 ${
                        index < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm sm:text-base break-words mt-1">
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
