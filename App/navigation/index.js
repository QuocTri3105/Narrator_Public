import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import RootScreen from "../screen/RootScreen";
import AddBookScreen from "../screen/AddBook";
import EditBookScreen from "../screen/EditBook";
import AddCollectionScreen from "../screen/AddCollection";
import EditCollectionScreen from "../screen/EditCollection";
import DetailCollectionScreen from "../screen/DetailCollection";
import AddBookToCollectionScreen from "../screen/AddBookToCollection";
import AudioPlayerScreen1 from "../screen/AudioPlayerScreen1";
import PlayerScreen from '../screen/PlayerScreen'

const Stack = createStackNavigator();

function Root() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {height: 0},
                    cardOverlayEnabled: true,
                    headerBackTitle: null,
                    headerTitleAlign: 'center',
                    headerTruncatedBackTitle: null,
                    headerShown: false,
                }}
            >
                <Stack.Screen name="RootScreen" component={RootScreen}/>
                <Stack.Screen name="AddBookScreen" component={AddBookScreen}/>
                <Stack.Screen name="EditBookScreen" component={EditBookScreen}/>
                <Stack.Screen name="AddCollectionScreen" component={AddCollectionScreen}/>
                <Stack.Screen name="EditCollectionScreen" component={EditCollectionScreen}/>
                <Stack.Screen name="DetailCollectionScreen" component={DetailCollectionScreen}/>
                <Stack.Screen name="AddBookToCollectionScreen" component={AddBookToCollectionScreen}/>
                <Stack.Screen name="AudioPlayerScreen" component={AudioPlayerScreen1}/>
                <Stack.Screen name="PlayerScreen" component={PlayerScreen}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Root;
