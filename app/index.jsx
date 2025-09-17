import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [userType, setUserType] = useState('Athlete');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () =>  {
    if(!username || !password){
      Alert.alert("username or password is not entered");
      return;
    }else{
      Alert.alert("Login successful");
      router.push('/coachview');
    }
  }

  return (
    <View style={{ backgroundColor: "#1A394B", flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require("../assets/images/status.png")}
        style={{ width: 400, height: 400, marginBottom: 10 }}
        resizeMode="contain"
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '35%', marginVertical: 40, alignItems: 'center'}}>
        <TouchableOpacity style={{ backgroundColor: '#0a4a7b', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 }}>
          <Text style={{ color: 'white' }}>Athlete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#0a4a7b', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 }}>
          <Text style={{ color: 'white' }}>Medical</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#0a4a7b', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 25 }}>
          <Text style={{ color: 'white' }}>Staff</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Username"
        placeholderTextColor="#ccc"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, borderColor: '#0a814aff', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, marginBottom: 15, color: 'white', width: 320 }}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#0a814aff', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, marginBottom: 15, color: 'white', width: 320 }}
      />
      <TouchableOpacity style={{ backgroundColor: '#0a4a7b', paddingVertical: 12, borderRadius: 20, alignItems: 'center', marginBottom: 20, width: 150 }} onPress={handleLogin}>
        <Text style={{ color: 'white' }}>Login</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <View style={{ width: 200, height: 1, backgroundColor: '#0a814aff'  }} />
        <Text style={{ marginHorizontal: 10, color: '#ccc' }}>OR</Text>
        <View style={{ width: 200, height: 1, backgroundColor: '#0a814aff' }} />
      </View>

      <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => router.push('/forgotpassword')}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={{ color: 'white' }}>Don’t have an account?   </Text>
        <TouchableOpacity onPress={() => router.push("/createAccount")}>
          <Text style={{ color: '#7b5fc5' }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
