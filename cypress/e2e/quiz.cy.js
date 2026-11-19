
import LoginPage from '../support/pages/LoginPage';
import ExerciciosPage from '../support/pages/ExerciciosPage';

describe('Página de Exercícios', () => {
    const loginPage = new LoginPage();
    const exerciciosPage = new ExerciciosPage();

    beforeEach(() => {
        cy.env(['email', 'password']).then(({ email, password }) => {
            loginPage.visit();
            loginPage.fillEmail(email);
            loginPage.fillPassword(password);
            loginPage.submit();

            cy.location('pathname')
                .should('not.eq', '/auth');
        });
    });

    it('CT01 - Validar o fluxo principal do exercício', () => {
        cy.fixture('exercicios').then((dados) => {
            exerciciosPage.visit();
            exerciciosPage.shouldBeLoaded();

            // Reiniciar o exercício caso o botão esteja disponível.
            cy.get('body').then(($body) => {
                const restartButton = $body
                    .find('button')
                    .filter((_, button) =>
                        button.innerText.trim() === 'Recomeçar'
                    )
                    .filter(':visible');

                if (restartButton.length > 0) {
                    exerciciosPage.restartExercise();
                }
            });

            // Responder às 30 questões utilizando os dados da fixture.
            cy.wrap(dados.respostas).each((resposta, index) => {
                exerciciosPage.shouldShowQuestion(index + 1);
                exerciciosPage.fillAnswer(resposta);
                exerciciosPage.submitAnswer();
            });

            // Validar o resultado final do exercício.
            exerciciosPage.shouldShowFinalScore();
        });
    });

    it('CT02 - Validar o salvamento automático do progresso', () => {
        cy.fixture('exercicios').then((dados) => {
            exerciciosPage.visit();
            exerciciosPage.shouldBeLoaded();

            // Reiniciar o exercício caso o botão esteja disponível.
            cy.get('body').then(($body) => {
                const restartButton = $body
                    .find('button')
                    .filter((_, button) =>
                        button.innerText.trim() === 'Recomeçar'
                    )
                    .filter(':visible');

                if (restartButton.length > 0) {
                    exerciciosPage.restartExercise();
                }
            });

            // Responder à primeira questão.
            exerciciosPage.shouldShowQuestion(1);
            exerciciosPage.fillAnswer(dados.respostas[0]);
            exerciciosPage.submitAnswer();

            // Confirmar o avanço para a segunda questão.
            exerciciosPage.shouldShowQuestion(2);

            // Atualizar a página para verificar a persistência do progresso.
            cy.reload();

            // Confirmar que o progresso foi preservado após a atualização.
            exerciciosPage.shouldBeLoaded();
            exerciciosPage.shouldShowQuestion(2);
        });
    });

    it('CT03 - Validar a continuidade do exercício', () => {
        cy.fixture('exercicios').then((dados) => {
            exerciciosPage.visit();
            exerciciosPage.shouldBeLoaded();

            // Reiniciar o exercício caso o botão esteja disponível.
            cy.get('body').then(($body) => {
                const restartButton = $body
                    .find('button')
                    .filter((_, button) =>
                        button.innerText.trim() === 'Recomeçar'
                    )
                    .filter(':visible');

                if (restartButton.length > 0) {
                    exerciciosPage.restartExercise();
                }
            });

            // Responder às duas primeiras questões.
            cy.wrap(dados.respostas.slice(0, 2)).each((resposta, index) => {
                exerciciosPage.shouldShowQuestion(index + 1);
                exerciciosPage.fillAnswer(resposta);
                exerciciosPage.submitAnswer();
            });

            // Confirmar o avanço para a terceira questão.
            exerciciosPage.shouldShowQuestion(3);

            // Acessar a página do Quiz.
            cy.visit('/quiz');

            // Retornar à página de Exercícios.
            exerciciosPage.visit();
            exerciciosPage.shouldBeLoaded();

            // Confirmar que o progresso foi preservado.
            exerciciosPage.shouldShowQuestion(3);
        });
    });

    it('CT04 - Validar a possibilidade de reiniciar o exercício', () => {
        cy.fixture('exercicios').then((dados) => {
            exerciciosPage.visit();
            exerciciosPage.shouldBeLoaded();

            // Reiniciar o exercício caso o botão esteja disponível.
            cy.get('body').then(($body) => {
                const restartButton = $body
                    .find('button')
                    .filter((_, button) =>
                        button.innerText.trim() === 'Recomeçar'
                    )
                    .filter(':visible');

                if (restartButton.length > 0) {
                    exerciciosPage.restartExercise();
                }
            });

            // Responder à primeira questão e avançar para a segunda.
            exerciciosPage.shouldShowQuestion(1);
            exerciciosPage.fillAnswer(dados.respostas[0]);
            exerciciosPage.submitAnswer();
            exerciciosPage.shouldShowQuestion(2);

            // Reiniciar o exercício durante sua execução.
            exerciciosPage.restartExercise();

            // Confirmar que o exercício retornou à primeira questão.
            exerciciosPage.shouldShowQuestion(1);

            // Responder às 30 questões para concluir o exercício.
            cy.wrap(dados.respostas).each((resposta, index) => {
                exerciciosPage.shouldShowQuestion(index + 1);
                exerciciosPage.fillAnswer(resposta);
                exerciciosPage.submitAnswer();
            });

            // Confirmar a conclusão do exercício.
            exerciciosPage.shouldShowFinalScore();

            // Reiniciar o exercício após a conclusão.
            exerciciosPage.restartExercise();

            // Confirmar que o exercício retornou à primeira questão.
            exerciciosPage.shouldShowQuestion(1);
        });
    });

    it('CT05 - Validar o histórico de respostas corretas e incorretas', () => {
        cy.fixture('exercicios').then((dados) => {
            exerciciosPage.visit();
            exerciciosPage.shouldBeLoaded();

            // Reiniciar o exercício caso o botão esteja disponível.
            cy.get('body').then(($body) => {
                const restartButton = $body
                    .find('button')
                    .filter((_, button) =>
                        button.innerText.trim() === 'Recomeçar'
                    )
                    .filter(':visible');

                if (restartButton.length > 0) {
                    exerciciosPage.restartExercise();
                }
            });

            // Responder corretamente à primeira questão.
            exerciciosPage.shouldShowQuestion(1);
            exerciciosPage.fillAnswer(dados.respostas[0]);
            exerciciosPage.submitAnswer();

            // Responder incorretamente à segunda questão.
            exerciciosPage.shouldShowQuestion(2);
            exerciciosPage.fillAnswer('you');
            exerciciosPage.submitAnswer();

            // Validar o histórico de respostas corretas e incorretas.
            exerciciosPage.shouldShowAnswerHistory();
        });
    });
});
