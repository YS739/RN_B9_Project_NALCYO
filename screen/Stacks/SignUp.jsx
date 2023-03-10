import { useState, useRef } from "react";
import styled from "@emotion/native";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { authService } from "../../common/firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { emailRegex, pwRegex } from "../../common/util";
import { updateProfile } from "firebase/auth";

const SignUp = ({ navigation: { navigate } }) => {
  const isDark = useColorScheme() === "dark";
  const emailRef = useRef(null);
  const pwRef = useRef(null);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [nickName, setNickName] = useState("");

  const validateInputs = () => {
    if (!email) {
      alert("email을 입력해주세요.");
      emailRef.current.focus();
      return true;
    }
    if (!pw) {
      alert("password를 입력해주세요.");
      pwRef.current.focus();
      return true;
    }
    const matchedEmail = email.match(emailRegex);
    const matchedPw = pw.match(pwRegex);

    if (matchedEmail === null) {
      alert("이메일 형식에 맞게 입력해 주세요.");
      emailRef.current.focus();
      return true;
    }
    if (matchedPw === null) {
      alert("비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.");
      pwRef.current.focus();
      return true;
    }
  };
  const handleRegister = () => {
    // 유효성 검사
    if (validateInputs()) {
      return;
    }

    createUserWithEmailAndPassword(authService, email, pw)
      .then(() => {
        console.log("회원가입 성공!");
        updateProfile(authService.currentUser, {
          displayName: nickName,
        })
          .then(() => {
            alert("회원가입 성공!");
            setEmail("");
            setNickName("");
            setPw("");
            navigate("Tabs", { screen: "Home" });
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          backgroundColor: isDark ? "#202020" : "#97d2ec",
          alignItems: "center",
          height: 900,
        }}
      >
        <Text
          style={{
            color: isDark ? "white" : "black",
            marginTop: 50,
            padding: 30,
            fontSize: 44,
            fontWeight: "bold",
            fontFamily: "NanumPenScript-Regular",
          }}
        >
          회원가입
        </Text>
        <View>
          <Text
            style={{
              color: isDark ? "white" : "black",
              fontSize: 13,
              paddingLeft: 10,
            }}
          >
            닉네임
          </Text>
          <TextInput
            placeholder="Nickname"
            value={nickName}
            maxLength={5}
            onChangeText={(text) => setNickName(text)}
            style={{
              width: 280,
              margin: 10,
              padding: 20,
              borderRadius: 30,
              borderWidth: 1,
              color: isDark ? "white" : "black",
              borderColor: isDark ? "white" : "black",
            }}
          />
          <Text
            style={{
              color: isDark ? "white" : "black",
              fontSize: 13,
              paddingLeft: 10,
            }}
          >
            이메일
          </Text>
          <TextInput
            placeholder="Email"
            ref={emailRef}
            value={email}
            onChangeText={(text) => setEmail(text)}
            onSubmitEditing={handleRegister}
            style={{
              width: 280,
              margin: 10,
              padding: 20,
              borderRadius: 30,
              borderWidth: 1,
              color: isDark ? "white" : "black",
              borderColor: isDark ? "white" : "black",
            }}
          />
          <Text
            style={{
              color: isDark ? "white" : "black",
              fontSize: 13,
              paddingLeft: 10,
            }}
          >
            비밀번호
          </Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            ref={pwRef}
            value={pw}
            onChangeText={(text) => setPw(text)}
            onSubmitEditing={handleRegister}
            returnKeyType="send"
            style={{
              width: 280,
              margin: 10,
              padding: 20,
              borderRadius: 30,
              borderWidth: 1,
              color: isDark ? "white" : "black",
              borderColor: isDark ? "white" : "black",
            }}
          />

          <TouchableOpacity
            color="#f194ff"
            onPress={handleRegister}
            style={styles.login_button}
          >
            <Text style={styles.text}>이메일로 회원가입하기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

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
    fontSize: 44,
    fontWeight: "bold",
    fontFamily: "NanumPenScript-Regular",
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
    height: 40,
    borderRadius: 30,
    margin: 10,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
