import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {User} from '../shared/interfaces/User';
import axios from 'axios';
import {useAuthContext} from '../shared/contexts/AuthContext';
import {useMutation} from 'react-query';

interface UserTableProps {
  data: User[];
  isLoading: boolean;
  refetch: () => void;
}

const DB_MIN_DATE = '0001-01-01T00:00:00';

export const UserTable = ({data, isLoading, refetch}: UserTableProps) => {
  const {token} = useAuthContext();

  const onDeleteClicked = (user: User) => {
    mutateAsync(user);
  };

  const {isLoading: duIsLoading, mutateAsync} = useMutation((user: User) => {
    return axios
      .put('/User', user, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(() => {
        refetch();
      })
      .catch(error => {
        return {error: error.response.data};
      });
  });

  const renderItem = (user: User) => {
    return (
      <View key={user.id} style={styles.itemContainer}>
        <Text style={styles.text}>{user.firstName}</Text>
        <Text style={styles.text}>{user.email}</Text>
        <Button
          title={
            user.deletedDate.toString() === DB_MIN_DATE ? 'Delete' : 'Deleted'
          }
          disabled={user.deletedDate.toString() !== DB_MIN_DATE}
          onPress={() => onDeleteClicked(user)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!isLoading || !duIsLoading ? (
        <FlatList
          data={data}
          renderItem={user => {
            return renderItem(user.item);
          }}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  text: {
    color: '#000',
    flexGrow: 1,
  },
});
