module.exports = (data) => {
  const { quizName, subject, questions } = data;

  const questionsItems = generateItems(questions);
  const correctAnswersItems = generateAnswers(questions);

  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>${quizName}</title>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
      color: #1f2937;
      background: #ffffff;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 11pt;
      line-height: 1.5;
    }

    .page {
      width: 100%;
      max-width: 816px;
      margin: 0 auto;
    }

    /* ==============================
       Header
       ============================== */

    .header {
      padding-bottom: 1.25rem;
      border-bottom: 2px solid #1f2937;
    }

    .header-label {
      margin-bottom: 0.4rem;
      color: #6b7280;
      font-size: 9pt;
      font-weight: bold;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .quiz-title {
      margin: 0 0 1rem;
      color: #111827;
      font-size: 24pt;
      font-weight: bold;
      line-height: 1.2;
    }

    .quiz-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .info-item {
      padding: 0.65rem 0.8rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background: #f9fafb;
    }

    .info-label {
      display: block;
      margin-bottom: 0.15rem;
      color: #6b7280;
      font-size: 8pt;
      font-weight: bold;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .info-value {
      color: #111827;
      font-size: 10.5pt;
      font-weight: bold;
    }

    /* ==============================
       Instructions
       ============================== */

    .instructions {
      margin: 1.5rem 0;
      padding: 0.9rem 1rem;
      border-left: 4px solid #374151;
      background: #f3f4f6;
    }

    .instructions-title {
      margin: 0 0 0.25rem;
      font-weight: bold;
    }

    .instructions-text {
      margin: 0;
      color: #4b5563;
      font-size: 9.5pt;
    }

    /* ==============================
       Questions
       ============================== */

    .questions {
      margin-top: 1.5rem;
    }

    .item {
      margin-bottom: 1.6rem;
      page-break-inside: avoid;
    }

    .question {
      display: block;
      margin-bottom: 0.65rem;
      color: #111827;
      font-size: 11pt;
      font-weight: bold;
    }

    .question-number {
      display: inline-block;
      min-width: 1.5rem;
      margin-right: 0.25rem;
      color: #374151;
    }

    .choices {
      display: grid;
      gap: 0.4rem;
      margin-left: 1.75rem;
    }

    .choice {
      display: flex;
      gap: 0.5rem;
      align-items: flex-start;
      padding: 0.35rem 0.5rem;
      color: #374151;
    }

    .choice-label {
      flex: 0 0 1.2rem;
      font-weight: bold;
    }

    .choice-text {
      word-break: break-word;
      overflow-wrap: break-word;
    }

    /* ==============================
       Answer Sheet
       ============================== */

    .answers-page {
      page-break-before: always;
    }

    .answers-header {
      padding-bottom: 1rem;
      margin-bottom: 1.5rem;
      border-bottom: 2px solid #1f2937;
    }

    .answers-label {
      margin: 0;
      color: #111827;
      font-size: 20pt;
      font-weight: bold;
    }

    .answers-description {
      margin: 0.25rem 0 0;
      color: #6b7280;
      font-size: 9.5pt;
    }

    .answer-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.65rem;
    }

    .answer-item {
      display: flex;
      gap: 0.65rem;
      align-items: flex-start;
      padding: 0.65rem 0.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      background: #f9fafb;
      page-break-inside: avoid;
    }

    .answer-number {
      flex: 0 0 1.5rem;
      font-weight: bold;
    }

    .answer-text {
      color: #111827;
      font-weight: bold;
      word-break: break-word;
      overflow-wrap: break-word;
    }

    /* ==============================
       Footer
       ============================== */

    .footer {
      margin-top: 2rem;
      padding-top: 0.75rem;
      border-top: 1px solid #d1d5db;
      color: #9ca3af;
      font-size: 8pt;
      text-align: center;
    }

    @media print {
      body {
        background: #ffffff;
      }

      .page {
        max-width: none;
      }
    }
  </style>
</head>

<body>

  <main class="page">

    <!-- ==============================
         Quiz Header
         ============================== -->

    <header class="header">
      <div class="header-label">Quiz Reviewer</div>

      <h1 class="quiz-title">${quizName}</h1>

      <div class="quiz-info">
        <div class="info-item">
          <span class="info-label">Subject</span>
          <span class="info-value">${subject}</span>
        </div>

        <div class="info-item">
          <span class="info-label">Number of Questions</span>
          <span class="info-value">${questions.length}</span>
        </div>
      </div>
    </header>


    <!-- ==============================
         Instructions
         ============================== -->

    <section class="instructions">
      <p class="instructions-title">Instructions</p>

      <p class="instructions-text">
        Read each question carefully and select the best answer from the
        choices provided.
      </p>
    </section>


    <!-- ==============================
         Questions
         ============================== -->

    <section class="questions">
      ${questionsItems}
    </section>


    <!-- ==============================
         Answer Key
         ============================== -->

    <section class="answers-page">

      <header class="answers-header">
        <h2 class="answers-label">Answer Key</h2>

        <p class="answers-description">
          Use this section to check your answers after completing the quiz.
        </p>
      </header>

      <div class="answer-list">
        ${correctAnswersItems}
      </div>

    </section>


    <footer class="footer">
      Generated by QuizBuilder
    </footer>

  </main>

</body>

</html>
`;
};

const generateItems = (items) => {
  const options = ["A", "B", "C", "D"];

  return items
    .map((item, index) => {
      const choices = item.choices || [];

      const choicesHtml = choices
        .map(
          (choice, choiceIndex) => `
            <div class="choice">
              <span class="choice-label">
                ${options[choiceIndex]}.
              </span>

              <span class="choice-text">
                ${choice}
              </span>
            </div>
          `,
        )
        .join("");

      return `
        <article class="item">

          <div class="question">
            <span class="question-number">
              ${index + 1}.
            </span>

            ${item.question}
          </div>

          <div class="choices">
            ${choicesHtml}
          </div>

        </article>
      `;
    })
    .join("");
};

const generateAnswers = (items) => {
  return items
    .map(
      (item, index) => `
        <div class="answer-item">

          <span class="answer-number">
            ${index + 1}.
          </span>

          <span class="answer-text">
            ${item.correctAns}
          </span>

        </div>
      `,
    )
    .join("");
};
