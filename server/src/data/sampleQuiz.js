const sampleQuizzes = [
  {
    subject: "Mathematics",
    quizzes: [
      {
        quizName: "Basic Arithmetic",
        items: [
          {
            question: "What is 5 + 3?",
            answer: "8",
            choices: ["6", "7", "8", "9"],
            generationMethod: "disabled",
          },
          {
            question: "What is 10 - 4?",
            answer: "6",
            choices: ["5", "6", "7", "8"],
            generationMethod: "disabled",
          },
          {
            question: "What is 6 × 2?",
            answer: "12",
            choices: ["10", "11", "12", "14"],
            generationMethod: "disabled",
          },
          {
            question: "What is 20 ÷ 4?",
            answer: "5",
            choices: ["4", "5", "6", "8"],
            generationMethod: "disabled",
          },
        ],
      },

      {
        quizName: "Fractions",
        items: [
          {
            question: "What is 1/2 + 1/2?",
            answer: "1",
            choices: ["1/2", "1", "2", "3/2"],
            generationMethod: "disabled",
          },
          {
            question: "What is 3/4 - 1/4?",
            answer: "1/2",
            choices: ["1/4", "1/2", "3/4", "1"],
            generationMethod: "disabled",
          },
          {
            question: "Which fraction is equivalent to 1/2?",
            answer: "2/4",
            choices: ["1/3", "2/4", "3/5", "4/6"],
            generationMethod: "disabled",
          },
          {
            question: "What is 2/3 of 6?",
            answer: "4",
            choices: ["2", "3", "4", "6"],
            generationMethod: "disabled",
          },
        ],
      },

      {
        quizName: "Geometry",
        items: [
          {
            question: "How many sides does a triangle have?",
            answer: "3",
            choices: ["2", "3", "4", "5"],
            generationMethod: "disabled",
          },
          {
            question: "How many sides does a square have?",
            answer: "4",
            choices: ["3", "4", "5", "6"],
            generationMethod: "disabled",
          },
          {
            question: "What shape has no sides?",
            answer: "Circle",
            choices: ["Triangle", "Square", "Circle", "Rectangle"],
            generationMethod: "disabled",
          },
          {
            question: "How many degrees are in a right angle?",
            answer: "90",
            choices: ["45", "60", "90", "180"],
            generationMethod: "disabled",
          },
        ],
      },
    ],
  },

  {
    subject: "Science",
    quizzes: [
      {
        quizName: "Biology Basics",
        items: [
          {
            question: "What is the basic unit of life?",
            answer: "Cell",
            choices: ["Organ", "Cell", "Tissue", "Atom"],
            generationMethod: "disabled",
          },
          {
            question: "Which organ pumps blood?",
            answer: "Heart",
            choices: ["Lungs", "Brain", "Heart", "Kidney"],
            generationMethod: "disabled",
          },
          {
            question: "Which organ is responsible for breathing?",
            answer: "Lungs",
            choices: ["Heart", "Liver", "Lungs", "Stomach"],
            generationMethod: "disabled",
          },
          {
            question: "What process do plants use to make food?",
            answer: "Photosynthesis",
            choices: [
              "Respiration",
              "Digestion",
              "Photosynthesis",
              "Fermentation",
            ],
            generationMethod: "disabled",
          },
        ],
      },

      {
        quizName: "Physics Basics",
        items: [
          {
            question: "What force pulls objects toward Earth?",
            answer: "Gravity",
            choices: ["Friction", "Gravity", "Magnetism", "Pressure"],
            generationMethod: "disabled",
          },
          {
            question: "What is the unit of force?",
            answer: "Newton",
            choices: ["Watt", "Joule", "Newton", "Volt"],
            generationMethod: "disabled",
          },
          {
            question: "What travels fastest?",
            answer: "Light",
            choices: ["Sound", "Water", "Light", "Air"],
            generationMethod: "disabled",
          },
          {
            question: "What is the unit of electric current?",
            answer: "Ampere",
            choices: ["Volt", "Ohm", "Ampere", "Watt"],
            generationMethod: "disabled",
          },
        ],
      },

      {
        quizName: "Earth Science",
        items: [
          {
            question: "What planet do we live on?",
            answer: "Earth",
            choices: ["Mars", "Venus", "Earth", "Jupiter"],
            generationMethod: "disabled",
          },
          {
            question: "What is Earth's natural satellite?",
            answer: "Moon",
            choices: ["Sun", "Moon", "Mars", "Venus"],
            generationMethod: "disabled",
          },
          {
            question: "What gas makes up most of Earth's atmosphere?",
            answer: "Nitrogen",
            choices: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
            generationMethod: "disabled",
          },
          {
            question: "How many continents are there?",
            answer: "7",
            choices: ["5", "6", "7", "8"],
            generationMethod: "disabled",
          },
        ],
      },
    ],
  },

  {
    subject: "Computer Science",
    quizzes: [
      {
        quizName: "Programming Basics",
        items: [
          {
            question:
              "Which symbol is commonly used for comments in JavaScript?",
            answer: "//",
            choices: ["//", "#", "<!--", "**"],
            generationMethod: "disabled",
          },
          {
            question: "Which keyword declares a constant in JavaScript?",
            answer: "const",
            choices: ["var", "let", "const", "static"],
            generationMethod: "disabled",
          },
          {
            question: "Which data type represents true or false?",
            answer: "Boolean",
            choices: ["String", "Number", "Boolean", "Object"],
            generationMethod: "disabled",
          },
          {
            question: "Which symbol is used for strict equality in JavaScript?",
            answer: "===",
            choices: ["=", "==", "===", "!="],
            generationMethod: "disabled",
          },
        ],
      },

      {
        quizName: "Web Development",
        items: [
          {
            question: "What does HTML stand for?",
            answer: "HyperText Markup Language",
            choices: [
              "HyperText Markup Language",
              "HighText Machine Language",
              "Hyperlink Text Management Language",
              "Home Tool Markup Language",
            ],
            generationMethod: "disabled",
          },
          {
            question: "Which language is used to style web pages?",
            answer: "CSS",
            choices: ["HTML", "CSS", "SQL", "Java"],
            generationMethod: "disabled",
          },
          {
            question: "Which language adds interactivity to web pages?",
            answer: "JavaScript",
            choices: ["HTML", "CSS", "JavaScript", "SQL"],
            generationMethod: "disabled",
          },
          {
            question: "What does URL stand for?",
            answer: "Uniform Resource Locator",
            choices: [
              "Uniform Resource Locator",
              "Universal Reference Link",
              "User Resource Location",
              "Unified Routing Language",
            ],
            generationMethod: "disabled",
          },
        ],
      },

      {
        quizName: "Databases",
        items: [
          {
            question: "What does SQL stand for?",
            answer: "Structured Query Language",
            choices: [
              "Structured Query Language",
              "Simple Query Language",
              "System Query Logic",
              "Structured Question Language",
            ],
            generationMethod: "disabled",
          },
          {
            question: "Which command is used to retrieve data?",
            answer: "SELECT",
            choices: ["INSERT", "UPDATE", "SELECT", "DELETE"],
            generationMethod: "disabled",
          },
          {
            question: "Which command adds new data?",
            answer: "INSERT",
            choices: ["SELECT", "INSERT", "UPDATE", "DROP"],
            generationMethod: "disabled",
          },
          {
            question: "Which command removes data?",
            answer: "DELETE",
            choices: ["REMOVE", "DELETE", "DROP", "CLEAR"],
            generationMethod: "disabled",
          },
        ],
      },
    ],
  },
];

module.exports = sampleQuizzes;
