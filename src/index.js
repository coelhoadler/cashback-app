import './styles.scss';
import 'bootstrap';

import Cadastro from './pages/cadastro'

const $btnCadastro = document.querySelector('#newSeller');
const $btnLogin = document.querySelector('#formLogin');

if ($btnCadastro) {
  $btnCadastro.addEventListener('click', () => {
    const nameInput = querySelector('nameInput');
    const documentInput = querySelector('documentInput');
    const emailInput = querySelector('emailInput');
    const passwordInput = querySelector('passwordInput');
    const passwordConfirmInput = querySelector('passwordConfirmInput');
    const cadastro = new Cadastro();

    console.log(passwordInput)

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

if ($btnLogin) {
  $btnLogin.addEventListener('click', async ($event) => {
    $event.preventDefault();
    const email = querySelector('email');
    const password = querySelector('password');
    const cadastro = new Cadastro();

    const xpto = await cadastro.login({email, password: btoa(password)});
    // TODO: redirecionar para a próxima página

  });
}


function querySelector(id) {
  return document.querySelector(`#${id}`).value;
}

