import Constants from 'expo-constants';
import { Animated, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import React, {useRef, useEffect} from 'react'

const SlideInView = props => {
  const slideAnim = useRef(new Animated.Value(100)).current; // Initial value for the Y position

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        transform: [{ translateY: slideAnim }],
      }}>
      {props.children}
    </Animated.View>
  );
};

export default class Status extends React.Component {
  state = {  
    isConnected: true,
    type: null,
  };

  componentDidMount() {
    NetInfo.fetch().then((state) => {
      this.setState({ isConnected: !state.isConnected,
                      type: state.type});
    });
    // Subscribe to network status changes
    this.unsubscribe = NetInfo.addEventListener((state) => {
      this.setState({ isConnected: state.isConnected,
                      type: state.type });
    });
  }
  componentWillUnmount() {
    // Unsubscribe from network status changes to prevent memory leaks
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    //const {info} = this.state;

    const { isConnected, type } = this.state;      
    const backgroundColor = !isConnected ? 'green' : 'red';
    
    const statusBar = (
      <StatusBar 
        backgroundColor={backgroundColor}
        barStyle={isConnected ? 'light-content':'dark-content'}
        animted={false}
      />
    );

    const messageContainer = (
      <View style={styles.messageContainer}>
        {statusBar}
        {!isConnected && type ? (
          <SlideInView style={styles.networkUpBubble}>
            <Text style={styles.text}>Type: {type} </Text>
            <Text style={styles.text}>There is a {type} network connection</Text>
          </SlideInView>
        ) : (
          <SlideInView style={styles.networkDownbubble}>
            <Text style={styles.text}>Type: no {type} </Text>
            <Text style={styles.text}>No {type} network connection</Text>
          </SlideInView>
        )}
      </View>
    );


    if(Platform.OS === 'ios'){
      return (
        <View style={[styles.status, {backgroundColor}]}>
          {messageContainer}
        </View>
      );
      
    }

    return messageContainer;
  }
}

const statusHeight = (Platform.OS === 'ios' ? Constants.statusBarHeight : 0)

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: 'center',
  },
  networkDownbubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  networkUpBubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'green'
  },
  text: {
    color: 'white',
    textAlign: 'center'
  },
  myName: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'green',
    marginBottom: 20
  },
})