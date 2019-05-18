import * as React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styled from 'styled-components';

import { getCurrentRide } from '../../redux/modules/uberRequests/uberRequests';

const CenterCenterView = styled(View)`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const SearchingText = styled(Text)`
  padding-top: 20px;
`;

class RideScreen extends React.PureComponent {
  intervalRequests = null;

  componentDidMount() {
    console.log(this.props.request)
    this.intervalRequests = setInterval(() => this.props.getCurrentRide(this.props.request.request_id), 5000);
  }

  render() {
    if (!this.props.request.status || this.props.request.status === 'processing') {
      return (
        <CenterCenterView>
          <ActivityIndicator />
          <SearchingText>Aguarde, procurando motoristas</SearchingText>
        </CenterCenterView>
      );
    }
    return (
      <CenterCenterView>
        <Text>Motorista a caminho!</Text>
        <Text>Nome: {this.props.request.driver.driver}</Text>
        <Text>Carro: {this.props.request.vehicle.make} {this.props.request.vechile.model}</Text>
        <Text>Place: {this.props.request.vehicle.license_plate}</Text>
      </CenterCenterView>
    )
  }
}

const mapStateToProps = state => ({
  request: state.uberRequestsReducer.request,
});

const mapDispatchToProps = dispatch => 
  bindActionCreators({
    getCurrentRide,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RideScreen);
