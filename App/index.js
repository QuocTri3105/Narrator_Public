import React from "react";
import {StatusBar} from "react-native";
import SplashScreen from "react-native-splash-screen";
import {Provider} from 'react-redux'
import {persistor, store} from './redux';
import {PersistGate} from 'redux-persist/integration/react';
import Root from "./navigation";
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
    // React.useEffect(() => {
    //     SplashScreen.hide();
    // });
    return (
        <SafeAreaProvider>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
                barStyle={"dark-content"}
            />
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Root/>
                </PersistGate>
            </Provider>
        </SafeAreaProvider>

    );
}

export default App;