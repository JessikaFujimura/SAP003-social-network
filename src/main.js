import Login from './pages/login.js';
import Register from './pages/register.js';
import Post from './pages/post.js';
import ForgotPassword from './pages/forgot_password.js'
import Profile from './pages/profile.js'

window.addEventListener('load', routesPage);

function routesPage() {
  const main = document.querySelector('main')
  firebase.auth().onAuthStateChanged(function (user) {
    switch (location.hash) {
      case "#post":
          user ? main.innerHTML = Post() : window.location = "#login";
          break;
      case "#register":
        user ? window.location = "#post" : main.innerHTML = Register();
        break;
      case "#login":
        user ? window.location.hash = "#post": main.innerHTML = Login();
        break;
      case "#forgot_password":
        user ? window.location = "#post" : main.innerHTML = ForgotPassword();
        break;
      case "#profile":
        user ? main.innerHTML = Profile() : window.location = "#login";
        break;
      default:
        window.location = "#login";
    }
  })
}

window.addEventListener('hashchange', routesPage, false);
window.addEventListener('load', routesPage);