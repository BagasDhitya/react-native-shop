import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import color from '../themes/color';
import {getProducts, addProduct, removeProduct} from '../redux/action';
import axios from 'axios';

import Star from '../assets/star_icon.svg';
import Button from '../components/Button';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Product = ({route, navigation}) => {
  let id = route.params?.id;
  let today = new Date();

  const [product, setProducts] = useState();
  const [item, setItem] = useState();
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();

  async function getProduct() {
    try {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProducts(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const addToCart = selectedItem => dispatch(addProduct(selectedItem));

  async function handleCart() {
    try {
      const res = await axios
        .post(`https://fakestoreapi.com/carts`, {
          userId: 2,
          date:
            today.getFullYear() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            today.getDate(),
          products: [
            {
              productId: id,
              quantity: count,
            },
          ],
        })
        .then(res => {
          setCart(res.data);
          const selectedItem = {
            id: id,
            product: product,
            total: count,
          };
          setItem(selectedItem);
          addToCart(selectedItem);
          console.log('added', selectedItem);
          Alert.alert('Successfully added!');
          navigation.navigate('Wishlist', {
            product: product,
          });
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  console.log('co', count);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{
          marginBottom: Platform.OS === 'ios' ? null : windowHeight * 0.02,
        }}>
        <View>
          <Image style={styles.image} source={{uri: product?.image}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: windowWidth * 0.04,
          }}>
          <View
            style={{
              marginTop: windowHeight * 0.04,
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Name</Text>
            <Text
              style={{
                marginRight: windowWidth * 0.5,
                marginTop: windowHeight * 0.01,
              }}>
              {product?.title}
            </Text>
          </View>
          <View
            style={{
              marginTop: windowHeight * 0.04,
              right: windowWidth * 0.4,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                left: windowWidth * 0.03,
              }}>
              Rating
            </Text>
            <View style={{flexDirection: 'row-reverse'}}>
              <Text
                style={{
                  marginTop: windowHeight * 0.01,
                  right: windowWidth * 0.02,
                }}>
                {product?.rating?.rate}
              </Text>
              <View
                style={{
                  marginTop: windowHeight * 0.007,
                  position: 'absolute',
                  marginRight: windowWidth * 0.05,
                }}>
                <Star width={20} height={20} />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: windowWidth * 0.04,
            marginTop: windowHeight * 0.03,
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Description</Text>
          <Text
            style={
              Platform.OS === 'ios'
                ? {
                    marginRight: windowWidth * 0.1,
                    marginTop: windowHeight * 0.04,
                    right: windowWidth * 0.229,
                    textAlign: 'justify',
                  }
                : {
                    marginRight: windowWidth * 0.05,
                    marginTop: windowHeight * 0.04,
                    right: windowWidth * 0.21,
                    textAlign: 'justify',
                  }
            }>
            {product?.description}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: windowWidth * 0.04,
              marginTop: windowHeight * 0.03,
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Price</Text>
            <Text
              style={{
                marginTop: windowHeight * 0.04,
                textAlign: 'justify',
                position: 'absolute',
              }}>
              ${product?.price}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginHorizontal: windowWidth * 0.39,
              marginTop: windowHeight * 0.03,
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Quantity</Text>
            <View style={styles.quantity}>
              <TextInput
                style={
                  Platform.OS === 'ios'
                    ? {height: windowHeight * 0.04, alignSelf: 'center'}
                    : {
                        height: windowHeight * 0.05,
                        alignSelf: 'center',
                        left: windowHeight * 0.005,
                        bottom: windowHeight * 0.005,
                      }
                }
                value={count}
                onChangeText={count => setCount(count)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{alignSelf: 'center', marginVertical: windowHeight * 0.01}}>
        <Button
          title={'Add to Cart'}
          filled={count}
          onPress={() => handleCart()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  image: {
    width: windowWidth * 1,
    height: windowHeight * 0.3,
  },
  quantity: {
    marginTop: windowHeight * 0.01,
    width: windowWidth * 0.13,
    height: windowHeight * 0.04,
    borderWidth: 0.5,
    borderRadius: 5,
    alignSelf: 'center',
  },
});
