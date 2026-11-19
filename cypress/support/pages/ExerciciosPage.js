
class ExerciciosPage {

    visit() {
        cy.visit('/exercises');
    }

    shouldBeLoaded() {
        cy.contains('h1', 'Complete a Frase')
            .should('be.visible');
    }

    restartExercise() {
        cy.contains('button', 'Recomeçar')
            .should('be.visible')
            .click();

        this.shouldShowQuestion(1);
    }

    shouldShowQuestion(number) {
        cy.contains('h3', 'de 30')
            .should('be.visible')
            .and('contain.text', number);
    }

    fillAnswer(answer) {
        const input = '.space-y-3 > .w-full';

        cy.get(input)
            .should('be.visible')
            .focus()
            .should('be.focused')
            .clear()
            .type(answer[0]);

        cy.wait(1000);

        cy.get(input)
            .type(answer.substring(1));
    }

    submitAnswer() {
        cy.contains('button', 'Verificar Resposta')
            .should('be.enabled')
            .click();
    }

    shouldShowFinalScore() {
        cy.contains('30 de 30')
            .should('be.visible');

        cy.contains('100%')
            .should('be.visible');
    }

    shouldShowAnswerHistory() {
        // Validar o histórico da resposta correta.
        cy.get('.bg-success\\/5')
            .should('be.visible')
            .within(() => {
                cy.contains('Você respondeu:')
                    .should('be.visible');

                cy.contains('Correto:')
                    .should('not.exist');

                cy.contains('Correto')
                    .should('be.visible');
            });

        // Validar o histórico da resposta incorreta.
        cy.get('.bg-destructive\\/5')
            .should('be.visible')
            .within(() => {
                cy.contains('Você respondeu:')
                    .should('be.visible');

                cy.contains('Correto:')
                    .should('be.visible');

                cy.contains('Errado')
                    .should('be.visible');
            });
    }
}

export default ExerciciosPage;
