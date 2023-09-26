// Importerer nødvendige moduler fra React og React Navigation.
import * as React from "react";
import ScreenOne from "./stackComponents/ScreenOne";
import ScreenTwo from "./stackComponents/ScreenTwo";
import DetailsScreen from "./DetailsScreen";
import { createStackNavigator } from '@react-navigation/stack';

// Her instantieres en StackNavigator, som giver mulighed for at navigere mellem skærme i en app.
const Stack = createStackNavigator()

// Definerer StackNavigator komponenten.
function StackNavigator() {
    return (
        // Initialiserer Stack.Navigator med en startskærm ved navn "Details".
        <Stack.Navigator
            initialRouteName="Details"
        >
            // Definerer DetailsScreen som en skærm i navigationen med tilhørende styling.
            <Stack.Screen name="Details" component={DetailsScreen}
                          options={{
                              headerTitleAlign: 'center',
                              headerTitleStyle: {color: 'white'},
                              headerStyle: {backgroundColor: '#ba6262'}}
                          }
            />
            // Definerer ScreenOne som en skærm i navigationen med tilhørende styling.
            <Stack.Screen name="ScreenOne" component={ScreenOne} options={{
                headerTitleStyle: { textAlign: 'right', color: 'white' },
                headerStyle: {backgroundColor: '#62bab5'}
            }} />
            // Definerer ScreenTwo som en skærm i navigationen med tilhørende styling.
            <Stack.Screen name="ScreenTwo" component={ScreenTwo} options={{
                headerTitleStyle: {color: 'black'},
                headerStyle: {backgroundColor: '#628bba'}
            }}
            />
        </Stack.Navigator>
    )
}

// Eksporterer StackNavigator komponenten, så den kan importeres og benyttes i andre komponenter.
export default StackNavigator
