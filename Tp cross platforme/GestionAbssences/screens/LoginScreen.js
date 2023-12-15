import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const backgroundImage = require('./1.jpg'); 

const App = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    fetch('http://192.168.40.249:3000/connexion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    })
      .then(response => {
        if (response.ok) {
          console.log('Connexion réussie!');
          navigation.navigate('Home'); 
        } else {
          console.log('Identifiants incorrects');
        }
      })
      .catch(error => {
        console.error('Erreur de connexion:', error);
      });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>

        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={login}
          onChangeText={(text) => setLogin(text)}
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Button title="Login" onPress={handleLogin} />

        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute', 
    top: 200,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginVertical: 8,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    color: 'white',
  },
  forgotPassword: {
    marginTop: 16,
    fontSize: 14,
    color: 'white',
  },
});

export default App;
