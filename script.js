let currentQuestionIndex = 0;
let score = 0;
let streak = 0;
let timer;
let timeLeft = 180; // 3 minutos para responder
let totalQuestions = 20; // Número total de preguntas

// Función para iniciar el temporizador
function startTimer() {
  timeLeft = 180; // Reiniciar el tiempo a 3 minutos
  updateTimerDisplay(); // Actualizar el temporizador en pantalla al comenzar
  timer = setInterval(function () {
    timeLeft--;
    updateTimerDisplay(); // Actualizar el temporizador cada segundo

    if (timeLeft <= 0) {
      clearInterval(timer);
      showFinalMessage(); // Finaliza el juego cuando se acabe el tiempo
    }
  }, 1000);
}

// Función para actualizar el display del temporizador en formato minutos:segundos
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60); // Obtiene los minutos
  const seconds = timeLeft % 60; // Obtiene los segundos restantes
  document.getElementById(
    "timer-text"
  ).textContent = `Tiempo restante: ${minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}

// Actualizar el progreso de las preguntas
function updateProgress() {
  document.getElementById("question-progress").textContent = `Pregunta ${
    currentQuestionIndex + 1
  } de ${totalQuestions}`;
}

let questions = [
  {
    question: "Mathias se cayó mientras caminaba. ¿Cómo se sentirá?",
    correctAnswer: "triste",
  },
  {
    question:
      "Laura ganó un premio en su escuela por su esfuerzo. ¿Cómo se sentirá?",
    correctAnswer: "feliz",
  },
  {
    question: "Juan perdió su teléfono móvil. ¿Cómo se sentirá?",
    correctAnswer: "enojado",
  },
  {
    question:
      "Tú y tus amigos ganaron un partido de fútbol. ¿Cómo se sentirán?",
    correctAnswer: "feliz",
  },
  {
    question: "Te hicieron una broma pesada. ¿Cómo te sentirías?",
    correctAnswer: "sorprendido",
  },
  {
    question: "Tu mascota está enferma. ¿Cómo te sentirías?",
    correctAnswer: "triste",
  },
  {
    question:
      "Te dieron una sorpresa en tu fiesta de cumpleaños. ¿Cómo te sentirías?",
    correctAnswer: "feliz",
  },
  {
    question:
      "Un compañero te hizo un comentario ofensivo. ¿Cómo te sentirías?",
    correctAnswer: "enojado",
  },
  {
    question: "Tu hermano pequeño te ayudó con tu tarea. ¿Cómo te sentirías?",
    correctAnswer: "feliz",
  },
  {
    question: "Un amigo te dio un buen susto en el cine. ¿Cómo te sentirías?",
    correctAnswer: "sorprendido",
  },
  {
    question: "Alguien te gritó sin motivo. ¿Cómo te sentirías?",
    correctAnswer: "enojado",
  },
  {
    question: "Recibiste un regalo inesperado. ¿Cómo te sentirías?",
    correctAnswer: "sorprendido",
  },
  {
    question: "Tu mejor amigo se mudó lejos. ¿Cómo te sentirías?",
    correctAnswer: "triste",
  },
  {
    question: "Ganaste el primer lugar en una competencia. ¿Cómo te sentirías?",
    correctAnswer: "feliz",
  },
  {
    question: "Tu profesor te felicitó por tu trabajo. ¿Cómo te sentirías?",
    correctAnswer: "feliz",
  },
  {
    question:
      "Te quedaste atrapado en un ascensor por varios minutos. ¿Cómo te sentirías?",
    correctAnswer: "sorprendido",
  },
  {
    question: "Alguien rompió algo valioso para ti. ¿Cómo te sentirías?",
    correctAnswer: "enojado",
  },
  {
    question:
      "Te enteraste de que tus amigos organizaron una fiesta sorpresa. ¿Cómo te sentirías?",
    correctAnswer: "feliz",
  },
  {
    question: "Olvidaste tus llaves dentro de casa. ¿Cómo te sentirías?",
    correctAnswer: "enojado",
  },
  {
    question: "Viste un arcoíris en el cielo. ¿Cómo te sentirías?",
    correctAnswer: "feliz",
  },
];

// Función para mezclar las preguntas de manera aleatoria
function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Función para empezar el juego
function startGame() {
  const playerName = document.getElementById("player-name").value;
  if (playerName.trim() === "") {
    alert("Por favor, introduce tu nombre.");
    return;
  }

  // Mezclar las preguntas
  questions = shuffleQuestions(questions);

  document.getElementById(
    "player-name-display"
  ).textContent = `Jugador: ${playerName}`;
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("loading-screen").style.display = "block";

  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "flex";
    loadQuestion(currentQuestionIndex);
    startTimer(); // Iniciar el temporizador al empezar el juego
  }, 3000);
}

// Mezclar preguntas antes de iniciar el juego
questions = shuffleQuestions(questions);

document.getElementById(
  "player-name-display"
).textContent = `Jugador: ${playerName}`;
document.getElementById("start-screen").style.display = "none";
document.getElementById("loading-screen").style.display = "block";

setTimeout(() => {
  document.getElementById("loading-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "flex";
  loadQuestion(currentQuestionIndex);
}, 3000);

function loadQuestion(index) {
  const question = questions[index];
  if (question) {
    document.getElementById("question-text").textContent = question.question;
    document.getElementById("message").textContent = "Selecciona una emoción.";
  }
}

function checkEmotion(emotion) {
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  if (correctAnswer === emotion) {
    score++;
    streak++;
    document.getElementById(
      "message"
    ).textContent = `¡Correcto! La emoción era ${emotion}.`;
  } else {
    streak = 0; // Reset streak on wrong answer
    document.getElementById(
      "message"
    ).textContent = `¡Incorrecto! La emoción correcta era ${correctAnswer}.`;
  }

  updateScoreboard();

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setTimeout(() => {
      loadQuestion(currentQuestionIndex);
    }, 1500);
  } else {
    setTimeout(showFinalMessage, 1500);
  }
}

function updateScoreboard() {
  document.getElementById("score").textContent = `Puntuación: ${score}`;
  document.getElementById("streak").textContent = `Racha: ${streak}`;
}

function showFinalMessage() {
  const playerName = document.getElementById("player-name").value;
  const finalMessage =
    score > 14
      ? `¡Felicidades, ${playerName}! Eres excelente identificando emociones en diferentes situaciones.`
      : `Buen intento, ${playerName}. Puedes seguir practicando para mejorar.`;

  document.getElementById("game-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "flex";
  document.getElementById("start-screen").innerHTML = `
    <h1>${finalMessage}</h1>
    <button onclick="location.reload()">Volver a Jugar</button>
  `;
}
