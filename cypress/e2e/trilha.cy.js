
import LoginPage from '../support/pages/LoginPage';
import TrilhaPage from '../support/pages/TrilhaPage';

describe('Trilha do Inglês', function () {

    // CT01 - Conclusão das cinco etapas da Unidade 1
    it('CT01 - Conclusão das cinco etapas da Unidade 1 validando XP', function () {

        const loginPage = new LoginPage();
        const trilhaPage = new TrilhaPage();

        loginPage.visit();

        cy.env(['email', 'password']).then((credentials) => {

            loginPage.fillEmail(credentials.email);
            loginPage.fillPassword(credentials.password);
            loginPage.submit();

            cy.location('pathname').should('not.eq', '/auth');

            trilhaPage.visit();
            trilhaPage.shouldBeLoaded();
            trilhaPage.shouldHavePremiumAccess();

            cy.fixture('unidade1').then((data) => {

                // LIÇÃO 1
                trilhaPage.shouldBeAvailable(1, 1);
                trilhaPage.openStage(1, 1);
                trilhaPage.startLessonOne();

                data.licao1.forEach((question, index) => {

                    trilhaPage.selectAnswer(
                        question.question,
                        question.answer
                    );

                    trilhaPage.verifyAnswer();

                    if (index < data.licao1.length - 1) {
                        trilhaPage.continueToNextQuestion();
                    } else {
                        trilhaPage.finishLesson(25);
                    }
                });

                // VALIDAÇÃO DE PERSISTÊNCIA DA LIÇÃO 1
                trilhaPage.shouldBeCompleted(1, 1);
                cy.reload();
                trilhaPage.shouldBeLoaded();
                trilhaPage.shouldBeCompleted(1, 1);

                // LIÇÃO 2
                trilhaPage.shouldBeAvailable(1, 2);
                trilhaPage.openStage(1, 2);
                trilhaPage.startNextLesson();

                data.licao2.forEach((question, index) => {

                    trilhaPage.selectAnswer(
                        question.question,
                        question.answer
                    );

                    trilhaPage.verifyAnswer();

                    if (index < data.licao2.length - 1) {
                        trilhaPage.continueToNextQuestion();
                    } else {
                        trilhaPage.finishLesson(25);
                    }
                });

                // VALIDAÇÃO DE PERSISTÊNCIA DA LIÇÃO 2
                trilhaPage.shouldBeCompleted(1, 2);
                cy.reload();
                trilhaPage.shouldBeLoaded();
                trilhaPage.shouldBeCompleted(1, 2);

                // PRÁTICA
                trilhaPage.shouldBeAvailable(1, 3);
                trilhaPage.openStage(1, 3);
                trilhaPage.startNextLesson();

                data.pratica.forEach((question, index) => {

                    trilhaPage.selectAnswer(
                        question.question,
                        question.answer
                    );

                    trilhaPage.verifyAnswer();

                    if (index < data.pratica.length - 1) {
                        trilhaPage.continueToNextQuestion();
                    } else {
                        trilhaPage.finishLesson(30);
                    }
                });

                // VALIDAÇÃO DE PERSISTÊNCIA DA PRÁTICA
                trilhaPage.shouldBeCompleted(1, 3);
                cy.reload();
                trilhaPage.shouldBeLoaded();
                trilhaPage.shouldBeCompleted(1, 3);

                // LIÇÃO 3
                trilhaPage.shouldBeAvailable(1, 4);
                trilhaPage.openStage(1, 4);
                trilhaPage.startNextLesson();

                data.licao3.forEach((question, index) => {

                    trilhaPage.selectAnswer(
                        question.question,
                        question.answer
                    );

                    trilhaPage.verifyAnswer();

                    if (index < data.licao3.length - 1) {
                        trilhaPage.continueToNextQuestion();
                    } else {
                        trilhaPage.finishLesson(25);
                    }
                });

                // VALIDAÇÃO DE PERSISTÊNCIA DA LIÇÃO 3
                trilhaPage.shouldBeCompleted(1, 4);
                cy.reload();
                trilhaPage.shouldBeLoaded();
                trilhaPage.shouldBeCompleted(1, 4);

                // REVIEW
                trilhaPage.shouldBeAvailable(1, 5);
                trilhaPage.openStage(1, 5);
                trilhaPage.startNextLesson();

                data.review.forEach((question, index) => {

                    trilhaPage.selectAnswer(
                        question.question,
                        question.answer
                    );

                    trilhaPage.verifyAnswer();

                    if (index < data.review.length - 1) {
                        trilhaPage.continueToNextQuestion();
                    } else {
                        trilhaPage.finishLesson(50);
                    }
                });

                // VALIDAÇÃO DE PERSISTÊNCIA DO REVIEW
                trilhaPage.shouldBeCompleted(1, 5);
                cy.reload();
                trilhaPage.shouldBeLoaded();
                trilhaPage.shouldBeCompleted(1, 5);
            });
        });
    });


    // CT02 - Habilitar somente após resetar o progresso da conta
    it.skip('CT02 - Desbloqueio das etapas da Unidade 1 sequencialmente', function () {

        const loginPage = new LoginPage();
        const trilhaPage = new TrilhaPage();

        loginPage.visit();

        cy.env(['email', 'password']).then((credentials) => {

            loginPage.fillEmail(credentials.email);
            loginPage.fillPassword(credentials.password);
            loginPage.submit();

            cy.location('pathname').should('not.eq', '/auth');

            trilhaPage.visit();
            trilhaPage.shouldBeLoaded();
            trilhaPage.shouldHavePremiumAccess();

            cy.fixture('unidade1').then((data) => {

                const stages = [
                    { number: 1, questions: data.licao1, xp: 25 },
                    { number: 2, questions: data.licao2, xp: 25 },
                    { number: 3, questions: data.pratica, xp: 30 },
                    { number: 4, questions: data.licao3, xp: 25 },
                    { number: 5, questions: data.review, xp: 50 }
                ];

                // ESTADO INICIAL: SOMENTE A LIÇÃO 1 DISPONÍVEL
                trilhaPage.shouldBeAvailable(1, 1);

                for (let number = 2; number <= 5; number++) {
                    trilhaPage.shouldBeBlocked(1, number);
                }

                // EXECUÇÃO SEQUENCIAL DAS CINCO ETAPAS
                stages.forEach((stage, index) => {

                    trilhaPage.openStage(1, stage.number);

                    if (index === 0) {
                        trilhaPage.startLessonOne();
                    } else {
                        trilhaPage.startNextLesson();
                    }

                    stage.questions.forEach((question, questionIndex) => {

                        trilhaPage.selectAnswer(
                            question.question,
                            question.answer
                        );

                        trilhaPage.verifyAnswer();

                        if (questionIndex < stage.questions.length - 1) {
                            trilhaPage.continueToNextQuestion();
                        } else {
                            trilhaPage.finishLesson(stage.xp);
                        }
                    });

                    // VALIDAÇÃO DOS ESTADOS APÓS CADA CONCLUSÃO
                    for (let number = 1; number <= 5; number++) {

                        if (number <= stage.number) {
                            trilhaPage.shouldBeCompleted(1, number);

                        } else if (number === stage.number + 1) {
                            if (number <= 5) {
                                trilhaPage.shouldBeAvailable(1, number);
                            }

                        } else {
                            trilhaPage.shouldBeBlocked(1, number);
                        }
                    }
                });

                // VALIDAÇÃO FINAL DA UNIDADE 1
                for (let number = 1; number <= 5; number++) {
                    trilhaPage.shouldBeCompleted(1, number);
                }
            });
        });
    });


    
// CT03 - Validar XP com uma resposta incorreta
it('CT03 - Desconto de XP por resposta incorreta', function () {

    const loginPage = new LoginPage();
    const trilhaPage = new TrilhaPage();

    loginPage.visit();

    cy.env(['email', 'password']).then((credentials) => {

        loginPage.fillEmail(credentials.email);
        loginPage.fillPassword(credentials.password);
        loginPage.submit();

        cy.location('pathname').should('not.eq', '/auth');

        trilhaPage.visit();
        trilhaPage.shouldBeLoaded();
        trilhaPage.shouldHavePremiumAccess();

        cy.fixture('unidade1-erros').then((errorData) => {
            cy.fixture('unidade1').then((data) => {

                // =====================================
                // LIÇÃO 1 - 20 XP
                // =====================================

                trilhaPage.shouldBeAvailable(1, 1);
                trilhaPage.openStage(1, 1);
                trilhaPage.startLessonOne();

                // Primeira pergunta: resposta incorreta
                const incorrectQuestion = errorData.licao1[0];

                trilhaPage.selectAnswer(
                    incorrectQuestion.question,
                    incorrectQuestion.answer
                );

                trilhaPage.verifyIncorrectAnswer();

                trilhaPage.shouldShowIncorrectAnswer(
                    incorrectQuestion.correctAnswer
                );

                trilhaPage.continueToNextQuestion();

                // Demais perguntas: respostas corretas
                data.licao1.slice(1).forEach((question, index) => {

                    trilhaPage.selectAnswer(
                        question.question,
                        question.answer
                    );

                    trilhaPage.verifyAnswer();

                    if (index < data.licao1.length - 2) {
                        trilhaPage.continueToNextQuestion();
                    } else {
                        trilhaPage.finishLesson(20);
                    }
                });


                // =====================================
                // PRÁTICA - 24 XP
                // =====================================

                trilhaPage.shouldBeAvailable(1, 3);
                trilhaPage.openStage(1, 3);
                trilhaPage.startNextLesson();

                // Primeira pergunta: resposta incorreta
                const incorrectPractice = errorData.pratica[0];

                trilhaPage.selectAnswer(
                    incorrectPractice.question,
                    incorrectPractice.answer
                );

                trilhaPage.verifyIncorrectAnswer();

                trilhaPage.shouldShowIncorrectAnswer(
                    incorrectPractice.correctAnswer
                );

                trilhaPage.continueToNextQuestion();

                // Demais perguntas: respostas corretas
                data.pratica.slice(1).forEach((question, index) => {

                    trilhaPage.selectAnswer(
                        question.question,
                        question.answer
                    );

                    trilhaPage.verifyAnswer();

                    if (index < data.pratica.length - 2) {
                        trilhaPage.continueToNextQuestion();
                    } else {
                        trilhaPage.finishLesson(24);
                    }
                });


                // =====================================
                // REVIEW - 40 XP
                // =====================================

                trilhaPage.shouldBeAvailable(1, 5);
                trilhaPage.openStage(1, 5);
                trilhaPage.startNextLesson();

                // Primeira pergunta: resposta incorreta
                const incorrectReview = errorData.review[0];

                trilhaPage.selectAnswer(
                    incorrectReview.question,
                    incorrectReview.answer
                );

                trilhaPage.verifyIncorrectAnswer();

                trilhaPage.shouldShowIncorrectAnswer(
                    incorrectReview.correctAnswer
                );

                trilhaPage.continueToNextQuestion();

                // Demais perguntas: respostas corretas
                data.review.slice(1).forEach((question, index) => {

                    trilhaPage.selectAnswer(
                        question.question,
                        question.answer
                    );

                    trilhaPage.verifyAnswer();

                    if (index < data.review.length - 2) {
                        trilhaPage.continueToNextQuestion();
                    } else {
                        trilhaPage.finishLesson(40);
                    }
                });

            });
        });
    });
});


it.only('CT04 - Validação de XP com todas as respostas incorretas', function () {

    const loginPage = new LoginPage();
    const trilhaPage = new TrilhaPage();

    loginPage.visit();

    cy.env(['email', 'password']).then((credentials) => {

        loginPage.fillEmail(credentials.email);
        loginPage.fillPassword(credentials.password);
        loginPage.submit();

        cy.location('pathname').should('not.eq', '/auth');

        trilhaPage.visit();
        trilhaPage.shouldBeLoaded();
        trilhaPage.shouldHavePremiumAccess();

        cy.fixture('unidade1-erros').then((errorData) => {

            // =====================================
            // LIÇÃO 1 - 0 XP
            // =====================================

            trilhaPage.shouldBeAvailable(1, 1);
            trilhaPage.openStage(1, 1);
            trilhaPage.startLessonOne();

            errorData.licao1.forEach((question, index) => {

                trilhaPage.selectAnswer(
                    question.question,
                    question.answer
                );

                trilhaPage.verifyIncorrectAnswer();

                trilhaPage.shouldShowIncorrectAnswer(
                    question.correctAnswer
                );

                if (index < errorData.licao1.length - 1) {
                    trilhaPage.continueToNextQuestion();
                } else {
                    trilhaPage.finishLesson(0);
                }
            });

        });
    });
});





});
