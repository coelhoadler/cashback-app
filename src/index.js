import './styles.scss';

import $ from 'jquery'
import 'bootstrap';
import 'jquery-mask-plugin';

import Cadastro from './pages/cadastro/cadastro';
import Dashboard from './pages/dashboard/dashboard';
import Listar from './pages/listar/listar';

const cadastro = new Cadastro();
const dashboard = new Dashboard();

const $btnCadastro = document.querySelector('#newSeller');
const $btnLogin = document.querySelector('#formLogin');
const $navbarLogout = document.querySelector('#navbar-logout');

const $btnAddSale = document.querySelector('#addSale');
const $btnSaveSales = document.querySelector('#saveSales');

// TODO: implementar guard

let currentUser = undefined;
if (hasLocalstorage()) {
  currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
  if (currentUser) {
    const spanUsername = document.querySelector('#currentUserName');
    if (spanUsername) { {
      document
        .querySelector('#currentUserName')
        .innerHTML = currentUser.name.split(' ')[0];
    }}
  }
} else {
  window.location.href = '/';
}

if ($navbarLogout) {
  $navbarLogout.addEventListener('click', () => {
    window.localStorage.clear();
    window.location.href = '/';
  })
}

if (isLoginPage()) {
  $btnLogin.addEventListener('click', async ($event) => {
    $event.preventDefault();
    const email = querySelector('email');
    const password = querySelector('password');
    const cadastro = new Cadastro();

    try {
      const currentUser = await cadastro.login({email, password: btoa(password)});
      if (currentUser.data.id) {
        if (hasLocalstorage()) {
          window.localStorage.setItem('currentUser', JSON.stringify(currentUser.data));
        }
        window.location.href = "/dashboard.html";
      } else {
        document.querySelector('.alert').classList.remove('d-none');
      }
    } catch ($y) {
      document.querySelector('.alert').classList.remove('d-none');
    }
  });
}

if (isPage('cadastro')) {
  $btnCadastro.addEventListener('click', () => {
    const nameInput = querySelector('nameInput');
    const documentInput = querySelector('documentInput');
    const emailInput = querySelector('emailInput');
    const passwordInput = querySelector('passwordInput');
    const passwordConfirmInput = querySelector('passwordConfirmInput');

    if (passwordInput && passwordConfirmInput) {
      if (passwordInput === passwordConfirmInput) {
        cadastro.post({
          name: nameInput,
          document: documentInput,
          email: emailInput,
          password: btoa(`${passwordInput}`)
        });
      } else {
        console.log('Senhas diferentes!');
      }
    } else {
      console.log('Digite as senhas');
    }
  });
}

if (isPage('dashboard')) {
  createMask();

  let row = 0;
  $btnAddSale.addEventListener('click', () => {
    const table = document.querySelector('#table-body');
    table.insertAdjacentHTML('beforeend', dashboard.addNewRow(++row));
    createMask();

    const $btnRmSale = document.querySelectorAll('.rmSale');
    $btnRmSale.forEach(btn => {
      btn.addEventListener('click', ($event) => {
        const id = $event.target.dataset.id;
        dashboard.removeRow(id);
      });
    });

  });

  $btnSaveSales.addEventListener('click', () => {
    dashboard.saveSales(currentUser.id);
  });
}

if (isPage('listar')) {
  const html = Listar.getSales(currentUser.id);
  html.then(rows => {
    const table = document.querySelector('#table-body');
    table.insertAdjacentHTML('beforeend', rows);
    createMask();
  })
}

// TODO: Criar classe de Utils

function querySelector(id) {
  return document.querySelector(`#${id}`).value;
}

function hasLocalstorage() {
  return !!window.localStorage;
}

function createMask() {
  $('.money').mask('####,#0000,0', { reverse: true });
  $('.date').mask('00/00/0000');
}

function isPage(pageName) {
  return window.location.href.includes(pageName);
}

function isLoginPage() {
  return !!$btnLogin;
}
