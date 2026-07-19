import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeft,
  Heart,
  Search,
  MapPin,
  Star,
  ChevronDown,
  ArrowUpDown,
  Filter,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useFavorites } from "@/context/FavoritesContext";
import { vendorsByCategory, VendorItem } from "@/data/vendorData";

function getFallbackVendors(category: string): VendorItem[] {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `f${i + 1}`,
    name: `${category} Expert ${i + 1}`,
    rating: parseFloat((4.9 - i * 0.07).toFixed(1)),
    reviews: 120 - i * 10,
    priceLevel: i % 3 === 0 ? "₹ ₹ ₹" : i % 2 === 0 ? "₹" : "₹ ₹",
    location: ["Pune", "Mumbai", "Lonavala", "Nashik"][i % 4],
    tags: ["Premium", "Traditional", "Modern"].slice(0, (i % 3) + 1),
    startingPrice: `₹${(15 - i) * 1000}`,
    image: `https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70`,
    isTopRated: i === 0,
  }));
}

const FILTER_CHIPS = [
  { label: "Sort",   icon: ArrowUpDown, hasDropdown: false },
  { label: "Price",  icon: null,        hasDropdown: true  },
  { label: "Rating", icon: Star,        hasDropdown: true  },
  { label: "Budget", icon: null,        hasDropdown: true  },
];

export default function VendorsListingScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const { category, query: initialQuery } = useLocalSearchParams<{ category?: string; query?: string }>();

  const [query, setQuery] = useState(Array.isArray(initialQuery) ? initialQuery[0] : initialQuery ?? "");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  const displayCat = (Array.isArray(category) ? category[0] : category) || "Photographers";
  const vendors: VendorItem[] = vendorsByCategory[displayCat] ?? getFallbackVendors(displayCat);

  const filtered = query.trim()
    ? vendors.filter((v) => v.name.toLowerCase().includes(query.toLowerCase()))
    : vendors;

  const bg      = isDark ? "#141414" : "#FAFAFA";
  const card    = isDark ? "#1E1E1E" : "#FFFFFF";
  const text    = isDark ? "#F5F0F3" : "#141414";
  const muted   = isDark ? "#AAA0A5" : "#787178";
  const inputBg = isDark ? "#252525" : "#F4F4F4";
  const border  = isDark ? "#2A2A2A" : "#EEE4F0";

  const handleToggleFav = (vendor: VendorItem) => {
    toggleFavorite({
      id: vendor.id,
      name: vendor.name,
      category: displayCat,
      rating: vendor.rating,
      reviews: vendor.reviews,
      priceLevel: vendor.priceLevel,
      startingPrice: vendor.startingPrice,
      location: vendor.location,
      tags: vendor.tags,
      image: vendor.image,
    });
  };

  return (
    <SafeAreaView style={[s.root, { backgroundColor: bg }]} edges={["top"]}>

      {/* ── Header ── */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
          <ChevronLeft size={24} color={text} />
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={[s.headerTitle, { color: text }]}>{displayCat}</Text>
          <View style={s.locationRow}>
            <MapPin size={12} color="#E91E63" />
            <Text style={s.locationTxt}>Pune, Lonavala</Text>
          </View>
        </View>
        <View style={s.headerRight}>
          <TouchableOpacity onPress={() => router.push("/(tabs)/favorites")}>
            <Heart size={22} color={text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveFilter(activeFilter ? null : "Rating")}>
            <Filter size={22} color="#E91E63" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Search bar ── */}
      <View style={s.searchPad}>
        <View style={[s.searchBar, { backgroundColor: inputBg }]}>
          <Search size={17} color={muted} style={{ marginRight: 8 }} />
          <TextInput
            style={[s.searchInput, { color: text }]}
            placeholder={`Search ${displayCat.toLowerCase()}...`}
            placeholderTextColor={muted}
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      {/* ── Filter chips ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.filtersRow}
        style={s.filterScroll}
      >
        {FILTER_CHIPS.map((chip) => {
          const Icon = chip.icon;
          const active = activeFilter === chip.label;
          return (
            <TouchableOpacity
              key={chip.label}
              style={[
                s.chip,
                {
                  backgroundColor: active ? "#E91E63" : card,
                  borderColor: active ? "#E91E63" : border,
                },
              ]}
              onPress={() => setActiveFilter(active ? null : chip.label)}
            >
              {Icon && (
                <Icon
                  size={14}
                  color={active ? "#FFF" : chip.label === "Rating" ? "#EAB308" : "#E91E63"}
                  style={{ marginRight: 5 }}
                />
              )}
              <Text style={[s.chipTxt, { color: active ? "#FFF" : text }]}>{chip.label}</Text>
              {chip.hasDropdown && (
                <ChevronDown size={13} color={active ? "#FFF" : muted} style={{ marginLeft: 3 }} />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ── Results count ── */}
      <View style={s.resultsRow}>
        <Text style={[s.resultsCount, { color: text }]}>
          {vendors.length * 12}+ {displayCat} Found
        </Text>
        <TouchableOpacity style={s.popularRow} onPress={() => setActiveFilter(activeFilter === "Sort" ? null : "Sort")}>
          <Text style={s.popularTxt}>Popular</Text>
          <ChevronDown size={14} color="#E91E63" />
        </TouchableOpacity>
      </View>

      {/* ── Vendor list ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[s.list, { paddingBottom: 24 }]}
      >
        {filtered.map((vendor) => {
          const isFav = isFavorite(vendor.id);
          return (
            <TouchableOpacity
              key={vendor.id}
              style={[s.card, { backgroundColor: card, borderColor: border }]}
              onPress={() =>
                router.push({
                  pathname: "/VendorsProfile",
                  params: { vendorId: vendor.id, category: displayCat },
                })
              }
              activeOpacity={0.85}
            >
              {/* Image */}
              <View style={s.imgWrap}>
                <Image source={{ uri: vendor.image }} style={s.img} resizeMode="cover" />
                {vendor.isTopRated && (
                  <View style={s.topRatedBadge}>
                    <Text style={s.topRatedTxt}>Top Rated</Text>
                  </View>
                )}
              </View>

              {/* Content */}
              <View style={s.cardBody}>
                <View style={s.nameRow}>
                  <Text style={[s.vendorName, { color: text }]} numberOfLines={2}>
                    {vendor.name}
                  </Text>
                  <TouchableOpacity onPress={() => handleToggleFav(vendor)} style={s.heartBtn}>
                    <Heart
                      size={18}
                      color={isFav ? "#E91E63" : muted}
                      fill={isFav ? "#E91E63" : "transparent"}
                    />
                  </TouchableOpacity>
                </View>

                <View style={s.ratingRow}>
                  <Star size={13} color="#EAB308" fill="#EAB308" />
                  <Text style={[s.ratingVal, { color: text }]}> {vendor.rating}</Text>
                  <Text style={[s.ratingCount, { color: muted }]}> ({vendor.reviews})</Text>
                </View>

                <View style={s.metaRow}>
                  <Text style={[s.priceLevel, { color: text }]}>{vendor.priceLevel}</Text>
                  <Text style={[s.sep, { color: muted }]}> • </Text>
                  <Text style={[s.locationTxt2, { color: muted }]} numberOfLines={1}>
                    {vendor.location}
                  </Text>
                </View>

                <Text style={[s.tags, { color: muted }]} numberOfLines={1}>
                  {vendor.tags.join(" • ")}
                </Text>

                <View style={[s.priceBadge, { backgroundColor: isDark ? "#252525" : "#FFF0F7" }]}>
                  <Text style={s.priceBadgeTxt}>Starts from {vendor.startingPrice}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root:           { flex: 1 },

  header:         { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 10 },
  backBtn:        { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  headerCenter:   { flex: 1, alignItems: "center" },
  headerTitle:    { fontSize: 18, fontWeight: "700", marginBottom: 2 },
  locationRow:    { flexDirection: "row", alignItems: "center", gap: 3 },
  locationTxt:    { fontSize: 12, color: "#E91E63", fontWeight: "500" },
  headerRight:    { flexDirection: "row", gap: 14, alignItems: "center" },

  searchPad:      { paddingHorizontal: 16, marginBottom: 10 },
  searchBar:      { flexDirection: "row", alignItems: "center", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10 },
  searchInput:    { flex: 1, fontSize: 13 },

  filterScroll:   { marginBottom: 10 },
  filtersRow:     { paddingHorizontal: 16, gap: 8 },
  chip:           { flexDirection: "row", alignItems: "center", borderRadius: 50, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 8 },
  chipTxt:        { fontSize: 13, fontWeight: "500" },

  resultsRow:     { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, marginBottom: 10 },
  resultsCount:   { fontSize: 13, fontWeight: "600" },
  popularRow:     { flexDirection: "row", alignItems: "center", gap: 2 },
  popularTxt:     { color: "#E91E63", fontSize: 13, fontWeight: "600" },

  list:           { paddingHorizontal: 16 },

  card:           { flexDirection: "row", borderBottomWidth: 1, paddingVertical: 14, gap: 12 },
  imgWrap:        { position: "relative", width: 115, height: 130, borderRadius: 10, overflow: "hidden", flexShrink: 0 },
  img:            { width: "100%", height: "100%" },
  topRatedBadge:  { position: "absolute", top: 8, left: 0, backgroundColor: "#E91E63", paddingHorizontal: 8, paddingVertical: 4, borderTopRightRadius: 8, borderBottomRightRadius: 8 },
  topRatedTxt:    { color: "#FFF", fontSize: 10, fontWeight: "700" },

  cardBody:       { flex: 1, justifyContent: "space-between" },
  nameRow:        { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 },
  vendorName:     { fontSize: 15, fontWeight: "700", flex: 1, marginRight: 6, lineHeight: 20 },
  heartBtn:       { padding: 2 },

  ratingRow:      { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  ratingVal:      { fontSize: 13, fontWeight: "600" },
  ratingCount:    { fontSize: 12 },

  metaRow:        { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  priceLevel:     { fontSize: 13, fontWeight: "600" },
  sep:            { fontSize: 13 },
  locationTxt2:   { fontSize: 12, flex: 1 },

  tags:           { fontSize: 12, marginBottom: 8 },
  priceBadge:     { alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 50 },
  priceBadgeTxt:  { color: "#E91E63", fontSize: 12, fontWeight: "600" },
});
