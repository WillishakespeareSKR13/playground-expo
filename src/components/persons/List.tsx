import { Person } from "@/types/Person";
import { FlatList } from "react-native";
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
    />
  );
};
