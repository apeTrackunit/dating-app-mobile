import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

export interface IAuthContext {
  token: string | null;
  signIn: (token: string) => void;
  singOut: () => void;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC = ({children}) => {
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    initUserSession();
  }, []);

  const initUserSession = async () => {
    try {
      setToken(await EncryptedStorage.getItem('jwtToken'));
    } catch (error) {
      return error;
    }
  };

  const storeUserSession = async (newToken: string) => {
    try {
      await EncryptedStorage.setItem('jwtToken', newToken);
    } catch (error) {
      return error;
    }
  };

  const removeUserSession = async () => {
    try {
      await EncryptedStorage.removeItem('jwtToken');
    } catch (error) {
      return error;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const signIn = async (newToken: string) => {
    setToken(newToken);
    await storeUserSession(newToken);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const singOut = async () => {
    setToken(null);
    await removeUserSession();
  };

  const contextValues: IAuthContext = React.useMemo(
    () => ({
      token: token,
      signIn: signIn,
      singOut: singOut,
    }),
    [token, signIn, singOut],
  );

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthContext');
  }

  return {
    token: context.token,
    signIn: context.signIn,
    signOut: context.singOut,
  };
};
