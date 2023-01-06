import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import { Image } from "../assets/adaptive-icon.png";

const Login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.login_title}>오늘 날°C요 </Text>
      <View>
        <Image source={Image} />
      </View>
      <View>
        <Text style={styles.email_form_title}>이메일 </Text>
        <TextInput placeholder="Email" style={styles.login_input} />
        <TextInput secureTextEntry={true} placeholder="Password" style={styles.login_input} />
        <Button title="이메일로 로그인하기" onPress={() => onSubmit(form)} style={styles.login_button}></Button>
        <Button title="회원가입하러가기" onPress={() => navigation.navigate("SignUp")} />
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
  email_form_title: {
    display: flex,
    alignItems: flex - start,
    color: black,
    fontSize: 13,
  },
  login_input: {
    padding: 24,
    borderRadius: 4,
  },
  login_button: {
    padding: 24,
    borderRadius: 4,
  },
});
export default Login;
