import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Check, ChevronRight, CreditCard, Sparkles } from "lucide-react-native";
import VendorHeader from "@/components/vendor/VendorHeader";
import { useAppTheme } from "@/components/ThemeProvider";
import { vendorTheme } from "@/components/vendor/VendorTheme";
import { useVendorWorkspace } from "@/hooks/useVendorWorkspace";

export default function VendorSubscription() {
  const router = useRouter();
  const { colorScheme } = useAppTheme();
  const colors = vendorTheme[colorScheme];
  const { data } = useVendorWorkspace();
  const subscription = data.subscription;
  const plan = subscription?.plan_name || "Free";
  const status = subscription?.status || data.vendor?.subscription_status || "pending";
  const features = ["Public vendor profile", "Customer enquiry inbox", "Portfolio albums", "Availability calendar"];
  return <View style={[styles.page, { backgroundColor: colors.background }]}>
    <VendorHeader unread={data.notifications.filter((item) => !item.is_read).length} />
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={[styles.eyebrow, { color: colors.pink }]}>YOUR PLAN</Text><Text style={[styles.title, { color: colors.text }]}>Subscription</Text><Text style={[styles.subtitle, { color: colors.muted }]}>A clear view of the plan currently stored for your Vendor account.</Text>
      <View style={[styles.hero, { backgroundColor: colors.surfaceSoft, borderColor: colors.border }]}>
        <View style={[styles.planIcon, { backgroundColor: colors.pink }]}><Sparkles size={24} color="#FFF" /></View>
        <Text style={[styles.plan, { color: colors.text }]}>{plan}</Text><Text style={[styles.status, { color: colors.pink }]}>{String(status).toUpperCase()}</Text>
        {subscription?.end_date && <Text style={[styles.renewal, { color: colors.muted }]}>Current period ends {new Date(`${subscription.end_date}T12:00:00`).toLocaleDateString()}</Text>}
      </View>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Included workspace tools</Text>
        {features.map((feature) => <View key={feature} style={styles.feature}><View style={[styles.check, { backgroundColor: colors.surfaceSoft }]}><Check size={14} color={colors.success} /></View><Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text></View>)}
      </View>
      <Pressable onPress={() => router.push("/VendorHelp")} style={[styles.support, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={[styles.supportIcon, { backgroundColor: colors.surfaceSoft }]}><CreditCard size={19} color={colors.pink} /></View><View style={styles.flex}><Text style={[styles.supportTitle, { color: colors.text }]}>Plan or payment support</Text><Text style={[styles.supportText, { color: colors.muted }]}>Contact support before changing billing details.</Text></View><ChevronRight size={18} color={colors.muted} />
      </Pressable>
    </ScrollView>
  </View>;
}
const styles = StyleSheet.create({
  page: { flex: 1 }, content: { width: "100%", maxWidth: 720, alignSelf: "center", padding: 16, paddingTop: 22, paddingBottom: 24 }, eyebrow: { fontSize: 10, letterSpacing: 1.5, fontWeight: "800", marginBottom: 5 },
  title: { fontSize: 28, fontWeight: "800", letterSpacing: -.8 }, subtitle: { fontSize: 12, lineHeight: 18, marginTop: 4, marginBottom: 20 }, hero: { borderWidth: 1, borderRadius: 24, padding: 26, alignItems: "center" },
  planIcon: { width: 56, height: 56, borderRadius: 19, alignItems: "center", justifyContent: "center" }, plan: { fontSize: 25, fontWeight: "800", marginTop: 13, textTransform: "capitalize" }, status: { fontSize: 9, fontWeight: "800", letterSpacing: 1.3, marginTop: 5 },
  renewal: { fontSize: 10, marginTop: 9 }, card: { borderWidth: 1, borderRadius: 22, padding: 16, marginTop: 12 }, cardTitle: { fontSize: 14, fontWeight: "800", marginBottom: 11 },
  feature: { minHeight: 42, flexDirection: "row", alignItems: "center", gap: 9 }, check: { width: 28, height: 28, borderRadius: 10, alignItems: "center", justifyContent: "center" }, featureText: { fontSize: 11, fontWeight: "600" },
  support: { borderWidth: 1, borderRadius: 20, padding: 14, marginTop: 12, flexDirection: "row", alignItems: "center", gap: 11 }, supportIcon: { width: 41, height: 41, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  flex: { flex: 1 }, supportTitle: { fontSize: 12, fontWeight: "800" }, supportText: { fontSize: 10, marginTop: 3 },
});
