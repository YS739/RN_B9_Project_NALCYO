import { useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native";
import { authService } from "../../common/firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { emailRegex, pwRegex } from "../../common/util";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";

export default function SignUp({ navigation: { navigate, goBack } }) {
  const emailRef = useRef(null);
  const pwRef = useRef(null);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [nickName, setnickName] = useState("");
  const auth = getAuth();
  const navigation = useNavigation();

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

    // FIXME: nickName에 nickname input값을 받아와서 넣기
    // 코드 위치 수정 - 회원가입 안으로
    updateProfile(auth.currentUser, {
      nickName: nickName,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });

    createUserWithEmailAndPassword(authService, email, pw)
      .then(() => {
        alert("회원가입 성공!");
<<<<<<< HEAD
        navigate("Tabs", { screen: "Home" });
        // FIXME: Home이나 다른 스크린으로 가면 로딩 화면 후에 다시 로그인 화면..
=======
>>>>>>> 30068fb39f9b2359ce8e6fc6e96995f65c68b1e6
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
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
            onChangeText={(text) => setnickName(text)}
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
}

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
    borderRadius: 30,
    padding: 20,
    margin: 10,
    marginTop: 30,
    backgroundColor: "white",
  },
});
