import { DefaultHeaderComponent } from 'components';
import { Tabs } from 'expo-router';
import type { FC } from 'react';

const Layout: FC = () => (
  <Tabs screenOptions={{ title: 'Tab Navigation' }}>
    <Tabs.Screen
      name={'index'}
      options={{
        header: ({ options, navigation }) => (
          <DefaultHeaderComponent navigation={navigation} title={options.title} />
        ),
        tabBarActiveTintColor: '#0085FF',
        tabBarLabel: 'Página 1'
      }}
    />

    <Tabs.Screen
      name={'tab-two'}
      options={{
        header: ({ options, navigation }) => (
          <DefaultHeaderComponent navigation={navigation} title={options.title} />
        ),
        tabBarActiveTintColor: '#0085FF',
        tabBarLabel: 'Página 2'
      }}
    />
  </Tabs>
);

export default Layout;
