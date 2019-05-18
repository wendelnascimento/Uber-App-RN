import * as React from 'react';
import { TouchableOpacity, View, Text, FlatList, Image, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { searchUberRequestEstimates, requestRide } from '../../redux/modules/uberRequests/uberRequests';

const ProductImage = styled(Image)`
  width: 50px;
  height: 50px;
`;

const ImageContainer = styled(View)`
  background: #b3b3b3;
  border-radius: 100px;
  padding: 3px;
  margin-right: 10px;
`;

const ListItem = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 10px;
  border-bottom-width: 1px;
  border-bottom-color: #fafafa;
  margin: 0 20px;
`

const DescriptionText = styled(Text)`
  flex-wrap: wrap;
  font-size: 10px;
  color: gray;
`;

const InfosView = styled(View)`
  flex-direction: row;
  align-items: flex-start;
`;

const EstimatePrice = styled(Text)`
  margin-bottom: 0px;
  margin-left: 10px;
  color: green;
`;

class ProductsScreen extends React.PureComponent {

  requestCar = async (item) => {
    await this.props.requestRide(this.props.fare.fare_id, item.product_id, this.props.originCoordinates, this.props.destinationCoordinates);
    Navigation.push(this.props.componentId, {
      component: {
        name: 'uberApp.RideScreen',
        passProps: {},
        options: {
          topBar: {
            title: {
              text: 'Solicitando viagem'
            }
          }
        }
      }
    });
  }

  handleItemPress = async (item) => {
    await this.props.searchUberRequestEstimates(item.product_id, this.props.originCoordinates, this.props.destinationCoordinates);
    if (this.props.pickupEstimate === null) {
      Alert.alert(
        'Sem carros disponíveis',
        'Não há nenhum carro disponível no momento',
        [
          // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          // {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      );
    } else {
      Alert.alert(
        'Carro encontrado!',
        `Carro encontrado a ${this.props.pickupEstimate} minutos.`,
        [
          { text: 'Confirmar viagem', onPress: () => this.requestCar(item) },
          { text: 'Cancelar', onPress: () => console.log('cancelled'), style: 'cancel' }
        ],
        { cancelable: false }
      );
    }
  }
  
  renderListItem = (item) => {
    return (
      <ListItem onPress={() => this.handleItemPress(item)}>
        <ImageContainer>
          <ProductImage
            resizeMode="contain"
            source={{uri: item.image.replace('http://', 'https://')}}
          />
        </ImageContainer>
        <View>
          <InfosView>
            <Text>
              {item.display_name}
            </Text>
            {item.price ?
              <EstimatePrice>{item.price.estimate}</EstimatePrice>
              : null}
            </InfosView>
          <DescriptionText>{item.description}</DescriptionText>
        </View>
      </ListItem>
    )
  }

  render() {
    const composedProducts = this.props.products.map((p) => {
      const newP = Object.assign({}, p);
      const estimate = this.props.estimates.find(i => i.product_id === newP.product_id);
      if (estimate) {
        newP.price = estimate;
      }
      return newP;
    })
    return (
      <View>
        <FlatList
          data={composedProducts}
          keyExtractor={item => item.product_id}
          renderItem={({item}) => this.renderListItem(item)}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  products: state.uberProductsReducer.products,
  estimates: state.uberEstimatesReducer.estimates,
  destinationCoordinates: state.uberEstimatesReducer.destinationCoordinates,
  originCoordinates: state.uberEstimatesReducer.originCoordinates,
  fare: state.uberRequestsReducer.fare,
  pickupEstimate: state.uberRequestsReducer.pickupEstimate,
});

const mapDispatchToProps = dispatch => 
  bindActionCreators({
    searchUberRequestEstimates,
    requestRide,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductsScreen);
