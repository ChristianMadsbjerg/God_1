// Importerer nødvendige moduler fra React og React Native bibliotekerne.
import {Button, StyleSheet, Text, View} from "react-native"; // Importerer komponenter fra React Native biblioteket.
import * as React from "react"; // Importerer React biblioteket for at kunne bruge JSX og React komponenter.

// Definerer en hjælpefunktion 'navController', der navigerer til en given rute.
const navController = (navigation, route) =>{ 
    navigation.navigate(route) // Bruger 'navigate' metoden fra 'navigation' objektet til at navigere til den specificerede rute.
}

// Definerer en React komponent ved navn 'DetailsScreen'.
function DetailsScreen({navigation}) { 
    return (
        <View style={styles.container}> // Bruger en 'View' komponent med en bestemt stil.
            <Text style={styles.text}>DetailsScreen!</Text> // Viser en tekst med en bestemt stil.
            <Button title="Go To Screen One" onPress={() => navController(navigation, 'ScreenOne')}  /> // Tilføjer en knap, der navigerer til 'ScreenOne' når den trykkes på.
            <Button title="Go To Screen Two" onPress={() => navController(navigation, 'ScreenTwo')}  /> // Tilføjer en knap, der navigerer til 'ScreenTwo' når den trykkes på.
        </View>
    );
}

// Eksporterer 'DetailsScreen' komponenten, så den kan bruges i andre filer.
export default DetailsScreen 

// Definerer en række stilarter ved hjælp af React Native's 'StyleSheet' metode.
const styles = StyleSheet.create({ 
    container: { // Stil for containeren.
        paddingTop:100,
        paddingBottom:100,
        borderColor: 'green',
        borderWidth: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height:'100%'
    },
    text: { // Stil for teksten.
        fontSize: 20,
    },
});
