/* eslint-disable no-return-assign */
import Button from '../components/button.js';
import Input from '../components/input.js';
import Menu from '../components/menu.js';
import Header from '../components/header.js';

function pageFeed() {
  window.location.hash = 'post';
}

function logOut() {
  firebase.auth().signOut();
}

function deleteCount() {
  document.querySelector('#myModal').classList.add('show');
  document.querySelector('.modal-content').innerHTML = `
  <span>Quer mesmo deletar a conta?</span>
  <p class='buttonModal'>
  <button onclick=document.getElementById('myModal').classList.remove('show')>
    Cancelar
  </button>
  <button 
  onclick=firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).delete().then(firebase.auth().currentUser.delete())
  >
    Deletar conta
  </button>
  </p>
  `;
}

function saveData() {
  const name = document.querySelector('#name-profile').value;
  const email = document.querySelector('#email-profile').value;
  const job = document.querySelector('#job-profile').value;
  const dateBorn = document.querySelector('#born-profile').value;
  firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update(
    { job, dateBorn },
  );
  firebase.auth().currentUser.updateProfile({
    displayName: name,
    email,
  });
}

async function dataFirebase() {
  const job = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
    .then(doc => doc.data().job);
  const born = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
    .then(doc => doc.data().dateBorn);
  return { job, born };
}

const template = (job, born) => `
    <div class="template">
      ${Header({ class: 'header', classImg: 'logo' })}
      <input type="checkbox" id="btn-menu"/>
      <label for="btn-menu">&#9776;</label>
      <nav class="menu" id="post">
      <ul>
      ${Menu({
    name: 'Feed',
    link: pageFeed,
  })}
      ${Menu({
    name: 'Sair',
    link: logOut,
  })}
      </ul> 
      </nav>
      <section class = "profile-section">
        <h1 class="name-network">Heroínas</h1>
        <form class="forms">
          <label>Nome: </label/>
          ${Input({
    id: 'name-profile',
    placeholder: 'Mulher Maravilha',
    value: `${firebase.auth().currentUser.displayName}`,
    type: 'text',
  })}
          <label>Email: </label/>
          ${Input({
    id: 'email-profile',
    placeholder: 'exemplo@exe.com',
    value: `${firebase.auth().currentUser.email}`,
    type: 'text',
  })}
          <label>Ocupação: </label/>
          ${Input({
    id: 'job-profile',
    placeholder: 'Desenvolvedora',
    value: job,
    type: 'text',
  })}
          <label>Data de nascimento: </label/> 
          ${Input({
    id: 'born-profile',
    placeholder: '1991-07-25',
    value: born,
    type: 'text',
  })}
          <div class="group-button">
          ${Button({
    id: 'saveData',
    title: 'Salvar dados',
    onClick: saveData,
  })}
          ${Button({
    id: 'deleteCount',
    title: 'Deletar conta',
    onClick: deleteCount,
  })}
          </div>
      </form>
    </section>
    <div id="myModal" class="modal">
      <section class="modal-content">
      </section>
    </div>
  </div>
  `;

function Profile() {
  dataFirebase().then(({ job, born }) => {
    const main = document.querySelector('main');
    return main.innerHTML = template(job, born);
  });
}

export default Profile;
