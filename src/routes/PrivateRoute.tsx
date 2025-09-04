import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/redux/hook';
import { ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function PrivateRoute({
  children,
  redirectTo = '/login',
}: PrivateRouteProps) {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user.email) {
    return (
      <Navigate to={redirectTo} state={{ from: location.pathname }} replace />
    );
  }

  return <>{children}</>;
}
