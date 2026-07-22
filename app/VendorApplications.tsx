import React, { useCallback, useState } from "react";
import { ActivityIndicator, Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import { ArrowLeft, Building2, ChevronRight, MapPin } from "lucide-react-native";
import { supabase } from "@/services/supabase";

type Application = {
  id: string; business_name: string; full_name: string; city: string; logo_url: string;
  status: string; submitted_at: string; categories: { name: string } | null;
};

export default function VendorApplications() {
  const router = useRouter();
  const [items, setItems] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    const { data, error: queryError } = await supabase.from("vendor_applications")
      .select("id,business_name,full_name,city,logo_url,status,submitted_at,categories(name)")
      .eq("status", "pending").order("submitted_at", { ascending: false });
    if (queryError) setError(queryError.message); else setItems((data as unknown as Application[]) ?? []);
    setLoading(false);
  }, []);
  useFocusEffect(useCallback(() => { load(); }, [load]));

  return <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
    <View className="flex-row items-center px-5 py-4 border-b border-border"><TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full bg-card border border-border items-center justify-center"><ArrowLeft size={20} className="text-foreground" /></TouchableOpacity><View className="ml-4"><Text className="text-foreground text-xl font-bold">Vendor Applications</Text><Text className="text-muted-foreground text-xs">Pending registration requests</Text></View></View>
    {loading ? <View className="flex-1 items-center justify-center"><ActivityIndicator color="#EC4899" /></View> :
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }} refreshControl={<RefreshControl refreshing={loading} onRefresh={() => { setLoading(true); load(); }} />}>
        {error ? <Text className="text-destructive text-center mb-4">{error}</Text> : null}
        {!items.length && !error ? <View className="items-center py-20"><Building2 size={40} className="text-muted-foreground mb-4" /><Text className="text-foreground font-semibold">No pending applications</Text></View> : null}
        {items.map((item) => <View key={item.id} className="bg-card border border-border rounded-3xl p-4 mb-4">
          <View className="flex-row"><Image source={{ uri: item.logo_url }} className="w-16 h-16 rounded-2xl bg-muted" /><View className="flex-1 ml-4"><Text className="text-foreground font-bold text-base">{item.business_name}</Text><Text className="text-muted-foreground text-sm">{item.full_name} · {item.categories?.name ?? "Uncategorized"}</Text><View className="flex-row items-center mt-1"><MapPin size={13} className="text-primary" /><Text className="text-muted-foreground text-xs ml-1">{item.city}</Text></View></View><View className="bg-amber-500/15 px-2 py-1 rounded-full self-start"><Text className="text-amber-500 text-xs font-semibold">Pending</Text></View></View>
          <View className="flex-row items-center justify-between border-t border-border mt-4 pt-3"><Text className="text-muted-foreground text-xs">{new Date(item.submitted_at).toLocaleDateString()}</Text><TouchableOpacity className="flex-row items-center" onPress={() => router.push({ pathname: "/VendorApplicationDetails", params: { id: item.id } })}><Text className="text-primary font-semibold text-sm mr-1">View Details</Text><ChevronRight size={16} className="text-primary" /></TouchableOpacity></View>
        </View>)}
      </ScrollView>}
  </SafeAreaView>;
}
