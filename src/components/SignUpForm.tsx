'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { createUser, logoutUser } from '@/redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useNavigate } from 'react-router-dom';
import { useAddUserMutation } from '@/redux/features/user/userApi';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface SignupFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const dispatch = useAppDispatch();
  const { isLoading, isError, error } = useAppSelector((state) => state.user);
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormInputs>();

  const password = watch('password');

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      const resultAction = await dispatch(
        createUser({
          email: data.email,
          password: data.password,
        })
      );

      if (createUser.fulfilled.match(resultAction)) {
        const userData = {
          email: data.email,
          createdAt: new Date().toISOString(),
        };

        const backendResponse = await addUser(userData).unwrap();

        if (backendResponse) {
          dispatch(logoutUser());
          navigate('/login');
        } else {
          throw new Error('Failed to add user to database');
        }
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className={cn('grid gap-4 sm:gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              className="h-10 sm:h-11"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500 sm:text-sm">
                {errors.email.message}
              </p>
            )}

            <Input
              id="password"
              placeholder="Your password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              className="h-10 sm:h-11"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.password && (
              <p className="text-xs text-red-500 sm:text-sm">
                {errors.password.message}
              </p>
            )}

            <Input
              id="confirmPassword"
              placeholder="Confirm password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              className="h-10 sm:h-11"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 sm:text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {isError && error && (
            <p className="text-xs text-red-500 sm:text-sm">{error}</p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="h-10 text-sm sm:h-11 sm:text-base"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        className="h-10 flex items-center justify-center gap-2 text-sm sm:h-11 sm:text-base"
      >
        <FcGoogle className="h-4 w-4 sm:h-5 sm:w-5" />
        <span>Continue with Google</span>
      </Button>
    </div>
  );
}
