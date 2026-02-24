import { usePerson, usePersons } from "@/hooks/usePersons";
import { useRouter } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";

const REGEX_NAME = /^[a-zA-Z]+$/;
const REGEX_AGE = /^\d+$/;

export const CreatePerson = () => {
  const router = useRouter();
  const { add } = usePersons();
  const { person, edit, completed, errors, setErrors, reset } = usePerson();

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
    router.back();
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboard} behavior="padding">
        <View style={styles.header}>
          <Text style={styles.title}>Create Person</Text>
        </View>
        <ScrollView
          style={styles.wrapper}
          contentContainerStyle={styles.wrapper_content}
        >
          <TextInput
            style={styles.input}
            placeholderTextColor={styles.placeholder.color}
            placeholder="First Name"
            value={person?.first_name || ""}
            onChangeText={(text) => edit({ ...person, first_name: text })}
          />
          {errors.first_name && (
            <Text style={styles.error}>{errors.first_name}</Text>
          )}
          <TextInput
            style={styles.input}
            placeholderTextColor={styles.placeholder.color}
            placeholder="Last Name"
            value={person?.last_name || ""}
            onChangeText={(text) => edit({ ...person, last_name: text })}
          />
          {errors.last_name && (
            <Text style={styles.error}>{errors.last_name}</Text>
          )}
          <TextInput
            style={styles.input}
            placeholderTextColor={styles.placeholder.color}
            placeholder="Age"
            value={person?.age ? person.age.toString() : ""}
            onChangeText={(text) =>
              edit({ ...person, age: parseInt(text) || 0 })
            }
            keyboardType="numeric"
          />
          {errors.age && <Text style={styles.error}>{errors.age}</Text>}
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <TouchableOpacity
          disabled={!completed}
          onPress={handleCreate}
          style={[styles.button, !completed && styles.button_disabled]}
        >
          <Text
            style={[
              styles.button_text,
              !completed && styles.button_text_disabled,
            ]}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
    paddingBottom: rt.insets.bottom,
    paddingTop: rt.insets.top,
  },
  keyboard: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
  },
  wrapper_content: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  error: {
    color: theme.colors.error,
    fontSize: theme.typography.caption.fontSize,
    marginTop: theme.spacing.xs,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.md,
  },
  button: {
    width: "100%",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    alignItems: "center",
  },
  button_disabled: {
    backgroundColor: theme.colors.card,
  },
  button_text: {
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
    fontWeight: "bold",
  },
  button_text_disabled: {
    color: theme.colors.textSecondary,
  },
  input: {
    width: "100%",
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
  },
  placeholder: {
    color: theme.colors.textSecondary,
  },
  header: {
    width: "100%",
    padding: theme.spacing.lg,
    justifyContent: "center",
  },
  title: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: "bold",
    color: theme.colors.text,
  },
}));
