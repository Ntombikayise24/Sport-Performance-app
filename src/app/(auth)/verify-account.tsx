import { router } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

function verification() {
  const [code, setCode] = useState('');

  const handleVerify = async () => {
    if(code.trim().length === 0){
      alert("Please enter the verification code.");
      return;
    } else {
      router.push("/(auth)/verified");
    }
    /*
    // API to send code on email for verification.
    try{
      const response = await axios.post("", {code,});
      if(response.status === 200){
        alert("Your account hass been verified");
        router.push("/");
      }else{
        alert("Error", response.data.message || "Invalid verification code."
        );
      }
    }catch(error){
      console.error(error);
      alert("Error", error.response?.data?.message || "Something went wrong, Please try again.");
    }*/
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/mail.png")}
        style={styles.mailImage}
        resizeMode="contain"
      />
      <Text style={styles.title}>Verification Your Account</Text>
      <Text style={styles.subtitle}>
        Thank you for signing-up.{'\n'}
        We’ve sent a 6-digit verification code{'\n'}
        to your e-mail.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter verification code"
        placeholderTextColor="#ccc"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify account</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
        <Text style={styles.didntGetCodeText}>Didn’t get the code? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/forgot-password")}>
          <Text style={styles.resendCodeText}>Resend code</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <View style={{ width: 200, height: 1, backgroundColor: '#0e0606ff'  }} />
              <Text style={{ marginHorizontal: 10, color: '#ccc' }}>OR</Text>
              <View style={{ width: 200, height: 1, backgroundColor: '#0e0606ff'  }} />
            </View>
      <Text style={styles.haveAccountText}>Have an account?</Text>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.loginLink}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

export default verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A394B',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mailImage: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
  },
  subtitle: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    width: 320,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: 'white',
    marginBottom: 15,
  },
  verifyButton: {
    backgroundColor: '#0a4a7b',
    width: 320,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  verifyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  didntGetCodeText: {
    color: 'white',
    fontSize: 12,
  },
  resendCodeText: {
    color: '#DF1965',
    fontSize: 12,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 0.5,
    backgroundColor: '#000000',
  },
  orText: {
    marginHorizontal: 10,
    color: '#ccc',
  },
  haveAccountText: {
    color: 'white',
    marginBottom: 10,
  },
  loginLink: {
    color: '#DF1965',
  },
});
