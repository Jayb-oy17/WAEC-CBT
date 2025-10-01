// Sample WAEC past questions database
const waecQuestions = [
  // MATHEMATICS
  {
    id: 1,
    subject: "Mathematics",
    question: "If 2x + 3 = 11, what is the value of x?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
  },
  {
    id: 2,
    subject: "Mathematics",
    question: "Simplify: 5(2x – 3) + 2",
    options: ["10x – 15", "10x – 13", "10x – 10", "10x – 18"],
    correctAnswer: 1,
  },
  {
    id: 3,
    subject: "Mathematics",
    question: "Find the LCM of 12 and 18.",
    options: ["24", "36", "48", "60"],
    correctAnswer: 1,
  },
  {
    id: 4,
    subject: "Mathematics",
    question: "Evaluate: 2/5 + 3/10",
    options: ["1/2", "7/10", "4/5", "9/10"],
    correctAnswer: 1,
  },
  {
    id: 5,
    subject: "Mathematics",
    question: "What is 15% of 200?",
    options: ["20", "25", "30", "35"],
    correctAnswer: 2,
  },
  {
    id: 6,
    subject: "Mathematics",
    question: "Solve for x: 3x – 7 = 11",
    options: ["5", "6", "7", "8"],
    correctAnswer: 3,
  },
  {
    id: 7,
    subject: "Mathematics",
    question: "Find the mean of 2, 4, 6, 8, 10.",
    options: ["5", "6", "7", "8"],
    correctAnswer: 1,
  },
  {
    id: 8,
    subject: "Mathematics",
    question: "What is the square root of 225?",
    options: ["10", "12", "14", "15"],
    correctAnswer: 3,
  },
  {
    id: 9,
    subject: "Mathematics",
    question: "Convert 0.75 to a fraction.",
    options: ["3/5", "3/4", "2/3", "4/5"],
    correctAnswer: 1,
  },
  {
    id: 10,
    subject: "Mathematics",
    question:
      "If a triangle has angles 60°, 60°, and 60°, what type of triangle is it?",
    options: ["Scalene", "Isosceles", "Equilateral", "Right-angled"],
    correctAnswer: 2,
  },

  // ENGLISH
  {
    id: 11,
    subject: "English",
    question: 'Choose the word that is opposite in meaning to "abundant".',
    options: ["Scarce", "Plentiful", "Numerous", "Ample"],
    correctAnswer: 0,
  },
  {
    id: 12,
    subject: "English",
    question: "Which of the following is a synonym of 'happy'?",
    options: ["Sad", "Joyful", "Angry", "Worried"],
    correctAnswer: 1,
  },
  {
    id: 13,
    subject: "English",
    question: "What is the plural of 'child'?",
    options: ["Childs", "Children", "Childes", "Childrens"],
    correctAnswer: 1,
  },
  {
    id: 14,
    subject: "English",
    question: "Which word is a noun in the sentence: 'The dog barked loudly'?",
    options: ["Dog", "Barked", "Loudly", "The"],
    correctAnswer: 0,
  },
  {
    id: 15,
    subject: "English",
    question:
      "What tense is used in the sentence: 'She has finished her homework'?",
    options: ["Past", "Present Perfect", "Future", "Past Continuous"],
    correctAnswer: 1,
  },
  {
    id: 16,
    subject: "English",
    question: "Which of the following is a pronoun?",
    options: ["Book", "He", "Table", "Run"],
    correctAnswer: 1,
  },
  {
    id: 17,
    subject: "English",
    question: "Choose the correct spelling.",
    options: ["Accomodation", "Accommodation", "Acommodation", "Accommadation"],
    correctAnswer: 1,
  },
  {
    id: 18,
    subject: "English",
    question: "What is the past tense of 'go'?",
    options: ["Goes", "Gone", "Went", "Going"],
    correctAnswer: 2,
  },
  {
    id: 19,
    subject: "English",
    question: "Fill in the blank: She is taller ____ her brother.",
    options: ["to", "as", "than", "with"],
    correctAnswer: 2,
  },
  {
    id: 20,
    subject: "English",
    question: "Which of the following is an adjective?",
    options: ["Quickly", "Beautiful", "Run", "Happily"],
    correctAnswer: 1,
  },

  // PHYSICS
  {
    id: 21,
    subject: "Physics",
    question: "What is the SI unit of force?",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    correctAnswer: 1,
  },
  {
    id: 22,
    subject: "Physics",
    question: "What is the speed of light in vacuum?",
    options: ["3 × 10⁸ m/s", "3 × 10⁷ m/s", "3 × 10⁹ m/s", "3 × 10⁶ m/s"],
    correctAnswer: 0,
  },
  {
    id: 23,
    subject: "Physics",
    question: "What type of energy is stored in a stretched spring?",
    options: ["Kinetic", "Potential", "Thermal", "Chemical"],
    correctAnswer: 1,
  },
  {
    id: 24,
    subject: "Physics",
    question: "Which instrument is used to measure electric current?",
    options: ["Voltmeter", "Ammeter", "Galvanometer", "Ohmmeter"],
    correctAnswer: 1,
  },
  {
    id: 25,
    subject: "Physics",
    question: "Which of these is a vector quantity?",
    options: ["Speed", "Mass", "Velocity", "Energy"],
    correctAnswer: 2,
  },
  {
    id: 26,
    subject: "Physics",
    question: "The force of attraction between two masses is called?",
    options: ["Friction", "Magnetism", "Gravity", "Tension"],
    correctAnswer: 2,
  },
  {
    id: 27,
    subject: "Physics",
    question: "What is the unit of electric charge?",
    options: ["Ohm", "Ampere", "Coulomb", "Volt"],
    correctAnswer: 2,
  },
  {
    id: 28,
    subject: "Physics",
    question: "Sound cannot travel through?",
    options: ["Solid", "Liquid", "Gas", "Vacuum"],
    correctAnswer: 3,
  },
  {
    id: 29,
    subject: "Physics",
    question: "The turning effect of a force is called?",
    options: ["Torque", "Power", "Work", "Energy"],
    correctAnswer: 0,
  },
  {
    id: 30,
    subject: "Physics",
    question: "The slope of a velocity-time graph represents?",
    options: ["Speed", "Displacement", "Acceleration", "Force"],
    correctAnswer: 2,
  },

  // CHEMISTRY
  {
    id: 31,
    subject: "Chemistry",
    question: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
  },
  {
    id: 32,
    subject: "Chemistry",
    question: "What is the atomic number of Carbon?",
    options: ["4", "6", "8", "12"],
    correctAnswer: 1,
  },
  {
    id: 33,
    subject: "Chemistry",
    question: "What is the pH of pure water?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
  },
  {
    id: 34,
    subject: "Chemistry",
    question: "Which gas is used in the production of soda water?",
    options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: 1,
  },
  {
    id: 35,
    subject: "Chemistry",
    question: "Which element is common to all organic compounds?",
    options: ["Hydrogen", "Carbon", "Oxygen", "Nitrogen"],
    correctAnswer: 1,
  },
  {
    id: 36,
    subject: "Chemistry",
    question: "The process of separating crude oil into components is called?",
    options: ["Filtration", "Distillation", "Crystallization", "Sublimation"],
    correctAnswer: 1,
  },
  {
    id: 37,
    subject: "Chemistry",
    question: "Which gas is given off during photosynthesis?",
    options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
    correctAnswer: 1,
  },
  {
    id: 38,
    subject: "Chemistry",
    question: "What is the lightest element?",
    options: ["Oxygen", "Hydrogen", "Helium", "Lithium"],
    correctAnswer: 1,
  },
  {
    id: 39,
    subject: "Chemistry",
    question: "Which acid is found in lemon?",
    options: ["Acetic acid", "Sulphuric acid", "Citric acid", "Nitric acid"],
    correctAnswer: 2,
  },
  {
    id: 40,
    subject: "Chemistry",
    question: "What is the chemical symbol of Sodium?",
    options: ["So", "S", "Na", "Sd"],
    correctAnswer: 2,
  },

  // BIOLOGY
  {
    id: 41,
    subject: "Biology",
    question: "Which organelle is known as the powerhouse of the cell?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
    correctAnswer: 2,
  },
  {
    id: 42,
    subject: "Biology",
    question: "What is the process by which plants make their food?",
    options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
    correctAnswer: 1,
  },
  {
    id: 43,
    subject: "Biology",
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Brain", "Skin"],
    correctAnswer: 3,
  },
  {
    id: 44,
    subject: "Biology",
    question: "Which blood cells help in fighting diseases?",
    options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"],
    correctAnswer: 1,
  },
  {
    id: 45,
    subject: "Biology",
    question: "Which organ is responsible for pumping blood?",
    options: ["Brain", "Liver", "Heart", "Kidney"],
    correctAnswer: 2,
  },
  {
    id: 46,
    subject: "Biology",
    question: "What is the basic unit of life?",
    options: ["Atom", "Molecule", "Cell", "Organ"],
    correctAnswer: 2,
  },
  {
    id: 47,
    subject: "Biology",
    question: "Which part of the plant is responsible for photosynthesis?",
    options: ["Root", "Stem", "Leaf", "Flower"],
    correctAnswer: 2,
  },
  {
    id: 48,
    subject: "Biology",
    question: "Which vitamin is produced by the skin when exposed to sunlight?",
    options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    correctAnswer: 3,
  },
  {
    id: 49,
    subject: "Biology",
    question: "Which part of the human brain controls balance?",
    options: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"],
    correctAnswer: 1,
  },
  {
    id: 50,
    subject: "Biology",
    question: "Which blood group is a universal donor?",
    options: ["A", "B", "AB", "O"],
    correctAnswer: 3,
  },

  // GEOGRAPHY, HISTORY & ECONOMICS
  {
    id: 51,
    subject: "Geography",
    question: "What is the capital of Nigeria?",
    options: ["Lagos", "Abuja", "Kano", "Port Harcourt"],
    correctAnswer: 1,
  },
  {
    id: 52,
    subject: "Geography",
    question: "Which is the largest continent by area?",
    options: ["Africa", "Asia", "Europe", "North America"],
    correctAnswer: 1,
  },
  {
    id: 53,
    subject: "Geography",
    question: "Which is the longest river in the world?",
    options: ["Amazon", "Niger", "Nile", "Mississippi"],
    correctAnswer: 2,
  },
  {
    id: 54,
    subject: "Geography",
    question: "What is the hottest planet in the solar system?",
    options: ["Mercury", "Venus", "Mars", "Jupiter"],
    correctAnswer: 1,
  },
  {
    id: 55,
    subject: "History",
    question: "In what year did Nigeria gain independence?",
    options: ["1958", "1959", "1960", "1961"],
    correctAnswer: 2,
  },
  {
    id: 56,
    subject: "History",
    question: "Who was the first president of Nigeria?",
    options: [
      "Nnamdi Azikiwe",
      "Obafemi Awolowo",
      "Tafawa Balewa",
      "Ahmadu Bello",
    ],
    correctAnswer: 0,
  },
  {
    id: 57,
    subject: "Economics",
    question: "What does GDP stand for?",
    options: [
      "Gross Domestic Product",
      "General Domestic Product",
      "Gross Development Product",
      "General Development Product",
    ],
    correctAnswer: 0,
  },
  {
    id: 58,
    subject: "Economics",
    question: "The reward for labour is?",
    options: ["Profit", "Rent", "Wages", "Interest"],
    correctAnswer: 2,
  },
  {
    id: 59,
    subject: "Economics",
    question: "Scarcity in Economics means?",
    options: [
      "Shortage of money",
      "Limited resources",
      "High demand",
      "Unemployment",
    ],
    correctAnswer: 1,
  },
  {
    id: 60,
    subject: "Economics",
    question: "What is money primarily used for?",
    options: [
      "Decoration",
      "Medium of exchange",
      "Source of power",
      "Wealth only",
    ],
    correctAnswer: 1,
  },
];

// Get all questions (including custom ones from localStorage)
export function getQuestions() {
  if (typeof window === "undefined") return waecQuestions;

  const customQuestions = JSON.parse(
    localStorage.getItem("waec_custom_questions") || "[]"
  );
  return [...waecQuestions, ...customQuestions];
}

// Shuffle array using Fisher-Yates algorithm
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
