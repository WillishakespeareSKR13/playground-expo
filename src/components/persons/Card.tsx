import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Person } from "../../types/Person";

type Props = {
  person: Person;
};

export const PersonCard = (props: Props) => {
  const { person } = props;

  const fullname = [person.first_name, person.last_name]
    .filter(Boolean)
    .join(" ");

  return (
    <View style={styles.card}>
      <Text style={styles.fullname}>{fullname}</Text>
      <Text style={styles.age}>{person.age} years old</Text>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  card: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.sm,
    marginVertical: theme.spacing.sm,
    borderRadius: 8,
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fullname: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
  age: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
  },
}));
