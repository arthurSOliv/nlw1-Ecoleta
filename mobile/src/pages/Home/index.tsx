import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground, Image, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUFResponse{
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

interface PickerItem{
  label: string;
  value: string;
}

const Home = () => {
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const [ufs, setUfs] = useState<PickerItem[]>([]);
  const [cities, setCities] = useState<PickerItem[]>([]);

  const navigation = useNavigation();

  useEffect(()=>{
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
        const ufInitials = response.data.map(uf => ({
          label: uf.sigla,
          value: uf.sigla,
        }));

        setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (city === null) return;

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => ({
          label: city.nome,
          value: city.nome,
        }));
        setCities(cityNames);
      });
  }, [uf]);

  const placeholderUf = {
    label: 'Seleciona um Estado',
    value: null,
    color: '#9EA0A4',
  };

  const placeholderCity = {
    label: 'Seleciona uma Cidade',
    value: null,
    color: '#9EA0A4',
  };

  const pickerSelectStyles = StyleSheet.create({
    viewContainer: {
      borderWidth: 1,
      borderColor: '#fff',
      borderRadius: 8,
      marginBottom: 8,
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 2,
      height: 56,
    },
    iconContainer: {
      top: 18,
      right: 12,
      color: '#A0A0B2',
      opacity: 0.5
    },
  });

  function handleNavigateToPoints(){
    navigation.navigate('Points', {
      uf,
      city,
    });
  }

    return (
      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ImageBackground 
            source={require('../../assets/home-background.png')}
            style={styles.container}
            imageStyle={{width: 274, height: 368}}
        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />
                <View>
                  <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
                  <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
                </View>
            </View>

            <View style={styles.footer}>
              <RNPickerSelect 
                  style={ pickerSelectStyles }
                  placeholder={placeholderUf}
                  items={ufs}
                  onValueChange={(value) => setUf(value)}
              />
              <RNPickerSelect
                  style={ pickerSelectStyles }
                  placeholder={placeholderCity}
                  onValueChange={(value) => setCity(value)}
                  items={cities}
              />
              <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                <View style={styles.buttonIcon}>
                  <Text>
                    <Icon name="arrow-right" color="#FFF" size={24}></Icon>
                  </Text>
                </View>
                <Text style={styles.buttonText}>Entrar</Text>
              </RectButton>
            </View>

            
        </ImageBackground>
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

export default Home;