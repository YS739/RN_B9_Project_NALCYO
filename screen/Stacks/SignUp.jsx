import { useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { authService } from "../../common/firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { emailRegex, pwRegex } from "../../common/util";
import { updateProfile } from "firebase/auth";

const SignUp = ({ navigation: { navigate } }) => {
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
        }).then(() => {
          alert("회원가입 성공!");
          setEmail("");
          setNickName("");
          setPw("");
          navigate("Tabs", { screen: "Home" });
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <Text style={styles.login_title}>회원가입 </Text>
        <View>
          <Text style={styles.email_form_title}>닉네임</Text>
          <TextInput
            placeholder="Nickname"
            value={nickName}
            onChangeText={(text) => setNickName(text)}
            style={styles.login_input}
          />
          <Text style={styles.email_form_title}>이메일</Text>
          <TextInput
            placeholder="Email"
            ref={emailRef}
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.login_input}
          />
          <Text style={styles.email_form_title}>비밀번호</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            ref={pwRef}
            value={pw}
            onChangeText={(text) => setPw(text)}
            returnKeyType="send"
            style={styles.login_input}
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
    </View>
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
    // fontFamily: "NanumPenScript-Regular",
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
    marginTop: 30,
    backgroundColor: "white",
  },
});
