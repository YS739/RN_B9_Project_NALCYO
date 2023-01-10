import { useState, useRef, useEffect } from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native";
import { authService } from "../../common/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { emailRegex, pwRegex } from "../../common/util";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../components/Loader";

export default function Login({ navigation: { goBack } }) {
  const emailRef = useRef(null);
  const pwRef = useRef(null);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
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
  const handleLogin = () => {
    // 유효성 검사
    if (validateInputs()) {
      return;
    }

    // 로그인 요청
    signInWithEmailAndPassword(authService, email, pw)
      .then(() => {
        console.log("로그인성공");
        setEmail("");
        setPw("");
        goBack();

        // 로그인 화면 이전 화면으로 돌아가기
      })
      .catch((err) => {
        console.log("err.message:", err.message);
        if (err.message.includes("user-not-found")) {
          alert("회원이 아닙니다. 회원가입을 먼저 진행해 주세요.");
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
    <View>
      <SafeAreaView style={styles.container}>
        <Text style={styles.login_title}>오늘 날°C요 </Text>
        <Image
          style={styles.Logo}
          source={require("../../assets/adaptive-icon.png")}
        />
        <View>
          <Text style={styles.email_form_title}>이메일</Text>
          <TextInput
            placeholder="Email"
            ref={emailRef}
            value={email}
            onChangeText={(text) => setEmail(text)}
            textContentType="emailAddress"
            style={styles.login_input}
          />
          <Text style={styles.email_form_title}>비밀번호</Text>

          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            ref={pwRef}
            value={pw}
            onChangeText={(text) => setPw(text)}
            textContentType="password"
            returnKeyType="send"
            style={styles.login_input}
          />
          <TouchableOpacity
            color="#f194ff"
            onPress={handleLogin}
            style={styles.login_button}
          >
            <Text style={styles.text}>이메일로 로그인하기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={styles.login_button}
          >
            <Text style={styles.text}>회원가입 하러가기</Text>
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
