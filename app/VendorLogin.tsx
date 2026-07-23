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
import { supabase } from "@/services/supabase";

export default function VendorLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const finishVendorConnection = async () => {
    const { error: claimError } = await supabase.rpc("claim_vendor_workspace");
    if (claimError) {
      if (__DEV__) console.error("Unable to claim Vendor workspace", claimError);
      setError("No Vendor application matches this email. Use the email submitted in your Vendor application.");
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError("Enter your Vendor email and password.");
      return;
    }
    setLoading(true);
    setError("");
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (signInError || !data.user) {
      if (__DEV__) console.error("Vendor Supabase sign-in failed", signInError);
      setError("We couldn’t connect this Vendor account. Check the email and password.");
      setLoading(false);
      return;
    }
    if (!await finishVendorConnection()) {
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }
    setLoading(false);
    router.replace("/vendor-dashboard");
  };
  const handleCreateAccount = async () => {
    if (!email.trim() || password.length < 6) {
      setError("Enter your Vendor application email and a password of at least 6 characters.");
      return;
    }
    setLoading(true);
    setError("");
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
    });
    if (signUpError) {
      if (__DEV__) console.error("Vendor Supabase sign-up failed", signUpError);
      setError("We couldn’t create this account. It may already exist—try Connect Vendor Account.");
      setLoading(false);
      return;
    }
    if (!data.session) {
      setError("Check your email and confirm the Supabase sign-up, then return and connect the account.");
      setLoading(false);
      return;
    }
    if (!await finishVendorConnection()) {
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }
    setLoading(false);
    router.replace("/vendor-dashboard");
  };

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
            disabled={loading}
          >
            <Text className="text-primary-foreground font-semibold text-base">{loading ? "Connecting…" : "Connect Vendor Account"}</Text>
          </Pressable>
          <Pressable
            className="border border-primary rounded-2xl py-4 items-center active:opacity-80"
            onPress={handleCreateAccount}
            disabled={loading}
          >
            <Text className="text-primary font-semibold text-base">Create Vendor Account</Text>
          </Pressable>
          {error ? <Text className="text-red-500 text-sm text-center">{error}</Text> : null}
          <Pressable className="py-3 items-center" onPress={() => router.replace("/vendor-dashboard")}>
            <Text className="text-muted-foreground text-sm">Continue in preview mode</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
