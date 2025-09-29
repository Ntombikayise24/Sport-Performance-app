import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../contexts/UserContext';
import { getActiveUsers, subscribeToActiveUsers } from '../api/authService';

export default function ActiveUsersDisplay({ showHeader = true, maxDisplay = 5 }) {
  const { state } = useUser();
  const [activeUsers, setActiveUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Get initial active users
    const users = getActiveUsers();
    setActiveUsers(users);

    // Subscribe to changes
    const unsubscribe = subscribeToActiveUsers((updatedUsers) => {
      setActiveUsers(updatedUsers);
    });

    return unsubscribe;
  }, []);

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Athlete':
        return 'person-outline';
      case 'Medical':
        return 'medkit-outline';
      case 'Staff':
        return 'school-outline';
      default:
        return 'person-outline';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Athlete':
        return '#4CAF50';
      case 'Medical':
        return '#FF9800';
      case 'Staff':
        return '#2196F3';
      default:
        return '#9E9E9E';
    }
  };

  const formatLoginTime = (loginTime) => {
    const now = new Date();
    const loginDate = new Date(loginTime);
    const diffInMinutes = Math.floor((now - loginDate) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const displayUsers = showAll ? activeUsers : activeUsers.slice(0, maxDisplay);
  const hasMoreUsers = activeUsers.length > maxDisplay;

  if (activeUsers.length === 0) {
    return (
      <View style={styles.container}>
        {showHeader && (
          <Text style={styles.title}>Currently Online</Text>
        )}
        <View style={styles.emptyContainer}>
          <Ionicons name="people-outline" size={48} color="#666" />
          <Text style={styles.emptyText}>No users currently online</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showHeader && (
        <View style={styles.header}>
          <Text style={styles.title}>Currently Online</Text>
          <View style={styles.userCount}>
            <Ionicons name="ellipse" size={8} color="#4CAF50" />
            <Text style={styles.countText}>{activeUsers.length}</Text>
          </View>
        </View>
      )}

      <ScrollView style={styles.usersList} showsVerticalScrollIndicator={false}>
        {displayUsers.map((user) => (
          <View key={user.id} style={styles.userItem}>
            <View style={styles.userInfo}>
              <View style={[styles.avatar, { backgroundColor: getRoleColor(user.role) }]}>
                <Ionicons name={getRoleIcon(user.role)} size={20} color="white" />
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>
                  {user.name} {user.surname}
                </Text>
                <Text style={styles.userRole}>{user.role}</Text>
              </View>
            </View>
            <Text style={styles.loginTime}>
              {formatLoginTime(user.loginTime)}
            </Text>
          </View>
        ))}

        {hasMoreUsers && !showAll && (
          <TouchableOpacity
            style={styles.showMoreButton}
            onPress={() => setShowAll(true)}
          >
            <Text style={styles.showMoreText}>
              Show {activeUsers.length - maxDisplay} more
            </Text>
            <Ionicons name="chevron-down" size={16} color="#DF1965" />
          </TouchableOpacity>
        )}

        {showAll && hasMoreUsers && (
          <TouchableOpacity
            style={styles.showMoreButton}
            onPress={() => setShowAll(false)}
          >
            <Text style={styles.showMoreText}>Show less</Text>
            <Ionicons name="chevron-up" size={16} color="#DF1965" />
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2E4E62',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  userCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  usersList: {
    maxHeight: 200,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#A9A9A9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
  },
  userRole: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  loginTime: {
    color: '#666',
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
    marginTop: 10,
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  showMoreText: {
    color: '#DF1965',
    fontSize: 12,
    marginRight: 4,
  },
});
