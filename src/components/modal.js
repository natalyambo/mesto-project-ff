export {openPopup, closePopup}

function openPopup(popup) {
    document.addEventListener('keydown', escClose);
    popup.addEventListener('click', overlayClose);
    popup.classList.add('popup_is-opened');
  };
  
  function closePopup(popup) {
    document.removeEventListener('keydown', escClose);
    popup.removeEventListener('click', overlayClose);
    popup.classList.remove('popup_is-opened');
  };
  
  function escClose(event) {
    if(event.key === 'Escape') {
       closePopup(document.querySelector('.popup_is-opened'));
    }
  };
  
  function overlayClose(event) {
    if(event.currentTarget === event.target) {
       closePopup(document.querySelector('.popup_is-opened'));
    }
  };