import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 360;// Adjust styling for smaller devices

const Timer = ({ id, name, onRemove }) => {
  const [inputTime, setInputTime] = useState('60');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerInterval = null;
    if (isRunning && timeLeft > 0) {
      timerInterval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === 1) {
            showAlert();
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isRunning, timeLeft]);

  const isNumeric = (value) => /^\d+$/.test(value);

  const startTimer = () => {
    if (!isNumeric(inputTime)) {
      Alert.alert('Invalid Input', 'Please enter a numeric value for the timer.', [{ text: 'OK' }]);
      setInputTime('60');
      return;
    }

    if (!isRunning) {
      setTimeLeft(prev => (prev > 0 ? prev : parseInt(inputTime)));
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(parseInt(inputTime));
  };

  const showAlert = () => {
    Alert.alert('Timer Finished', `${name} has reached zero!`, [{ text: 'OK' }]); //Alert when timer reached 0
    setInputTime('60');
    setTimeLeft(0);
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.nameText}>{name}</Text>
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
    padding: width * 0.04,// Responsive padding based on screen width
    margin: width * 0.03,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  nameText: {
    fontSize: isSmallDevice ? 16 : 20,// Adjust font size for small devices
    textAlign: 'center',
    marginBottom: height * 0.01,
  },
  timeText: {
    fontSize: isSmallDevice ? 20 : 24,
    textAlign: 'center',
    marginVertical: height * 0.02,// Responsive vertical margin
  },
  input: {
    borderBottomWidth: 1,
    marginVertical: height * 0.02,
    textAlign: 'center',
    fontSize: isSmallDevice ? 14 : 18,
    padding: height * 0.01,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: height * 0.02,// Responsive vertical margin
  },
});

export default Timer;
