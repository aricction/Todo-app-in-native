import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import TodoInput from './src/components/TodoInput/todoInput';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Hello Govind 👋</Text>

      <TodoInput />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
});
