import { usePersons } from "@/hooks/usePersons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Person } from "../../types/Person";

type Props = {
  person: Person;
};

export const PersonCard = (props: Props) => {
  const { person } = props;

  const { remove } = usePersons();

  const fullname = [person.first_name, person.last_name]
    .filter(Boolean)
    .join(" ");

  const handleDelete = () => {
    remove(person.id);
  };

  return (
    <View style={styles.card}>
      <View style={styles.wrapper}>
        <Text style={styles.fullname}>{fullname}</Text>
        <Text style={styles.age}>{person.age} years old</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.actions} onPress={handleDelete}>
          <FontAwesome name="trash" style={styles.action_icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  card: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: 8,
  },
  wrapper: {
    flexDirection: "column",
  },
  fullname: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
  age: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
  },
  actions: {
    flexDirection: "row",
    backgroundColor: `${theme.colors.error}33`,
    width: 32,
    height: 32,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
  },
  action_icon: {
    color: theme.colors.error,
    fontSize: 16,
  },
}));
