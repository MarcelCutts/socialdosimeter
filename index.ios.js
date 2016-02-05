/**
 * Extension of the sample react native app.
 * Mostly, currently used to experiment with the
 * abilities and limitations of react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import config from './config';

let apiKey = config.API_KEY; // Add your breezeometer api here

class socialdosimeter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    // A test request made to an air quality API. The lattitude and longitude
    // given as query parameters refer to London, UK
    fetch('https://api.breezometer.com/baqi/?lat=51.500152&lon=-0.126182&key=' + apiKey)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({airQuality: responseJson.breezometer_aqi});
    })
    .catch((error) => {
      console.warn(error);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Social Dosimeter
        </Text>
        <Text style={styles.instructions}>
          For now - London air quality is {this.state.airQuality}
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('socialdosimeter', () => socialdosimeter);
