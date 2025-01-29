import React from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Define color scheme
const COLORS = {
    primary: '#2D68FF',
    secondary: '#20E1B2',
    background: {
        light: '#FFFFFF',
        dark: '#121212',
    },
    card: {
        light: '#F8F8F8',
        dark: '#1E1E1E',
    },
    text: {
        light: '#000000',
        dark: '#FFFFFF',
    },
};

// Define service structure
interface Service {
    id: string;
    name: string;
    icon: keyof typeof Feather.glyphMap;
    color: string;
    category: 'Main' | 'Transport' | 'Shopping' | 'Household';
}

// Services data
const SERVICES: Service[] = [
    { id: '1', name: 'Errand', icon: 'clipboard', color: '#795548', category: 'Main' },
    { id: '2', name: 'Courier', icon: 'package', color: '#FF9800', category: 'Main' },
    { id: '3', name: 'Food', icon: 'coffee', color: '#F44336', category: 'Main' },
    { id: '4', name: 'Taxi', icon: 'coffee', color: '#FFC107', category: 'Transport' },
    { id: '5', name: 'Rental', icon: 'key', color: '#4CAF50', category: 'Transport' },
    { id: '6', name: 'Motorbike', icon: 'battery', color: '#9C27B0', category: 'Transport' },
    { id: '7', name: 'Shopping', icon: 'shopping-bag', color: '#2196F3', category: 'Shopping' },
    { id: '8', name: 'House Cleaning', icon: 'home', color: '#00BCD4', category: 'Household' },
];

export default function ServicesScreen(): JSX.Element {
    const colorScheme = useColorScheme() as 'light' | 'dark';
    const router = useRouter();

    const renderService = (service: Service) => (
        <Pressable
            key={service.id}
            style={styles.serviceCard}
            onPress={() => console.log('Selected service:', service.name)}>
            <View style={[styles.serviceIconContainer, { backgroundColor: service.color }]}>
                <Feather name={service.icon} size={24} color="white" />
            </View>
            <ThemedText style={styles.serviceName}>{service.name}</ThemedText>
        </Pressable>
    );
    return (
        <ScrollView style={[styles.container, { backgroundColor: COLORS.background[colorScheme] }]}>

            {/* Main Services */}
            <ThemedView style={styles.servicesSection}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>Main Services</ThemedText>
                <View style={styles.servicesRow}>{SERVICES.filter(s => s.category === 'Main').map(renderService)}</View>
            </ThemedView>

            {/* Featured Service */}
            <ThemedView style={styles.featuredSection}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>Featured Service</ThemedText>
                {renderService(SERVICES[0])}
            </ThemedView>

            {/* Categorized Services */}
            {['Transport', 'Shopping', 'Household'].map(category => (
                <ThemedView key={category} style={styles.servicesSection}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>{category} Services</ThemedText>
                    <View style={styles.servicesRow}>{SERVICES.filter(s => s.category === category).map(renderService)}</View>
                </ThemedView>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
    },
    servicesSection: {
        marginBottom: 24,
    },
    featuredSection: {
        marginBottom: 32,
        alignItems: 'center',
    },
    servicesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    serviceCard: {
        alignItems: 'center',
        width: 100,
    },
    serviceIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    serviceName: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 8,
    },
});
