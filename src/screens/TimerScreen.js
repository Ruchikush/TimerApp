import React, {useState} from 'react';
import {View, Text, Button, FlatList, StyleSheet, Alert} from 'react-native';
import Timer from '../components/Timer';

const TimerScreen = () => {
  const [timers, setTimers] = useState([]);
  const [timerCount, setTimerCount] = useState(1); // Keeps track of the timer count for naming

  const addTimer = () => {
    if (timers.length >= 5) {
      // Show an alert if there are already 5 timers
      Alert.alert('Limit Reached', 'You cannot add more than 5 timers.', [
        {text: 'OK', onPress: () => console.log('Alert closed')},
      ]);
      return; // Prevent adding more timers
    }

    // Add a new timer if the limit is not reached
    const newTimer = {
      id: Date.now().toString(),
      name: `Timer ${timerCount}`, // Assign a name based on the count
    };
    setTimers([...timers, newTimer]);
    setTimerCount(timerCount + 1); // Increment for the next timer name
  };

  const removeTimer = id => {
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
        renderItem={({item}) => (
          <Timer id={item.id} name={item.name} onRemove={removeTimer} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default TimerScreen;
