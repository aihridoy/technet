import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface IUser {
  user: {
    email: string | null;
    role: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

interface ICredentials {
  email: string;
  password: string;
}

const initialState: IUser = {
  user: {
    email: null,
    role: null,
  },
  isLoading: true,
  isError: false,
  error: null,
};

const fetchRole = async (email: string): Promise<string> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/${email}`);
    const json = await res.json();
    return json?.data?.role || 'customer';
  } catch {
    return 'customer';
  }
};

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ email, password }: ICredentials) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return { email: data.user.email, role: 'customer' };
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: ICredentials) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    const role = await fetchRole(data.user.email as string);
    return { email: data.user.email, role };
  }
);

export const signInWithGoogle = createAsyncThunk(
  'user/signInWithGoogle',
  async () => {
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth, provider);
    const role = await fetchRole(data.user.email as string);
    return {
      email: data.user.email,
      role,
      displayName: data.user.displayName,
      photoURL: data.user.photoURL,
      uid: data.user.uid,
    };
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (email: string) => {
    const role = await fetchRole(email);
    return { email, role };
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    logoutUser: (state) => {
      state.user.email = null;
      state.user.role = null;
      state.isError = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.user.role = action.payload.role;
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.user.email = null;
        state.user.role = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.user.role = action.payload.role;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user.email = null;
        state.user.role = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.user.role = action.payload.role;
        state.isLoading = false;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.user.email = null;
        state.user.role = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.user.role = action.payload.role;
        state.isLoading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setLoading, logoutUser } = userSlice.actions;
export default userSlice.reducer;
