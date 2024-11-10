// App.tsx
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import TimerScreen from './src/screens/TimerScreen';

const App = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            <TimerScreen />
        </SafeAreaView>
    );
};

export default App;
