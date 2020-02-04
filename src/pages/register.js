import Button from '../components/button.js';
import Input from '../components/input.js';
import Header from '../components/header.js';

function createCount() {
  const email = document.querySelector('#email-register').value;
  const password = document.querySelector('#password-register').value;
  const name = document.querySelector('#name-register').value;
  const born = document.querySelector('#birth-date-register').value;
  const job = document.querySelector('#job-register').value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      firebase.auth().currentUser.updateProfile({
        displayName: name,
      });
      firebase.auth().currentUser.sendEmailVerification();
      const codUid = firebase.auth().currentUser.uid;

      firebase.firestore().collection('users').doc(codUid).set({
        name,
        dateBorn: born,
        job,
      });
      window.location.hash = 'login';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/email-already-in-use') {
        document.querySelector('.alertMessage').textContent = 'E-mail já cadastrado.';
      } if (errorCode === 'auth/weak-password') {
        document.querySelector('.alertMessage').textContent = 'A senha é muito fraca.';
      } if (errorCode === 'auth/invalid-email') {
        document.querySelector('.alertMessage').textContent = 'E-mail inválido.';
      } else {
        document.querySelector('.alertMessage').textContent = errorMessage;
      }
    });
}

function Register() {
  const template = `
  <div class="template">
    ${Header({ class: 'header', classImg: 'logo' })}
    <section class = "register-section">
      <h1 class="name-network">Heroínas</h1>
      <h3 class="text-simple">
        Para fazer seu cadastro na rede Heroínas preencha os campos abaixo!
      </h3>
      <form class="forms">
        <label>Nome Completo :</label>      
        ${Input({
    id: 'name-register',
    placeholder: 'Mulher Maravilha',
    value: '',
    type: 'text',
  })}
        <label>Data de nascimento :</label> 
        ${Input({
    id: 'birth-date-register',
    placeholder: '',
    value: '',
    type: 'date',
  })}
        <label> Ocupação:</label> 
        ${Input({
    id: 'job-register',
    placeholder: 'Desenvolvedora front-end na Heroínas',
    value: '',
    type: 'text',
  })}
        <label> Email:</label> 
        ${Input({
    id: 'email-register',
    placeholder: 'exemplo@seudomínio.com',
    value: '',
    type: 'text',
  })}
      <label> Senha:</label> 
          ${Input({
    id: 'password-register ',
    placeholder: '********',
    value: '',
    type: 'password',
  })}
      <p class="alert-message"></p>
          ${Button({
    id: 'btncreate-count',
    title: 'Criar Conta',
    onClick: createCount,
  })}
    </form>
  </section>
</div>
  `;
  window.location.hash = 'register';
  return template;
}


export default Register;
