import React from "react";
import { Text, StyleSheet, View, Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native";

const Login = () => {
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <Text style={styles.login_title}>오늘 날°C요 </Text>

        <View>
          <Text style={styles.email_form_title}>이메일</Text>
          <TextInput placeholder="Email" style={styles.login_input} />
          <Text style={styles.email_form_title}>비밀번호</Text>
          <TextInput secureTextEntry={true} placeholder="Password" style={styles.login_input} />
          <Button title="이메일로 로그인하기" onPress={() => onSubmit(form)} style={styles.login_button}></Button>
          <Button title="회원가입 하러가기" onPress={() => navigation.navigate("SignUp")} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#97D2EC",
  },
  login_title: {
    padding: 80,
    fontSize: 19,
    fontWeight: "bold",
  },
  email_form_title: {
    fontSize: 13,
    padding: 10,
  },
  login_input: {
    width: 280,
    padding: 24,
    borderRadius: 30,

    borderWidth: 1,
  },
  login_button: {
    borderRadius: 4,
  },
});
export default Login;
