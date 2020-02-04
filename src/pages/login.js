import Button from '../components/button.js';
import Input from '../components/input.js';
import Header from '../components/header.js';

function loginEmail() {
  const email = document.querySelector('.email-input').value;
  const password = document.querySelector('.password-input').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.hash = 'post';
    })
    .catch((error) => {
      const errorCode = error.code;
      const alertMessage = document.querySelector('.alert-message');
      if (errorCode === 'auth/wrong-password') {
        alertMessage.textContent = 'Senha errada!.';
      } if (errorCode === 'auth/user-not-found') {
        alertMessage.textContent = 'Usuário não encontrado.';
      } else {
        alertMessage.textContent = 'Usuário não cadastrado.';
      }
    });
}

function loginGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
  firebase.auth().getRedirectResult();
}


function Login() {
  const template = `
  <div class="template">
    ${Header({ class: 'header', classImg: 'logo' })}
    <section class ="login-section">
      <h1 class="name-network">Heroínas</h1>
      <h3 class="text-simple">Bem vinda, programadora!</h3>
      <form class="forms">
        <label>E-mail:</label>
        ${Input({
    class: 'email-input',
    placeholder: 'exemplo@seudomínio.com',
    value: '',
    type: 'email',
  })}
        <label>Senha:</label>
        ${Input({
    class: 'password-input ',
    placeholder: '********',
    value: '',
    type: 'password',
  })}
        <p class="alert-message"></p>
        ${Button({
    id: 'btnLogin',
    title: 'Login',
    onClick: loginEmail,
  })}
        <p class="text-simple">Ou entre com:</p>
        ${Button({
    id: 'btnGoogle',
    title: '<i class="fab fa-google"></i>',
    onClick: loginGoogle,
  })}
      </form>
      <p class="text-simple">
        Não tem uma conta?
        <a class='link' href="#register">Registre-se</a> 
      </p>
      <p class="text-simple">
        <a class='link' href="#forgot_password">Esqueceu a senha?</a>
      </p>
    </section>
  </div>
  `;
  return template;
}
export default Login;
