// Variables pour stocker le timer et le temps écoulé
let rafraichirTemps;
let remainingTimeInSeconds = 181; // 3 minutes en secondes +1 sec
let scoreActuel = 0;
let cout = "Gratuit";
let nbskip = 0;
let liste = [];
const titre = document.querySelector("h1");
const imgs = document.querySelector(".imgs");
const imgs2 = document.querySelector(".imgs2");
const reponse = document.querySelector(".answer");
const incorrecte = document.querySelector("#incorrecte");
const regles = document.querySelector(".regles");
const backModal = document.querySelector(".backgroundModal");
const boutons = document.querySelector(".boutons");
const ligneScore = document.querySelector(".montant-score");
const ligneSkip = document.querySelector(".texte-skip");
const imgSkip = document.querySelector(".skip-contenu");
const ligneAide = document.querySelector(".texte-aide");
const textTimer = document.querySelector(".timer");
const commentJouer = document.querySelector("#boutonCommentJouer");
const modalDebut = document.querySelector("#debutModal");
const boutonJouer = document.querySelector("#boutonJouer");
const boutonRejouer = document.querySelector("#boutonRejouer");
const modalFin = document.querySelector("#finModal");
const timerVideo = document.createElement("video");
timerVideo.src = "IMAGES/5s.webm";
timerVideo.autoplay = true;
document.querySelector("#vid").appendChild(timerVideo);
const win = new Audio("SOUND/win.mp3");
const skip = new Audio("SOUND/skip.mp3");
const bell = new Audio("SOUND/bell.mp3");
const win2 = new Audio("SOUND/win2.mp3");
const finTimer = new Audio("SOUND/5to1.mp3");
const timerbadass = new Audio("SOUND/timerbadass.mp3");
let musiques = [
  new Audio("SOUND/musique1.mp3"),
  new Audio("SOUND/musique2.mp3"),
  new Audio("SOUND/musique3.mp3"),
  new Audio("SOUND/musique4.mp3"),
  new Audio("SOUND/musique5.mp3"),
  new Audio("SOUND/musique6.mp3"),
  new Audio("SOUND/musique7.mp3"),
  new Audio("SOUND/musique8.mp3"),
  new Audio("SOUND/musique9.mp3"),
  new Audio("SOUND/musique10.mp3"),
];
// Déclarer une variable pour stocker la piste audio en cours de lecture
let musiqueEnCours = null;
// Tableau pour stocker les indices des musiques déjà jouées
let musiquesJouees = [];
// Fonction pour choisir et jouer une musique aléatoire
function jouerMusiqueAleatoire() {
  // Vérifier si une musique est déjà en cours de lecture
  if (musiqueEnCours !== null && !musiqueEnCours.paused) {
    // Si une musique est déjà en cours de lecture, la fonction ne continue pas et ne renvoie rien
    return;
  }
  if (musiquesJouees.length == musiques.length) {
    musiquesJouees = [];
  }
  // Choisissez un index aléatoire dans le tableau musiques qui n'a pas encore été joué
  let indexMusiqueAleatoire;
  do {
    indexMusiqueAleatoire = Math.floor(Math.random() * musiques.length);
  } while (musiquesJouees.includes(indexMusiqueAleatoire));
  // Ajoutez l'index de la musique choisie dans le tableau des musiques jouées
  musiquesJouees.push(indexMusiqueAleatoire);
  // Récupérez la musique correspondant à l'index choisi
  const musiqueAleatoire = musiques[indexMusiqueAleatoire];
  // Mettez à jour la piste audio en cours de lecture
  musiqueEnCours = musiqueAleatoire;
  musiqueAleatoire.volume = 0.6;
  // Lancer la lecture de la musique aléatoire
  musiqueAleatoire.play();
  // Ajouter un gestionnaire d'événement pour détecter la fin de la musique aléatoire
  musiqueAleatoire.addEventListener("ended", function () {
    // Une fois la musique terminée, choisissez et jouez une autre musique
    jouerMusiqueAleatoire();
  });
}

regles.classList.add("hidden");

ligneScore.innerHTML = ligneScore.innerHTML.replace("{{score}}", scoreActuel);
ligneSkip.innerHTML = ligneSkip.innerHTML.replace("{{cout}}", cout);

cout = 0;

// Ajoutez un gestionnaire d'événements pour le bouton de démarrage
boutonJouer.addEventListener("click", function () {
  modalDebut.classList.add("hidden");
  ligneAide.textContent = "";
  boutons.classList.add("hidden");
  timerbadass.play();
  timerVideo.classList.remove("hidden");
  timerVideo.play();
  // Cachez la modale
  // fonction setTimeout = fonction JAVAscript pour tempo
  setTimeout(function () {
    imgs.classList.remove("hidden");
    imgs2.classList.remove("hidden");
    // Affichez le contenu principal de la page
    // Démarrer le timer lorsque le bouton Jouer de la modale a été appuyer
    timerVideo.pause();
    timerVideo.classList.add("hidden");
    startTimer();
    jouerMusiqueAleatoire();
    // Mise à jour du timer instantanement sinon l'affichage du timer n'est pas instantané ( il y'a 1 sec avant l'affichage)
    // Le focus a été fait directement sur l'input pour éviter à l'utilisateur de cliquer dessus
    generationIcone();
    reponse.focus();
  }, 5300); // 5,3 secondes
});

commentJouer.addEventListener("click", function () {
  regles.classList.toggle("hidden");
});

boutonRejouer.addEventListener("click", function () {
  // Réinitialisation des variables
  modalFin.classList.add("hidden");
  document.querySelector(".timer").classList.remove("faction1");
  ligneAide.textContent = "";
  remainingTimeInSeconds = 181;
  cout = "Gratuit";
  ligneSkip.innerHTML = `Skip : ${cout}`;
  cout = 0;
  scoreActuel = 0;
  ligneScore.classList.remove("positif");
  ligneScore.classList.remove("negatif");
  ligneScore.innerText = scoreActuel;
  timerbadass.play();
  modalDebut.classList.remove("hidden");
  boutons.classList.add("hidden");
  timerVideo.classList.remove("hidden");
  timerVideo.pause();
  timerVideo.currentTime = "0";
  timerVideo.play();
  // Mise à jour du timer instantanément sinon l'affichage du timer n'est pas instantané (il y a 1 sec avant l'affichage)
  updateTimer();
  liste = [];
  reponse.value = "";
  setTimeout(function () {
    modalDebut.classList.add("hidden");
    document.querySelector(".icons").classList.remove("hidden");
    timerVideo.pause();
    timerVideo.classList.add("hidden");
    titre.classList.remove("hidden");
    imgs.classList.remove("hidden");
    imgs2.classList.remove("hidden");
    modalFin.classList.add("hidden");
    // Démarrer le timer lorsque le bouton Jouer de la modale a été appuyé
    startTimer();
    jouerMusiqueAleatoire();
    // Le focus a été fait directement sur l'input pour éviter à l'utilisateur de cliquer dessus
    generationIcone();
    reponse.focus();
  }, 5300); // 5.3 secondes
});

// Affichez la modale au chargement de la page
window.addEventListener("load", () => {
  modalFin.classList.add("hidden");
  timerVideo.pause();
  timerVideo.classList.add("hidden");
  imgs.classList.add("hidden");
  imgs2.classList.add("hidden");
  updateTimer();
});

// Fonction pour démarrer le timer
function startTimer() {
  // Mettre à jour le timer toutes les secondes (1000ms)
  rafraichirTemps = setInterval(updateTimer, 1000);
}

// Fonction pour arrêter le timer
function stopTimer() {
  clearInterval(rafraichirTemps);
}

function updateTimer() {
  // Décrémenter le temps écoulé
  remainingTimeInSeconds--;
  // Mettre à jour l'affichage du timer dans l'interface utilisateur
  const minutes = Math.floor(remainingTimeInSeconds / 60);
  const seconds = remainingTimeInSeconds % 60;
  const formattedTime = `${pad(minutes)}:${pad(seconds)}`;
  document.querySelector(".timer").textContent = formattedTime;

  if (remainingTimeInSeconds === 30) {
    bell.play();
    document.querySelector(".timer").classList.add("faction1");
  }
  if (remainingTimeInSeconds === 5) {
    finTimer.play();
  }
  // Arrêter le timer lorsque le temps est écoulé
  if (remainingTimeInSeconds === 0) {
    // Arrêter la musique
    musiques.forEach((musique) => musique.pause());
    // Arrêter le timer
    stopTimer();
    // Afficher la modale de fin de partie
    afficherModaleFinDePartie();
  }
}

// Fonction utilitaire pour ajouter un zéro devant les chiffres inférieurs à 10
function pad(number) {
  return number < 10 ? "0" + number : number;
}

// Fonction pour afficher la modale de fin de partie
function afficherModaleFinDePartie() {
  document.querySelector(".icons").classList.add("hidden");
  reponse.blur();
  titre.classList.add("hidden");
  // Afficher la modale
  // Arrêter la lecture de toutes les musiques
  musiques.forEach((musique) => {
    musique.pause();
    // Rembobiner la musique au début
    musique.currentTime = 0;
  });
  imgs.classList.add("hidden");
  imgs2.classList.add("hidden");
  backModal.classList.remove("hidden");
  modalFin.classList.remove("hidden");
  win2.play();
  // Mettre à jour le contenu avec le score
  if (liste.length >= scoreActuel) {
    document.querySelector("#scoreModal").textContent =
      "Votre score : " + scoreActuel; // Remplacer "score" par la variable de score actuelle
  } else {
    document.querySelector("#scoreModal").textContent = "Tricheur !";
  }
}

function generationIcone() {
  fetch("icones.json")
    //réponse de la requete et la transforme en JSON si besoin
    .then((response) => response.json())
    // Données JSON ont été baptiser data
    .then((data) => {
      // Générer un index aléatoire dans la plage des indices du tableau
      randomIndex = Math.floor(Math.random() * data.length);
      randomIcon = data[randomIndex];
      randomID = randomIcon.id;
      // Tant qu'une icone générée est déjà dans le tableau , on genere une nouvelle icone
      do {
        randomIndex = Math.floor(Math.random() * data.length);
        randomIcon = data[randomIndex];
        randomID = randomIcon.id;
      } while (liste.includes(randomID));
      liste.push(randomID);
      iconName = randomIcon.name;
      image = randomIcon.image;
      classe = randomIcon.classe;
      // Si la liste est pleine d'ID unique on reset le tout
      if (liste.length === data.length) {
        liste = [];
      }
      if (randomID == 113 || randomID == 171) {
        document.querySelector(
          "h1"
        ).innerHTML = `Quel est le nom de cette technique en<span class="${classe}">&nbsp;<img src="CLASS/${classe}.png">&nbsp;${classe}</span>&nbsp<span class="Alliance"><img src="RACES/elfe.png">&nbspElfe de la nuit </span>&nbsp?`;
        document.querySelector(
          ".icons"
        ).innerHTML = `<img src="SPELLS/${image}">`;
      } else if (randomID == 372) {
        document.querySelector(
          "h1"
        ).innerHTML = `Quel est le nom de cette technique en<span class="${classe}">&nbsp;<img src="CLASS/${classe}.png">&nbsp;${classe}</span>&nbsp<span class="Alliance"><img src="RACES/humain.png">&nbspHumain </span>&nbsp?`;
        document.querySelector(
          ".icons"
        ).innerHTML = `<img src="SPELLS/${image}">`;
      } else if (randomID == 172) {
        document.querySelector(
          "h1"
        ).innerHTML = `Quel est le nom de cette technique en<span class="${classe}">&nbsp;<img src="CLASS/${classe}.png">&nbsp;${classe}</span>&nbsp<span class="Alliance"><img src="RACES/nain.png">&nbspNain </span>&nbsp?`;
        document.querySelector(
          ".icons"
        ).innerHTML = `<img src="SPELLS/${image}">`;
      } else if (randomID == 215) {
        document.querySelector(
          "h1"
        ).innerHTML = `Quel est le nom de cette technique en<span class="${classe}">&nbsp;<img src="CLASS/${classe}.png">&nbsp;${classe}</span>&nbsp<span class="Alliance"><img src="RACES/humain.png">&nbspHumain</span>&nbspet&nbsp<span class="Alliance"><img src="RACES/nain.png">Nain </span>&nbsp?`;
        document.querySelector(
          ".icons"
        ).innerHTML = `<img src="SPELLS/${image}">`;
      } else if (randomID == 330 || randomID == 342) {
        document.querySelector(
          "h1"
        ).innerHTML = `Quel est le nom de cette technique en<span class="${classe}">&nbsp;<img src="CLASS/${classe}.png">&nbsp;${classe}</span>&nbsp<span class="Horde"><img src="RACES/ud.png">&nbspMort-vivant </span>&nbsp?`;
        document.querySelector(
          ".icons"
        ).innerHTML = `<img src="SPELLS/${image}">`;
      } else if (randomID == 275 || randomID == 353) {
        document.querySelector(
          "h1"
        ).innerHTML = `Quel est le nom de cette technique en<span class="${classe}">&nbsp;<img src="CLASS/${classe}.png">&nbsp;${classe}</span>&nbsp<span class="Horde"><img src="RACES/troll.png">&nbspTroll </span>&nbsp?`;
        document.querySelector(
          ".icons"
        ).innerHTML = `<img src="SPELLS/${image}">`;
      } else if (
        randomID == 114 ||
        randomID == 115 ||
        randomID == 118 ||
        randomID == 106 ||
        randomID == 107 ||
        randomID == 109
      ) {
        document.querySelector(
          "h1"
        ).innerHTML = `Quel est le nom de cette technique en<span class="${classe}">&nbsp;<img src="CLASS/${classe}.png">&nbsp;${classe}</span>&nbsp<span class="Alliance"><img src="FACTION/alliance.png">&nbspAlliance </span>&nbsp?`;
        document.querySelector(
          ".icons"
        ).innerHTML = `<img src="SPELLS/${image}">`;
      } else if (
        randomID == 117 ||
        randomID == 119 ||
        randomID == 120 ||
        randomID == 108 ||
        randomID == 110 ||
        randomID == 111
      ) {
        document.querySelector(
          "h1"
        ).innerHTML = `Quel est le nom de cette technique en<span class="${classe}">&nbsp;<img src="CLASS/${classe}.png">&nbsp;${classe}</span>&nbsp<span class="Horde"><img src="FACTION/horde.png">&nbspHorde </span>&nbsp?`;
        document.querySelector(
          ".icons"
        ).innerHTML = `<img src="SPELLS/${image}">`;
      } else {
        document.querySelector(
          "h1"
        ).innerHTML = `Quel est le nom de cette technique en<span class="${classe}">&nbsp;<img src="CLASS/${classe}.png">&nbsp;${classe}</span>&nbsp?`;
        document.querySelector(
          ".icons"
        ).innerHTML = `<img src="SPELLS/${image}">`;
      }
    });
}

function levenshteinDistance(a, b) {
  // La réponse de l'utilisateur est modifié (minuscule, en enlevant tout les accents de la terre et lettre chelou, en enlevant les espaces , les '-' et les ':')
  reponse.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s/g, "")
    .replace(/-/g, "")
    .replace(/:/g, "");
  const c = a.length + 1;
  const d = b.length + 1;
  const r = Array(c);
  for (let i = 0; i < c; ++i) r[i] = Array(d);
  for (let i = 0; i < c; ++i) r[i][0] = i;
  for (let j = 0; j < d; ++j) r[0][j] = j;
  for (let i = 1; i < c; ++i) {
    for (let j = 1; j < d; ++j) {
      const s = a[i - 1] === b[j - 1] ? 0 : 1;
      r[i][j] = Math.min(r[i - 1][j] + 1, r[i][j - 1] + 1, r[i - 1][j - 1] + s);
    }
  }
  return r[a.length][b.length];
}

function Differences() {
  let normalizedReponseValue = reponse.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s/g, "")
    .replace(/-/g, "")
    .replace(/:/g, "");
  // Pour chaque nom dans le tableau iconName
  iconName.forEach((name) => {
    let distance = levenshteinDistance(normalizedReponseValue, name);
    let longueur = name.length - normalizedReponseValue.length;
    if (distance == 3 && longueur == 3) {
      ligneAide.textContent = "3 lettres restantes à trouver !";
      ligneAide.classList.remove("texte-aide2");
      ligneAide.classList.remove("texte-aide3");
      ligneAide.classList.add("texte-aide");
    } else if (distance <= 3 && longueur == 2) {
      ligneAide.textContent = "2 lettres restantes à trouver !";
      ligneAide.classList.remove("texte-aide");
      ligneAide.classList.remove("texte-aide3");
      ligneAide.classList.add("texte-aide2");
    } else if (distance <= 3 && longueur == 1) {
      ligneAide.textContent = "1 lettre restante à trouver !";
      ligneAide.classList.remove("texte-aide");
      ligneAide.classList.remove("texte-aide2");
      ligneAide.classList.add("texte-aide3");
    } else if (distance == 3 && normalizedReponseValue.length >= name.length) {
      ligneAide.textContent = `3 erreurs !`;
      ligneAide.classList.remove("texte-aide2");
      ligneAide.classList.remove("texte-aide3");
      ligneAide.classList.add("texte-aide");
    } else if (distance == 2 && normalizedReponseValue.length >= name.length) {
      ligneAide.textContent = `2 erreurs !`;
      ligneAide.classList.remove("texte-aide");
      ligneAide.classList.remove("texte-aide3");
      ligneAide.classList.add("texte-aide2");
    } else if (distance == 1 && normalizedReponseValue.length >= name.length) {
      ligneAide.textContent = `1 erreur !`;
      ligneAide.classList.remove("texte-aide");
      ligneAide.classList.remove("texte-aide2");
      ligneAide.classList.add("texte-aide3");
    } else if (distance > 3) {
      ligneAide.textContent = "";
    } else if (distance == 0 && name.length == normalizedReponseValue.length) {
      ligneAide.textContent = "";
      if (name.includes(normalizedReponseValue.trim())) {
        reponse.value = "";
        scoreActuel += 1;
        ligneScore.textContent = scoreActuel;
        if (scoreActuel > 0) {
          ligneScore.classList.remove("negatif");
          ligneScore.classList.add("positif");
        }
        if (scoreActuel == 0) {
          ligneScore.classList.remove("positif");
          ligneScore.classList.remove("negatif");
        }
        win.play();
        generationIcone();
        ligneAide.textContent = "";
      }
    }
  });
}

reponse.addEventListener("input", function () {
  // Appeler la fonction Differences() à chaque fois que l'utilisateur entre du texte
  Differences();
});

imgSkip.addEventListener("click", function () {
  nbskip += 1;
  skip.play();
  // Permets d'éviter de re cliquer sur l'input pour inserer du texte
  reponse.focus();
  ligneAide.textContent = "";
  reponse.value = "";
  generationIcone();
  scoreActuel = scoreActuel - cout;
  if (nbskip >= 1) {
    cout = 1;
  }
  ligneScore.textContent = scoreActuel;
  ligneSkip.innerHTML = `Skip : ${cout} <img src="IMAGES/piece.png"></span>`;
  if (scoreActuel < 0) {
    ligneScore.classList.remove("positif");
    ligneScore.classList.add("negatif");
  }
  if (scoreActuel == 0) {
    ligneScore.classList.remove("positif");
    ligneScore.classList.remove("negatif");
  }
});
