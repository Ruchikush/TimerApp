import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, Dimensions } from 'react-native';
import Timer from '../components/Timer';

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 360; // Adjust styling for smaller devices

const TimerScreen = () => {
  const [timers, setTimers] = useState([]);
  const [timerCount, setTimerCount] = useState(1);

  const addTimer = () => {
    if (timers.length >= 5) {
      Alert.alert('Limit Reached', 'You cannot add more than 5 timers.', [
        { text: 'OK', onPress: () => console.log('Alert closed') },
      ]);
      return;
    }

    const newTimer = {
      id: Date.now().toString(),
      name: `Timer ${timerCount}`,
    };
    setTimers([...timers, newTimer]);
    setTimerCount(timerCount + 1);
  };

  const removeTimer = (id) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Multiple Timers</Text>
      <Button
        title="Add Timer"
        onPress={addTimer}
        disabled={timers.length >= 5}
      />
      <FlatList
        data={timers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Timer id={item.id} name={item.name} onRemove={removeTimer} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, // Responsive padding based on screen width
  },
  title: {
    fontSize: isSmallDevice ? 20 : 24, // Adjust font size for small devices
    textAlign: 'center',
    marginVertical: height * 0.02, // Responsive vertical margin
  },
});

export default TimerScreen;
