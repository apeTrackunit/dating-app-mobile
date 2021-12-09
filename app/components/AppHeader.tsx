import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {useAuthContext} from '../shared/contexts/AuthContext';
import {StackActions, useNavigation} from '@react-navigation/native';

interface AppHeaderProps {
  title: string;
  showSignOut: boolean;
}

export const AppHeader = ({title, showSignOut}: AppHeaderProps) => {
  const {signOut} = useAuthContext();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {showSignOut && (
        <TouchableHighlight
          onPress={() => {
            signOut();
            navigation.dispatch(StackActions.replace('LoginScreen'));
          }}
          style={styles.logoutBtn}
          underlayColor={'#63b3ff'}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableHighlight>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    backgroundColor: '#2a95ff',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  logoutBtn: {
    borderRadius: 10,
    marginRight: 30,
    padding: 5,
  },
  logoutText: {
    fontSize: 13,
    color: '#fff',
  },
});
