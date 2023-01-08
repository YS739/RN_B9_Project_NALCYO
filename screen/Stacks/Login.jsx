import React from "react";
import { Image, Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";

const Login = () => {
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <Text style={styles.login_title}>오늘 날°C요 </Text>
        <Image style={styles.Logo} source={require("../../assets/adaptive-icon.png")} />
        <View>
          <Text style={styles.email_form_title}>이메일</Text>
          <TextInput placeholder="Email" style={styles.login_input} />
          <Text style={styles.email_form_title}>비밀번호</Text>
          <TextInput secureTextEntry={true} placeholder="Password" style={styles.login_input} />
          <TouchableOpacity color="#f194ff" onPress={() => onSubmit(form)} style={styles.login_button}>
            <Text style={styles.text}>이메일로 로그인하기</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.login_button}>
            <Text style={styles.text}>회원가입 하러가기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  Logo: {
    width: 200,
    height: 200,
  },

  container: {
    alignItems: "center",
    backgroundColor: "#97D2EC",
    height: 900,
  },
  login_title: {
    marginTop: 50,
    padding: 30,
    fontSize: 36,
    fontWeight: "bold",
  },
  email_form_title: {
    fontSize: 13,
    padding: 10,
  },
  login_input: {
    width: 280,
    margin: 10,
    padding: 20,
    borderRadius: 30,
    borderWidth: 1,
  },
  login_button: {
    width: 280,
    borderRadius: 30,
    padding: 20,
    margin: 10,
    backgroundColor: "white",
  },
});
export default Login;
