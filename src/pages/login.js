import Button from '../components/button.js';
import Input from '../components/input.js';

function Login() {
  const template = `
  <div class="template">
    <header class="header"><img class="logo" src="./Imagens/header-logo.png"></header>
    <section class ="login-section">
      <h1 class="name-network">Heroínas</h1>
      <h3 class="text-simple">Bem vinda, programadora!</h3>
      <form class="forms">
        <label>E-mail:</label>
        ${Input({
        class: 'email-input',
        placeholder: 'exemplo@seudomínio.com',
        value:'',
        type: 'email',
        })}
        <label>Senha:</label>
        ${Input({
        class: 'password-input ',
        placeholder: '********',
        value:'',
        type: 'password',
        })}
        ${Button({
        id: 'btnLogin',
        title: 'Login',
        onClick: loginEmail,
        })}
        <p class="text-simple">Ou entre com:</p>
        ${Button({
        id: "btnGoogle",
        title: '<i class="fab fa-google"></i>',
        onClick: loginGoogle,
        })}
        ${Button({
        id: 'btnForget',
        title: 'Esqueci a senha',
        onClick: forgetPassword,
        })}
      </form>
    <p class="alert-message"></p>
    <p class="text-simple">Não tem uma conta?</p>
    ${Button({
    id: 'btnregister',
    title: 'Registre-se',
    onClick: HashRegister
    })}
  </section>
  </div>
  `;
  return template;
}

function loginEmail() {
  const email = document.querySelector('.email-input').value;
  const password = document.querySelector('.password-input').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      location.hash = 'post'
    })
    .catch(function (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/wrong-password') {
        document.querySelector('.alert-message').textContent = 'Senha errada!.';
      } if (errorCode === 'auth/user-not-found') {
        document.querySelector('.alert-message').textContent = 'Usuário não encontrado.';
      } else {
        document.querySelector('.alert-message').textContent = 'Usuário não cadastrado.';
      }
    })
}

function loginGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
  firebase.auth().getRedirectResult()
}

function forgetPassword() {
  window.location.hash = 'forgot_password';
}

function HashRegister() {
  window.location.hash = 'register';
}

export default Login;
