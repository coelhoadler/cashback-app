import './styles.scss';
import 'bootstrap';

import Cadastro from './pages/cadastro';
import Dashboard from './pages/dashboard/dashboard';

const cadastro = new Cadastro();
const dashboard = new Dashboard();

const $btnCadastro = document.querySelector('#newSeller');
const $btnLogin = document.querySelector('#formLogin');

const $btnAddSale = document.querySelector('#addSale');
const $btnSaveSales = document.querySelector('#saveSales');

let currentUser = undefined;
if (hasLocalstorage()) {
  currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
}

// Cadastro
if ($btnCadastro) {
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

// Login
if ($btnLogin) {
  $btnLogin.addEventListener('click', async ($event) => {
    $event.preventDefault();
    const email = querySelector('email');
    const password = querySelector('password');
    const cadastro = new Cadastro();
    const currentUser = await cadastro.login({email, password: btoa(password)});

    if (hasLocalstorage()) {
      window.localStorage.setItem('currentUser', JSON.stringify(currentUser.data));
    }

    window.location = "/dashboard.html";
  });
}

// Dashboard
if ($btnAddSale) {
  let row = 0;
  $btnAddSale.addEventListener('click', () => {
    const table = document.querySelector('#table-body');
    table.insertAdjacentHTML('beforeend', dashboard.addNewRow(++row));

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

// TODO: Criar classe de Utils
function querySelector(id) {
  return document.querySelector(`#${id}`).value;
}

function hasLocalstorage() {
  return !!window.localStorage;
}
