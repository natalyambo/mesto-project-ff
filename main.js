(()=>{"use strict";function e(e){document.addEventListener("keydown",n),e.classList.add("popup_is-opened")}function t(e){document.removeEventListener("keydown",n),e.classList.remove("popup_is-opened")}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function r(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),u=c.querySelector(".card__delete-button"),a=c.querySelector(".card__image"),i=c.querySelector(".card__title"),l=c.querySelector(".card__like-button");return e._id,a.src=e.link,a.alt=e.name,i.textContent=e.name,u.addEventListener("click",(function(){return t(c)})),l.addEventListener("click",n),a.addEventListener("click",(function(){return r(e)})),c}function o(e){e.remove()}function c(e){e.target.classList.contains("card__like-button")&&e.target.classList.toggle("card__like-button_is-active")}var u=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},a=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))};function i(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){u(e,n,t)})),a(n,r,t)}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var s=document.querySelector(".places__list"),p=document.querySelectorAll(".popup"),d=document.querySelector(".popup_type_image"),f=d.querySelector(".popup__image"),m=document.querySelector(".popup__caption"),_=document.querySelectorAll(".popup__close"),y=document.querySelector(".popup_type_edit"),v=document.querySelector(".profile__edit-button"),S=document.querySelector('.popup__form[name="edit-profile"]'),h=S.querySelector(".popup__input_type_name"),b=S.querySelector(".popup__input_type_description"),q=document.querySelector(".profile__title"),E=document.querySelector(".profile__description"),C=document.querySelector(".popup_type_new-card"),g=document.querySelector(".profile__add-button"),L=document.querySelector('.popup__form[name="new-place"]'),k=L.querySelector(".popup__input_type_card-name"),A=L.querySelector(".popup__input_type_url"),x={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function w(t){f.src=t.link,f.alt=t.name,m.textContent=t.name,e(d)}function T(e,t){t.querySelector(".popup__button").textContent=e?"Сохранение...":"Сохранить"}_.forEach((function(e){e.addEventListener("click",(function(){return t(e.closest(".popup"))}))})),p.forEach((function(e){e.addEventListener("click",(function(e){!function(e){e.currentTarget===e.target&&t(e.target)}(e)}))})),v.addEventListener("click",(function(){h.value=q.textContent,b.value=E.textContent,e(y),i(S,x)})),S.addEventListener("submit",(function(e){e.preventDefault(),T(!0,y),function(e,t){return fetch("".concat(j.baseUrl,"/users/me"),{method:"PATCH",headers:j.headers,body:JSON.stringify({name:e,about:t})}).then(B)}(h.value,b.value).then((function(e){q.textContent=e.name,E.textContent=e.about,t(y)})).catch((function(e){console.log(e,"Ошибка при редактировании профиля")}))})),L.addEventListener("submit",(function(e){e.preventDefault(),T(!0,C),function(e,t){return fetch("".concat(j.baseUrl,"/users/me"),{method:"POST",headers:j.headers,body:JSON.stringify({name:e,about:t})}).then(B)}(nameValue,linkValue).then((function(e){var n=r(e,o,c,w,userId);s.prepend(n),t(C),L.reset()})).catch((function(e){console.log(e,"Ошибка при добавлении новой карточки")}))})),g.addEventListener("click",(function(){k.value="",A.value="",e(C),i(L,x)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);a(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.classList.add(r.errorClass),o.textContent=n}(e,t,t.validationMessage,n)}(e,o,t),a(n,r,t)}))}))}(t,e)}))}(x);var j={baseUrl:"https://nomoreparties.co/v1/pwff-cohort-1",headers:{authorization:"30d7dfb4-52db-4323-8529-5ffc3a10a46d","Content-Type":"application/json"}};function B(e){if(!e.ok)throw new Error("Ошибка: ".concat(e.status," ").concat(e.statusText));return e.json()}Promise.all([fetch("".concat(j.baseUrl,"/users/me"),{method:"GET",headers:j.headers}).then(B),fetch("".concat(j.baseUrl,"/cards"),{method:"GET",headers:j.headers}).then(B)]).then((function(e){var t,n,u=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=u[0],i=u[1];q.textContent=a.name,E.textContent=a.about,i.forEach((function(e){var t=r(e,o,c,w,userId);s.append(t)}))})).catch((function(e){console.log(e)}))})();