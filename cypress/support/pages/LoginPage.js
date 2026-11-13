class LoginPage {

    visit() {
        cy.visit('/auth');
    }

    fillEmail(email) {
    cy.get('input[placeholder="seu@email.com"]')
        .should('be.visible')
        .clear()
        .type(email);
}

    fillPassword(password) {
    cy.get('input[placeholder="••••••••"]')
        .should('be.visible')
        .clear()
        .type(password);
}

    submit() {
        cy.contains('button[type="submit"]', 'Entrar')
        .should('be.visible')
        .click();
    }

}

export default LoginPage;