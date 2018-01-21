//------------------------------------------------------------------------------
// Author: Lukasz Janyst <lukasz@jany.st>
// Date: 18.01.2018
// Note: This code is essentially a copy-and-paste from the relevant lesson.
//------------------------------------------------------------------------------

import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

//------------------------------------------------------------------------------
// Notification storage metadata
//------------------------------------------------------------------------------
const NOTIFICATION_KEY = 'FlashCards:NotificationsStore';

//------------------------------------------------------------------------------
// Clear notifications
//------------------------------------------------------------------------------
export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

//------------------------------------------------------------------------------
// Notification content
//------------------------------------------------------------------------------
function createNotification() {
  return {
    title: 'FlashCards',
    body: '👋 don\'t forget your quiz for today!',
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  };
}

//------------------------------------------------------------------------------
// Set the notifcation
//------------------------------------------------------------------------------
export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if(data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if(status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);
              Notifications.scheduleLocalNotificationAsync(
                createNotification(), {
                  time: tomorrow,
                  repeat: 'day'
                }
              );
              AsyncStorage.setItem(NOTIFICATION_KEY,
                                   JSON.stringify(true));
            }
          });
    }
    });
}
