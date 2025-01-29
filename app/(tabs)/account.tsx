import React from 'react';
import { StyleSheet, View, ScrollView, Pressable, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const AccountScreen = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const router = useRouter();

    const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        image: 'https://avatar.iran.liara.run/public/boy',
    };

    const menuItems = [
        { id: '1', name: 'Manage Account', icon: 'user', route: '/manage-account' },
        { id: '2', name: 'Settings', icon: 'settings', route: '/settings' },
        { id: '3', name: 'Help & Support', icon: 'help-circle', route: '/help' },
        { id: '4', name: 'Privacy Policy', icon: 'shield', route: '/privacy' },
        { id: '5', name: 'Logout', icon: 'log-out', route: '/logout' },
    ];

    return (
        <ScrollView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#FFFFFF' }]}>
            <ThemedView style={styles.profileSection}>
                <Image source={{ uri: user.image }} style={styles.profileImage} />
                <ThemedText type="title" style={styles.userName}>{user.name}</ThemedText>
                <ThemedText style={styles.userEmail}>{user.email}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.menuSection}>
                {menuItems.map((item) => (
                    <Pressable key={item.id} style={styles.menuItem} onPress={() => router.push(item.route)}>
                        <Feather name={item.icon} size={24} color={isDark ? '#FFFFFF' : '#2D68FF'} />
                        <ThemedText style={styles.menuText}>{item.name}</ThemedText>
                    </Pressable>
                ))}
            </ThemedView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    profileSection: {
        alignItems: 'center',
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 12,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
    },
    menuSection: {
        padding: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    menuText: {
        marginLeft: 16,
        fontSize: 18,
    },
});

export default AccountScreen;
