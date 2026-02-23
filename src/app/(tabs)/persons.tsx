import { PersonList } from "@/components/persons/List";
import { usePersons } from "@/hooks/usePersons";
import { Person } from "@/types/Person";
import { Text, TouchableHighlight, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const ScreenPersons = () => {
  const { persons, add } = usePersons();

  const handleAddPerson = () => {
    const MOCK_PERSON: Person = {
      id: Date.now(),
      first_name: "John",
      last_name: "Doe",
      age: 30,
    };
    add(MOCK_PERSON);
  };

  return (
    <View style={styles.container}>
      <PersonList persons={persons} />
      <TouchableHighlight onPress={handleAddPerson} style={styles.button}>
        <Text style={styles.button_text}>Add Person</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: 8,
  },
  button_text: {
    color: theme.colors.primary,
    fontSize: theme.typography.body.fontSize,
  },
}));

export default ScreenPersons;
