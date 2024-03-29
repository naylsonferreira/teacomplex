import React, {useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Text} from 'native-base';
import {Header, List} from '../../componets';
import {AuthContext} from '../../hooks/authContext';
import {LoadingScreen} from '../LoadingScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export const HomeScreen = ({navigation}) => {
  const {
    user,
    loadAllSkills,
    loadMySkills,
    loadAllGames,
    listaJogos,
    listaHabilidades,
    meusJogos,
    error,
  } = useContext(AuthContext);

  useEffect(() => {
    return loadMySkills(user.id);
  }, []);

  if (!listaJogos.length) {
    loadAllGames();
    return <LoadingScreen />;
  }

  if (!listaHabilidades.length) {
    loadAllSkills();
    return <LoadingScreen />;
  }

  let filteredGames = listaJogos;
  if (meusJogos?.length) {
    filteredGames = listaJogos.filter(({nome}) => meusJogos?.includes(nome));
  }

  return (
    <Container style={styles.container}>
      <Content>
        <Header navigation={navigation} title="TeaComplex" />
        {error && <Text style={styles.error}>{error}</Text>}
        <List lista={filteredGames} />
      </Content>
    </Container>
  );
};

export default HomeScreen;
