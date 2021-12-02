import React from "react";
import axios from "axios";
import EncryptedStorage from 'react-native-encrypted-storage';

export interface IAuthContext {
    token: string | null;
    signIn: (token: string) => void;
    singOut: () => void;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
    const [token, setToken] = React.useState<string | null>(null);

    const storeUserSession = async (token: string) => {
        try {
            await EncryptedStorage.setItem("jwtToken", token);
        } catch (error) {
            return error;
        }
    }

    const removeUserSession = async () => {
        try {
            await EncryptedStorage.removeItem("jwtToken");
        } catch (error) {
            return error;
        }
    }

    const signIn = async (token: string) => {
        setToken(token);
        await storeUserSession(token);
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    };

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
        [token]
    );

    return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    const context = React.useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContext");
    }

    return {
        token: context.token,
        signIn: context.signIn,
        signOut: context.singOut,
    };
};
