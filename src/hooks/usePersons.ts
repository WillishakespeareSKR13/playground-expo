import { usePersonsStore, usePersonStore } from "@/store/persons";
import { useMemo } from "react";

export const usePersons = () => {
  const store = usePersonsStore();
  return store;
};

export const usePerson = () => {
  const store = usePersonStore();

  const completed = useMemo(() => {
    if (!store.person) return false;
    const isCompleted =
      store.person.first_name !== "" &&
      store.person.last_name !== "" &&
      store.person.age !== 0;
    return isCompleted;
  }, [JSON.stringify(store.person)]);

  return { ...store, completed };
};
