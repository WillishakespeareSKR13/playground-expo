import { usePerson, usePersons } from "@/hooks/usePersons";
import React from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";

const REGEX_NAME = /^[a-zA-Z]+$/;
const REGEX_AGE = /^\d+$/;

export const CreatePerson = () => {
  const { add } = usePersons();
  const { person, edit, dirty, errors, setErrors, reset } = usePerson();

  const handleCreate = () => {
    if (!person) return;
    const { first_name, last_name, age } = person;
    const validFirstName = first_name && REGEX_NAME.test(first_name);
    const validLastName = last_name && REGEX_NAME.test(last_name);
    const validAge = age !== undefined && REGEX_AGE.test(age.toString());
    const isValid = validFirstName && validLastName && validAge;
    if (!isValid) {
      const newErrors: Record<string, string> = {};
      if (!validFirstName) newErrors.first_name = "Invalid first name";
      if (!validLastName) newErrors.last_name = "Invalid last name";
      if (!validAge) newErrors.age = "Invalid age";
      setErrors(newErrors);
      return;
    }
    add({ ...person, id: Date.now() });
    reset();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.wrapper}>
        <TextInput
          placeholder="First Name"
          value={person?.first_name || ""}
          onChangeText={(text) => edit({ ...person, first_name: text })}
        />
        {errors.first_name && (
          <Text style={styles.error}>{errors.first_name}</Text>
        )}
        <TextInput
          placeholder="Last Name"
          value={person?.last_name || ""}
          onChangeText={(text) => edit({ ...person, last_name: text })}
        />
        {errors.last_name && (
          <Text style={styles.error}>{errors.last_name}</Text>
        )}
        <TextInput
          placeholder="Age"
          value={person?.age ? person.age.toString() : ""}
          onChangeText={(text) => edit({ ...person, age: parseInt(text) || 0 })}
          keyboardType="numeric"
        />
        {errors.age && <Text style={styles.error}>{errors.age}</Text>}
      </View>
      <TouchableOpacity
        disabled={!dirty}
        onPress={handleCreate}
        style={styles.button}
      >
        <Text style={styles.button_text}>Create Person</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
  wrapper: {
    width: "100%",
    maxWidth: 400,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  error: {
    color: theme.colors.error,
    fontSize: theme.typography.caption.fontSize,
    marginTop: theme.spacing.xs,
  },
  button: {
    marginTop: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    alignItems: "center",
  },
  button_text: {
    color: theme.colors.primary,
    fontSize: theme.typography.body.fontSize,
    fontWeight: "bold",
  },
}));
