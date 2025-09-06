// Login.tsx
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import logo from '../assets/images/technet-logo-white.png';
import { LoginForm } from '@/components/LoginForm';

export default function Login() {
  return (
    <>
      <div className="container relative min-h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/signup"
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'absolute right-4 top-4 z-20 md:right-8 md:top-8'
          )}
        >
          Signup
        </Link>

        {/* Left side - Background image (hidden on mobile) */}
        <div className="relative hidden h-full flex-col bg-muted p-6 text-white dark:border-r lg:flex lg:p-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)',
            }}
          />
          <div className="absolute inset-0 bg-zinc-900 bg-opacity-80" />
          <Link
            to="/"
            className="relative z-20 flex items-center text-lg font-medium"
          >
            <img className="h-6 lg:h-8" src={logo} alt="TechNet" />
          </Link>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "This library has saved me countless hours of work and helped me
                deliver stunning designs to my clients faster than ever before."
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full p-4 sm:p-6 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {/* Mobile logo */}
            <div className="flex justify-center lg:hidden mb-6">
              <Link to="/" className="flex items-center">
                <img
                  className="h-8"
                  src={logo}
                  alt="TechNet"
                  style={{ filter: 'brightness(0)' }}
                />
              </Link>
            </div>

            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Login to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>

            <LoginForm />

            <p className="px-4 text-center text-xs text-muted-foreground sm:px-8 sm:text-sm">
              By clicking continue, you agree to our{' '}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
