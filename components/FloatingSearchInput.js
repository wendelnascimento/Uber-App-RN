import * as React from 'react';
import { TextInput } from 'react-native';

import styled from 'styled-components';

const FloatingTextField = styled(TextInput)`
  background: #fff;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 20px;
  right: 20px;
  margin: 40px 0 0 0;
  border-radius: 3px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, .3);
`;

export default class FloatingSearchInput extends React.PureComponent {
  render() {
    return (
      <FloatingTextField
        placeholder="Para onde você vai?"
        returnKeyType="search"
        clearButtonMode="while-editing"
        {...this.props}
      />
    );
  }
}
