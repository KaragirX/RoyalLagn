import React, { useState } from "react";
import { ActivityIndicator, Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { CircleDollarSign, Pencil, Plus, Trash2, Wrench, X } from "lucide-react-native";
import VendorHeader from "@/components/vendor/VendorHeader";
import { useAppTheme } from "@/components/ThemeProvider";
import { vendorTheme } from "@/components/vendor/VendorTheme";
import { useVendorWorkspace } from "@/hooks/useVendorWorkspace";
import { supabase } from "@/services/supabase";

export default function VendorServices() {
  const { colorScheme } = useAppTheme();
  const colors = vendorTheme[colorScheme];
  const { data, loading, refresh } = useVendorWorkspace();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [saving, setSaving] = useState(false);

  const open = (service?: any) => {
    setEditing(service ?? null); setTitle(service?.title ?? ""); setDescription(service?.description ?? "");
    setPrice(service?.price == null ? "" : String(service.price)); setModal(true);
  };
  const save = async () => {
    if (!data.vendor?.id) return Alert.alert("Vendor profile required", "Connect a Vendor profile before adding services.");
    if (!title.trim()) return Alert.alert("Service name required");
    const numericPrice = price.trim() ? Number(price) : null;
    if (numericPrice != null && (!Number.isFinite(numericPrice) || numericPrice < 0)) return Alert.alert("Enter a valid price");
    setSaving(true);
    const payload = { vendor_id: data.vendor.id, title: title.trim(), description: description.trim() || null, price: numericPrice };
    const result = editing
      ? await supabase.from("vendor_services").update(payload).eq("id", editing.id).eq("vendor_id", data.vendor.id)
      : await supabase.from("vendor_services").insert(payload);
    setSaving(false);
    if (result.error) return Alert.alert("Service not saved", result.error.message);
    setModal(false); await refresh();
  };
  const remove = (service: any) => Alert.alert("Delete service?", service.title, [
    { text: "Cancel", style: "cancel" },
    { text: "Delete", style: "destructive", onPress: async () => {
      const { error } = await supabase.from("vendor_services").delete().eq("id", service.id).eq("vendor_id", data.vendor?.id);
      if (error) Alert.alert("Service not deleted", error.message); else refresh();
    }},
  ]);
  const toggle = async (service: any) => {
    const { error } = await supabase.from("vendor_services").update({ is_active: !service.is_active }).eq("id", service.id).eq("vendor_id", data.vendor?.id);
    if (error) Alert.alert("Service not updated", error.message); else refresh();
  };
  return <View style={[styles.page, { backgroundColor: colors.background }]}>
    <VendorHeader unread={data.notifications.filter((item) => !item.is_read).length} />
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.heading}><View style={styles.flex}><Text style={[styles.eyebrow, { color: colors.pink }]}>YOUR OFFERING</Text><Text style={[styles.title, { color: colors.text }]}>Services & pricing</Text><Text style={[styles.subtitle, { color: colors.muted }]}>Keep packages clear so customers know what to ask about.</Text></View>
        <Pressable onPress={() => open()} style={[styles.primary, { backgroundColor: colors.pink }]}><Plus size={18} color="#FFF" /><Text style={styles.primaryText}>Service</Text></Pressable></View>
      {loading ? <ActivityIndicator color={colors.pink} style={{ marginTop: 40 }} /> : data.services.map((service) => <View key={service.id} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={[styles.serviceIcon, { backgroundColor: colors.surfaceSoft }]}><Wrench size={20} color={colors.pink} /></View>
        <View style={styles.flex}><View style={styles.nameRow}><Text style={[styles.name, { color: colors.text }]}>{service.title}</Text><Pressable onPress={() => toggle(service)} style={[styles.status, { backgroundColor: service.is_active ? `${colors.success}18` : colors.surfaceSoft }]}><Text style={{ color: service.is_active ? colors.success : colors.muted, fontSize: 9, fontWeight: "800" }}>{service.is_active ? "ACTIVE" : "HIDDEN"}</Text></Pressable></View>
          <Text numberOfLines={2} style={[styles.description, { color: colors.muted }]}>{service.description || "No description added yet."}</Text>
          <View style={styles.price}><CircleDollarSign size={14} color={colors.pink} /><Text style={{ color: colors.text, fontSize: 12, fontWeight: "800" }}>{service.price == null ? "Price on request" : `₹${Number(service.price).toLocaleString("en-IN")}`}</Text></View>
        </View>
        <View style={styles.actions}><Pressable accessibilityLabel="Edit service" onPress={() => open(service)} style={[styles.icon, { backgroundColor: colors.surfaceSoft }]}><Pencil size={16} color={colors.text} /></Pressable><Pressable accessibilityLabel="Delete service" onPress={() => remove(service)} style={[styles.icon, { backgroundColor: colors.surfaceSoft }]}><Trash2 size={16} color={colors.warning} /></Pressable></View>
      </View>)}
      {!loading && !data.services.length && <View style={[styles.empty, { backgroundColor: colors.surface, borderColor: colors.border }]}><Wrench size={29} color={colors.muted} /><Text style={[styles.emptyTitle, { color: colors.text }]}>Add your first service</Text><Text style={[styles.emptyText, { color: colors.muted }]}>Services and pricing contribute directly to profile completion.</Text></View>}
    </ScrollView>
    <Modal visible={modal} transparent animationType="fade" onRequestClose={() => setModal(false)}><View style={styles.backdrop}><View style={[styles.sheet, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.sheetTop}><Text style={[styles.sheetTitle, { color: colors.text }]}>{editing ? "Edit service" : "New service"}</Text><Pressable onPress={() => setModal(false)}><X size={21} color={colors.text} /></Pressable></View>
      <Text style={[styles.label, { color: colors.text }]}>Service name</Text><TextInput value={title} onChangeText={setTitle} placeholder="e.g. Candid photography" placeholderTextColor={colors.muted} style={[styles.input, { color: colors.text, backgroundColor: colors.background, borderColor: colors.border }]} />
      <Text style={[styles.label, { color: colors.text }]}>Description</Text><TextInput value={description} onChangeText={setDescription} multiline placeholder="What is included?" placeholderTextColor={colors.muted} style={[styles.input, styles.textarea, { color: colors.text, backgroundColor: colors.background, borderColor: colors.border }]} />
      <Text style={[styles.label, { color: colors.text }]}>Starting price (₹)</Text><TextInput value={price} onChangeText={setPrice} keyboardType="decimal-pad" placeholder="Optional" placeholderTextColor={colors.muted} style={[styles.input, { color: colors.text, backgroundColor: colors.background, borderColor: colors.border }]} />
      <Pressable disabled={saving} onPress={save} style={[styles.save, { backgroundColor: colors.pink }, saving && { opacity: .6 }]}>{saving ? <ActivityIndicator color="#FFF" /> : <Text style={styles.primaryText}>Save service</Text>}</Pressable>
    </View></View></Modal>
  </View>;
}

const styles = StyleSheet.create({
  page: { flex: 1 }, content: { width: "100%", maxWidth: 900, alignSelf: "center", padding: 16, paddingTop: 22, paddingBottom: 24 },
  heading: { flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: 20 }, flex: { flex: 1, minWidth: 0 }, eyebrow: { fontSize: 10, fontWeight: "800", letterSpacing: 1.5, marginBottom: 5 },
  title: { fontSize: 28, fontWeight: "800", letterSpacing: -.8 }, subtitle: { fontSize: 12, lineHeight: 18, marginTop: 4 }, primary: { minHeight: 42, borderRadius: 14, paddingHorizontal: 15, backgroundColor: "#E91E63", flexDirection: "row", alignItems: "center", gap: 7 }, primaryText: { color: "#FFF", fontSize: 12, fontWeight: "800" },
  card: { borderWidth: 1, borderRadius: 21, padding: 14, marginBottom: 10, flexDirection: "row", alignItems: "flex-start", gap: 11 }, serviceIcon: { width: 42, height: 42, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 8 }, name: { flex: 1, fontSize: 13, fontWeight: "800" }, status: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 5 }, description: { fontSize: 11, lineHeight: 16, marginTop: 4 },
  price: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 9 }, actions: { gap: 7 }, icon: { width: 34, height: 34, borderRadius: 11, alignItems: "center", justifyContent: "center" },
  empty: { borderWidth: 1, borderRadius: 23, padding: 32, alignItems: "center" }, emptyTitle: { fontSize: 17, fontWeight: "800", marginTop: 11 }, emptyText: { fontSize: 11, textAlign: "center", marginTop: 5 },
  backdrop: { flex: 1, backgroundColor: "rgba(15,8,12,.5)", justifyContent: "flex-end" }, sheet: { width: "100%", maxWidth: 520, alignSelf: "center", borderWidth: 1, borderRadius: 26, padding: 20, paddingBottom: 30 },
  sheetTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }, sheetTitle: { fontSize: 17, fontWeight: "800" }, label: { fontSize: 11, fontWeight: "700", marginBottom: 7 },
  input: { minHeight: 48, borderWidth: 1, borderRadius: 14, paddingHorizontal: 14, marginBottom: 14, fontSize: 13 }, textarea: { minHeight: 92, paddingTop: 12, textAlignVertical: "top" },
  save: { minHeight: 48, borderRadius: 15, alignItems: "center", justifyContent: "center", marginTop: 4 },
});
