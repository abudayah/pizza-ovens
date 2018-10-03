describe('Test main user functionality', () => {
  it('Restaurant list have items', () => {
    cy.visit('/')
    cy.get('#restaurant-list').find('[data-test=restaurantItemLink]').should('have.length.to.be.at.least', 1)
  })
  
  it('Render view page', () => {
    cy.get('#restaurant-list').find('[data-test=restaurantItemLink]').first().click()
  })
  
  it('Add To Cart action', () => {
    cy.get('[data-test=addToCartBtn]:first').click()
    cy.get('[data-test=orderSummeryList]').find('li').should('have.length', 1)
    cy.get('[data-test=cartCount]').should('have.data', 'count', 1)
  })
})
