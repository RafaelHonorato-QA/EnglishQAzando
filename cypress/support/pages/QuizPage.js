
class QuizPage {

    visit() {
        cy.visit('/quiz');
    }

    restartIfAvailable() {
        cy.get('body')
            .should(($body) => {
                const heading = $body.find('h1').text();

                expect(heading).to.match(/Quiz de Inglês|Resultado Final/);
            })
            .then(($body) => {
                const heading = $body.find('h1').text();

                if (heading.includes('Resultado Final')) {
                    this.restartQuiz();

                    this.shouldBeLoaded();
                    this.shouldShowProgress('1/30');
                } else {
                    this.shouldBeLoaded();
                }
            });
    }

    getCurrentQuestion() {
        return cy.contains('div.text-xs', 'Questão')
            .parent()
            .find('div.text-2xl')
            .invoke('text')
            .then((progress) => {
                return Number(progress.split('/')[0]);
            });
    }

    shouldBeLoaded() {
        cy.contains('h1', 'Quiz de Inglês')
            .should('be.visible');

        cy.contains('p', 'Qual a tradução de:')
            .should('be.visible');
    }

    getQuestion() {
        return cy.contains('p', 'Qual a tradução de:')
            .parent()
            .find('p')
            .last();
    }

    shouldShowQuestion(word) {
        this.getQuestion()
            .should('have.text', word);
    }

    getOptions() {
        return cy.contains('p', 'Qual a tradução de:')
            .parents('.rounded-lg')
            .find('.space-y-3 > button');
    }

    shouldShowOptions(count = 3) {
        this.getOptions()
            .should('have.length', count);
    }

    shouldShowOptionsAsButtons() {
        this.getOptions()
            .each(($option) => {
                expect($option).to.have.prop('tagName', 'BUTTON');
            });
    }

    selectAnswer(answer) {
        this.getOptions()
            .contains('button', answer)
            .should('be.visible')
            .click('left');
    }

    shouldShowProgress(value) {
        cy.contains('div.text-xs', 'Questão')
            .parent()
            .find('div.text-2xl')
            .should('have.text', value);
    }

    shouldShowCorrectAnswers(value) {
        cy.contains('div.text-xs', 'Acertos')
            .parent()
            .find('div.text-2xl')
            .should('have.text', String(value));
    }

    shouldShowWrongAnswers(value) {
        cy.contains('div.text-xs', 'Erros')
            .parent()
            .find('div.text-2xl')
            .should('have.text', String(value));
    }

    shouldShowFinalCorrectAnswers(value) {
        cy.contains('p', 'Acertos')
            .parent()
            .find('p.text-3xl')
            .should('have.text', String(value));
    }

    shouldShowFinalWrongAnswers(value) {
        cy.contains('p', 'Erros')
            .parent()
            .find('p.text-3xl')
            .should('have.text', String(value));
    }

    shouldShowFinalResult() {
        cy.contains('span', 'Quiz Finalizado')
            .should('be.visible');

        cy.contains('h1', 'Resultado Final')
            .should('be.visible');
    }

    shouldShowPercentage(value) {
        cy.contains('p', `${value}%`)
            .should('be.visible');
    }

    shouldShowTotalQuestions(value) {
        cy.contains('p', 'Total de Questões')
            .parent()
            .find('p.text-2xl')
            .should('have.text', String(value));
    }

    restartQuiz() {
        cy.contains('button', 'Refazer Quiz')
            .should('be.visible')
            .click();
    }
}

export default QuizPage;
