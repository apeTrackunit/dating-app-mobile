import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import axios from 'axios';
import {useQuery} from 'react-query';
import {UserTable} from '../components/UserTable';
import {User} from '../shared/interfaces/User';
import {useAuthContext} from '../shared/contexts/AuthContext';

const ViewUsersScreen = () => {
  const {token} = useAuthContext();

  const emulateFetch = async () => {
    return axios
      .get<User[]>('/Users', {headers: {Authorization: `Bearer ${token}`}})
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log('Error: ', error.response);
        return {error: error.response.data};
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {data, refetch, isLoading} = useQuery(['Users'], emulateFetch, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  React.useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  return (
    <View style={styles.container}>
      {Array.isArray(data) ? (
        <UserTable data={data} isLoading={isLoading} refetch={refetch} />
      ) : (
        <Text>Something went wrong. Try it again later!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ViewUsersScreen;
