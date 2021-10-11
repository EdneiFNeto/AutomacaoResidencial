import React, {createContext, useState} from 'react';
import AsynSotorage from '@react-native-async-storage/async-storage';
import {User} from '../model/User';
import database from '@react-native-firebase/database';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';

interface AuthContextData {
  signed: boolean;
  user: User | null;
  signIn(user: User | null): Promise<void>;
  signOut(): Promise<void>;
  saveUserAsyncStorage(user: User): Promise<void>;
  saveDataInFirebase(user: User): Promise<void>;
  listUserInFirebase(email: string): Promise<object | null>;
  getUserAsyncStorage(): Promise<string | null>;
  loginFacebook(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AutProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const db = database();

  async function signIn(myUser: User): Promise<void> {
    const list = await listUserInFirebase(myUser.email);

    if (list === null) {
      throw 'User not found';
    }

    setUser(list as User);
    await saveUserAsyncStorage(list as User);
  }

  async function signOut() {
    await AsynSotorage.setItem('@IoT:user', '');
    setUser(null);
  }

  async function saveUserAsyncStorage(myUser: User): Promise<void> {
    await AsynSotorage.setItem('@IoT:user', JSON.stringify(myUser));
  }

  async function getUserAsyncStorage(): Promise<string | null> {
    const userStorage = await AsynSotorage.getItem('@IoT:user');
    return userStorage;
  }

  async function listUserInFirebase(email: string): Promise<object | null> {
    const snapshot = await db.ref('/users').once('value');
    if (
      snapshot
        .child('-MlgSG1daVHQmRxj-YG4')
        .child('email')
        .val() === email
    ) {
      return snapshot.child('-Mlez2UwuLHQF0hj2YMF');
    }

    return null;
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
    await db
      .ref('/users')
      .push()
      .set(user);
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
        signIn,
        signOut,
        saveUserAsyncStorage,
        saveDataInFirebase,
        listUserInFirebase,
        getUserAsyncStorage,
        loginFacebook,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
