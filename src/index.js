import './styles.scss';
import 'bootstrap';
import 'jquery-mask-plugin';

import Cadastro from './pages/cadastro/cadastro';
import Dashboard from './pages/dashboard/dashboard';
import Listar from './pages/listar/listar';
import Utils from './pages/utils/Utils';

const $$ = $.noConflict();
const $btnCadastro = Utils.querySelector('#newSeller');
const $btnLogin = Utils.querySelector('#formLogin');
const $navbarLogout = Utils.querySelector('#navbar-logout');
const $btnAddSale = Utils.querySelector('#addSale');
const $btnSaveSales = Utils.querySelector('#saveSales');

let currentUser = undefined;

if (Utils.hasLocalstorage()) {
  currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
  if (currentUser) {
    const spanUsername = document.querySelector('#currentUserName');
    if (spanUsername) { {
      document
        .querySelector('#currentUserName')
        .innerHTML = currentUser.name.split(' ')[0];
    }}
  } else {
    if (!$btnLogin && !Utils.isPage('cadastro')) {
      Utils.changeHref('/');
    }
  }
} else {
  Utils.changeHref('/');
}

if ($navbarLogout) {
  $navbarLogout.addEventListener('click', () => {
    window.localStorage.clear();
    Utils.changeHref('/');
  })
}

if (Utils.isLoginPage()) {
  $btnLogin.addEventListener('click', async ($event) => {
    $event.preventDefault();
    const email = Utils.querySelector('#email').value;
    const password = Utils.querySelector('#password').value;
    try {
      const currentUser = await Cadastro.login({email, password: btoa(password)});
      if (currentUser.data.id) {
        if (Utils.hasLocalstorage()) {
          window.localStorage.setItem('currentUser', JSON.stringify(currentUser.data));
        }
        Utils.changeHref('/dashboard.html');
      } else {
        $$('.alert').removeClass('d-none');
      }
    } catch ($y) {
      $$('.alert').removeClass('d-none');
    }
  });
}

if (Utils.isPage('cadastro')) {
  Utils.resetUserForm();
  $btnCadastro.addEventListener('click', () => {
    const nameInput = Utils.querySelector('#nameInput').value;
    const documentInput = Utils.querySelector('#documentInput').value;
    const emailInput = Utils.querySelector('#emailInput').value;
    const passwordInput = Utils.querySelector('#passwordInput').value;
    const passwordConfirmInput = Utils.querySelector('#passwordConfirmInput').value;

    if (nameInput.split(" ").length <= 1) {
      alert("Entre com um sobrenome!");
      return false;
    }

    if (!emailInput) {
      alert("Entre com um e-mail!");
      return false;
    }

    if (!documentInput) {
      alert("Entre com um CPF!");
      return false;
    }

    if (passwordInput && passwordConfirmInput) {
      if (passwordInput === passwordConfirmInput) {
        const res = Cadastro.post({
          name: nameInput,
          document: documentInput,
          email: emailInput,
          password: btoa(`${passwordInput}`)
        });
        res
          .then(res => res.data)
          .then(data => {
          if (data.success) {
            alert('Cadastro realizado com sucesso!');
            Utils.changeHref('/');
          } else {
            alert(data.message);
          }
        });
      } else {
        alert('As senhas estão diferentes!');
        return false;
      }
    } else {
      alert('Digite a senha!');
      return false;
    }
  });
}

if (Utils.isPage('dashboard')) {
  Utils.createJqueryMask();
  let row = 0;
  $btnAddSale.addEventListener('click', () => {
    const table = document.querySelector('#table-body');
    table.insertAdjacentHTML('beforeend', Dashboard.addNewRow(++row));
    Utils.createJqueryMask();

    const $btnRmSale = document.querySelectorAll('.rmSale');
    $btnRmSale.forEach(btn => {
      btn.addEventListener('click', ($event) => {
        const id = $event.target.dataset.id;
        Dashboard.removeRow(id);
      });
    });
  });

  $btnSaveSales.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja salvar?')) {
      Dashboard.saveSales(currentUser.id);
      alert('Compras cadastradas com sucesso!');
    }
  });
}

if (Utils.isPage('listar')) {
  const html = Listar.getSales(currentUser.id);
  html.then(rows => {
    if (rows.length) {
      $('.not-found').remove();
    }
    const table = document.querySelector('#table-body');
    table.insertAdjacentHTML('beforeend', rows);
    Utils.createJqueryMask();
    document.querySelector('#total_cashbask').innerHTML = Utils.sumCashback();
    document.querySelectorAll('.btnDeleteSale').forEach(
      btn => {
        btn.addEventListener('click', async ($event) => {
          if (confirm('Deseja remover o registro?')) {
            const saleId = $event.target.dataset.id;
            await Listar.deleteSale(currentUser.id, saleId);
            document.querySelector(`#row-${saleId}`).remove();
            document.querySelector('#total_cashbask').innerHTML = Utils.sumCashback();
          }
        })
      });
  });
}
