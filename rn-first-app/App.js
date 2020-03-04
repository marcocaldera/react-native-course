import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

export default function App() {

  // [var_name, function] = default_value
  const [courseGoals, setCourseGoals] = useState([])
  const [isAddMode, setIsAddMode] = useState(false)

  const addGoalHandler = (goalTitle) => {
    setCourseGoals(currentGoals => [...currentGoals, { key: Math.random().toString(), value: goalTitle }])
    setIsAddMode(false)
  }

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.key !== goalId)
    })
  }

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        <Button title='Add New Goal' onPress={() => setIsAddMode(true)}/>
        <GoalInput visible={isAddMode} onCancel={cancelGoalAdditionHandler} onAddGoal={addGoalHandler} />

        {/* Nella FlatList se l'oggetto/item ha un argomento key o id viene usato quello e non ci sono warning */}

        <FlatList
          data={courseGoals}
          renderItem={itemData =>
            <GoalItem
              id={itemData.item.key}
              onDelete={removeGoalHandler}
              title={itemData.item.value} />
          }
        />

        {/* ScrollView carica tutti gli elementi nella lista, anche quelli che vanno oltre la View
      quindi potrebbe essere molto dispendioso in termini di memoria se gli elementi sono tantissimi.
      In questi casi meglio la FlatList */}

        {/* <ScrollView>
        {courseGoals.map((goal, i) =>
          <View key={i} style={styles.listItem}>
            <Text>{goal}</Text>
            </View>
        )}
      </ScrollView> */}

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: '#f0f',
    padding: 50
  }
});
