import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/redux/hook';
import { ReactNode } from 'react';

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user.email || user.role !== 'admin') {
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
