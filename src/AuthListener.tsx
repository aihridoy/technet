import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useAppDispatch } from './redux/hook';
import { setLoading, logoutUser, fetchCurrentUser } from './redux/features/user/userSlice';
import { useEffect, ReactNode } from 'react';

interface AuthListenerProps {
  children: ReactNode;
}

export default function AuthListener({ children }: AuthListenerProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        dispatch(fetchCurrentUser(user.email));
      } else {
        dispatch(logoutUser());
        dispatch(setLoading(false));
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return <>{children}</>;
}
