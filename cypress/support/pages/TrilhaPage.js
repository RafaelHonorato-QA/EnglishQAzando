
class TrilhaPage {
    visit() {
        cy.visit('/duolingo');
    }

    shouldBeLoaded() {
        cy.contains('Jornada de Aprendizado').should('be.visible');
    }

    shouldHavePremiumAccess() {
        cy.contains('Premium').should('be.visible');
    }

    stage(unit, number) {
        return cy.get(`#lesson-${unit}-${number}`);
    }

    openStage(unit, number) {
        this.stage(unit, number)
            .find('button')
            .should('be.enabled')
            .click();
    }

    shouldBeAvailable(unit, number) {
        this.stage(unit, number).within(() => {
            cy.get('.lucide-star').should('exist');
            cy.contains('Bloqueado').should('not.exist');
            cy.get('button').should('be.enabled');
        });
    }

    shouldBeBlocked(unit, number) {
        this.stage(unit, number).within(() => {
            cy.contains('Bloqueado').should('be.visible');
            cy.get('.lucide-lock').should('exist');
            cy.get('button').should('be.disabled');
        });
    }

    shouldBeCompleted(unit, number) {
        this.stage(unit, number).within(() => {
            cy.contains('Completado').should('be.visible');
            cy.get('.lucide-circle-check').should('exist');
            cy.get('button').should('be.enabled');
        });
    }

    shouldHaveRecognizedState(unit, number) {
        this.stage(unit, number).should(($stage) => {
            const text = $stage.text();
            const button = $stage.find('button');

            const isCompleted = text.includes('Completado')
                && $stage.find('.lucide-circle-check').length > 0
                && button.length > 0
                && !button.prop('disabled');

            const isBlocked = text.includes('Bloqueado')
                && $stage.find('.lucide-lock').length > 0
                && button.length > 0
                && button.prop('disabled');

            const isAvailable = !text.includes('Bloqueado')
                && !text.includes('Completado')
                && $stage.find('.lucide-star').length > 0
                && button.length > 0
                && !button.prop('disabled');

            expect(
                [isCompleted, isBlocked, isAvailable].filter(Boolean),
                `estado reconhecido da etapa ${unit}-${number}`
            ).to.have.length(1);
        });
    }

    shouldUnlockNextStage(unit, number) {
        this.shouldBeAvailable(unit, number + 1);
    }

    startLessonOne() {
        cy.contains('button', 'Começar')
            .should('be.visible')
            .click();

        cy.contains('O que você vai aprender')
            .should('be.visible');

        cy.contains('button', 'Começar Lição')
            .should('be.visible')
            .click();
    }

    startNextLesson() {
        cy.contains('button', 'Começar')
            .should('be.visible')
            .click();
    }

    selectAnswer(question, answer) {
        cy.contains('p', question, { matchCase: true })
            .should('be.visible');

        cy.contains('button', answer, { matchCase: true })
            .should('be.visible')
            .click();
    }

    verifyAnswer() {
        cy.contains('button', 'Verificar')
            .should('be.enabled')
            .click();

        cy.contains('Correto!')
            .should('be.visible');

        cy.contains('Incorreto')
            .should('not.exist');
    }

    continueToNextQuestion() {
        cy.contains('button', 'Continuar')
            .should('be.visible')
            .click();
    }

    
    finishLesson(expectedXP) {
        cy.contains('button', 'Finalizar Lição')
            .should('be.visible')
            .click();

        cy.contains('Lição Completa!')
            .should('be.visible');

        cy.contains(`Você ganhou ${expectedXP} XP!`)
            .should('be.visible');
    }

}

export default TrilhaPage;