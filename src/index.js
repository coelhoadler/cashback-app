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
    cadastro.login({email, password: btoa(password)});
    // TODO: redirecionar para o dashboard
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
    dashboard.saveSales();
  });
}

// TODO: Criar classe de Utils
function querySelector(id) {
  return document.querySelector(`#${id}`).value;
}
