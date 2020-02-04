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
  document.querySelector('.modal-content').innerHTML = `<div>
  <span>Deletar conta</span>
  <button onclick=document.getElementById('myModal').classList.remove('show')>
    X
  </button>
  <button 
  onclick=firebase.auth().currentUser.delete()
  .then(document.getElementById('myModal').classList.remove('show'))>
    Deletar conta
  </button>
  </div>`;
}

function saveData() {
  const name = document.querySelector('.name-perfil').value;
  const email = document.querySelector('.email-perfil').value;
  const job = document.querySelector('.perfil-job').value;
  const dateBorn = document.querySelector('.perfil-born').value;
  firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update(
    { job, dateBorn },
  );
  firebase.auth().currentUser.updateProfile({
    displayName: name,
    email,
  });
}
function Profile() {
  const template = `
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
    class: 'perfil',
    value: `${firebase.auth().currentUser.displayName}`,
    type: 'text',
  })}
          <label>Email: </label/>
          ${Input({
    class: 'perfil',
    value: `${firebase.auth().currentUser.email}`,
    type: 'text',
  })}
          <label>Ocupação: </label/>
          ${Input({
    class: 'perfil-job',
    value: `${firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
      .then((doc) => { document.querySelector('.perfil-job').value = doc.data().job; })}`,
    type: 'text',
  })}
          <label>Data de nascimento: </label/> 
          ${Input({
    class: 'perfil-born',
    value: `${firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
      .then((doc) => { document.querySelector('.perfil-born').value = doc.data().dateBorn; })}`,
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
      <div class="modal-content">
      </div>
    </div>
  </div>
    `;
  window.location.hash = 'profile';
  return template;
}

export default Profile;
