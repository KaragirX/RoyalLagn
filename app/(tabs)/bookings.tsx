import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Star,
  Phone,
  MessageCircle,
  XCircle,
  CheckCircle,
  Calendar as CalendarIcon,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";

type BookingStatus = "upcoming" | "completed" | "cancelled";

type Booking = {
  id: string;
  vendorName: string;
  category: string;
  image: string;
  date: string;
  time: string;
  location: string;
  status: BookingStatus;
  rating?: number;
  amount: string;
};

const bookingsData: Booking[] = [
  {
    id: "1",
    vendorName: "Dream Decorators",
    category: "Decorators",
    image:
      "https://images.unsplash.com/photo-1727189899461-b888a5890287?w=400&auto=format&fit=crop&q=60",
    date: "15 Dec 2025",
    time: "10:00 AM",
    location: "Grand Palace, Lonavala",
    status: "upcoming",
    amount: "₹45,000",
  },
  {
    id: "2",
    vendorName: "Magic Moments",
    category: "Photographers",
    image:
      "https://images.unsplash.com/photo-1635099404457-91c3d0dade3b?w=400&auto=format&fit=crop&q=60",
    date: "20 Nov 2025",
    time: "9:00 AM",
    location: "Royal Garden, Pune",
    status: "upcoming",
    amount: "₹35,000",
  },
  {
    id: "3",
    vendorName: "Royal Caterers",
    category: "Caterers",
    image:
      "https://images.unsplash.com/photo-1564393333316-a1a043196554?w=400&auto=format&fit=crop&q=60",
    date: "10 Oct 2025",
    time: "12:00 PM",
    location: "Sunset Resort, Mumbai",
    status: "completed",
    rating: 4.8,
    amount: "₹60,000",
  },
  {
    id: "4",
    vendorName: "Melody Makers",
    category: "DJs",
    image:
      "https://images.unsplash.com/photo-1629216509258-4dbd7880e605?w=400&auto=format&fit=crop&q=60",
    date: "05 Sep 2025",
    time: "7:00 PM",
    location: "Ocean View, Goa",
    status: "cancelled",
    amount: "₹25,000",
  },
  {
    id: "5",
    vendorName: "Elegant Invites",
    category: "Invites & Cards",
    image:
      "https://images.unsplash.com/photo-1600675608140-991fcf38cc6e?w=400&auto=format&fit=crop&q=60",
    date: "25 Aug 2025",
    time: "3:00 PM",
    location: "Studio, Pune",
    status: "completed",
    rating: 4.5,
    amount: "₹15,000",
  },
];

export default function BookingsScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const [activeTab, setActiveTab] = useState<BookingStatus>("upcoming");

  const filteredBookings = bookingsData.filter(
    (booking) => booking.status === activeTab
  );

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case "upcoming":
        return isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-700";
      case "completed":
        return isDark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-700";
      case "cancelled":
        return isDark ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-700";
    }
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case "upcoming":
        return <CalendarIcon size={14} />;
      case "completed":
        return <CheckCircle size={14} />;
      case "cancelled":
        return <XCircle size={14} />;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <Text className="text-3xl font-bold text-foreground">My Bookings</Text>
          <Text className="text-muted-foreground mt-1">
            Manage your wedding vendor bookings
          </Text>
        </View>

        {/* Tabs */}
        <View className="px-6 mb-6">
          <View className="flex-row bg-muted rounded-full p-1">
            {(["upcoming", "completed", "cancelled"] as BookingStatus[]).map(
              (tab) => (
                <Pressable
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-full items-center ${
                    activeTab === tab ? "bg-primary shadow-sm" : ""
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      activeTab === tab
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Text>
                </Pressable>
              )
            )}
          </View>
        </View>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <View className="px-6 gap-4">
            {filteredBookings.map((booking) => (
              <Pressable
                key={booking.id}
                className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border"
              >
                {/* Status Badge */}
                <View className="flex-row justify-between items-center p-4 border-b border-border">
                  <View
                    className={`flex-row items-center px-3 py-1 rounded-full ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {getStatusIcon(booking.status)}
                    <Text className="text-xs font-medium ml-1 capitalize">
                      {booking.status}
                    </Text>
                  </View>
                  <Text className="text-foreground font-semibold">{booking.amount}</Text>
                </View>

                {/* Booking Content */}
                <View className="p-4">
                  <View className="flex-row">
                    <Image
                      source={{ uri: booking.image }}
                      className="w-20 h-20 rounded-xl"
                      resizeMode="cover"
                    />
                    <View className="flex-1 ml-4">
                      <Text className="text-muted-foreground text-xs mb-1">
                        {booking.category}
                      </Text>
                      <Text className="text-foreground font-semibold text-base mb-2">
                        {booking.vendorName}
                      </Text>

                      {/* Date & Time */}
                      <View className="flex-row items-center mb-1.5">
                        <Calendar size={14} className="text-muted-foreground mr-1.5" />
                        <Text className="text-muted-foreground text-xs">
                          {booking.date}
                        </Text>
                        <Clock size={14} className="text-muted-foreground ml-3 mr-1.5" />
                        <Text className="text-muted-foreground text-xs">
                          {booking.time}
                        </Text>
                      </View>

                      {/* Location */}
                      <View className="flex-row items-center">
                        <MapPin size={14} className="text-muted-foreground mr-1.5" />
                        <Text className="text-muted-foreground text-xs" numberOfLines={1}>
                          {booking.location}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Rating for completed bookings */}
                  {booking.status === "completed" && booking.rating && (
                    <View className="flex-row items-center mt-3 pt-3 border-t border-border">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <Text className="text-foreground text-sm font-medium ml-1.5">
                        {booking.rating}
                      </Text>
                      <Text className="text-muted-foreground text-xs ml-1">
                        Rating
                      </Text>
                    </View>
                  )}

                  {/* Action Buttons */}
                  <View className="flex-row gap-3 mt-4">
                    {booking.status === "upcoming" && (
                      <>
                        <Pressable className="flex-1 flex-row items-center justify-center py-2.5 bg-muted rounded-xl">
                          <Phone size={16} className="text-foreground mr-2" />
                          <Text className="text-foreground text-sm font-medium">
                            Call
                          </Text>
                        </Pressable>
                        <Pressable className="flex-1 flex-row items-center justify-center py-2.5 bg-muted rounded-xl">
                          <MessageCircle size={16} className="text-foreground mr-2" />
                          <Text className="text-foreground text-sm font-medium">
                            Chat
                          </Text>
                        </Pressable>
                      </>
                    )}
                    {booking.status === "completed" && (
                      <Pressable className="flex-1 flex-row items-center justify-center py-2.5 bg-primary rounded-xl">
                        <Text className="text-primary-foreground text-sm font-medium">
                          Book Again
                        </Text>
                      </Pressable>
                    )}
                    {booking.status === "cancelled" && (
                      <Pressable className="flex-1 flex-row items-center justify-center py-2.5 bg-muted rounded-xl">
                        <Text className="text-foreground text-sm font-medium">
                          View Details
                        </Text>
                      </Pressable>
                    )}
                    <Pressable className="w-12 flex-row items-center justify-center py-2.5 bg-muted rounded-xl">
                      <ChevronRight size={20} className="text-muted-foreground" />
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
          /* Empty State */
          <View className="flex-1 items-center justify-center px-6 mt-20">
            <View className="w-24 h-24 bg-muted rounded-full items-center justify-center mb-6">
              <Calendar size={40} className="text-muted-foreground" />
            </View>
            <Text className="text-foreground text-xl font-semibold mb-2">
              No {activeTab} bookings
            </Text>
            <Text className="text-muted-foreground text-center text-sm mb-6">
              {activeTab === "upcoming"
                ? "You don't have any upcoming bookings yet."
                : activeTab === "completed"
                ? "You haven't completed any bookings yet."
                : "You haven't cancelled any bookings."}
            </Text>
            {activeTab === "upcoming" && (
              <Pressable className="bg-primary px-8 py-3 rounded-full">
                <Text className="text-primary-foreground font-semibold text-sm">
                  Browse Vendors
                </Text>
              </Pressable>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}