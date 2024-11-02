import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import { useMutation } from '@tanstack/react-query';
import { logIn, logOut,} from '@/APIs';

type Session = {
  user: { id: string; email: string, displayName:string,
     profilePics:string, role:string,
     token:string
    };
  // token: string;
  // Add any other fields you expect in the session object
};

const AuthContext = createContext<{
  signIn: (formData: { email: string; password: string }) => Promise<string | null>;
  signOut: () => void;
  session?: Session | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void; 
}>({
  signIn: async () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  setSession: () => {},
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState<Session>('session');

  const mutation = useMutation({
    mutationFn: (formData: { email: string; password: string }) => logIn(formData),
  });

  const logOutMutation = useMutation({
    mutationFn: logOut
  });

  const signIn = async (formData: { email: string; password: string }): Promise<string | null> => {
    try {
      const data = await mutation.mutateAsync(formData);
      if (data && data.status === 'success') {
        setSession({ user: data.user, });  //token: data.token
        return null; // No error message
      } else {
        if(!data){
          return 'No response from server. Please try again later.'
        }
        return data.message || 'Login failed';
      }
    } catch (error) {
      console.error('signIn mutation error:', error)
      return 'Unable to login. Please try again later.';
    }
  };

  const signOut = async()=>{
    try{
      const data = await logOutMutation.mutateAsync();
      if(data && data.status === 'success'){
        setSession(null);  //token: data.token
        return null;
      }
    }catch(error){
      console.error('signIn mutation error:', error)
      return 'Unable to signOut. Please try again later.';
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
        setSession,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
