import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import MapView, { Marker } from 'react-native-maps';

import { setLocation } from '../../redux/modules/location/location';

import MyLocationMarker from '../../components/MyLocationMarker';
import FloatingSearchInput from '../../components/FloatingSearchInput';

const StyledMap = styled(MapView)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;

class MapScreen extends React.PureComponent {
  searchInput = null;
  watchId = null;

  state = {
    latitude: 0,
    longitude: 0,
    error: null,
  }

  componentDidMount() {
    navigator.geolocation.requestAuthorization();
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this.props.setLocation(position.coords);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 1 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  handleFocus = () => {
    this.searchInput.blur();
    Navigation.push(this.props.componentId, {
      component: {
        name: 'uberApp.SearchScreen',
        passProps: {},
        options: {
          topBar: {
            title: {
              text: ''
            }
          }
        }
      }
    });
    // this.props.navigator.push({
    //   screen: 'uberApp.SearchScreen',
    //   animationType: 'fade',
    //   navigatorStyle: {
    //     navBarHidden: true,
    //   },
    // });
  }

  render() {
    const { latitude, longitude } = this.state;
    return (
      <StyledMap
        loadingEnabled
        region={{ latitude, longitude, latitudeDelta: 0.0043, longitudeDelta: 0.0034}}
      >
        <FloatingSearchInput
          innerRef={(input) => {
            this.searchInput = input;
          }}
          onFocus={this.handleFocus}
        />
        <Marker coordinate={{ latitude, longitude }}>
          <MyLocationMarker />
        </Marker>
      </StyledMap>
    );
  }
}

const mapDispatchToProps = dispatch => 
  bindActionCreators({
    setLocation,
  }, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(MapScreen);
