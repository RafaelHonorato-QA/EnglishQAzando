import LoginPage from '../support/pages/LoginPage';
import TrilhaPage from '../support/pages/TrilhaPage';

describe('Trilha do Inglês CT01', function () {

    it('deve concluir as cinco etapas da Unidade 1, validando o XP recebido e a persistência do progresso', function () {

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
});