import { useState, useRef, useEffect } from "react";
import styled from "@emotion/native";
import {
  Image,
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
import { signInWithEmailAndPassword } from "@firebase/auth";
import { emailRegex, pwRegex } from "../../common/util";
import Loader from "../../components/Loader";

const Login = ({ navigation: { navigate } }) => {
  const isDark = useColorScheme() === "dark";
  const emailRef = useRef(null);
  const pwRef = useRef(null);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

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

  const handleLogin = () => {
    // 유효성 검사
    if (validateInputs()) {
      return;
    }

    // 로그인 요청
    signInWithEmailAndPassword(authService, email, pw)
      .then(() => {
        console.log("로그인 성공");
        setEmail("");
        setPw("");
        navigate("Tabs", { screen: "Home" });
      })
      .catch((err) => {
        console.log("err.message:", err.message);
        if (err.message.includes("user-not-found")) {
          alert("회원이 아닙니다. 회원가입을 먼저 진행해 주세요.");
          navigate("SignUp");
        }
        if (err.message.includes("wrong-password")) {
          alert("비밀번호가 틀렸습니다.");
        }
      });
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
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
          오늘 날°C요{" "}
        </Text>
        <Image style={styles.Logo} source={require("../../assets/icon1.png")} />
        <View>
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
            textContentType="emailAddress"
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
            textContentType="password"
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
            onPress={handleLogin}
            style={styles.login_button}
          >
            <Text style={styles.text}>로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate("SignUp")}
            style={styles.login_button}
          >
            <Text style={styles.text}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
export default Login;

const styles = StyleSheet.create({
  Logo: {
    width: 200,
    height: 200,
  },

  container: {
    alignItems: "center",
    height: 900,
  },
  login_title: {
    marginTop: 50,
    padding: 30,
    fontSize: 44,
    fontWeight: "bold",
    fontFamily: "NanumPenScript-Regular",
  },

  titleText: {},
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
    // padding: 20,
    margin: 10,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
