module.exports = (data) => {
  const { quizName, subject, questions } = data;

  const questionsItems = generateItems(questions);
  const correctAnswersItems = generateAnswers(questions);

  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>${quizName}</title>

  <style>
    * {
      box-sizing: border-box;
    }

    @page {
      size: A4;
      margin: 0.6in;
    }

    body {
      margin: 0;
      padding: 0;
      color: #1c1917;
      background: #ffffff;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 10.5pt;
      line-height: 1.5;
    }

    .page {
      width: 100%;
      max-width: 794px;
      margin: 0 auto;
    }

    .header {
      padding-bottom: 1rem;
      border-bottom: 2px solid #b8860b;
    }

    .header-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
    }

    .header-label {
      margin-bottom: 0.25rem;
      color: #b8860b;
      font-size: 8.5pt;
      font-weight: bold;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .quiz-title {
      margin: 0;
      color: #1c1917;
      font-size: 23pt;
      font-weight: 700;
      line-height: 1.15;
    }

    .quiz-type {
      padding: 0.35rem 0.65rem;
      border: 1px solid #d4a017;
      border-radius: 999px;
      color: #9a6f08;
      background: #fdf8e8;
      font-size: 8pt;
      font-weight: bold;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .quiz-meta {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .meta-item {
      padding: 0.6rem 0.75rem;
      border: 1px solid #e7e5df;
      border-radius: 5px;
      background: #fafaf7;
    }

    .meta-label {
      display: block;
      margin-bottom: 0.15rem;
      color: #78716c;
      font-size: 7.5pt;
      font-weight: bold;
      letter-spacing: 0.07em;
      text-transform: uppercase;
    }

    .meta-value {
      color: #1c1917;
      font-size: 10pt;
      font-weight: bold;
    }

    .student-info {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 1rem;
      margin-top: 1rem;
      padding: 0.8rem 0;
      border-bottom: 1px solid #e7e5df;
    }

    .field {
      display: flex;
      align-items: flex-end;
      gap: 0.4rem;
      min-width: 0;
    }

    .field-label {
      color: #57534e;
      font-size: 8.5pt;
      font-weight: bold;
      white-space: nowrap;
    }

    .field-line {
      flex: 1;
      min-width: 0;
      height: 1.2rem;
      border-bottom: 1px solid #78716c;
    }

    .instructions {
      margin: 1rem 0 1.2rem;
      padding: 0.8rem 0.9rem;
      border: 1px solid #ead8a5;
      border-left: 4px solid #b8860b;
      border-radius: 4px;
      background: #fdf9ec;
    }

    .instructions-title {
      margin: 0 0 0.2rem;
      color: #9a6f08;
      font-size: 9pt;
      font-weight: bold;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .instructions-text {
      margin: 0;
      color: #57534e;
      font-size: 9pt;
    }

    .questions {
      margin-top: 0;
    }

    .questions-heading {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.9rem;
      color: #1c1917;
      font-size: 11pt;
      font-weight: bold;
    }

    .questions-heading::after {
      flex: 1;
      height: 1px;
      background: #e7e5df;
      content: "";
    }

    .item {
      margin-bottom: 1.25rem;
      padding: 0 0 1.15rem;
      border-bottom: 1px solid #eeece6;
      page-break-inside: avoid;
    }

    .item:last-child {
      border-bottom: none;
    }

    .question {
      display: flex;
      align-items: flex-start;
      gap: 0.6rem;
      color: #1c1917;
      font-size: 10.5pt;
      font-weight: bold;
      line-height: 1.5;
    }

    .question-number {
      display: flex;
      flex: 0 0 1.55rem;
      align-items: center;
      justify-content: center;
      width: 1.55rem;
      height: 1.55rem;
      border: 1px solid #d4a017;
      border-radius: 50%;
      color: #9a6f08;
      background: #fdf9ec;
      font-size: 8pt;
      font-weight: bold;
    }

    .question-text {
      flex: 1;
      padding-top: 0.1rem;
    }

    .choices {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.45rem 1.5rem;
      margin-top: 0.65rem;
      margin-left: 2.15rem;
    }

    .choice {
      display: flex;
      align-items: flex-start;
      gap: 0.45rem;
      min-width: 0;
      color: #44403c;
      font-size: 9.5pt;
      line-height: 1.45;
    }

    .choice-marker {
      display: flex;
      flex: 0 0 1.1rem;
      align-items: center;
      justify-content: center;
      width: 1.1rem;
      height: 1.1rem;
      margin-top: 0.05rem;
      border: 1.4px solid #57534e;
      border-radius: 50%;
      color: #57534e;
      font-size: 6.5pt;
      font-weight: bold;
    }

    .choice-letter {
      font-weight: bold;
    }

    .choice-text {
      flex: 1;
      min-width: 0;
      word-break: break-word;
      overflow-wrap: break-word;
    }

    .enumeration-answer {
      margin-top: 0.75rem;
      margin-left: 2.15rem;
    }

    .answer-line {
      height: 1.6rem;
      margin-bottom: 0.5rem;
      border-bottom: 1px solid #a8a29e;
    }

    .answers-page {
      page-break-before: always;
    }

    .answers-header {
      padding-bottom: 0.8rem;
      margin-bottom: 1rem;
      border-bottom: 2px solid #b8860b;
    }

    .answers-label {
      margin: 0;
      color: #1c1917;
      font-size: 20pt;
      font-weight: 700;
      line-height: 1.2;
    }

    .answers-description {
      margin: 0.25rem 0 0;
      color: #78716c;
      font-size: 9pt;
    }

    .answer-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }

    .answer-item {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      min-height: 2.1rem;
      padding: 0.45rem 0.6rem;
      border: 1px solid #e7e5df;
      border-radius: 5px;
      background: #fafaf7;
      page-break-inside: avoid;
    }

    .answer-number {
      display: flex;
      flex: 0 0 1.4rem;
      align-items: center;
      justify-content: center;
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 50%;
      color: #9a6f08;
      background: #fdf9ec;
      font-size: 7.5pt;
      font-weight: bold;
    }

    .answer-text {
      flex: 1;
      color: #1c1917;
      font-size: 9pt;
      font-weight: bold;
      word-break: break-word;
      overflow-wrap: break-word;
    }

    .footer {
      margin-top: 1.75rem;
      padding-top: 0.6rem;
      border-top: 1px solid #e7e5df;
      color: #a8a29e;
      font-size: 7.5pt;
      text-align: center;
    }

    @media print {
      body {
        background: #ffffff;
      }

      .page {
        max-width: none;
      }

      .item {
        page-break-inside: avoid;
      }

      .answers-page {
        page-break-before: always;
      }
    }
  </style>
</head>

<body>

  <main class="page">

    <header class="header">

      <div class="header-top">

        <div>
          <div class="header-label">Quiz Worksheet</div>

          <h1 class="quiz-title">
            ${quizName}
          </h1>
        </div>

        <div class="quiz-type">
          Multiple Choice
        </div>

      </div>

      <div class="quiz-meta">

        <div class="meta-item">
          <span class="meta-label">Subject</span>
          <span class="meta-value">${subject}</span>
        </div>

        <div class="meta-item">
          <span class="meta-label">Questions</span>
          <span class="meta-value">${questions.length}</span>
        </div>

      </div>

    </header>


    <section class="student-info">

      <div class="field">
        <span class="field-label">Name:</span>
        <span class="field-line"></span>
      </div>

      <div class="field">
        <span class="field-label">Date:</span>
        <span class="field-line"></span>
      </div>

      <div class="field">
        <span class="field-label">Score:</span>
        <span class="field-line"></span>
      </div>

    </section>


    <section class="instructions">

      <p class="instructions-title">
        Instructions
      </p>

      <p class="instructions-text">
        Read each question carefully. Circle the letter of the correct
        answer. Shade or mark your chosen answer clearly.
      </p>

    </section>


    <section class="questions">

      <div class="questions-heading">
        Questions
      </div>

      ${questionsItems}

    </section>


    <section class="answers-page">

      <header class="answers-header">

        <h2 class="answers-label">
          Answer Key
        </h2>

        <p class="answers-description">
          Use this section to check your answers after completing the quiz.
        </p>

      </header>

      <div class="answer-list">
        ${correctAnswersItems}
      </div>

    </section>


    <footer class="footer">
      Generated by StudyAssistant
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

              <span class="choice-marker">
                ${options[choiceIndex]}
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
              ${index + 1}
            </span>

            <span class="question-text">
              ${item.question}
            </span>

          </div>

          ${
            choices.length > 0
              ? `
                <div class="choices">
                  ${choicesHtml}
                </div>
              `
              : `
                <div class="enumeration-answer">
                  <div class="answer-line"></div>
                  <div class="answer-line"></div>
                </div>
              `
          }

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
            ${index + 1}
          </span>

          <span class="answer-text">
            ${item.correctAns}
          </span>

        </div>
      `,
    )
    .join("");
};
