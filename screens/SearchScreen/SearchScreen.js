import * as React from 'react';
import { ScrollView, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { searchPlaces } from '../../redux/modules/location/location';
import { searchUberProducts } from '../../redux/modules/uberProducts/uberProducts';
import { searchUberEstimates } from '../../redux/modules/uberEstimates/uberEstimates';

import FloatingSearchInput from '../../components/FloatingSearchInput';

const PlacesList = styled(FlatList)`
  background: #fff;
  padding: 20px;
  height: 100%;
  margin-top: 100px;
`

const PlaceItem = styled(TouchableOpacity)`
  padding: 20px 10px;
  border-radius: 3px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, .3);
  background: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #fafafa;
  margin-bottom: 5px;
  justify-content: center;
`;

const AddressText = styled(Text)`
  font-size: 10px;
  color: #666;
  padding: 5px 0;
`;

const MainView = styled.ScrollView.attrs({
  contentContainerStyle: props => {
    return {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      alignItems: 'stretch',
    }
  }
})``;

class SearchScreen extends React.PureComponent {
  searchInput = null;

  inputLayout = () => {
    this.searchInput.focus();
  }

  searchLocation = () => {
    this.props.searchPlaces(this.props.currentLocation, this.searchInput._lastNativeText);
  }

  handleItemPress = (item) => {
    // console.log(item)
    this.props.searchUberProducts(this.props.currentLocation);
    this.props.searchUberEstimates(this.props.currentLocation, item.geometry.location);
    Navigation.push(this.props.componentId, {
      component: {
        name: 'uberApp.ProductsScreen',
        passProps: {},
        options: {
          topBar: {
            title: {
              text: item.name,
            }
          }
        }
      }
    });
  }


  renderListItem = (item) => (
    <PlaceItem onPress={() => this.handleItemPress(item)}>
      <Text>{item.name}</Text>
      <AddressText>{item.vicinity}</AddressText>
    </PlaceItem>
  );

  render() {
    return(
      <MainView>
        <FloatingSearchInput
          innerRef={(input) => {
            this.searchInput = input;
          }}
          onSubmitEditing={this.searchLocation}
          onLayout={this.inputLayout}
        />
        {
          this.props.loading && <ActivityIndicator />
        }
        {
          !this.props.loading &&
          <PlacesList
            data={this.props.places}
            keyExtractor={item => item.id}
            renderItem={({item}) => this.renderListItem(item)}
          />
        }
      </MainView>
    );
  }
};

const mapStateToProps = state => ({
  currentLocation: state.locationReducer.currentLocation,
  loading: state.locationReducer.loading,
  places: state.locationReducer.places,
});

const mapDispatchToProps = dispatch => 
  bindActionCreators({
    searchPlaces,
    searchUberProducts,
    searchUberEstimates,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchScreen);
