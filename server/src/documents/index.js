module.exports = (data) => {
    // copy the html format at the test folder
    const quizName = data.quizName;
    const subject = data.subject;
    const questions = data.questions;
    const questionsItems = generateItems(questions);
    const correctAnswersItems = generateAnswers(questions);
    console.log(correctAnswersItems);
    return `
<html lang="en">

<head>
    <title>NAME</title>
    <style>
        .page {
            width: 816px;
            margin: auto;
            border: 1px solid black;
        }

        .pageContent {
            padding: 50px 35px;
        }

        .answersLabel {
            position: relative;
            right: 35px;
        }

        .description {
            font-size: 15pt;
        }

        .bold {
            font-weight: bold;
        }

        .answer {
            color: rgb(8, 104, 51);
            font-weight: bold;
        }

        .question {
            font-size: 12pt;
        }

        .pageBody {
            margin-top: 3rem;
            padding: 0 30px;
            display: grid;
            gap: 50px;
        }

        .questionsPage {
            display: grid;
            gap: 5px;
        }

        .item {
            display: grid;
            gap: 10px;
            margin-bottom: 30px;
        }

        .choices {
            display: grid;
            gap: 5px;
            padding: 0 20px;
        }

        .answerPage {}
    </style>
</head>

<body>
    <div class="pageContent">

        <div class="topLabel">
            <div class="left">
                <div class="subject">
                    <label class="description bold">Subject: </label>
                    <label class="description">${subject}</label>
                </div>
                <div class="quizName">
                    <label class="description bold">Quiz name: </label>
                    <label class="description">${quizName}</label>
                </div>
            </div>
        </div>

        <div class="pageBody">
            <div class="questionsPage">
                ${questionsItems}
            </div>
            <label class="description bold answersLabel">Answers</label>

            <div class="answersPage">
                ${correctAnswersItems}
            </div>

        </div>
        
    </div>
</body>

</html>
`;
}

const generateItems = (items) => {
    // todo generate items here for the html
    let htmlString = "";
    let htmlBuilder = [];
    for (index in items) {
        const question = items[index].question;
        const choices = items[index].choices;
        htmlBuilder.push(`
            <div class="item">
                <label class="question">${question}</label>
            <div class="choices">
        `);
        for (index in choices) {
            let options = ["A", "B", "C"];
            htmlBuilder.push(`
                <div class="choice">
                    <label class="selection bold">${options[index]}: </label>
                    <label class="selection">${choices[index]}: </label>
                </div>
            `)
        }
        htmlBuilder.push(`
            </div>
            </div>
        `);
        htmlString = htmlBuilder.join("");
    }
    return htmlString;
}

const generateAnswers = (items) => {
    console.log("generate");
    console.log(items);
    let htmlString = "";
    let htmlBuilder = [];
    for (index in items) {
        htmlBuilder.push(`
        <div class="item">
            <label class="question">${items[index].question}</label>
            <label class="answer">${items[index].correctAns}</label>
        </div>
        `);
    }
    htmlString = htmlBuilder.join("");
    return htmlString;
}