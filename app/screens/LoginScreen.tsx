import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {StackActions} from '@react-navigation/native';
import axios from 'axios';
import {useAuthContext} from '../shared/contexts/AuthContext';
import {useQuery} from 'react-query';

const LoginScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'LoginScreen'>) => {
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();

  const {signIn} = useAuthContext();

  const emulateFetch = async () => {
    return axios
      .get('/Auth/SignIn', {params: {email, password}})
      .then(response => {
        signIn(response?.data as string);
        navigation.dispatch(StackActions.replace('ViewUsersScreen'));
      })
      .catch(error => {
        console.log('Error: ', error.response);
        return {error: error.response.data};
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {data, refetch, isLoading} = useQuery(
    ['SignIn', {email: email, password: password}],
    emulateFetch,
    {
      refetchOnWindowFocus: false,
      enabled: false,
    },
  );

  const handleOnLoginClicked = () => {
    refetch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>BGN Dating</Text>
        <Text style={styles.subTitleText}>Administration</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={value => setEmail(value)}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={value => setPassword(value)}
        value={password}
        placeholder="Password"
        keyboardType="default"
        secureTextEntry={true}
      />
      {
        //@ts-ignore
        !!data?.error && <Text style={styles.errorMsg}>{data?.error}</Text>
      }
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <Button
          title={!isLoading ? 'Login' : 'Processing...'}
          onPress={handleOnLoginClicked}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
  errorMsg: {
    color: 'red',
    paddingBottom: 5,
  },
  titleContainer: {
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: '700',
    fontSize: 30,
    color: '#2a95ff',
  },
  subTitleText: {
    fontStyle: 'italic',
  },
});

export default LoginScreen;
