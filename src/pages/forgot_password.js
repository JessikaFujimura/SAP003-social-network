import Button from '../components/button.js';
import Input from '../components/input.js';

function ForgotPassword() {
  const template = `
  <div class="template">
    <header class="header"><img class="logo" src="./Imagens/header-logo.png"></header>
    <section class = "forgot-password-section">
      <h1 class="name-network">Heroínas</h1>
      <h3 class="text-simple">Redefinição de Senha!</h3>
      <form class="forms">
        <label>E-mail cadastrado:</label>
        ${Input({
    class: 'email-input',
    placeholder: 'exemplo@seudomínio.com',
    value: '',
    type: 'email',
  })}
        ${Button({
    id: 'btnResetpassword',
    title: 'Enviar email para redefinir senha',
    onClick: resetPassword,
  })}
      </form>
    <p class="alert-message"></p>
    </section>
  </div>
  `;
  window.location.hash = 'forgot_password';
  return template;
}

function resetPassword() {
  const emailAddress = document.querySelector('.email-input').value;
  firebase.auth().sendPasswordResetEmail(emailAddress).then(() => {
    document.querySelector('.alertMessage').textContent = 'Email enviado <br> Verifique sua caixa de email';
  });
}

export default ForgotPassword;
