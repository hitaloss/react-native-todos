import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Task } from "./TasksList";

import trashIcon from "../assets/icons/trash/trash.png";
import pen from "../assets/icons/pen/pen.png";
import Icon from "react-native-vector-icons/Feather";

interface TasksListProps {
  index: number;
  item: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, taskNewTitle: string) => void;
}

function TaskItem({
  index,
  item,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksListProps) {
  const [editFocus, setEditFocus] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(item.title);

  const textInputRef = useRef<TextInput>(null);

  const handleStartEditing = () => {
    setEditFocus(true);
  };

  const handleStopEditing = () => {
    setEditFocus(false);
  };

  const handleCancelEditing = () => {
    setEditTitle(item.title);
    handleStopEditing();
  };

  const handleSubmitEditing = () => {
    editTask(item.id, editTitle);
    handleStopEditing();
  };

  useEffect(() => {
    if (textInputRef.current) {
      if (editFocus) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [editFocus]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={editTitle}
            ref={textInputRef}
            editable={editFocus}
            onChangeText={setEditTitle}
            onSubmitEditing={handleSubmitEditing}
            style={item.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {editFocus ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity onPress={handleStartEditing}>
              <Image source={pen} />
            </TouchableOpacity>

            <View style={styles.iconsDivider} />

            <TouchableOpacity
              testID={`trash-${index}`}
              onPress={() => removeTask(item.id)}
            >
              <Image source={trashIcon} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    flex: 1,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 24,
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
    marginHorizontal: 12,
  },
});
export default TaskItem;
