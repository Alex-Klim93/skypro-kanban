// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "../App.css";

function ContainerSignup() {

  return (
  <>
        <div className="container-signup" style={{display:"none"}}>
            <div className="modal">
				<div className="modal__block">
					<div className="modal__ttl">
						<h2>Регистрация</h2>
					</div>
					<form className="modal__form-login" id="formLogUp" action="#">
						<input className="modal__input first-name" type="text" name="first-name" id="first-name" placeholder="Имя"/>
						<input className="modal__input login" type="text" name="login" id="loginReg" placeholder="Эл. почта"/>
						<input className="modal__input password-first" type="password" name="password" id="passwordFirst" placeholder="Пароль"/>
						<button className="modal__btn-signup-ent _hover01" id="SignUpEnter"><a href="../main.html">Зарегистрироваться</a> </button>
						<div className="modal__form-group">
							<p>Уже есть аккаунт?  <a href="signin.html">Войдите здесь</a></p>
						</div>
					</form>
				</div>
			</div>
        </div>
        </>
  );
}

export default ContainerSignup;