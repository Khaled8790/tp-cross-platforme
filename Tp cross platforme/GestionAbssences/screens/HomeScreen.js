import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const App = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://192.168.40.249:3000/etudiant');
          setData(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des données', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Données de la table MySQL :</Text>
        {data.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.itemContainer,
              { backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' },
            ]}
          >
            <Text style={styles.itemLabel}>ID:<Text style={styles.item}>{item.id}</Text></Text>
            
            <Text style={styles.itemLabel}>Nom: <Text style={styles.item}>{item.nom}</Text></Text>
             
            <Text style={styles.itemLabel}>Prénom: <Text style={styles.item}>{item.prenom}</Text></Text>
           
          </View>
        ))}
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
      backgroundColor: '#ecf0f1', 
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#2c3e50', 
    },
    itemContainer: {
      padding: 15,
      margin: 10,
      borderRadius: 10,
      width: '80%',
      borderColor: '#d5d8dc', 
      borderWidth: 1,
    },
    itemLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#3498db', 
    },
    item: {
      fontSize: 16,
      color: '#34495e', 
    },
  });
  
  export default App;