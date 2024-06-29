// Fonction pour éditer la navigation
function editNav() {
  const x = document.getElementById("myTopnav");
  x.className = (x.className === "topnav") ? "topnav responsive" : "topnav";
}

document.addEventListener('DOMContentLoaded', function () {

  // Fonction pour vérifier l'email
  function verifierEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Fonction pour vérifier les inputs
  function checkInputs() {
    inputs.forEach((input, index) => {
      const containsDigit = /\d/.test(input.value);
      const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(input.value);
      const containsNumber = /^[0-9]/.test(input.value);
      const inputValue = input.value;
      const inputValueSplit = inputValue.split('');

      if (input.id === "first" || input.id === "last") {
        const errorIndex = input.id === "first" ? 0 : 1;
        if (containsDigit || containsSpecialChar || inputValueSplit.length <= 2) {
          showError(spanErreur[errorIndex], "Vous ne pouvez pas entrer de chiffres ou caractères spéciaux et devez entrer au moins 2 caractères", input);
        } else {
          hideError(spanErreur[errorIndex], input);
        }
      } else if (input.id === "email") {
        if (!verifierEmail(input.value)) {
          showError(spanErreur[2], "Adresse e-mail invalide", input);
        } else {
          hideError(spanErreur[2], input);
        }
      } else if (input.id === "quantity") {
        if (!containsNumber) {
          showError(spanErreur[4], "Vous devez entrer une valeur numérique", input);
        } else {
          hideError(spanErreur[4], input);
        }
      } else if (input.id === "birthdate") {
        if (input.value === "") {
          showError(spanErreur[3], "Vous devez entrer votre date de naissance", input);
        } else {
          hideError(spanErreur[3], input);
        }
      }
    });

    // Vérifie si au moins une checkbox est cochée
    if (!isAnyCheckboxChecked()) {
      showError(spanErreur[5], "Vous devez choisir au moins une option");
    } else {
      hideError(spanErreur[5]);
    }

    // Vérifie si les conditions d'utilisation sont cochées
    if (!checkBoxConditions.checked) {
      showError(spanErreur[6], "Vous devez accepter les conditions pour vous inscrire");
    } else {
      hideError(spanErreur[6]);
    }
  }

  // Fonction pour afficher un message d'erreur
  function showError(element, message, input = null) {
    element.style.display = "inline";
    element.textContent = message;
    if (input) input.style.border = "2px solid red";
  }

  // Fonction pour cacher un message d'erreur
  function hideError(element, input = null) {
    element.style.display = "none";
    if (input) input.style.border = "";
  }

  // Fonction pour vérifier si au moins une checkbox est cochée
  function isAnyCheckboxChecked() {
    return Array.from(checkBoxs).some(checkbox => checkbox.checked);
  }

  // Fonction pour lancer le modal
  function launchModal() {
    modalbg.style.display = "block";
  }

  // Fonction pour fermer le modal via X
  function closeModal() {
    modalbg.style.display = "none";
  }

  // Éléments DOM
  const modalbg = document.querySelector(".bground");
  const modalBtn = document.querySelectorAll(".modal-btn");
  const closeForm = document.querySelector(".close");
  const inputs = document.querySelectorAll(".text-control");
  const spanErreur = document.querySelectorAll(".message-erreur");
  const checkBoxs = document.querySelectorAll('.checkbox-input[type="radio"]');
  const submit = document.querySelector(".btn-submit");
  const checkBoxConditions = document.querySelector("#checkbox1");
  const spanConfirmationMessage = document.querySelector(".span-confirmation-message");
  const form = document.querySelector(".form");
  const modalBody = document.querySelector(".modal-body");
  const boutonFermer = document.querySelector(".button-close");

  // Écouteurs d'événements
  modalBtn.forEach(btn => btn.addEventListener("click", launchModal));
  closeForm.addEventListener("click", closeModal);
  boutonFermer.addEventListener("click", closeModal);
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    checkInputs();
    const allSpansAreNone = Array.from(spanErreur).every(span => {
      return window.getComputedStyle(span).getPropertyValue('display') === 'none';
    });

    if (allSpansAreNone) {
      spanConfirmationMessage.style.display = "flex";
      modalBody.style.height = "735px";
      modalBody.style.display = "flex";
      modalBody.style.justifyContent = "space-between";
      modalBody.style.alignItems = "center";
      modalBody.style.flexDirection = "column"
      form.style.display = "none";
      boutonFermer.style.display = "block";
    } else {
      console.log("Au moins un span n'a pas display: none");
    }
  });

});
