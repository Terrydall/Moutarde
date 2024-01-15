// Fonction qui gère l'événement onclick
const btnOnclick = (btn, verifier, answers, length) => {
    // Incrémentation du nombre de questions tentées/répondues
    answered++;
    // Appel de la fonction pour changer les styles des boutons
    changeStyleBtn(answers);
   
    // Filtrage des réponses incorrectes
    const faux = answers.filter((el) => !el.correct);
   
    if (verifier) {
      // Modification de la classe du bouton en cas de réponse correcte
      btn.className = 'btn btn-success m-1';
      // Appel de la fonction pour changer les styles des boutons incorrects
      changeStyleBtn(faux);
      // Incrémentation du score en cas de réponse correcte
      score++;
    }
   
    // Vérification si toutes les questions ont été répondues
    if (answered === length) {
      // Ajout de la fenêtre modale avec le score et le nombre total de questions
      app.appendChild(modalWindow(score, answered));
      // Lancement de la fenêtre modale
      launchModal();
    }
  };
   
  // Fonction pour générer l'élément de quiz
  function createQuizElement(quiz) {
    // Création d'un élément div
    const el = document.createElement('div');
    el.className = 'row';
   
    // Parcours des questions du quiz
    for (const item of quiz) {
      const { question, answers } = item;
      // Création d'une carte Bootstrap pour chaque question
      const card = document.createElement('div');
      card.className = 'card col-lg-3 m-1 p-1';
      const cardBody = document.createElement('div');
   
      // Création d'un en-tête de carte contenant la question
      const cardHeader = document.createElement('p');
      cardHeader.className = 'h5';
      cardHeader.innerHTML = question;
   
      // Création d'un conteneur pour les réponses
      const reponses = document.createElement('div');
      // Parcours des réponses de chaque question
      for (const repons of answers) {
        const { answer, correct, id } = repons;
   
        // Création d'un div pour chaque réponse
        const repDiv = document.createElement('div');
        repDiv.className = 'row m-1';
        const rep = document.createElement('div');
        repDiv.appendChild(rep);
        // Création d'un bouton avec la réponse et l'ID
        rep.className = 'btn btn-primary m-1 row ';
        rep.innerHTML = answer;
        rep.id = id;
        // Ajout de la fonction onclick pour gérer les clics sur les réponses
        rep.onclick = () => btnOnclick(rep, correct, answers, quiz.length);
        reponses.appendChild(repDiv);
      }
      // Ajout de l'en-tête et des réponses à la carte
      cardBody.appendChild(cardHeader);
      cardBody.appendChild(reponses);
      card.appendChild(cardBody);
      // Ajout de la carte à l'élément div
      el.appendChild(card);
    }
    return el;
  }
   