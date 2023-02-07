import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (newTaskTitle: string) => {
    const taskTitleCheck = tasks.find((item) => newTaskTitle === item.title);
    if (taskTitleCheck)
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState) => [...oldState, newTask]);
  };

  const handleToggleTaskDone = (id: number) => {
    const taskListChecked = tasks.map((task) => ({ ...task }));

    const taskIndex = taskListChecked.find((item) => item.id === id);

    if (taskIndex) taskIndex.done = !taskIndex.done;

    setTasks(taskListChecked);
  };

  const handleRemoveTask = (id: number) => {
    const taskListUpdated = tasks.filter((item) => item.id !== id);

    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: () => setTasks(taskListUpdated) },
      ],
      { cancelable: true }
    );
  };

  const handleEditTask = (taskId: number, taskNewTitle: string) => {
    const taskListChecked = tasks.map((task) => ({ ...task }));

    const taskIndex = taskListChecked.find((item) => item.id === taskId);

    if (taskIndex) taskIndex.title = taskNewTitle;

    setTasks(taskListChecked);
  };

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        editTask={handleEditTask}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
