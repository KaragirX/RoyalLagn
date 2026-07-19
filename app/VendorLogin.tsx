import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";

export default function VendorLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => router.replace("/vendor-dashboard");

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        className="flex-1 justify-center px-6"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="items-center mb-10">
          <Text className="text-primary font-bold text-4xl mb-2">
            Royal<Text className="text-foreground">Lagn</Text>
          </Text>
          <Text className="text-muted-foreground text-base">Sign in to continue</Text>
        </View>

        <View className="gap-4">
          <View className="flex-row items-center bg-card border border-border rounded-2xl px-4">
            <Mail size={20} className="text-muted-foreground" />
            <TextInput
              className="flex-1 text-foreground py-4 ml-3"
              placeholder="Email address"
              placeholderTextColor="#A8A29E"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              returnKeyType="next"
            />
          </View>
          <View className="flex-row items-center bg-card border border-border rounded-2xl px-4">
            <Lock size={20} className="text-muted-foreground" />
            <TextInput
              className="flex-1 text-foreground py-4 ml-3"
              placeholder="Password"
              placeholderTextColor="#A8A29E"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={handleLogin}
              returnKeyType="done"
            />
          </View>
          <Pressable
            className="bg-primary rounded-2xl py-4 items-center active:opacity-90"
            onPress={handleLogin}
          >
            <Text className="text-primary-foreground font-semibold text-base">Login</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
