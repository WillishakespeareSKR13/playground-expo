import { PersonList } from "@/components/persons/List";
import { usePersons } from "@/hooks/usePersons";
import { useRouter } from "expo-router";
import { Text, TouchableHighlight, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const ScreenPersons = () => {
  const router = useRouter();
  const { persons } = usePersons();

  const handleAddPerson = () => {
    router.push("/create");
  };

  return (
    <View style={styles.container}>
      <PersonList persons={persons} />
      <View style={styles.footer}>
        <TouchableHighlight onPress={handleAddPerson} style={styles.button}>
          <Text style={styles.button_text}>Add Person</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.card,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: 32,
  },
  button_text: {
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
    fontWeight: "bold",
  },
}));

export default ScreenPersons;
