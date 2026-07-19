import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, ChevronRight, ImagePlus, Plus, Save, Send } from "lucide-react-native";

export type FrontendScreenMode =
  | "form"
  | "settings"
  | "list"
  | "gallery"
  | "help"
  | "info"
  | "reports";

type Field = { key: string; label: string; value: string };

type FrontendScreenProps = {
  title: string;
  subtitle: string;
  mode: FrontendScreenMode;
  fields?: Field[];
  items?: string[];
  content?: string[];
  onItemPress?: (item: string) => void;
};

export default function FrontendScreen({
  title,
  subtitle,
  mode,
  fields = [],
  items = [],
  content = [],
  onItemPress,
}: FrontendScreenProps) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((field) => [field.key, field.value]))
  );
  const [list, setList] = useState(items);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [settings, setSettings] = useState<Record<string, boolean>>(
    Object.fromEntries(items.map((item) => [item, true]))
  );

  const filtered = list.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  const save = () => Alert.alert(title, "Your changes were saved locally.");

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      <View className="flex-row items-center px-4 py-3 border-b border-border">
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-muted items-center justify-center"
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} className="text-foreground" />
        </TouchableOpacity>
        <View className="ml-3 flex-1">
          <Text className="text-xl font-bold text-foreground">{title}</Text>
          <Text className="text-xs text-muted-foreground">{subtitle}</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 48, gap: 16 }}
      >
        {mode === "form" && (
          <View className="bg-card border border-border rounded-2xl p-4 gap-4">
            {fields.map((field) => (
              <View key={field.key}>
                <Text className="text-xs text-muted-foreground mb-2">{field.label}</Text>
                <TextInput
                  className="bg-muted rounded-xl px-4 py-3 text-foreground"
                  value={values[field.key]}
                  onChangeText={(value) =>
                    setValues((current) => ({ ...current, [field.key]: value }))
                  }
                />
              </View>
            ))}
            <TouchableOpacity
              className="bg-primary rounded-xl py-3 flex-row items-center justify-center"
              onPress={save}
            >
              <Save size={17} color="#FFFFFF" />
              <Text className="text-white font-semibold ml-2">Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}

        {(mode === "list" || mode === "reports") && (
          <>
            <View className="flex-row gap-3">
              <TextInput
                className="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-foreground"
                placeholder={`Search ${title.toLowerCase()}...`}
                placeholderTextColor="#A8A29E"
                value={query}
                onChangeText={setQuery}
              />
              <TouchableOpacity
                className="w-12 bg-primary rounded-xl items-center justify-center"
                onPress={() => {
                  const next = `${title.replace(/ Management$/, "")} ${list.length + 1}`;
                  setList((current) => [...current, next]);
                }}
              >
                <Plus size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <View className="bg-card border border-border rounded-2xl overflow-hidden">
              {filtered.map((item, index) => (
                <TouchableOpacity
                  key={`${item}-${index}`}
                  className={`flex-row items-center p-4 ${
                    index < filtered.length - 1 ? "border-b border-border" : ""
                  }`}
                  onPress={() =>
                    onItemPress ? onItemPress(item) : Alert.alert(item, "Frontend details opened.")
                  }
                >
                  <View className="flex-1">
                    <Text className="text-foreground font-medium">{item}</Text>
                    <Text className="text-xs text-muted-foreground mt-1">
                      Tap to view or manage
                    </Text>
                  </View>
                  <ChevronRight size={18} className="text-muted-foreground" />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {mode === "settings" && (
          <View className="bg-card border border-border rounded-2xl overflow-hidden">
            {items.map((item, index) => (
              <TouchableOpacity
                key={item}
                className={`flex-row items-center p-4 ${
                  index < items.length - 1 ? "border-b border-border" : ""
                }`}
                onPress={() => {
                  if (onItemPress) {
                    onItemPress(item);
                    return;
                  }
                  setSettings((current) => ({ ...current, [item]: !current[item] }));
                }}
              >
                <View className="flex-1">
                  <Text className="text-foreground font-medium">{item}</Text>
                  <Text className="text-xs text-muted-foreground mt-1">
                    {settings[item] ? "Enabled" : "Disabled"}
                  </Text>
                </View>
                <View
                  className={`w-11 h-6 rounded-full p-1 ${
                    settings[item] ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <View
                    className={`w-4 h-4 rounded-full bg-white ${
                      settings[item] ? "self-end" : "self-start"
                    }`}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {mode === "gallery" && (
          <>
            <View className="flex-row flex-wrap gap-3">
              {list.map((item, index) => (
                <TouchableOpacity
                  key={`${item}-${index}`}
                  className="w-[47%] h-32 bg-card border border-border rounded-2xl items-center justify-center"
                  onPress={() => Alert.alert(item, "Gallery item selected.")}
                >
                  <ImagePlus size={28} className="text-primary" />
                  <Text className="text-foreground text-sm mt-2">{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              className="bg-primary rounded-xl py-3 flex-row items-center justify-center"
              onPress={() => setList((current) => [...current, `Gallery ${current.length + 1}`])}
            >
              <Plus size={18} color="#FFFFFF" />
              <Text className="text-white font-semibold ml-2">Add Media</Text>
            </TouchableOpacity>
          </>
        )}

        {mode === "help" && (
          <View className="bg-card border border-border rounded-2xl p-4 gap-4">
            {items.map((item) => (
              <TouchableOpacity
                key={item}
                className="bg-muted rounded-xl p-4 flex-row items-center"
                onPress={() => Alert.alert(item, "Help article opened.")}
              >
                <Text className="text-foreground flex-1">{item}</Text>
                <ChevronRight size={18} className="text-muted-foreground" />
              </TouchableOpacity>
            ))}
            <TextInput
              className="bg-muted rounded-xl px-4 py-3 text-foreground min-h-24"
              placeholder="How can we help?"
              placeholderTextColor="#A8A29E"
              multiline
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity
              className="bg-primary rounded-xl py-3 flex-row items-center justify-center"
              onPress={() => {
                Alert.alert("Support", "Your message was saved locally.");
                setMessage("");
              }}
            >
              <Send size={17} color="#FFFFFF" />
              <Text className="text-white font-semibold ml-2">Send Message</Text>
            </TouchableOpacity>
          </View>
        )}

        {mode === "info" &&
          content.map((paragraph, index) => (
            <View key={index} className="bg-card border border-border rounded-2xl p-4">
              <Text className="text-foreground leading-6">{paragraph}</Text>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
