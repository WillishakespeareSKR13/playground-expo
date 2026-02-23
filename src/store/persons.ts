import { Person } from "@/types/Person";
import { create } from "zustand";

interface PersonsStore {
  persons: Person[];
  add: (person: Person) => void;
  remove: (id: number) => void;
  edit: (person: Partial<Person>) => void;
}

export const usePersonsStore = create<PersonsStore>((set) => ({
  persons: [],
  add: (person) =>
    set((state) => ({
      persons: [...state.persons, person],
    })),
  remove: (id) =>
    set((state) => ({
      persons: state.persons.filter((p) => p.id !== id),
    })),
  edit: (updatedPerson) =>
    set((state) => ({
      persons: state.persons.map((p) =>
        p.id === updatedPerson.id ? { ...p, ...updatedPerson } : p
      ),
    })),
}));

interface PersonStore {
  errors: Record<string, string>;
  person: Person;
  edit: (person: Partial<Person>) => void;
  setErrors: (errors: Record<string, string>) => void;
  reset: () => void;
}

const DEFAULT_PERSON: Person = {
  id: 0,
  first_name: "",
  last_name: "",
  age: 0,
};

export const usePersonStore = create<PersonStore>((set, get) => ({
  person: DEFAULT_PERSON,
  errors: {},
  edit: (updatedPerson) =>
    set((state) => ({
      person: state.person
        ? { ...state.person, ...updatedPerson }
        : state.person,
    })),
  setErrors: (errors) =>
    set(() => ({
      errors,
    })),
  reset: () =>
    set(() => ({
      person: DEFAULT_PERSON,
      errors: {},
    })),
}));
