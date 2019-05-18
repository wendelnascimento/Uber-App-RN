import * as React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const UberMarker = styled(View)`
  background: #000;
  padding: 10px;
  border-radius: 20px;
  position: relative;
  border: 1px solid #000;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const UberMarkerLine = styled(View)`
  background: #000;
  position: absolute;
  width: 2px;
  height: 15px;
  bottom: -15px;
`;

const UberMarkerText = styled(Text)`
  font-size: 10px;
  color: #fff;
`;


export default class MyLocationMarker extends React.PureComponent {
  render() {
    return (
      <UberMarker>
        <UberMarkerText>Minha localização atual</UberMarkerText>
        <UberMarkerLine />
      </UberMarker>
    );
  }
}