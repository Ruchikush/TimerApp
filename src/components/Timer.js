import React, {useState, useEffect} from 'react';
import {View, Text, Button, TextInput, StyleSheet, Alert} from 'react-native';

const Timer = ({id, name, onRemove}) => {
  const [inputTime, setInputTime] = useState('60'); // Default input time is 60 seconds
  const [timeLeft, setTimeLeft] = useState(0); // Tracks the remaining time
  const [isRunning, setIsRunning] = useState(false);

  // Effect to count down every second when the timer is running
  useEffect(() => {
    let timerInterval = null;
    if (isRunning && timeLeft > 0) {
      timerInterval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === 1) {
            showAlert(); // Trigger alert when the timer reaches zero
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isRunning, timeLeft]);

  const isNumeric = value => {
    return /^\d+$/.test(value);
  };

  const startTimer = () => {
    if (!isNumeric(inputTime)) {
      Alert.alert(
        'Invalid Input',
        'Please enter a numeric value for the timer.',
        [{text: 'OK', onPress: () => console.log('Alert closed')}],
      );
      setInputTime('60');
      return;
    }

    // Start the timer only if it's not already running
    if (!isRunning) {
      // If timeLeft is 0, it means it's a fresh start; otherwise, it resumes from the paused time.
      setTimeLeft(prev => (prev > 0 ? prev : parseInt(inputTime)));
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false); // Pause the timer without resetting timeLeft
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(parseInt(inputTime)); // Reset timeLeft to the initial input time
  };

  const showAlert = () => {
    Alert.alert('Timer Finished', `${name} has reached zero!`, [
      {text: 'OK', onPress: () => console.log('Alert closed')},
    ]);

    setInputTime('60'); // Reset the input timer value to "60" after the timer reaches zero
    setTimeLeft(0);
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timeText}>{timeLeft} seconds</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={inputTime}
        onChangeText={setInputTime}
      />
      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={startTimer} />
        <Button title="Pause" onPress={pauseTimer} />
        <Button title="Reset" onPress={resetTimer} />
        <Button title="Remove" color="red" onPress={() => onRemove(id)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  timeText: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginVertical: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Timer;
