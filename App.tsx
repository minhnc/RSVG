/**
 * Sample SVG with React Native
 * https://github.com/minhnc
 *
 * @format
 */

import React, { Fragment, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';

import Svg, { Circle, Text as SVGText, Line } from 'react-native-svg';

type Task = {
  name: string;
  completed: boolean;
};

const App = () => {
  const [tasks, setTasks] = useState(randomTasks(10));

  const toggleTask = (index: number) => {
    let clonedTasks = [...tasks];
    clonedTasks[index].completed = !clonedTasks[index].completed;
    setTasks(clonedTasks);
  };

  const cR = 10;
  const distanceInterC = 40;
  const lineY1 = 20;
  const distanceOuterC = 80; // distanceInterC + cR * 2

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.taskContainer}>
          <Text>SVG TODO App</Text>
          <Svg
            viewBox={`0 0 10 ${tasks.length * distanceOuterC}`}
            width="100%"
            height={`${tasks.length * distanceOuterC}`}
            stroke="black"
            fill="white">
            <Line
              x1="10"
              y1={lineY1}
              x2="10"
              y2={tasks.length * distanceInterC - lineY1}
            />

            {tasks.map((task, index) => (
              <Fragment key={`fr-${index}`}>
                <Circle
                  key={`circle-${index}`}
                  onPress={() => toggleTask(index)}
                  cx="10"
                  cy={index * distanceInterC + lineY1}
                  r={cR}
                  fill={task.completed ? 'black' : 'white'}
                />

                <SVGText
                  key={`task-${index}`}
                  fontSize="16"
                  fill="black"
                  x="30"
                  y={index * distanceInterC + lineY1 + 5}>
                  {task.name}
                </SVGText>
              </Fragment>
            ))}
          </Svg>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const randomTasks = (num: number): Task[] =>
  [...Array(num)].map((_, index) => ({
    name: `Task ${index}`,
    completed: !!(index % 2),
  }));

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    margin: 24,
  },
});

export default App;
