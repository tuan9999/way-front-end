describe('My First Test', function() {
  it('clicks the button login', function() {
    cy.visit('localhost:3000');
    cy.wait(2000);
    // cy.contains('.start').click();
    cy.get('.login-btn').click();
    cy.wait(2000);
    // cy.get('.login container')
    cy.get('.login-header')
    .get('#username')
    // .wait(1000)
    .type('mmm@gmail.com', { force: true },{ delay: 2000 })
    //.wait(2000)
    .get('#password')
    //.wait(2000)
    .type('123456', { force:true},{ delay: 2000 })
    //.wait(1000)
    .get('.login-button')
    .click();
  });
  it('click the button start',function(){
    cy.visit('localhost:3000');
    cy.wait(2000);
    cy.get('.start')
    .click();
    // .wait(60000)
    // .get('.header-profileicon-username')
    // .click();
  });
});