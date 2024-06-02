document.addEventListener('DOMContentLoaded', function () {
  function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  // DOM Elements
  const modalbg = document.querySelector(".bground");
  const modalBtn = document.querySelectorAll(".modal-btn");
  const closeForm = document.querySelectorAll(".close");
  const inputs = document.querySelectorAll(".text-control");
  const spanErreur = document.querySelectorAll(".message-erreur")

  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

  // Ecouter le clique sur le bouton fermer du modal et lui associer la fonction CloseModal
  closeForm.forEach((btn) => btn.addEventListener("click", closeModal));

  // Écouter les changements sur les inputs et afficher/supprimer message d'erreur le message d'erreur
  inputs.forEach((input) => {
    input.addEventListener('change', (e) => {
      // Déclarer les vérifications
      const containsDigit = /\d/.test(input.value);
      const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(input.value);

      // Fonction emails 
      function verifierEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

      // Vérifier si l'input a l'ID "first" et verification contenu
      if (input.id === "first") {
        // Si il y'a chiffre ou caractère spécial alors message d'erreur SINON pas de message d'erreur
        if (containsDigit || containsSpecialChar) {
          spanErreur[0].style.display = "inline";
          spanErreur[0].textContent = "Vous ne pouvez pas entrer de chiffres ou caractères spéciaux"
          input.style.border = "2px solid red";
        } else {
          spanErreur[0].style.display = "none";
          input.style.border = "";
        }
      } else if (input.id === "last") {
        // Si il y'a chiffre ou caractère spécial alors message d'erreur SINON pas de message d'erreur
        if (containsDigit || containsSpecialChar) {
          spanErreur[1].style.display = "inline";
          spanErreur[1].textContent = "Vous ne pouvez pas entrer de chiffres ou caractères spéciaux"
          input.style.border = "2px solid red";
        } else {
          spanErreur[1].style.display = "none";
          input.style.border = "";
        }
      } else if (input.id === "email") {
        const emailVerification = verifierEmail(input.value);

        // Vérifie si l'adresse e-mail est valide et ne contient pas de caractères spéciaux ou de chiffres
        if (!emailVerification) {
          // Affiche le message d'erreur pour une adresse e-mail invalide
          spanErreur[2].style.display = "inline";
          spanErreur[2].textContent = "Adresse e-mail invalide";
          input.style.border = "2px solid red";
        } else {
          // Cache le message d'erreur si l'adresse e-mail est valide
          spanErreur[2].style.display = "none";
          input.style.border = ""; // Réinitialise la bordure
        }
      }
    });
  });


  // FONCTIONS 

  // launch modal form
  function launchModal() {
    modalbg.style.display = "block";
  }

  // Close modal form
  function closeModal() {
    modalbg.style.display = "none";
  }
});


