//import PushNotification from 'react-native-push-notification';
import React, {useState, useEffect} from 'react';
PushNotification.createChannel(
  {
    channelId: 'timer-channel',
    channelName: 'Timer Channel',
  },
  () => {},
);

export const triggerNotification = message => {
  PushNotification.localNotification({
    channelId: 'timer-channel',
    title: 'Timer Alert',
    message: message,
  });
};
