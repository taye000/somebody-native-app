import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Platform, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type ColorScheme = 'light' | 'dark';

interface Colors {
  primary: string;
  secondary: string;
  background: {
    light: string;
    dark: string;
  };
  card: {
    light: string;
    dark: string;
  };
  text: {
    light: string;
    dark: string;
  };
}

const COLORS: Colors = {
  primary: '#2D68FF',
  secondary: '#20E1B2',
  background: {
    light: '#FFFFFF',
    dark: '#121212'
  },
  card: {
    light: '#F8F8F8',
    dark: '#1E1E1E'
  },
  text: {
    light: '#000000',
    dark: '#FFFFFF'
  }
};

interface RecentActivity {
  id: string;
  type: 'Delivery' | 'Errand';
  pickup: string;
  dropoff: string;
  date: string;
}

const RECENT_ACTIVITIES: RecentActivity[] = [
  {
    id: '1',
    type: 'Delivery',
    pickup: '123 Main St',
    dropoff: '456 Oak Ave',
    date: '2 days ago'
  },
  {
    id: '2',
    type: 'Errand',
    pickup: 'Target Store',
    dropoff: 'Home',
    date: '5 days ago'
  },
];

interface Service {
  id: string;
  name: string;
  icon: keyof typeof Feather.glyphMap;
  color: string;
}

const SERVICES: Service[] = [
  { id: '1', name: 'Taxi', icon: 'key', color: '#FFC107' },
  { id: '2', name: 'Rental', icon: 'key', color: '#4CAF50' },
  { id: '3', name: 'Motorbike', icon: 'battery', color: '#9C27B0' },
  { id: '4', name: 'Food', icon: 'coffee', color: '#F44336' },
  { id: '5', name: 'Shopping', icon: 'shopping-bag', color: '#2196F3' },
  { id: '6', name: 'Courier', icon: 'package', color: '#FF9800' },
  { id: '7', name: 'Errand', icon: 'clipboard', color: '#795548' },
];

interface LocationInputProps {
  icon: keyof typeof Feather.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ icon, placeholder, value, onChangeText }) => (
  <View style={styles.locationInputContainer}>
    <Feather name={icon} size={24} color={COLORS.primary} />
    <TextInput
      style={styles.inputText}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#FFFFFF"
      keyboardType="default"
    />
  </View>
);

export default function HomeScreen(): JSX.Element {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const colorScheme = useColorScheme() as ColorScheme;
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const handleLocationSelect = (type: 'pickup' | 'dropoff', location: string): void => {
    console.log(`${type} location selected:`, location);
  };

  const handleQuickAction = (action: 'schedule' | 'package'): void => {
    console.log(`Quick action: ${action}`);
  };

  const handleRecentActivityPress = (activity: RecentActivity): void => {
    console.log('Selected activity:', activity);
  };

  const handleServicePress = (service: Service): void => {
    console.log('Selected service:', service.name);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: COLORS.background[colorScheme] }]}
      contentContainerStyle={styles.contentContainer}>
      {/* Welcome Section */}
      <ThemedView style={styles.welcomeSection}>
        <ThemedText type="title" style={styles.welcomeText}>
          Need SomeBody?
        </ThemedText>
      </ThemedView>

      {/* Location Selection Card */}
      <ThemedView style={[styles.card, { backgroundColor: COLORS.background[colorScheme] }]}>
        <LocationInput
          icon="map-pin"
          placeholder="Enter location"
          value={pickupLocation}
          onChangeText={(text) => setPickupLocation(text)}
        />
        <View style={styles.locationDivider} />
        <LocationInput
          icon="navigation"
          placeholder="Enter destination"
          value={dropoffLocation}
          onChangeText={(text) => setDropoffLocation(text)}
        />
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView style={styles.quickActions}>
        <Pressable
          style={styles.actionButton}
          onPress={() => handleQuickAction('schedule')}>
          <View style={[styles.actionIcon, { backgroundColor: COLORS.secondary }]}>
            <Feather name="clock" size={24} color="white" />
          </View>
          <ThemedText>Schedule</ThemedText>
        </Pressable>
        <Pressable
          style={styles.actionButton}
          onPress={() => handleQuickAction('package')}>
          <View style={[styles.actionIcon, { backgroundColor: COLORS.primary }]}>
            <Feather name="package" size={24} color="white" />
          </View>
          <ThemedText>Package</ThemedText>
        </Pressable>
      </ThemedView>

      {/* Services Section */}
      <ThemedView style={styles.servicesSection}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Services
          </ThemedText>
          <Pressable onPress={() => router.push('/services')}>
            <ThemedText style={styles.seeAllText}>See all</ThemedText>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.servicesScrollContent}>
          {SERVICES.map((service) => (
            <Pressable
              key={service.id}
              style={styles.serviceCard}
              onPress={() => handleServicePress(service)}>
              <View
                style={[
                  styles.serviceIconContainer,
                  { backgroundColor: service.color }
                ]}>
                <Feather name={service.icon} size={24} color="white" />
              </View>
              <ThemedText style={styles.serviceName}>{service.name}</ThemedText>
            </Pressable>
          ))}
        </ScrollView>
      </ThemedView>

      {/* Recent Activities */}
      <ThemedView style={styles.recentSection}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Recent Activities
          </ThemedText>
          <Pressable onPress={() => router.push('/activity')}>
            <ThemedText style={styles.seeAllText}>See all</ThemedText>
          </Pressable>
        </View>
        {RECENT_ACTIVITIES.map((activity) => (
          <Pressable
            key={activity.id}
            style={[styles.recentItem, { backgroundColor: COLORS.card[colorScheme] }]}
            onPress={() => handleRecentActivityPress(activity)}>
            <Feather
              name={activity.type === 'Delivery' ? 'package' : 'clipboard'}
              size={24}
              color={COLORS.primary}
            />
            <View style={styles.recentItemContent}>
              <ThemedText type="defaultSemiBold">{activity.type}</ThemedText>
              <ThemedText>{activity.pickup} → {activity.dropoff}</ThemedText>
              <ThemedText style={styles.dateText}>{activity.date}</ThemedText>
            </View>
          </Pressable>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  contentContainer: {
    padding: 16,
  },
  welcomeSection: {
    marginVertical: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  servicesSection: {
    marginVertical: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  servicesScrollContent: {
    paddingRight: 16,
    gap: 16,
  },
  serviceCard: {
    alignItems: 'center',
    gap: 8,
    width: 80,
  },
  serviceIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  serviceName: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    color: '#FFFFFF',
  },
  locationDivider: {
    height: 5,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 24,
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  recentItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    gap: 16,
    alignItems: 'center',
  },
  recentItemContent: {
    flex: 1,
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    opacity: 0.6,
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
});