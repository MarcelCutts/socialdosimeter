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

let API_KEY = config.API_KEY; // Add your breezeometer api here
let REQUEST_URL = 'https://api.breezometer.com/baqi/?lat=51.5&lon=-0.126&key=' + API_KEY;

class socialdosimeter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  async getAirQuality() {
    try {
      // A test request made to an air quality API. The lattitude and longitude
      // given as query parameters refer to London, UK
      let response = await fetch(REQUEST_URL);
      let responseJson = await response.json();
      this.setState({
        airQuality: responseJson.breezometer_aqi,
        loaded: true,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  componentDidMount = () => {
    this.getAirQuality();
  };

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading air quality...
        </Text>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

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
