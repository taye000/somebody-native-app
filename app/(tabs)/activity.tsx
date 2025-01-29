import React from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const COLORS = {
    primary: '#2D68FF',
    background: { light: '#FFFFFF', dark: '#121212' },
    card: { light: '#F8F8F8', dark: '#1E1E1E' },
    text: { light: '#000000', dark: '#FFFFFF' },
};

const RECENT_ACTIVITIES = [
    { id: '1', type: 'Delivery', pickup: '123 Main St', dropoff: '456 Oak Ave', date: '2 days ago' },
    { id: '2', type: 'Errand', pickup: 'Target Store', dropoff: 'Home', date: '5 days ago' }
];

export default function ActivityScreen() {
    const colorScheme = useColorScheme();

    return (
        <ScrollView style={[styles.container, { backgroundColor: COLORS.background[colorScheme] }]}>
            <ThemedView style={styles.section}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Activities</ThemedText>
                {RECENT_ACTIVITIES.map(activity => (
                    <Pressable key={activity.id} style={[styles.recentItem, { backgroundColor: COLORS.card[colorScheme] }]}>
                        <Feather name={activity.type === 'Delivery' ? 'package' : 'clipboard'} size={24} color={COLORS.primary} />
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
    container: { flex: 1, padding: 16, marginTop: 20 },
    section: { marginVertical: 24 },
    sectionTitle: { fontSize: 20, fontWeight: '600' },
    recentItem: { flexDirection: 'row', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 8, marginTop: 10 },
    recentItemContent: { flex: 1, gap: 4 },
    dateText: { fontSize: 12, opacity: 0.6 },
});
