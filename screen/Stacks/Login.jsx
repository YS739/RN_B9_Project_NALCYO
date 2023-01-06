import React from "react";

const Login = () => {
  return (
    <Container class="join-tab">
      <LoginHeader class="joinpage_head">
        <span class="header_text"> 오늘 날°C요 </span>
      </LoginHeader>
      <main class="main">
        <form class="email-form" onsubmit="handleAuth(event)">
          <div class="email-form_text">
            <span class="email-form_text_span">이메일</span>
          </div>
          <input class="email-input" id="email" type="email" placeholder="이메일을 입력해주세요." />

          <div class="email-form_text">
            <span class="email-form_text_span">비밀번호</span>
          </div>
          <input class="email-input" id="pw" type="password" placeholder="비밀번호를 입력해주세요." />

          <button type="submit" data-method="email" class="email-form_btn" id="authBtn" value="로그인">
            <span class="email-form_btn_text">이메일로 로그인하기</span>
          </button>
        </form>
        <div class="join">
          <span class="join-text">아직 회원이 아니신가요?</span>
          <a href="#join" class="join-link" id="authToggle">
            <span>회원가입</span>
          </a>
        </div>
      </main>
    </Container>
  );
};

export default Login;
