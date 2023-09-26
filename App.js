// Importerer nødvendige moduler fra React, React Navigation, React Native og Firebase.
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, signOut, onAuthStateChanged } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Importerer komponenter fra lokale stier.
import StackNavigator from './components/StackNavigator';
import Company from './components/Company';
import Consultant from './components/Consultant';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
const firebaseConfig = {
  apiKey: "AIzaSyD5XHT5iLdgAvn_lZu2Pt99-Vsstdvu5jA",
  authDomain: "godkendelse1-1234d.firebaseapp.com",
  projectId: "godkendelse1-1234d",
  storageBucket: "godkendelse1-1234d.appspot.com",
  messagingSenderId: "325885087168",
  appId: "1:325885087168:web:8a55e35bf9282591024c25"
};
// Initialiserer Firebase app og auth med den givne konfiguration.
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage) // Bruger ReactNativeAsyncStorage som persistence-lag.
});

// Komponent til at håndtere loginformular.
function LoginScreen(props) {
  return <LoginForm {...props} />;
}

// Definerer SignUpComponent uden for Tab.Screen for at gøre det mere overskueligt.
function SignUpComponent({ setJustSignedUp }) {
  return <SignUpForm setJustSignedUp={setJustSignedUp} />;
}

// Hovedkomponenten for appen.
export default function App() {
  const [user, setUser] = useState({ loggedIn: false });
  const [justSignedUp, setJustSignedUp] = useState(false);

  // Overvåger autentificeringsstatus og opdaterer brugerens tilstand.
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  // Funktion til at overvåge autentificeringsændringer.
  function onAuthStateChange(callback) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        callback({ loggedIn: true, user: user });
        console.log('Du er logget ind!');
      } else {
        callback({ loggedIn: false });
      }
    });
  }

  // Funktion til at håndtere log ud.
  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('Bruger logget ud!');
    });
  }

  // Initialiserer en bundfane-navigator.
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {user.loggedIn ? (
          // Hvis brugeren er logget ind, vis disse skærme.
          <>
            <Tab.Screen name="Consultant" component={Consultant} />
            <Tab.Screen name="Company" component={Company} />
            <Tab.Screen name="Stack" component={StackNavigator} />
            <Tab.Screen name="Logout">
              {() => (
                <View style={styles.container}>
                  <Button title="Log ud" onPress={handleLogout} />
                </View>
              )}
            </Tab.Screen>
          </>
        ) : (
          // Hvis brugeren ikke er logget ind, vis disse skærme.
          <>
            <Tab.Screen name="SignUp" options={{ title: 'Tilmeld' }}>
              {() => <SignUpComponent setJustSignedUp={setJustSignedUp} />}
            </Tab.Screen>
            <Tab.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Lokal styling til brug i App-komponenten.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
