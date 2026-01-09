const activities = [
  {
    title: "Eco del cuento",
    material: ["Bochi + Pochi i l’ocell", "Besitos", "Como tú, como yo"],
    ages: ["1º", "2º", "3º", "4º"],
    duration: 5,
    people: "1 o 2 feriantes + 1 línea",
    maxStudents: 100,
    visit: "15 min (5' + 10')",
    description: `Lectura teatralizada donde el alumnado repite la última palabra en forma de eco. 
    En "Como tú, como yo" se repiten las palabras en mayúsculas de cada página.`
  },
  {
    title: "Cuento congelado",
    material: ["El primer libro de las emociones", "Mis manos"],
    ages: ["Infantil", "1º", "2º"],
    duration: 7,
    people: "1 o 2 feriantes + 1 línea",
    maxStudents: 50,
    visit: "20 min (7' + 13')",
    description: `Mientras se narra el cuento se mueven libremente. Cuando la narración se detiene, todos se congelan. 
    Variante: representar emociones cuando aparecen en el cuento.`
  },
  {
    title: "Finales locos",
    material: ["Ninguno"],
    ages: ["4º", "5º", "6º"],
    duration: 15,
    people: "2 feriantes + 1-2 líneas",
    maxStudents: 50,
    visit: "30 min (15' + 15')",
    description: `Se cuenta un cuento clásico con huecos que el alumnado completa con ideas absurdas. 
    Favorece creatividad y participación.`
  },
  {
    title: "Preguntas y respuestas",
    material: ["Tarjetas con preguntas"],
    ages: ["4º", "5º", "6º"],
    duration: 10,
    people: "2 feriantes + 1 línea",
    maxStudents: 100,
    visit: "15 min (5' + 10')",
    description: `Juego de preguntas por categorías: personajes, títulos y vocabulario. 
    Posibilidad de rebote si fallan.`
  },
  {
    title: "Cuento invisible",
    material: ["Ninguno"],
    ages: ["Infantil"],
    duration: 3,
    people: "1 feriante + 1 línea",
    maxStudents: 100,
    visit: "15 min (5' + 10')",
    description: `Se inventa un cuento haciendo preguntas al grupo para construirlo juntos, 
    conectándolo con libros reales de la feria.`
  },
  {
    title: "¿Quién ganaría?",
    material: ["5 preguntas preparadas"],
    ages: ["3º", "4º", "5º", "6º"],
    duration: 10,
    people: "2 feriantes + 1 línea",
    maxStudents: 50,
    visit: "20 min (10' + 10')",
    description: `Se comparan dos personajes en diferentes pruebas. 
    El grupo se mueve hacia el lado del personaje que creen que ganaría.`
  },
  {
    title: "¿Qué preferirías?",
    material: ["5 situaciones preparadas"],
    ages: ["3º", "4º", "5º", "6º"],
    duration: 5,
    people: "1 feriante + 1 línea",
    maxStudents: 100,
    visit: "15 min (5' + 10')",
    description: `Elección entre dos opciones de personajes o situaciones, 
    enlazando con libros disponibles en la feria.`
  },
  {
    title: "El personaje secreto",
    material: ["Ninguno"],
    ages: ["1º", "2º", "3º", "4º", "5º", "6º"],
    duration: 3,
    people: "1 feriante + 1 línea",
    maxStudents: 100,
    visit: "15 min (3' + 12')",
    description: `Se dan pistas progresivas para adivinar un personaje de los libros de la feria.`
  },
  {
    title: "Una palabra",
    material: ["Ninguno"],
    ages: ["1º", "2º", "3º", "4º", "5º", "6º"],
    duration: 3,
    people: "1 feriante + 1 línea",
    maxStudents: 100,
    visit: "15 min (3' + 12')",
    description: `Se dice un personaje y el alumnado responde con asociaciones rápidas de palabras.`
  }
];

// ---------- FILTROS ----------

const ageOptions = ["Infantil","1º","2º","3º","4º","5º","6º"];
const activeAges = new Set();

const ageContainer = document.getElementById("ageButtons");
const timeFilter = document.getElementById("timeFilter");
const sizeFilter = document.getElementById("sizeFilter");
const resetBtn = document.getElementById("resetBtn");
const cardsContainer = document.getElementById("activities");

// crear botones edad
ageOptions.forEach(age => {
  const btn = document.createElement("button");
  btn.textContent = age;
  btn.onclick = () => {
    btn.classList.toggle("active");
    if (activeAges.has(age)) activeAges.delete(age);
    else activeAges.add(age);
    applyFilters();
  };
  ageContainer.appendChild(btn);
});

timeFilter.onchange = applyFilters;
sizeFilter.onchange = applyFilters;

resetBtn.onclick = () => {
  activeAges.clear();
  document.querySelectorAll(".button-group button").forEach(b => b.classList.remove("active"));
  timeFilter.value = "all";
  sizeFilter.value = "all";
  renderCards(activities);
};

// ---------- RENDER ----------

function renderCards(list) {
  cardsContainer.innerHTML = "";
  if (!list.length) {
    cardsContainer.innerHTML = "<p>No hay dinámicas que cumplan los filtros.</p>";
    return;
  }

  list.forEach(a => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${a.title}</h2>
      <p><span class="label">Material:</span> ${a.material.join(", ")}</p>
      <p><span class="label">Edad:</span> ${a.ages.join(", ")}</p>
      <p><span class="label">Duración:</span> ${a.duration} min</p>
      <p><span class="label">Personas:</span> ${a.people}</p>
      <p><span class="label">Máx. alumnos:</span> ${a.maxStudents}</p>
      <p><span class="label">Tiempo mínimo visita:</span> ${a.visit}</p>
      <p><span class="label">Desarrollo:</span> ${a.description}</p>
    `;
    cardsContainer.appendChild(card);
  });
}

// ---------- FILTRADO ----------

function applyFilters() {
  let result = activities.filter(a => {

    // edad
    if (activeAges.size > 0) {
      let match = a.ages.some(age => activeAges.has(age));
      if (!match) return false;
    }

    // tiempo
    if (timeFilter.value !== "all") {
      if (timeFilter.value === "short" && a.duration > 3) return false;
      if (timeFilter.value === "medium" && (a.duration < 4 || a.duration > 7)) return false;
      if (timeFilter.value === "long" && a.duration < 8) return false;
    }

    // alumnos
    if (sizeFilter.value !== "all") {
      if (a.maxStudents > parseInt(sizeFilter.value)) return false;
    }

    return true;
  });

  renderCards(result);
}

// inicial
renderCards(activities);
