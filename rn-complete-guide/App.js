import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font'
import { AppLoading } from "expo";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

// Questa funzione non serve che venga renderizzata più volte quindi la chiamiamo fuori dal componente App
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {

  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)

  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    // AppLoading serve per bloccare il render dell'App fino a quando fetchFonts (che restituisce una promise) non ha
    // finito di eseguire. Quando ha finito viene chiamato onFinish
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />)
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0)
    setUserNumber(null)

  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber)
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds)
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOverScreen onRestart={configureNewGameHandler} userNumber={userNumber} roundsNumber={guessRounds} />
  }

  return (
    // Va messa nell'App.js, se si usa la Navigation se ne occupa in automatico lei e non serve aggiungere queste cose
    <SafeAreaView style={styles.screen}>
      <Header title={'Guess a number'} />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
