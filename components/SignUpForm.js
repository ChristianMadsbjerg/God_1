import React, { useState } from 'react';
import { Button, Text, View, TextInput, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Ionicons from 'react-native-vector-icons/Ionicons';

function SignUpForm({ setJustSignedUp }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const auth = getAuth();

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


//Lokal styling til brug i SignUpForm
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

export default SignUpForm;