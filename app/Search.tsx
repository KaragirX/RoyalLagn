import React, { useMemo, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Search as SearchIcon } from "lucide-react-native";
import { vendorsByCategory } from "@/data/vendorData";

export default function SearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(
    Array.isArray(params.query) ? params.query[0] : params.query ?? ""
  );
  const vendors = useMemo(
    () =>
      Object.entries(vendorsByCategory).flatMap(([category, list]) =>
        list.map((vendor) => ({ ...vendor, category }))
      ),
    []
  );
  const results = query.trim()
    ? vendors.filter((vendor) =>
        `${vendor.name} ${vendor.category} ${vendor.location}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    : vendors.slice(0, 12);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      <View className="flex-row items-center px-4 py-3 border-b border-border">
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-muted items-center justify-center"
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} className="text-foreground" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-foreground ml-3">Search</Text>
      </View>
      <View className="mx-4 mt-4 flex-row items-center bg-card border border-border rounded-xl px-4">
        <SearchIcon size={18} className="text-muted-foreground" />
        <TextInput
          className="flex-1 py-3 ml-3 text-foreground"
          placeholder="Search vendors, categories..."
          placeholderTextColor="#A8A29E"
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40, gap: 12 }}>
        <Text className="text-sm text-muted-foreground">{results.length} results</Text>
        {results.map((vendor) => (
          <TouchableOpacity
            key={`${vendor.category}-${vendor.id}`}
            className="bg-card border border-border rounded-2xl p-3 flex-row"
            onPress={() =>
              router.push({
                pathname: "/VendorsProfile",
                params: { vendorId: vendor.id, category: vendor.category },
              })
            }
          >
            <Image source={{ uri: vendor.image }} className="w-20 h-20 rounded-xl" />
            <View className="ml-3 flex-1 justify-center">
              <Text className="text-foreground font-semibold">{vendor.name}</Text>
              <Text className="text-primary text-xs mt-1">{vendor.category}</Text>
              <Text className="text-muted-foreground text-xs mt-1">
                {vendor.location} · {vendor.startingPrice}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
