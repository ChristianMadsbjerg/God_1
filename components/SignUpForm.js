// Importerer nødvendige moduler fra React, React Native og Firebase bibliotekerne.
import React, { useState } from 'react';
import { Button, Text, View, TextInput, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Ionicons from 'react-native-vector-icons/Ionicons';

// Definerer SignUpForm komponenten.
function SignUpForm({ setJustSignedUp }) {
    // Initialiserer state variabler for e-mail, password og eventuelle fejlbeskeder.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    // Initialiserer Firebase autentificering.
    const auth = getAuth();

    // Definerer handleSubmit funktionen, som håndterer brugeroprettelsesprocessen.
    const handleSubmit = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setJustSignedUp(true);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
        });
    }

    // Renderer tilmeldingsformularen.
    return (
        <View style={styles.container}>
            <Ionicons name="person-circle-outline" size={100} color="#4F8EF7" style={styles.icon} />
            <Text style={styles.header}>Sign Up</Text>
            <Ionicons name="mail-outline" size={24} color="#4F8EF7" style={styles.iconInput} />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <Ionicons name="lock-closed-outline" size={24} color="#4F8EF7" style={styles.iconInput} />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            <Button onPress={handleSubmit} title="Create user" />
        </View>
    );
}

// Definerer lokal styling til SignUpForm komponenten.
const styles = StyleSheet.create({
    error: {
        color: 'red',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 10,
    },
    inputField: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        marginVertical: 10,
        padding: 15,
        width: '90%',
        backgroundColor: '#F7F7F7',
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2.5,
        elevation: 3,
    },
    header: {
        fontSize: 40,
        fontWeight: '700',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
});

// Eksporterer SignUpForm komponenten, så den kan importeres og benyttes i andre komponenter.
export default SignUpForm;
