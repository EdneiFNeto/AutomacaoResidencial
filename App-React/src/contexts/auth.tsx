import React, {createContext, useState} from 'react';
import AsynSotorage from '@react-native-async-storage/async-storage';
import {User} from '../model/User';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
interface AuthContextData {
  signed: boolean;
  user: User | null;
  signOut(): Promise<void>;
  saveUserAsyncStorage(user: User | null): Promise<void>;
  saveDataInFirebase(user: User): Promise<void>;
  getUserAsyncStorage(): Promise<string | null>;
  loginFacebook(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AutProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);

  async function signOut() {
    await AsynSotorage.setItem('@IoT:user', '');
    setUser(null);
  }

  async function saveUserAsyncStorage(myUser: User | null): Promise<void> {
    await AsynSotorage.setItem('@IoT:user', JSON.stringify(myUser));
  }

  async function getUserAsyncStorage(): Promise<string | null> {
    const userStorage = await AsynSotorage.getItem('@IoT:user');
    return userStorage;
  }

  async function loginFacebook() {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    await auth()
      .signInWithCredential(facebookCredential)
      .then(async dataFacebook => {
        const myUser = dataFacebook.additionalUserInfo?.profile as User;
        await saveUserAsyncStorage(getUserFecebook(myUser)).then(() =>
          saveDataInFirebase(myUser),
        );
      });
  }

  async function saveDataInFirebase(user: User): Promise<void> {
    await firestore()
      .collection('users')
      .doc(user.email)
      .collection(`${user.name}`)
      .add({...user})
      .then(() => console.log('success save user'))
      .catch(error => console.error(error));
  }

  function getUserFecebook(dataFacebook: User): User {
    const {name, email, first_name, id, last_name, picture} = dataFacebook;
    return {
      name,
      first_name,
      email,
      id,
      last_name,
      picture,
    };
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: Boolean(user),
        signOut,
        saveUserAsyncStorage,
        saveDataInFirebase,
        getUserAsyncStorage,
        loginFacebook,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
