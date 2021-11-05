import React, {createContext, useState} from 'react';
import AsynSotorage from '@react-native-async-storage/async-storage';
import {User} from '../model/User';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {Preferences} from '../model/Preferences';

interface AuthContextData {
  signed: boolean;
  user: User | null;
  signOut(): Promise<void>;
  saveUserAsyncStorage(user: User | null): Promise<void>;
  saveDataInFirebase(user: User): Promise<void>;
  getUserAsyncStorage(): Promise<string | null>;
  loginFacebook(): Promise<void>;
  getPreferences(): Promise<string | null>;
  savetPreferences(preferences: Preferences): Promise<void>;
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

  async function getPreferences(): Promise<string | null> {
    const tariff = await AsynSotorage.getItem('@IoT:tarrif');
    return tariff;
  }

  async function savetPreferences(preferences: Preferences): Promise<void> {
    await AsynSotorage.setItem('@IoT:tarrif', JSON.stringify(preferences));
  }

  async function loginFacebook(): Promise<void> {
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

    const credential = await auth().signInWithCredential(facebookCredential);

    const myUser = credential.additionalUserInfo?.profile as User;

    const {email, name, first_name, id, last_name, picture} = getUserFecebook(
      myUser,
    );

    const token = await getToken();
    const newUser = {
      email,
      name,
      first_name,
      id,
      last_name,
      picture,
      token,
    };

    await saveUserAsyncStorage(newUser).then(() => saveDataInFirebase(newUser));
  }

  async function getToken(): Promise<string> {
    const token = messaging().getToken();
    return token;
  }

  async function saveDataInFirebase(user: User): Promise<void> {
    const collection = firestore().collection('users');
    const users = await collection
      .doc(user.email)
      .collection(user.name)
      .get();

    if (users.size === 0) {
      collection
        .doc(user.email)
        .collection(`${user.name}`)
        .add({...user})
        .then(() => console.log('success save user'))
        .catch(error => console.error(error));
    }
  }

  function getUserFecebook(dataFacebook: User): User {
    const {
      name,
      email,
      first_name,
      id,
      last_name,
      picture,
      token,
    } = dataFacebook;

    return {
      name,
      first_name,
      email,
      id,
      last_name,
      picture,
      token,
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
        getPreferences,
        savetPreferences,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
