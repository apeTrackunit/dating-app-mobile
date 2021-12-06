import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {User} from '../shared/interfaces/User';
import axios from 'axios';
import {useAuthContext} from '../shared/contexts/AuthContext';
import {useQuery} from 'react-query';

interface UserTableProps {
  data: User[];
  isLoading: boolean;
  refetch: () => void;
}

const DB_MIN_DATE = '0001-01-01T00:00:00';

export const UserTable = ({data, isLoading, refetch}: UserTableProps) => {
  const {token} = useAuthContext();
  const [deleteUserId, setDeleteUserId] = React.useState<string | null>();

  const onDeleteClicked = (id: string) => {
    setDeleteUserId(id);
    duRefetch();
  };

  const emulateDelete = async () => {
    console.log(token);
    return axios
      .put('/User', {
        headers: {Authorization: `Bearer ${token}`},
        params: {id: deleteUserId},
      })
      .then(response => {
        refetch();
        setDeleteUserId(null);
        console.log(response);
      })
      .catch(error => {
        console.log('Error: ', error.response);
        return {error: error.response.data};
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {refetch: duRefetch, isLoading: duIsLoading} = useQuery(
    ['DeleteUser', {id: deleteUserId}],
    emulateDelete,
    {
      refetchOnWindowFocus: false,
      enabled: !!deleteUserId,
    },
  );

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
          onPress={() => onDeleteClicked(user.id)}
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
