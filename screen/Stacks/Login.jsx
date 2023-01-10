import React from "react";

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

export default Login;
