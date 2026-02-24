import { Person } from "@/types/Person";
import { FlatList } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { PersonCard } from "./Card";

type Props = {
  persons: Person[];
};

export const PersonList = (props: Props) => {
  const { persons } = props;

  return (
    <FlatList
      data={persons}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <PersonCard person={item} />}
      style={styles.list}
      contentContainerStyle={styles.list_content}
    />
  );
};

const styles = StyleSheet.create((theme) => ({
  list: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
  },
  list_content: {
    gap: theme.spacing.md,
  },
}));
