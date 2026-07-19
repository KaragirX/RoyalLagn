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
  Search,
  ChevronLeft,
  Heart,
  ChevronRight,
  Building2,
  UtensilsCrossed,
  Camera,
  Palette,
  Sparkles,
  Hand,
  Headphones,
  Shirt,
  User,
  Gem,
  BookOpen,
  Mail,
  Music,
  Filter,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useRouter } from "expo-router";

type Category = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  image: string;
};

const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Venues",
    description: "Banquets, Lawns, Resorts\n& more",
    icon: Building2,
    iconColor: "#F97316",
    iconBg: "#FFF3EA",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70",
  },
  {
    id: "2",
    name: "Caterers",
    description: "Delicious food for every\ncelebration",
    icon: UtensilsCrossed,
    iconColor: "#EC4899",
    iconBg: "#FFF0F7",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&auto=format&fit=crop&q=70",
  },
  {
    id: "3",
    name: "Photographers",
    description: "Capture your special\nmoments",
    icon: Camera,
    iconColor: "#3B82F6",
    iconBg: "#EFF6FF",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=70",
  },
  {
    id: "4",
    name: "Decorators",
    description: "Beautiful setups for\nyour events",
    icon: Palette,
    iconColor: "#22C55E",
    iconBg: "#F0FDF4",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70",
  },
  {
    id: "5",
    name: "Makeup Artists",
    description: "Look your best on\nyour big day",
    icon: Sparkles,
    iconColor: "#EF4444",
    iconBg: "#FFF1F1",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=70",
  },
  {
    id: "6",
    name: "Mehndi Artists",
    description: "Beautiful mehndi for\nyour special day",
    icon: Hand,
    iconColor: "#F97316",
    iconBg: "#FFF3EA",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70",
  },
  {
    id: "7",
    name: "DJs",
    description: "Music that makes your\nevent unforgettable",
    icon: Headphones,
    iconColor: "#8B5CF6",
    iconBg: "#F5F3FF",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=70",
  },
  {
    id: "8",
    name: "Bridal Wear",
    description: "Exquisite outfits for\nbeautiful brides",
    icon: Shirt,
    iconColor: "#EC4899",
    iconBg: "#FFF0F7",
    image: "https://images.unsplash.com/photo-1594552072238-b8f02c8f5c22?w=400&auto=format&fit=crop&q=70",
  },
  {
    id: "9",
    name: "Groom Wear",
    description: "Sherwanis, Suits &\nmore",
    icon: User,
    iconColor: "#3B82F6",
    iconBg: "#EFF6FF",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=70",
  },
  {
    id: "10",
    name: "Jewellery & Accessories",
    description: "Complete your look\nwith perfect jewellery",
    icon: Gem,
    iconColor: "#F59E0B",
    iconBg: "#FFFBEA",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&auto=format&fit=crop&q=70",
  },
  {
    id: "11",
    name: "Pandits",
    description: "Experienced pandits\nfor ceremonies",
    icon: BookOpen,
    iconColor: "#F97316",
    iconBg: "#FFF3EA",
    image: "https://images.unsplash.com/photo-1601128533718-374ffcca299b?w=400&auto=format&fit=crop&q=70",
  },
  {
    id: "12",
    name: "Invites & Cards",
    description: "Unique invitations &\nreturn gifts",
    icon: Mail,
    iconColor: "#8B5CF6",
    iconBg: "#F5F3FF",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&auto=format&fit=crop&q=70",
  },
  {
    id: "13",
    name: "Pre Wedding Shoot",
    description: "Capture memories before\nthe big day",
    icon: Camera,
    iconColor: "#3B82F6",
    iconBg: "#EFF6FF",
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop&q=70",
  },
  {
    id: "14",
    name: "Music & Dance",
    description: "Entertainment for every\nwedding occasion",
    icon: Music,
    iconColor: "#EC4899",
    iconBg: "#FFF0F7",
    image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&auto=format&fit=crop&q=70",
  },
];

export default function CategoriesScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const [query, setQuery] = useState("");

  const bg      = isDark ? "#141414" : "#FAFAFA";
  const card    = isDark ? "#1E1E1E" : "#FFFFFF";
  const text    = isDark ? "#F5F0F3" : "#141414";
  const muted   = isDark ? "#AAA0A5" : "#787178";
  const inputBg = isDark ? "#252525" : "#F4F4F4";
  const border  = isDark ? "#2A2A2A" : "#F0E8F2";

  const filtered = query.trim()
    ? CATEGORIES.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    : CATEGORIES;

  return (
    <SafeAreaView style={[s.root, { backgroundColor: bg }]} edges={["top"]}>

      {/* ── Header ── */}
      <View style={s.header}>
        <TouchableOpacity style={s.headerBtn} onPress={() => router.back()}>
          <ChevronLeft size={24} color={text} />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: text }]}>All Categories</Text>
        <TouchableOpacity style={s.headerBtn} onPress={() => router.push("/(tabs)/favorites")}>
          <Heart size={22} color={text} />
        </TouchableOpacity>
      </View>

      {/* ── Search bar ── */}
      <View style={s.searchPad}>
        <View style={[s.searchBar, { backgroundColor: inputBg }]}>
          <Search size={17} color={muted} style={{ marginRight: 8 }} />
          <TextInput
            style={[s.searchInput, { color: text }]}
            placeholder="Search categories..."
            placeholderTextColor={muted}
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <TouchableOpacity style={s.filterBtn} onPress={() => setQuery("")}>
          <Filter size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* ── List ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[s.list, { paddingBottom: 24 }]}
      >
        {filtered.map((cat) => {
          const Icon = cat.icon;
          const catIconBg = isDark ? cat.iconColor + "22" : cat.iconBg;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[s.row, { backgroundColor: card, borderColor: border }]}
              onPress={() =>
                router.push({
                  pathname: "/VendorsListing",
                  params: { category: cat.name },
                })
              }
              activeOpacity={0.82}
            >
              {/* Icon + text */}
              <View style={s.rowLeft}>
                <View style={[s.iconCircle, { backgroundColor: catIconBg }]}>
                  <Icon size={26} color={cat.iconColor} />
                </View>
                <View style={s.rowText}>
                  <Text style={[s.catName, { color: text }]}>{cat.name}</Text>
                  <Text style={[s.catDesc, { color: muted }]}>{cat.description}</Text>
                </View>
              </View>

              {/* Image + chevron */}
              <View style={s.rowRight}>
                <Image
                  source={{ uri: cat.image }}
                  style={s.catImg}
                  resizeMode="cover"
                />
                <View style={s.chevronCircle}>
                  <ChevronRight size={15} color="#141414" />
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
  root:          { flex: 1 },

  /* Header */
  header:        { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 10 },
  headerBtn:     { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  headerTitle:   { fontSize: 18, fontWeight: "700" },

  /* Search */
  searchPad:     { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, marginBottom: 14, gap: 10 },
  searchBar:     { flex: 1, flexDirection: "row", alignItems: "center", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10 },
  searchInput:   { flex: 1, fontSize: 13 },
  filterBtn:     { width: 44, height: 44, borderRadius: 12, backgroundColor: "#E91E63", alignItems: "center", justifyContent: "center" },

  /* List */
  list:          { paddingHorizontal: 16, gap: 10 },

  /* Row card */
  row:           { flexDirection: "row", alignItems: "center", borderRadius: 16, borderWidth: 1, overflow: "hidden", minHeight: 88 },
  rowLeft:       { flex: 1, flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 14, gap: 12 },
  iconCircle:    { width: 54, height: 54, borderRadius: 27, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  rowText:       { flex: 1 },
  catName:       { fontSize: 15, fontWeight: "700", marginBottom: 3 },
  catDesc:       { fontSize: 12, lineHeight: 17 },

  /* Image */
  rowRight:      { position: "relative", width: 110 },
  catImg:        { width: 110, height: 88 },
  chevronCircle: { position: "absolute", right: 10, top: "50%", marginTop: -16, width: 32, height: 32, borderRadius: 16, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOpacity: 0.14, shadowRadius: 4, shadowOffset: { width: 0, height: 1 }, elevation: 3 },
});
