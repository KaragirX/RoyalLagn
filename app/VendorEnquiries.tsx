import React, { useState } from "react";
import { ActivityIndicator, Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { CalendarDays, ChevronRight, Inbox, Mail, Phone, X } from "lucide-react-native";
import VendorHeader from "@/components/vendor/VendorHeader";
import { useAppTheme } from "@/components/ThemeProvider";
import { vendorTheme } from "@/components/vendor/VendorTheme";
import { useVendorWorkspace } from "@/hooks/useVendorWorkspace";
import { supabase } from "@/services/supabase";

const filters = ["all", "new", "contacted", "quoted", "booked"] as const;

export default function VendorEnquiries() {
  const { colorScheme } = useAppTheme();
  const colors = vendorTheme[colorScheme];
  const { data, loading, refresh } = useVendorWorkspace();
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [selected, setSelected] = useState<any>(null);
  const enquiries = filter === "all" ? data.enquiries : data.enquiries.filter((item) => item.status === filter);
  return <View style={[styles.page, { backgroundColor: colors.background }]}>
    <VendorHeader unread={data.notifications.filter((item) => !item.is_read).length} />
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={[styles.eyebrow, { color: colors.pink }]}>CUSTOMER INTEREST</Text>
      <Text style={[styles.title, { color: colors.text }]}>Enquiries</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Stay on top of conversations and move promising leads forward.</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {filters.map((item) => <Pressable key={item} onPress={() => setFilter(item)}
          style={[styles.filter, { borderColor: filter === item ? colors.pink : colors.border, backgroundColor: filter === item ? colors.surfaceSoft : colors.surface }]}>
          <Text style={{ color: filter === item ? colors.pink : colors.muted, fontWeight: "700", fontSize: 11, textTransform: "capitalize" }}>{item}</Text>
        </Pressable>)}
      </ScrollView>
      {loading ? <ActivityIndicator color={colors.pink} /> : enquiries.map((item) => <Pressable key={item.id} onPress={() => setSelected(item)} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.cardTop}><View style={[styles.avatar, { backgroundColor: colors.surfaceSoft }]}><Text style={{ color: colors.pink, fontWeight: "800" }}>{item.customer_name?.[0]?.toUpperCase() || "C"}</Text></View><View style={styles.flex}><Text style={[styles.name, { color: colors.text }]}>{item.customer_name}</Text><Text style={[styles.meta, { color: colors.muted }]}>{item.event_type || "Wedding enquiry"}</Text></View><Text style={[styles.status, { backgroundColor: colors.surfaceSoft, color: colors.pink }]}>{item.status}</Text></View>
        <Text style={[styles.message, { color: colors.muted }]}>{item.message}</Text>
        <View style={[styles.details, { borderTopColor: colors.border }]}>
          {item.event_date && <View style={styles.detail}><CalendarDays size={14} color={colors.muted} /><Text style={[styles.detailText, { color: colors.muted }]}>{item.event_date}</Text></View>}
          {item.customer_email && <View style={styles.detail}><Mail size={14} color={colors.muted} /><Text numberOfLines={1} style={[styles.detailText, { color: colors.muted }]}>{item.customer_email}</Text></View>}
          {item.customer_phone && <View style={styles.detail}><Phone size={14} color={colors.muted} /><Text style={[styles.detailText, { color: colors.muted }]}>{item.customer_phone}</Text></View>}
          <ChevronRight size={17} color={colors.pink} />
        </View>
      </Pressable>)}
      {!loading && !enquiries.length && <View style={[styles.empty, { backgroundColor: colors.surface, borderColor: colors.border }]}><Inbox size={30} color={colors.muted} /><Text style={[styles.emptyTitle, { color: colors.text }]}>No {filter === "all" ? "" : filter} enquiries</Text><Text style={[styles.emptyBody, { color: colors.muted }]}>Customer enquiries will appear here as soon as they contact your business.</Text></View>}
    </ScrollView>
    <Modal visible={Boolean(selected)} transparent animationType="fade" onRequestClose={() => setSelected(null)}><View style={styles.backdrop}><View style={[styles.sheet, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.sheetTop}><View style={styles.flex}><Text style={[styles.sheetTitle, { color: colors.text }]}>{selected?.customer_name}</Text><Text style={[styles.meta, { color: colors.muted }]}>{selected?.event_type || "Customer enquiry"}</Text></View><Pressable onPress={() => setSelected(null)}><X size={21} color={colors.text} /></Pressable></View>
      <Text style={[styles.sheetMessage, { color: colors.muted }]}>{selected?.message}</Text>
      <Text style={[styles.changeLabel, { color: colors.text }]}>Update enquiry status</Text>
      <View style={styles.statusGrid}>{["new", "contacted", "quoted", "booked", "closed"].map((status) => <Pressable key={status} onPress={async () => {
        const { error } = await supabase.from("vendor_enquiries").update({ status }).eq("id", selected.id).eq("vendor_id", data.vendor?.id);
        if (error) Alert.alert("Enquiry not updated", error.message); else { setSelected(null); await refresh(); }
      }} style={[styles.statusOption, { borderColor: selected?.status === status ? colors.pink : colors.border, backgroundColor: selected?.status === status ? colors.surfaceSoft : colors.background }]}>
        <Text style={{ color: selected?.status === status ? colors.pink : colors.text, fontSize: 10, fontWeight: "800", textTransform: "capitalize" }}>{status}</Text>
      </Pressable>)}</View>
    </View></View></Modal>
  </View>;
}

const styles = StyleSheet.create({
  page: { flex: 1 }, content: { width: "100%", maxWidth: 900, alignSelf: "center", padding: 16, paddingTop: 22, paddingBottom: 24 },
  eyebrow: { fontSize: 10, letterSpacing: 1.5, fontWeight: "800", marginBottom: 5 }, title: { fontSize: 29, fontWeight: "800", letterSpacing: -0.8 }, subtitle: { fontSize: 12, lineHeight: 18, marginTop: 4, maxWidth: 520 },
  filters: { gap: 8, paddingVertical: 18 }, filter: { height: 36, paddingHorizontal: 14, borderWidth: 1, borderRadius: 999, alignItems: "center", justifyContent: "center" },
  card: { borderWidth: 1, borderRadius: 21, padding: 15, marginBottom: 11 }, cardTop: { flexDirection: "row", alignItems: "center", gap: 10 }, avatar: { width: 40, height: 40, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  flex: { flex: 1, minWidth: 0 }, name: { fontSize: 13, fontWeight: "800" }, meta: { fontSize: 10, marginTop: 3 }, status: { overflow: "hidden", borderRadius: 999, paddingHorizontal: 9, paddingVertical: 6, fontSize: 9, fontWeight: "800", textTransform: "capitalize" },
  message: { fontSize: 12, lineHeight: 18, marginTop: 13 }, details: { borderTopWidth: StyleSheet.hairlineWidth, marginTop: 13, paddingTop: 11, flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 12 },
  detail: { flexDirection: "row", gap: 5, alignItems: "center", maxWidth: "46%" }, detailText: { fontSize: 10 }, empty: { borderWidth: 1, borderRadius: 23, alignItems: "center", padding: 32, marginTop: 6 },
  emptyTitle: { fontSize: 17, fontWeight: "800", marginTop: 12 }, emptyBody: { fontSize: 12, lineHeight: 18, textAlign: "center", maxWidth: 390, marginTop: 6 },
  backdrop: { flex: 1, backgroundColor: "rgba(15,8,12,.5)", justifyContent: "flex-end" }, sheet: { width: "100%", maxWidth: 520, alignSelf: "center", borderWidth: 1, borderRadius: 26, padding: 20, paddingBottom: 30 },
  sheetTop: { flexDirection: "row", alignItems: "flex-start", gap: 12 }, sheetTitle: { fontSize: 17, fontWeight: "800" }, sheetMessage: { fontSize: 12, lineHeight: 19, marginVertical: 18 },
  changeLabel: { fontSize: 11, fontWeight: "800", marginBottom: 9 }, statusGrid: { flexDirection: "row", flexWrap: "wrap", gap: 7 }, statusOption: { minWidth: "30%", flexGrow: 1, height: 42, borderWidth: 1, borderRadius: 13, alignItems: "center", justifyContent: "center" },
});
