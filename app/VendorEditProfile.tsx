import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";
import { Check, Save } from "lucide-react-native";
import VendorHeader from "@/components/vendor/VendorHeader";
import { useAppTheme } from "@/components/ThemeProvider";
import { vendorTheme } from "@/components/vendor/VendorTheme";
import { useVendorWorkspace } from "@/hooks/useVendorWorkspace";
import { supabase } from "@/services/supabase";

const fields: { key: string; label: string; placeholder: string; keyboardType?: any }[] = [
  { key: "business_name", label: "Business name", placeholder: "Your public business name" },
  { key: "owner_name", label: "Owner name", placeholder: "Business owner" },
  { key: "contact_email", label: "Contact email", placeholder: "hello@business.com", keyboardType: "email-address" },
  { key: "contact_phone", label: "Contact phone", placeholder: "+91 98765 43210", keyboardType: "phone-pad" },
  { key: "address", label: "Address", placeholder: "Street or area" },
  { key: "city", label: "City", placeholder: "City" },
  { key: "state", label: "State", placeholder: "State" },
  { key: "country", label: "Country", placeholder: "India" },
  { key: "pincode", label: "Pincode", placeholder: "Postal code", keyboardType: "number-pad" },
  { key: "website", label: "Website", placeholder: "https://yourbusiness.com", keyboardType: "url" },
  { key: "instagram", label: "Instagram", placeholder: "Instagram profile URL", keyboardType: "url" },
  { key: "facebook", label: "Facebook", placeholder: "Facebook page URL", keyboardType: "url" },
];

export default function VendorEditProfile() {
  const { width } = useWindowDimensions();
  const { colorScheme } = useAppTheme();
  const colors = vendorTheme[colorScheme];
  const { data, loading, refresh } = useVendorWorkspace();
  const [values, setValues] = useState<Record<string, string>>({});
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const twoColumns = width >= 700;

  useEffect(() => {
    if (!data.vendor) return;
    setValues(Object.fromEntries(fields.map(({ key }) => [key, data.vendor[key] ?? ""])));
    setDescription(data.vendor.description ?? "");
    setTags((data.vendor.tags ?? []).join(", "));
  }, [data.vendor]);

  const save = async () => {
    if (!data.vendor?.id) return Alert.alert("Vendor profile required", "Create or connect your Vendor profile before saving.");
    if (!values.business_name?.trim()) return Alert.alert("Business name required", "Enter the name customers should see.");
    setSaving(true);
    setSaved(false);
    const payload = {
      ...values,
      business_name: values.business_name.trim(),
      description: description.trim() || null,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    };
    const { error } = await supabase.from("vendors").update(payload).eq("id", data.vendor.id);
    setSaving(false);
    if (error) return Alert.alert("Profile not saved", error.message);
    await refresh();
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return <View style={[styles.page, { backgroundColor: colors.background }]}>
    <VendorHeader unread={data.notifications.filter((item) => !item.is_read).length} />
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
      <Text style={[styles.eyebrow, { color: colors.pink }]}>BUSINESS IDENTITY</Text>
      <Text style={[styles.title, { color: colors.text }]}>Edit profile</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Keep the information customers use to discover and contact you accurate.</Text>
      {loading && !data.vendor ? <ActivityIndicator color={colors.pink} style={{ marginTop: 40 }} /> :
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.grid}>
          {fields.map((field) => <View key={field.key} style={{ width: twoColumns ? "48.7%" : "100%" }}>
            <Text style={[styles.label, { color: colors.text }]}>{field.label}</Text>
            <TextInput value={values[field.key] ?? ""} onChangeText={(value) => setValues((current) => ({ ...current, [field.key]: value }))}
              placeholder={field.placeholder} placeholderTextColor={colors.muted} keyboardType={field.keyboardType as any}
              autoCapitalize={field.keyboardType === "email-address" || field.keyboardType === "url" ? "none" : "sentences"}
              style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]} />
          </View>)}
          <View style={{ width: "100%" }}><Text style={[styles.label, { color: colors.text }]}>About the business</Text>
            <TextInput value={description} onChangeText={setDescription} multiline maxLength={1200} placeholder="Describe your experience, style and what customers can expect." placeholderTextColor={colors.muted}
              style={[styles.input, styles.textarea, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]} />
            <Text style={[styles.counter, { color: colors.muted }]}>{description.length}/1200</Text>
          </View>
          <View style={{ width: "100%" }}><Text style={[styles.label, { color: colors.text }]}>Search tags</Text>
            <TextInput value={tags} onChangeText={setTags} placeholder="wedding, candid, pune" placeholderTextColor={colors.muted}
              style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]} />
            <Text style={[styles.hint, { color: colors.muted }]}>Separate tags with commas.</Text>
          </View>
        </View>
        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          {saved && <View style={styles.saved}><Check size={16} color={colors.success} /><Text style={{ color: colors.success, fontSize: 11, fontWeight: "700" }}>Saved</Text></View>}
          <Pressable disabled={saving} onPress={save} style={({ pressed }) => [styles.save, { backgroundColor: colors.pink }, pressed && { transform: [{ scale: 0.98 }] }, saving && { opacity: 0.6 }]}>
            {saving ? <ActivityIndicator color="#FFF" /> : <><Save size={17} color="#FFF" /><Text style={styles.saveText}>Save profile</Text></>}
          </Pressable>
        </View>
      </View>}
    </ScrollView>
  </View>;
}

const styles = StyleSheet.create({
  page: { flex: 1 }, content: { width: "100%", maxWidth: 960, alignSelf: "center", padding: 16, paddingTop: 22, paddingBottom: 24 },
  eyebrow: { fontSize: 10, letterSpacing: 1.5, fontWeight: "800", marginBottom: 5 }, title: { fontSize: 29, fontWeight: "800", letterSpacing: -0.8 },
  subtitle: { fontSize: 12, lineHeight: 18, marginTop: 4, maxWidth: 600 }, card: { borderWidth: 1, borderRadius: 24, padding: 16, marginTop: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 }, label: { fontSize: 11, fontWeight: "700", marginBottom: 7 },
  input: { minHeight: 48, borderWidth: 1, borderRadius: 14, paddingHorizontal: 14, fontSize: 13 },
  textarea: { minHeight: 126, paddingTop: 13, textAlignVertical: "top" }, counter: { position: "absolute", right: 10, bottom: 8, fontSize: 9 },
  hint: { fontSize: 9, marginTop: 5 }, footer: { borderTopWidth: StyleSheet.hairlineWidth, marginTop: 18, paddingTop: 16, flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 12 },
  saved: { flexDirection: "row", gap: 5, alignItems: "center" }, save: { minWidth: 150, minHeight: 46, paddingHorizontal: 18, borderRadius: 15, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  saveText: { color: "#FFF", fontSize: 12, fontWeight: "800" },
});
