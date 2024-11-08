(()=>{"use strict";function e(e){document.addEventListener("keydown",n),e.classList.add("popup_is-opened")}function t(e){document.removeEventListener("keydown",n),e.classList.remove("popup_is-opened")}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function r(e,t,n,r){var o=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),c=o.querySelector(".card__delete-button"),i=o.querySelector(".card__image"),u=o.querySelector(".card__title"),a=o.querySelector(".card__like-button");return i.src=e.link,i.alt=e.name,u.textContent=e.name,c.addEventListener("click",(function(){return t(o)})),a.addEventListener("click",n),i.addEventListener("click",(function(){return r(e)})),o}function o(e){e.remove()}function c(e){e.target.classList.contains("card__like-button")&&e.target.classList.toggle("card__like-button_is-active")}var i=document.querySelector(".places__list"),u=document.querySelectorAll(".popup"),a=document.querySelector(".popup_type_image"),p=a.querySelector(".popup__image"),l=document.querySelector(".popup__caption"),s=document.querySelectorAll(".popup__close"),d=document.querySelector(".popup_type_edit"),_=document.querySelector(".profile__edit-button"),m=document.querySelector('.popup__form[name="edit-profile"]'),f=m.querySelector(".popup__input_type_name"),v=m.querySelector(".popup__input_type_description"),y=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),q=document.querySelector(".popup_type_new-card"),k=document.querySelector(".profile__add-button"),C=document.querySelector('.popup__form[name="new-place"]'),L=C.querySelector(".popup__input_type_card-name"),g=C.querySelector(".popup__input_type_url");function E(t){p.src=t.link,p.alt=t.name,l.textContent=t.name,e(a)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var t=r(e,o,c,E);i.append(t)})),s.forEach((function(e){e.addEventListener("click",(function(){return t(e.closest(".popup"))}))})),u.forEach((function(e){e.addEventListener("click",(function(e){!function(e){e.currentTarget===e.target&&t(e.target)}(e)}))})),_.addEventListener("click",(function(){f.value=y.textContent,v.value=S.textContent,e(d),x(m,validationConfig)})),m.addEventListener("submit",(function(e){e.preventDefault(),y.textContent=f.value,S.textContent=v.value,t(d)})),C.addEventListener("submit",(function(e){e.preventDefault();var n=r({name:L.value,alt:L.value,link:g.value},o,c,E);i.prepend(n),C.reset(),x(q,validationConfig),t(q)})),k.addEventListener("click",(function(){return e(q)})),validationConfig({formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"});var b=function(e,t,n){var r=e.querySelector(".".concat(popupInput.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},h=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))};function x(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){b(e,n,t)}));var n=e.querySelector(t.submitButtonSelector);n.disabled=!0,n.classList.add(t.inactiveButtonClass)}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=document.querySelector(t.submitButtonSelector);h(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){(function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?b(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(popupInput.id,"-error"));t.classList.add(r.inputErrorClass),o.classList.add(r.errorClass),o.textContent=n}(e,t,t.validationMessage,n)})(e,o,t),h(n,r,t)}))}))}(t,e)}))}(validationConfig)})();