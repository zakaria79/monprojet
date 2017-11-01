import Tether from 'tether';
import bootstrap from 'bootstrap';
import Action from './partner-module/action/Action';

document.addEventListener('DOMContentLoaded', ()  => {
  let action = new Action();
  action.run();
});
