import axios from 'axios';
import React, {FC, ReactElement, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  SafeAreaView,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from 'react-native';
import Button from '../components/Button';
import color from '../themes/color';
import Cross from '../assets/cross.svg';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(true);

  async function handleRegister() {}

  function next() {
    setVisible(false);
    navigation.navigate('Login');
  }

  return (
    <>
      <Modal animationType="slide" visible={visible}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate('RootNavigator')}
            style={{alignSelf: 'flex-end', marginRight: windowWidth * 0.05}}>
            <Cross width={30} height={30} />
          </TouchableOpacity>
          <View
            style={{alignSelf: 'center', marginVertical: windowHeight * 0.1}}>
            <Image
              source={require('../assets/rn_logo.png')}
              style={{width: windowWidth * 0.25, height: windowHeight * 0.1}}
            />
          </View>
          <View style={{alignSelf: 'center'}}>
            <TextInput
              style={styles.input}
              value={name}
              placeholder={'Full Name'}
              onChangeText={text => setName(text)}
              autoCapitalize={true}
            />
            <TextInput
              style={styles.input}
              value={address}
              placeholder={'Address'}
              onChangeText={text => setAddress(text)}
              autoCapitalize={true}
            />
            <TextInput
              style={styles.input}
              value={email}
              placeholder={'Email'}
              onChangeText={text => setEmail(text)}
              autoCapitalize={true}
            />
            <TextInput
              style={styles.input}
              value={password}
              placeholder={'Password'}
              secureTextEntry
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View style={{alignSelf: 'center', marginTop: windowHeight * 0.02}}>
            <TouchableOpacity onPress={() => next()}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: color.blueAqua,
                }}>
                Already have an account? Sign in here
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{alignSelf: 'center', marginVertical: windowHeight * 0.1}}>
            <Button
              title={'Register'}
              filled={name && email && password ? true : false}
              onPress={() => handleRegister()}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  input: {
    paddingLeft: windowWidth * 0.03,
    width: windowWidth * 0.9,
    height: windowHeight * 0.06,
    marginVertical: windowHeight * 0.015,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.blueAqua,
  },
});

export default Register;
