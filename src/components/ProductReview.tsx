import { ChangeEvent, FormEvent, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import {
  useGetCommentQuery,
  usePostCommentMutation,
} from '@/redux/features/products/productApi';

interface IProps {
  id: string;
}

export default function ProductReview({ id }: IProps) {
  const [postComment] = usePostCommentMutation();
  const { data } = useGetCommentQuery(id, { refetchOnMountOrArgChange: true });
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim()) return;
    postComment({ id, data: { comment: inputValue } });
    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5 px-4 md:px-0 mb-5">
      {/* Comment Form */}
      <form
        className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-end sm:items-center"
        onSubmit={handleSubmit}
      >
        <Textarea
          className="flex-1 min-h-[60px] sm:min-h-[40px]"
          placeholder="Write a comment..."
          value={inputValue}
          onChange={handleChange}
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px] flex-shrink-0"
        >
          <FiSend />
        </Button>
      </form>

      {/* Comments List */}
      <div className="mt-8 space-y-5">
        {data?.comments?.map((comment: string, index: number) => (
          <div
            key={index}
            className="flex gap-3 items-start sm:items-center bg-gray-50 p-3 rounded-lg"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-sm sm:text-base break-words">{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
