import { StyleSheet, Text, View, Animated} from 'react-native';
import Status from './components/StatusBar';

export default function App() {
  return (
    <View style={styles.container}>
      <Status/>
      <View style={styles.messageContent}>
      </View> 
      <View style={styles.toolbarSpace}>
        <Text>Edralyn Peralta</Text>
      </View>
      <View style={styles.inputMethod}>
        <Text>Ordinals</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  messageContent: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethod: {
    flex: 1, 
    backgroundColor: '#F9A4EC',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  toolbarSpace: {
    borderTopWidth: 1, 
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: '#72D4F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  }
});
