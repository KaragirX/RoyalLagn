import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Share,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeft,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  Calendar,
  Tag,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Clock,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getVendorById, categoryProfiles } from "@/data/vendorData";
import { useFavorites } from "@/context/FavoritesContext";


export default function VendorsProfile() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const params = useLocalSearchParams<{ vendorId?: string; category?: string }>();
  const vendorId = Array.isArray(params.vendorId) ? params.vendorId[0] : params.vendorId;
  const paramCat = Array.isArray(params.category) ? params.category[0] : params.category;

  const result = vendorId ? getVendorById(vendorId) : null;
  const vendor = result?.vendor;
  const category = result?.category ?? paramCat ?? "Photographers";
  const profile = categoryProfiles[category] ?? categoryProfiles["Photographers"];

  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = vendor ? isFavorite(vendor.id) : false;

  const [expanded, setExpanded] = useState(false);

  const bg      = isDark ? "#141414" : "#FFFFFF";
  const text    = isDark ? "#F5F0F3" : "#141414";
  const muted   = isDark ? "#AAA0A5" : "#787178";
  const border  = isDark ? "#2A2A2A" : "#F3D6E8";
  const pinkBg  = isDark ? "#252525" : "#FFF0F7";

  if (!vendor) {
    return (
      <View style={[styles.root, { backgroundColor: bg, justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: text, fontSize: 16 }}>Vendor not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16 }}>
          <Text style={{ color: "#E91E63", fontSize: 15 }}>← Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const aboutFull = profile.about(vendor.name);
  const aboutShort = aboutFull.slice(0, 120) + "...";

  const portfolioImgs = [vendor.image, ...profile.portfolioImages].slice(0, 4);

  const handleToggleFav = () => {
    toggleFavorite({
      id: vendor.id,
      name: vendor.name,
      category,
      rating: vendor.rating,
      reviews: vendor.reviews,
      priceLevel: vendor.priceLevel,
      startingPrice: vendor.startingPrice,
      location: vendor.location,
      tags: vendor.tags,
      image: vendor.image,
    });
  };
  const showPlaceholder = (title: string) =>
    Alert.alert(title, `${title} is available as a local frontend placeholder.`);
  const shareVendor = () =>
    Share.share({ message: `View ${vendor.name} on RoyalLagn — ${vendor.location}` });

  return (
    <View style={[styles.root, { backgroundColor: bg }]}>

      {/* ── Floating header ── */}
      <SafeAreaView edges={["top"]} style={styles.floatingHeader}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <ChevronLeft size={24} color="#141414" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={[styles.iconBtn, isFav && styles.iconBtnActive]} onPress={handleToggleFav}>
            <Heart size={20} color={isFav ? "#FFF" : "#141414"} fill={isFav ? "#E91E63" : "transparent"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={shareVendor}>
            <Share2 size={20} color="#141414" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* ── Hero image ── */}
        <View style={styles.heroWrap}>
          <Image source={{ uri: vendor.image }} style={styles.heroImg} resizeMode="cover" />
          <View style={styles.photoCounter}>
            <Text style={styles.photoCounterTxt}>📷  1/25</Text>
          </View>
        </View>

        {/* ── Content card ── */}
        <View style={[styles.content, { backgroundColor: bg }]}>

          {/* Name row */}
          <View style={styles.nameRow}>
            <View style={styles.nameLeft}>
              <View style={styles.nameWithBadge}>
                <Text style={[styles.vendorName, { color: text }]}>{vendor.name}</Text>
                <CheckCircle2 size={18} color="#1DA1F2" style={{ marginLeft: 6, marginTop: 2 }} />
              </View>
            </View>
            {vendor.isTopRated && (
              <View style={styles.topRatedBadge}>
                <Text style={styles.topRatedTxt}>Top Rated</Text>
              </View>
            )}
          </View>

          {/* Rating + location */}
          <View style={styles.ratingRow}>
            <Text style={styles.starEmoji}>⭐</Text>
            <Text style={[styles.ratingVal, { color: text }]}>{vendor.rating}</Text>
            <Text style={[styles.ratingReviews, { color: muted }]}> ({vendor.reviews} Reviews)</Text>
            <Text style={[styles.dot, { color: muted }]}> • </Text>
            <Text style={[styles.locationTxt, { color: muted }]}>{vendor.location}</Text>
          </View>

          {/* Specialty tags */}
          <Text style={[styles.specTags, { color: muted }]}>{vendor.tags.join(" • ")}</Text>

          {/* ── Action buttons ── */}
          <View style={styles.actionRow}>
            {[
              { icon: Phone,         label: "Call",      color: "#22C55E", bg: "#22C55E18", onPress: () => Linking.openURL("tel:+919876543210") },
              { icon: MessageCircle, label: "WhatsApp",  color: "#22C55E", bg: "#22C55E18", onPress: () => Linking.openURL("https://wa.me/919876543210") },
              { icon: MessageCircle, label: "Message",   color: "#E91E63", bg: "#E91E6318", onPress: () => Linking.openURL("sms:+919876543210") },
              { icon: Calendar,      label: "Enquire",   color: "#8B5CF6", bg: "#8B5CF618", onPress: () => showPlaceholder("Send Enquiry") },
            ].map(({ icon: Icon, label, color, bg: iconBg, onPress }) => (
              <TouchableOpacity key={label} style={styles.actionItem} onPress={onPress} activeOpacity={0.7}>
                <View style={[styles.actionCircle, { backgroundColor: iconBg }]}>
                  <Icon size={22} color={color} />
                </View>
                <Text style={[styles.actionLabel, { color: muted }]}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ── Packages banner ── */}
          <View style={[styles.packageBanner, { backgroundColor: pinkBg, borderColor: border }]}>
            <View style={styles.packageLeft}>
              <View style={[styles.packageIcon, { backgroundColor: "#E91E6318" }]}>
                <Tag size={18} color="#E91E63" />
              </View>
              <View>
                <Text style={[styles.packageFrom, { color: muted }]}>Packages Start From</Text>
                <Text style={[styles.packagePrice, { color: text }]}>{vendor.startingPrice}</Text>
                <Text style={[styles.packageSub, { color: muted }]}>Customize packages available</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.viewPkgBtn} onPress={() => showPlaceholder("Packages")}>
              <Text style={styles.viewPkgTxt}>View Packages</Text>
            </TouchableOpacity>
          </View>

          {/* ── About ── */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: text }]}>About</Text>
            <Text style={[styles.aboutText, { color: muted }]}>
              {expanded ? aboutFull : aboutShort}
            </Text>
            <TouchableOpacity style={styles.readMoreRow} onPress={() => setExpanded((v) => !v)}>
              <Text style={styles.readMore}>{expanded ? "Show Less" : "Read More"}</Text>
              <ChevronDown
                size={14}
                color="#E91E63"
                style={{ transform: [{ rotate: expanded ? "180deg" : "0deg" }] }}
              />
            </TouchableOpacity>
          </View>

          {/* ── Services ── */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: text }]}>Services</Text>
            <View style={styles.servicesWrap}>
              {profile.services.map((svc) => (
                <View
                  key={svc}
                  style={[styles.serviceChip, {
                    borderColor: border,
                    backgroundColor: isDark ? "#252525" : "#FFF",
                  }]}
                >
                  <Text style={[styles.serviceChipTxt, { color: isDark ? "#F5A0C0" : "#BE185D" }]}>{svc}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* ── Portfolio ── */}
          <View style={styles.section}>
            <View style={styles.portfolioHeader}>
              <Text style={[styles.sectionTitle, { color: text }]}>Portfolio</Text>
              <TouchableOpacity style={styles.viewAllRow} onPress={() => showPlaceholder("Portfolio")}>
                <Text style={styles.viewAllTxt}>View All</Text>
                <ChevronRight size={14} color="#E91E63" />
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.portfolioScroll}
            >
              {portfolioImgs.map((uri, i) => (
                <TouchableOpacity key={i} activeOpacity={0.85} onPress={() => Alert.alert("Portfolio Photo", `Photo ${i + 1} of ${portfolioImgs.length}`)}>
                  <Image source={{ uri }} style={styles.portfolioImg} resizeMode="cover" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

        </View>
      </ScrollView>

      {/* ── Sticky bottom bar ── */}
      <SafeAreaView
        edges={["bottom"]}
        style={[styles.bottomBar, { backgroundColor: bg, borderTopColor: border }]}
      >
        <View style={styles.bottomLeft}>
          <View style={styles.bottomPriceRow}>
            <Clock size={14} color="#E91E63" style={{ marginRight: 6 }} />
            <View>
              <Text style={[styles.bottomLabel, { color: muted }]}>Prices</Text>
              <Text style={[styles.bottomPrice, { color: text }]}>Starting from {vendor.startingPrice}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.quoteBtn} onPress={() => showPlaceholder("Request Quote")}>
          <Text style={styles.quoteBtnTxt}>Request Quote</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:             { flex: 1 },

  /* Floating header */
  floatingHeader:   { position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 8 },
  headerRight:      { flexDirection: "row", gap: 10 },
  iconBtn:          { width: 38, height: 38, borderRadius: 19, backgroundColor: "rgba(255,255,255,0.9)", alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 1 }, elevation: 3 },
  iconBtnActive:    { backgroundColor: "#E91E63" },

  /* Hero */
  heroWrap:         { width: "100%", height: 265 },
  heroImg:          { width: "100%", height: "100%" },
  photoCounter:     { position: "absolute", bottom: 30, left: 14, backgroundColor: "rgba(0,0,0,0.45)", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  photoCounterTxt:  { color: "#FFF", fontSize: 12, fontWeight: "600" },

  /* Content card */
  content:          { borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -22, paddingTop: 20, paddingHorizontal: 16 },

  /* Name */
  nameRow:          { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 },
  nameLeft:         { flex: 1, marginRight: 10 },
  nameWithBadge:    { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
  vendorName:       { fontSize: 19, fontWeight: "800", lineHeight: 26 },
  topRatedBadge:    { backgroundColor: "#FCE7F3", borderRadius: 50, paddingHorizontal: 12, paddingVertical: 5, marginTop: 2, flexShrink: 0 },
  topRatedTxt:      { color: "#E91E63", fontSize: 12, fontWeight: "700" },

  /* Rating */
  ratingRow:        { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  starEmoji:        { fontSize: 13 },
  ratingVal:        { fontSize: 14, fontWeight: "700", marginLeft: 3 },
  ratingReviews:    { fontSize: 13 },
  dot:              { fontSize: 13 },
  locationTxt:      { fontSize: 13 },

  specTags:         { fontSize: 13, marginBottom: 18 },

  /* Actions */
  actionRow:        { flexDirection: "row", justifyContent: "space-around", marginBottom: 18, paddingVertical: 4 },
  actionItem:       { alignItems: "center", gap: 6 },
  actionCircle:     { width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center" },
  actionLabel:      { fontSize: 12 },

  /* Package banner */
  packageBanner:    { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRadius: 16, borderWidth: 1, padding: 14, marginBottom: 22 },
  packageLeft:      { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  packageIcon:      { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  packageFrom:      { fontSize: 11, marginBottom: 2 },
  packagePrice:     { fontSize: 18, fontWeight: "800", marginBottom: 2 },
  packageSub:       { fontSize: 11 },
  viewPkgBtn:       { backgroundColor: "#E91E63", borderRadius: 50, paddingHorizontal: 16, paddingVertical: 10 },
  viewPkgTxt:       { color: "#FFF", fontSize: 13, fontWeight: "700" },

  /* Sections */
  section:          { marginBottom: 22 },
  sectionTitle:     { fontSize: 16, fontWeight: "700", marginBottom: 10 },

  /* About */
  aboutText:        { fontSize: 13, lineHeight: 21 },
  readMoreRow:      { flexDirection: "row", alignItems: "center", marginTop: 6, gap: 3 },
  readMore:         { color: "#E91E63", fontSize: 13, fontWeight: "600" },

  /* Services */
  servicesWrap:     { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  serviceChip:      { borderWidth: 1, borderRadius: 50, paddingHorizontal: 14, paddingVertical: 7 },
  serviceChipTxt:   { fontSize: 13, fontWeight: "500" },

  /* Portfolio */
  portfolioHeader:  { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  viewAllRow:       { flexDirection: "row", alignItems: "center", gap: 2 },
  viewAllTxt:       { color: "#E91E63", fontSize: 13, fontWeight: "600" },
  portfolioScroll:  { gap: 10 },
  portfolioImg:     { width: 110, height: 110, borderRadius: 12 },

  /* Bottom bar */
  bottomBar:        { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 14, paddingBottom: 14, borderTopWidth: 1, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: -2 }, elevation: 8 },
  bottomLeft:       { flex: 1 },
  bottomPriceRow:   { flexDirection: "row", alignItems: "center" },
  bottomLabel:      { fontSize: 11, marginBottom: 1 },
  bottomPrice:      { fontSize: 13, fontWeight: "700" },
  quoteBtn:         { backgroundColor: "#E91E63", borderRadius: 50, paddingHorizontal: 28, paddingVertical: 13 },
  quoteBtnTxt:      { color: "#FFF", fontSize: 15, fontWeight: "700" },
});
