import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";

const Login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.login_title}>오늘 날°C요 </Text>
      <View>
        <TextInput placeholder="Email" style={styles.login_input} />
        <TextInput secureTextEntry={true} placeholder="Password" style={styles.login_input} />
        <Button onPress={() => onSubmit(form)} title="이메일로 로그인하기"></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: (151, 210, 236),
  },
  login_title: {
    fontSize: 19,
    fontWeight: "bold",
  },
  login_input: {
    borderRadius: 4,
  },
});
export default Login;
