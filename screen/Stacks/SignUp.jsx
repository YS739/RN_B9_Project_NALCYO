import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import firebase from "@firebase/app";
import "@firebase/auth";
const SignUp = () => {
  const [values, setValues] = useState({
    nickname: "",
    email: "",
    pwd: "",
    pwd2: "",
  });

  function HandleChange(text, eventName) {
    setValues((prev) => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  }

  function SignUp() {
    const { nickname, email, pwd, pwd2 } = values;

    if (pwd == pwd2) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, pwd)
        .then(() => {
          navigation.replace("Home");
        })
        .catch((error) => {
          alert(error.message);
          // ..
        });
    } else {
      alert("Passwords are different!");
    }
  }

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <Text style={styles.login_title}>오늘 날°C요 </Text>
        <View>
          <Text style={styles.email_form_title}>닉네임</Text>
          <TextInput placeholder="Nickname" onChangeText={(text) => HandleChange(text, "nickname")} style={styles.login_input} />
          <Text style={styles.email_form_title}>이메일</Text>
          <TextInput placeholder="Email" onChangeText={(text) => HandleChange(text, "email")} style={styles.login_input} />
          <Text style={styles.email_form_title}>비밀번호</Text>
          <TextInput secureTextEntry={true} placeholder="Password" onChangeText={(text) => HandleChange(text, "pwd")} style={styles.login_input} />
          <Text style={styles.email_form_title}>비밀번호확인</Text>
          <TextInput secureTextEntry={true} placeholder="Password" onChangeText={(text) => HandleChange(text, "pwd2")} style={styles.login_input} />
          <TouchableOpacity color="#f194ff" onClick={() => SignUp()} style={styles.login_button}>
            <Text style={styles.text}>이메일로 회원가입하기</Text>
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
    marginTop: 30,
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
export default SignUp;
