import TextArea from '../components/textarea.js';
import Button from '../components/button.js';
import PostCard from '../components/postcard.js';
import Icons from '../components/icons.js';
import Menu from '../components/menu.js';

function Post() {
  const template = `
  <header class="header-post"><img class="img-post" src="./Imagens/header-logo.png" class="img-post"></header>
  <input type="checkbox" id="btn-menu"/>
  <label for="btn-menu">&#9776;</label>
  <nav class="menu">
    <ul>
    ${Menu({
      name: 'Perfil',
      link: pageProfile,
    })}
    ${Menu({
      name: 'Sair',
      link: logOut,
    })}
    </ul> 
  </nav>
  <section class="template-post">
    <div class="user">
      <img class = "avatar" src="./Imagens/avatar.png">
      <div class="user-info">
        <p class = "name-user">${firebase.firestore().collection('users').doc(firebase.auth().getUid(firebase.auth().currentUser.email)).get().then(function (doc) { document.querySelector('.name-user').textContent = doc.data().name })}</p>
        <p class='job-user'>${firebase.firestore().collection('users').doc(firebase.auth().getUid(firebase.auth().currentUser.email)).get().then(function (doc) { document.querySelector('.job-user').textContent = doc.data().job })}</p>
      </div>
    </div>
    <div class="box-post">
      <form class="forms-post">
        ${TextArea({
        class: 'post',
        placeholder: 'O que quer compartilhar?',
      })}
        ${Button({
        id: 'btnshare',
        title: 'Compartilhar',
        onClick: SharePost,
      })}
      </form>
      <ul id="list-post"></ul>
    </div>
  </section>
  ` 
  loadPost();
  return template;
}

function loadPost() {
  const email = firebase.auth().currentUser.email;
  const codUid = firebase.auth().getUid(email);
  firebase.firestore().collection('Posts').where("user", "==", codUid).orderBy("data", "desc").get().then(
    (snap) => {
      snap.forEach((doc) => {
      document.getElementById("list-post").innerHTML += `<div id=${doc.id} class='post-box'> 
      ${Icons({ dataId: doc.id, class: 'delete', title: 'X', onClick: deletePost, })}
      ${PostCard({ dataId: doc.id, name:doc.data().name, post:doc.data().post, time:doc.data().data.toDate().toLocaleString("pt-BR")})} 
      ${Icons({ dataId: doc.id, class: 'like', title: `👍 ${doc.data().likes}`, onClick: likePost, })}
      ${Icons({ dataId: doc.id, class: 'edit', title: `📝`, onClick: editPost, })}
      ${Icons({ dataId: doc.id, class: 'save', title: `💾`, onClick: savePost, })}
    </div> `
      document.getElementById(doc.id).querySelector('.primary-icon-save').style.display = 'none';
      });
    }
  );
}

function SharePost() {
  const postText = document.querySelector('.post-textarea').value;
  const email = firebase.auth().currentUser.email
  const codUid = firebase.auth().getUid(email);
  const time = firebase.firestore.FieldValue.serverTimestamp();
  const name = firebase.auth().currentUser.displayName;
  firebase.firestore().collection('Posts').add({
    name: name,
    user: codUid,
    data: time,
    likes: 0,
    post: postText,
    comments: []
  }).then(function () {
    location.reload()
  })
  document.querySelector('.js-post').value = '';
}

function deletePost(event) {
  const idPost = event.target.dataset.id;
  firebase.firestore().collection('Posts').doc(idPost).delete();
  event.target.parentElement.remove();
}

function likePost(event) {
  const idPost = event.target.dataset.id;
  const time = firebase.firestore.FieldValue.serverTimestamp();
  firebase.firestore().collection('Posts').doc(idPost).get().then(function (doc) {
    let numLikes = doc.data().likes;
    numLikes++
    firebase.firestore().collection('Posts').doc(idPost).update({
      likes: numLikes,
      time,
    }).then(() => {
      location.reload()
    })
  })
}

function editPost(event) {
  const idPost = event.target.dataset.id;
  const select = document.querySelector(`li[data-id= '${idPost}']`).getElementsByClassName('card-post')[0];
  select.setAttribute('contentEditable', 'true')
  document.getElementById(idPost).querySelector('.primary-icon-save').style.display = 'inline';
}

function savePost(event) {
  const idPost = event.target.dataset.id;
  const time = firebase.firestore.FieldValue.serverTimestamp();
  const newtext = document.querySelector(`li[data-id= '${idPost}']`).getElementsByClassName('card-post')[0].innerHTML;
  firebase.firestore().collection('Posts').doc(idPost).update(
    { post: newtext,
      time,
    }).then(() => location.reload())
  document.getElementById(idPost).querySelector('.primary-icon-save').style.display = 'none';
}

function pageProfile() {
  window.location.hash = 'profile'
};

function logOut() {
  firebase.auth().signOut();
};

window.post = {
  loadPost,
  deletePost,
  editPost,
  savePost,
}

export default Post;
