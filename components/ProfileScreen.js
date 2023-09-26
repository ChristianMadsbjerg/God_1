// Importerer nødvendige moduler fra React og React Native bibliotekerne.
import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

// Importerer Firebase initialiserings- og autentificeringsfunktioner.
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

// ProfileScreen komponenten, som viser den aktive brugers profil.
function ProfileScreen () {

    // Initialiserer Firebase autentificering.
    const auth = getAuth();

    // Henter den aktive bruger.
    const user = auth.currentUser;

    // handleLogOut funktionen håndterer log ud af en aktiv bruger.
    // Metoden er en prædefineret metode, som firebase stiller til rådighed.
    const handleLogOut = async () => {
        await signOut(auth).then(() => {
            // Log ud var vellykket.
          }).catch((error) => {
            // Der skete en fejl.
          });
    };

    // Hvis der af en eller anden grund ikke skulle være muligt at fremfinde den aktive bruger,
    // skal der udprintes en besked om dette igennem en tekstkomponent.
    if (!auth.currentUser) {
        return <View><Text>Not found</Text></View>;
    }

    // I return() udnyttes en prædefineret metode, som firebase stiller til rådighed.
    // Metoden returnerer mailadressen af den aktive bruger.
    return (
        <View style={styles.container} >
            <Text>Current user: {user.email}</Text>
            <Button onPress={() => handleLogOut()} title="Log out" />
        </View>
    );

}

// Lokal styling til brug i ProfileScreen komponenten.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: '5%',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
});

// Eksporterer ProfileScreen komponenten som standard.
export default ProfileScreen;
