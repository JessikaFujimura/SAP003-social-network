import TextArea from '../components/textarea.js';
import Button from '../components/button.js';
import PostCard from '../components/postcard.js';
import Icons from '../components/icons.js';
import Menu from '../components/menu.js';

function loadPost() {
  const email = firebase.auth().currentUser.email;
  const codUid = firebase.auth().getUid(email);
  firebase.firestore().collection('Posts').where("user", "==", codUid).orderBy("data", "desc").get().then(
    (snap) => {
      snap.forEach((doc) => {
      document.getElementById("list-post").innerHTML += `<div id=${doc.id} class='post-box'> 
        ${Icons({ 
          dataId: doc.id, 
          class: 'delete', 
          title: 'X', 
          onClick: deletePost, 
        })}
        ${PostCard({ 
          dataId: doc.id, 
          name: doc.data().name, 
          post: doc.data().post, 
          time: doc.data().data.toDate().toLocaleString("pt-BR"),
        })} 
        ${Icons({ 
          dataId: doc.id, 
          class: 'like', 
          title: `👍 ${doc.data().likes}`, 
          onClick: likePost, 
        })}
        ${Icons({ 
          dataId: doc.id,
          class: 'edit', 
          title: `📝`, 
          onClick: editPost, 
        })}
        ${Icons({
        dataId: doc.id, class: 'save', title: `💾`, onClick: savePost, })}
        </div> `
      document.getElementById(doc.id).querySelector('.primary-icon-save').style.display = 'none';
      });
    }
  );
}

function Post() {
  const nameUser = function() {
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
    .then(function (doc) { document.querySelector('.name-user').textContent = doc.data().name })
  }
  const ocupationUser = () => {
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
    .then(function (doc) { document.querySelector('.job-user').textContent = doc.data().job })
  }
  const template = `
  <header class="header-post">
    <img class="img-post" src="./Imagens/header-logo.png" class="img-post">
  </header>
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
        <p class = "name-user"></p>
        <p class='job-user'></p>
      </div>
    </div>
    <div class="box-post">
      <form class="forms-post">
        ${TextArea({
        class:'post',
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
  `;
  nameUser();
  ocupationUser();
  loadPost();
  return template;
}

function SharePost() {
  const postText = document.querySelector('.post-textarea').value;
  const time = firebase.firestore.FieldValue.serverTimestamp();
  const name = firebase.auth().currentUser.displayName;
  firebase.firestore().collection('Posts').add({
    name: name,
    user: id,
    data: time,
    likes: 0,
    post: postText,
    comments: []
  }).then((docRef) => {
    document.querySelector('#list-post').insertAdjacentHTML('afterbegin',
    '<div id='+docRef.id+' class=post-box>'+window.Icons({ dataId: docRef.id, class: 'delete', title: 'X', onClick: window.post.deletePost})+''+window.PostCard({dataId:docRef.id, name:name, post:postText})+''+window.Icons({ dataId: docRef.id, class: 'like', title: `👍 0`, onClick: window.post.likePost, })+' '+window.Icons({ dataId: docRef.id, class: 'edit', title: `📝`, onClick: window.post.editPost, })+' '+window.Icons({dataId: docRef.id, class: 'save', title: `💾`, onClick: window.post.savePost, })+'</div>');
    document.getElementById(docRef.id).querySelector('.primary-icon-save').style.display = 'none';
})
  document.querySelector('.post-textarea').value = '';
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
  select.focus();
  document.getElementById(idPost).querySelector('.primary-icon-save').style.display = 'inline';

}

function savePost(event) {
  const idPost = event.target.dataset.id;
  const time = firebase.firestore.FieldValue.serverTimestamp();
  const newtext = document.querySelector(`li[data-id= '${idPost}']`).getElementsByClassName('card-post')[0].innerHTML;
  firebase.firestore().collection('Posts').doc(idPost).update(
    { post: newtext,
      time,
    }).then(() => {
      location.reload()
    })
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
  likePost,
  editPost,
  savePost,
  logOut,
  pageProfile,
}

export default Post;
