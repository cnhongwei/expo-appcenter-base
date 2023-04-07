import { StyleSheet, Text, View } from 'react-native';

import * as ExpoAppcenterBase from 'expo-appcenter-base';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoAppcenterBase.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
