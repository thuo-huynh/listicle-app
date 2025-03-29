import { Tabs } from 'expo-router';
import { Image, Text, View, StyleSheet } from 'react-native';
import { icons } from '@/src/constants/icons';
type Props = {};

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => (
  <View style={styles.tabIconContainer}>
    <Image
      source={icon}
      style={styles.tabIcon}
      resizeMode="contain"
      tintColor={focused ? '#0061FF' : '#666876'}
    />
    <Text style={[styles.tabText, focused ? styles.tabTextFocused : styles.tabTextDefault]}>
      {title}
    </Text>
  </View>
);

export default function TabsLayout({}: Props) {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.home}
              title="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.bookmark}
              title="Favorites"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.profile}
              title="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    position: 'absolute',
    borderTopColor: '#0061FF1A',
    borderTopWidth: 1,
    minHeight: 70,
  },
  tabIconContainer: {
    flex: 1,
    marginTop: 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  tabText: {
    fontSize: 12,
    width: '100%',
    textAlign: 'center',
    marginTop: 4,
  },
  tabTextFocused: {
    color: '#0061FF',
    fontFamily: 'Rubik-Medium',
  },
  tabTextDefault: {
    color: '#666876',
    fontFamily: 'Rubik',
  },
});
