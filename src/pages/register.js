import Button from '../components/button.js';
import Input from '../components/input.js';

function Register() {
  const template = `
  <div class="template">
    <header class="header"><img class="logo" src="./Imagens/header-logo.png"></header>
    <section class = "register-section">
      <h1 class="name-network">Heroínas</h1>
      <h3 class="text-simple">Para fazer seu cadastro na rede Heroínas preencha os campos abaixo!</h3>
      <form class="forms">
        <label>Nome Completo :</label>      
        ${Input({
        class: 'name-input',
        placeholder: 'Mulher Maravilha',
        value:'',
        type: 'text',
        })}
        <label>Data de nascimento :</label> 
        ${Input({
        class: 'birth-date-input',
        placeholder: '',
        value:'',
        type: 'date',
        })}
        <label> Ocupação:</label> 
        ${Input({
        class: 'job-input',
        placeholder: 'Desenvolvedora front-end na Heroínas',
        value:'',
        type: 'text',
        })}
        <label> Email:</label> 
        ${Input({
        class: 'email-input',
        placeholder:'exemplo@seudomínio.com',
        value:'',
        type: 'text',
      })}
      <label> Senha:</label> 
          ${Input({
        class: 'password-input ',
        placeholder: '********',
        value:'',
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
  location.hash = 'register'
  return template;
}

function createCount() {
  const email = document.querySelector('.email-input').value;
  const password = document.querySelector('.password-input').value;
  const name = document.querySelector('.name-input').value;
  const born = document.querySelector('.birth-date-input').value;
  const job = document.querySelector('.job-input').value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      firebase.auth().currentUser.updateProfile({
        displayName: name,
      });
      firebase.auth().currentUser.sendEmailVerification()
      const codUid = firebase.auth().currentUser.uid;
      firebase.firestore().collection('users').doc(codUid).set({
        name,
        dateBorn: born,
        job,
      }) 
      window.location.hash = 'login';
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == 'auth/email-already-in-use') {
        document.querySelector('.alertMessage').textContent ='E-mail já cadastrado.';
      } if (errorCode == 'auth/weak-password') {
        document.querySelector('.alertMessage').textContent = 'A senha é muito fraca.';
      } if (errorCode == 'auth/invalid-email') {
        document.querySelector('.alertMessage').textContent ='E-mail inválido.';
      } else {
        document.querySelector('.alertMessage').textContent = errorMessage;
      }
    });
}

export default Register;
