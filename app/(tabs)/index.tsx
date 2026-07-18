import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  MapPin,
  Bell,
  Search,
  ChevronRight,
  Heart,
  Building2,
  UtensilsCrossed,
  Camera,
  Palette,
  Sparkles,
  Hand,
  Headphones,
  Shirt,
  User,
  MoreHorizontal,
  Star,
  SlidersHorizontal,
  BadgeCheck,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";

const PINK = "#E91E63";

const categories = [
  { id: "1",  name: "Venues",         icon: Building2,       color: "#F97316", bg: "#FFF3EA" },
  { id: "2",  name: "Caterers",       icon: UtensilsCrossed, color: "#EC4899", bg: "#FFF0F7" },
  { id: "3",  name: "Photographers",  icon: Camera,          color: "#3B82F6", bg: "#EFF6FF" },
  { id: "4",  name: "Decorators",     icon: Palette,         color: "#22C55E", bg: "#F0FDF4" },
  { id: "5",  name: "DJs",            icon: Headphones,      color: "#8B5CF6", bg: "#F5F3FF" },
  { id: "6",  name: "Makeup\nArtists",icon: Sparkles,        color: "#EF4444", bg: "#FFF1F1" },
  { id: "7",  name: "Mehndi\nArtists",icon: Hand,            color: "#F97316", bg: "#FFF3EA" },
  { id: "8",  name: "Bridal\nWear",   icon: Shirt,           color: "#EC4899", bg: "#FFF0F7" },
  { id: "9",  name: "Groom\nWear",    icon: User,            color: "#3B82F6", bg: "#EFF6FF" },
  { id: "15", name: "More\nCategories",icon: MoreHorizontal, color: "#6B7280", bg: "#F3F4F6" },
];

const popularVendors = [
  { id:"d1",  name:"Dream Decorators",         category:"Decorators",    rating:4.9, startingPrice:"₹45k", location:"Pune",  image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=80" },
  { id:"p1",  name:"Magic Moments Photography",category:"Photographers", rating:4.8, startingPrice:"₹25k", location:"Pune",  image:"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=80" },
  { id:"c1",  name:"Royal Caterers",           category:"Caterers",      rating:4.7, startingPrice:"₹35k", location:"Pune",  image:"https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&auto=format&fit=crop&q=80" },
  { id:"v1",  name:"Royal Mahal Banquet",      category:"Venues",        rating:4.9, startingPrice:"₹2.5L",location:"Lonavala",image:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=80" },
  { id:"m1",  name:"Glam Studio by Priya",     category:"Makeup Artists",rating:4.9, startingPrice:"₹15k", location:"Pune",  image:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80" },
  { id:"me1", name:"Henna Hands",              category:"Mehndi Artists",rating:4.9, startingPrice:"₹8k",  location:"Pune",  image:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=80" },
  { id:"dj1", name:"DJ RaJ Sound",             category:"DJs",           rating:4.9, startingPrice:"₹20k", location:"Pune",  image:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80" },
  { id:"bw1", name:"Rani Bridal House",        category:"Bridal Wear",   rating:4.9, startingPrice:"₹25k", location:"Pune",  image:"https://images.unsplash.com/photo-1594552072238-b8f02c8f5c22?w=400&auto=format&fit=crop&q=80" },
  { id:"gw1", name:"Nawab Sherwanis",          category:"Groom Wear",    rating:4.9, startingPrice:"₹20k", location:"Pune",  image:"https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=80" },
  { id:"pw1", name:"Love Stories Studio",      category:"Pre Wedding Shoot",rating:4.9,startingPrice:"₹20k",location:"Lonavala",image:"https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop&q=80" },
];

export default function HomeScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const { width: screenWidth } = useWindowDimensions();
  const heroCardWidth = screenWidth - 32;
  const heroHeight = Math.min(Math.round(heroCardWidth * (897 / 1754)), 240);
  const listBannerHeight = Math.min(Math.round(heroCardWidth * (887 / 1774)), 220);

  const bg     = isDark ? "#141414" : "#FFFFFF";
  const card   = isDark ? "#1E1E1E" : "#FFFFFF";
  const text   = isDark ? "#F5F0F3" : "#111827";
  const muted  = isDark ? "#AAA0A5" : "#6B7280";
  const border = isDark ? "#2A2A2A" : "#E5E7EB";

  const toggleFavorite = (id: string) =>
    setFavorites((p) => p.includes(id) ? p.filter((f) => f !== id) : [...p, id]);

  const catNameForNav = (name: string) => name.replace(/\n/g, " ");

  return (
    <SafeAreaView style={[s.root, { backgroundColor: bg }]} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* ── Header ── */}
        <View style={s.header}>
          <TouchableOpacity style={s.locRow}>
            <MapPin size={13} color={PINK} />
            <Text style={[s.locText, { color: muted }]}>Pune, Maharashtra</Text>
          </TouchableOpacity>

          <View style={s.logoWrap}>
            <Text style={s.logoText}>
              <Text style={s.logoPink}>Royal</Text>
              <Text style={[s.logoBlack, { color: text }]}>Lagn</Text>
            </Text>
          </View>

          <TouchableOpacity style={s.bellWrap}>
            <Bell size={22} color={text} />
            <View style={s.badge}><Text style={s.badgeTxt}>1</Text></View>
          </TouchableOpacity>
        </View>

        {/* ── Greeting ── */}
        <View style={s.greetPad}>
          <Text style={[s.greetSub, { color: muted }]}>Good Morning, Hrushikesh 👋</Text>
          <Text style={[s.greetTitle, { color: text }]}>
            {"Find your "}
            <Text style={s.greetPink}>perfect</Text>
            {"\nwedding team"}
          </Text>
        </View>

        {/* ── Search bar ── */}
        <View style={s.searchPad}>
          <View style={[s.searchBar, { backgroundColor: isDark ? "#252525" : "#F9FAFB", borderColor: border }]}>
            <Search size={16} color={muted} />
            <TextInput
              style={[s.searchInput, { color: text }]}
              placeholder="Search vendors, categories..."
              placeholderTextColor={muted}
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={() => router.push("/(tabs)/search" as any)}
              returnKeyType="search"
            />
          </View>
          <TouchableOpacity
            style={s.filterBtn}
            onPress={() => router.push("/(tabs)/search" as any)}
          >
            <SlidersHorizontal size={14} color={PINK} />
            <Text style={s.filterTxt}>Filters</Text>
          </TouchableOpacity>
        </View>

        {/* ── Hero Banner ── */}
        <View style={s.heroPad}>
          <View style={s.heroCard}>
            <Image
              source={require("../../assets/hero-banner.png")}
              style={[s.heroCardImg, { height: heroHeight }]}
              resizeMode="cover"
            />
            <LinearGradient
              colors={["rgba(0,0,0,0.82)", "rgba(0,0,0,0.50)", "rgba(0,0,0,0.0)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[StyleSheet.absoluteFill, s.heroOverlay]}
            >
              <View style={s.heroTextArea}>
                <Text style={s.heroTitle}>Plan Your</Text>
                <Text style={s.heroPinkTitle}>Dream Wedding</Text>
                <Text style={s.heroSub}>
                  Everything from venue to{"\n"}photography, we make it{"\n"}effortless for you.
                </Text>
                <TouchableOpacity
                  style={s.exploreBtn}
                  onPress={() => router.push("/(tabs)/Categories" as any)}
                >
                  <Text style={s.exploreTxt}>Explore Vendors</Text>
                  <ChevronRight size={14} color="#FFF" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
          <View style={s.dotsRow}>
            <View style={[s.dot, s.dotActive]} />
            <View style={s.dot} />
            <View style={s.dot} />
            <View style={s.dot} />
          </View>
        </View>

        {/* ── Top Categories ── */}
        <View style={s.section}>
          <View style={s.sectionHead}>
            <Text style={[s.sectionTitle, { color: text }]}>Top Categories</Text>
            <TouchableOpacity
              style={s.viewAllRow}
              onPress={() => router.push("/(tabs)/Categories" as any)}
            >
              <Text style={s.viewAll}>View All</Text>
              <ChevronRight size={13} color={PINK} />
            </TouchableOpacity>
          </View>

          <View style={s.catGrid}>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const catBg = isDark ? cat.color + "22" : cat.bg;
              const catBorder = isDark ? cat.color + "44" : cat.color + "33";
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={s.catItem}
                  onPress={() =>
                    cat.id === "15"
                      ? router.push("/(tabs)/Categories" as any)
                      : router.push({
                          pathname: "/VendorsListing" as any,
                          params: { category: catNameForNav(cat.name) },
                        })
                  }
                  activeOpacity={0.7}
                >
                  <View style={[s.catIconWrap, { backgroundColor: catBg, borderColor: catBorder }]}>
                    <Icon size={24} color={cat.color} />
                  </View>
                  <Text style={[s.catLabel, { color: isDark ? "#DDD0D8" : "#374151" }]} numberOfLines={2}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ── Popular Near You ── */}
        <View style={s.popularSection}>
          <View style={[s.sectionHead, { paddingHorizontal: 16 }]}>
            <Text style={[s.sectionTitle, { color: text }]}>Popular Near You</Text>
            <TouchableOpacity
              style={s.viewAllRow}
              onPress={() => router.push("/(tabs)/Categories" as any)}
            >
              <Text style={s.viewAll}>View All</Text>
              <ChevronRight size={13} color={PINK} />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.vendorScroll}
          >
            {popularVendors.map((v) => {
              const isFav = favorites.includes(v.id);
              return (
                <TouchableOpacity
                  key={v.id}
                  style={[s.vendorCard, { backgroundColor: card }]}
                  onPress={() =>
                    router.push({
                      pathname: "/VendorsProfile" as any,
                      params: { vendorId: v.id, category: v.category },
                    })
                  }
                  activeOpacity={0.88}
                >
                  {/* Image */}
                  <View style={s.vendorImgWrap}>
                    <Image source={{ uri: v.image }} style={s.vendorImg} resizeMode="cover" />

                    {/* Heart */}
                    <TouchableOpacity
                      style={[s.heartBtn, isFav && s.heartBtnActive]}
                      onPress={(e) => { e.stopPropagation(); toggleFavorite(v.id); }}
                    >
                      <Heart size={12} color="#FFF" fill={isFav ? "#FFF" : "transparent"} />
                    </TouchableOpacity>

                    {/* Bottom overlays */}
                    <View style={s.imgBottomRow}>
                      <View style={s.ratingBadge}>
                        <Star size={10} color="#FACC15" fill="#FACC15" />
                        <Text style={s.ratingBadgeTxt}>{v.rating}</Text>
                      </View>
                      <View style={s.verifiedBadge}>
                        <BadgeCheck size={10} color="#FFF" />
                        <Text style={s.verifiedTxt}>Verified</Text>
                      </View>
                    </View>
                  </View>

                  {/* Info */}
                  <View style={s.vendorInfo}>
                    <Text style={[s.vendorName, { color: text }]} numberOfLines={1}>{v.name}</Text>
                    <Text style={[s.vendorCat, { color: muted }]} numberOfLines={1}>{v.category}</Text>
                    <View style={s.vendorMeta}>
                      <MapPin size={10} color={muted} />
                      <Text style={[s.vendorLoc, { color: muted }]}>{v.location}</Text>
                      <Text style={[s.vendorPrice, { color: text }]}>{v.startingPrice} onwards</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* ── List Your Business ── */}
        <View style={s.listBanner}>
          <Image
            source={require("../../assets/list-business-bg.png")}
            style={{ width: heroCardWidth, height: listBannerHeight }}
            resizeMode="stretch"
          />
          <LinearGradient
            colors={isDark
              ? ["rgba(30,10,20,0.55)", "rgba(30,10,20,0.05)"]
              : ["rgba(255,240,247,0.30)", "rgba(255,240,247,0.0)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFill, s.listOverlay]}
          >
            <View style={s.listLeft}>
              <Text style={s.listTitle}>List Your Business</Text>
              <Text style={[s.listSub, { color: isDark ? "#FBCFE8" : "#BE185D" }]}>
                Join thousands of vendors{"\n"}growing with us
              </Text>
              <TouchableOpacity
                style={s.registerBtn}
                onPress={() => router.push("/vendor-dashboard" as any)}
              >
                <Text style={s.registerTxt}>Register Now</Text>
                <ChevronRight size={13} color="#FFF" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root:            { flex: 1 },
  scroll:          { paddingBottom: 24 },

  /* Header */
  header:          { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 6, paddingBottom: 4 },
  locRow:          { flexDirection: "row", alignItems: "center", gap: 4, flex: 1 },
  locText:         { fontSize: 12, fontWeight: "500" },
  logoWrap:        { flex: 1, alignItems: "center" },
  logoText:        { fontSize: 22, fontWeight: "900", letterSpacing: -0.5 },
  logoPink:        { color: PINK },
  logoBlack:       {},
  bellWrap:        { flex: 1, alignItems: "flex-end", position: "relative" },
  badge:           { position: "absolute", top: -3, right: -3, minWidth: 15, height: 15, borderRadius: 8, backgroundColor: "#EF4444", alignItems: "center", justifyContent: "center", paddingHorizontal: 3 },
  badgeTxt:        { color: "#FFF", fontSize: 8, fontWeight: "800" },

  /* Greeting */
  greetPad:        { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 },
  greetSub:        { fontSize: 12, fontWeight: "500", marginBottom: 2 },
  greetTitle:      { fontSize: 20, fontWeight: "800", lineHeight: 26 },
  greetPink:       { color: PINK, fontStyle: "italic" },

  /* Search */
  searchPad:       { paddingHorizontal: 16, flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16 },
  searchBar:       { flex: 1, flexDirection: "row", alignItems: "center", gap: 8, borderRadius: 50, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10 },
  searchInput:     { flex: 1, fontSize: 13, paddingVertical: 0 },
  filterBtn:       { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 50, borderWidth: 1.5, borderColor: PINK },
  filterTxt:       { color: PINK, fontSize: 13, fontWeight: "600" },

  /* Hero */
  heroPad:         { paddingHorizontal: 16, marginBottom: 10 },
  heroCard:        { borderRadius: 20, overflow: "hidden" },
  heroCardImg:     { width: "100%" },
  heroOverlay:     { flexDirection: "row", alignItems: "flex-end" },
  heroTextArea:    { width: "60%", padding: 16, paddingBottom: 18 },
  heroTitle:       { color: "#FFFFFF", fontSize: 20, fontWeight: "800" },
  heroPinkTitle:   { color: PINK, fontSize: 20, fontWeight: "800", marginBottom: 5 },
  heroSub:         { color: "rgba(255,255,255,0.90)", fontSize: 11, lineHeight: 16, marginBottom: 12 },
  exploreBtn:      { flexDirection: "row", alignItems: "center", backgroundColor: PINK, alignSelf: "flex-start", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 50, gap: 4 },
  exploreTxt:      { color: "#FFF", fontSize: 13, fontWeight: "700" },
  dotsRow:         { flexDirection: "row", gap: 5, marginTop: 10, justifyContent: "center" },
  dot:             { width: 7, height: 7, borderRadius: 4, backgroundColor: "#F9A8D4" },
  dotActive:       { backgroundColor: PINK, width: 20, borderRadius: 4 },

  /* Categories */
  section:         { paddingHorizontal: 16, marginBottom: 8 },
  sectionHead:     { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  sectionTitle:    { fontSize: 17, fontWeight: "700" },
  viewAllRow:      { flexDirection: "row", alignItems: "center", gap: 1 },
  viewAll:         { color: PINK, fontSize: 13, fontWeight: "600" },
  catGrid:         { flexDirection: "row", flexWrap: "wrap" },
  catItem:         { width: "20%", alignItems: "center", marginBottom: 18 },
  catIconWrap:     { width: 52, height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center", marginBottom: 6, borderWidth: 1 },
  catLabel:        { fontSize: 10, textAlign: "center", lineHeight: 14, fontWeight: "500" },

  /* Popular Near You */
  popularSection:  { marginBottom: 20 },
  vendorScroll:    { paddingHorizontal: 16, gap: 12 },
  vendorCard:      { width: 148, borderRadius: 14, overflow: "hidden", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 4 },
  vendorImgWrap:   { position: "relative" },
  vendorImg:       { width: "100%", height: 120 },
  heartBtn:        { position: "absolute", top: 7, right: 7, width: 26, height: 26, borderRadius: 13, backgroundColor: "rgba(0,0,0,0.35)", alignItems: "center", justifyContent: "center" },
  heartBtnActive:  { backgroundColor: PINK },
  imgBottomRow:    { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", padding: 7 },
  ratingBadge:     { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: "rgba(0,0,0,0.55)", paddingHorizontal: 6, paddingVertical: 3, borderRadius: 20 },
  ratingBadgeTxt:  { color: "#FFF", fontSize: 10, fontWeight: "700" },
  verifiedBadge:   { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: PINK, paddingHorizontal: 5, paddingVertical: 3, borderRadius: 20 },
  verifiedTxt:     { color: "#FFF", fontSize: 9, fontWeight: "700" },
  vendorInfo:      { padding: 8 },
  vendorName:      { fontSize: 12, fontWeight: "700", marginBottom: 1 },
  vendorCat:       { fontSize: 10, marginBottom: 5 },
  vendorMeta:      { flexDirection: "row", alignItems: "center", gap: 3 },
  vendorLoc:       { fontSize: 9, flex: 1 },
  vendorPrice:     { fontSize: 9, fontWeight: "600", color: PINK },

  /* List Your Business */
  listBanner:      { marginHorizontal: 16, borderRadius: 20, overflow: "hidden", marginBottom: 20 },
  listBannerImg:   { width: "100%" },
  listOverlay:     { justifyContent: "center" },
  listLeft:        { width: "55%", paddingLeft: 18, paddingVertical: 18 },
  listTitle:       { fontSize: 17, fontWeight: "800", color: PINK, marginBottom: 4 },
  listSub:         { fontSize: 12, lineHeight: 18, marginBottom: 14 },
  registerBtn:     { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: PINK, alignSelf: "flex-start", paddingHorizontal: 16, paddingVertical: 9, borderRadius: 50 },
  registerTxt:     { color: "#FFF", fontSize: 13, fontWeight: "700" },
});
