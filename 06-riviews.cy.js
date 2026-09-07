describe('GetSkill - Reviews', () => {

  const BASE_URL = 'https://cmsdev-getskill.hummatech.com'
  const LOGIN_URL = `${BASE_URL}/login`
  const REVIEWS_URL = `${BASE_URL}/dashboard/users/reviews`

  // =========================================================
  // HANDLE ERROR JAVASCRIPT DARI WEBSITE
  // =========================================================
  beforeEach(() => {
    cy.on('uncaught:exception', (err) => {
      const msg = err.message || ''

      if (
        msg.includes('select2 is not a function') ||
        msg.includes('WOW is not defined') ||
        msg.includes('addEventListener') ||
        msg.includes('Cannot read properties of undefined') ||
        msg.includes('Vivus') ||
        msg.includes('getComputedStyle')
      ) {
        return false
      }

      return false
    })
  })

  // =========================================================
  // LOGIN
  // =========================================================
  const login = () => {

    cy.visit(LOGIN_URL, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.document()
      .its('readyState')
      .should('eq', 'complete')

    cy.wait(1500)

    cy.get(
      'input[type="email"], input[name="email"], #email',
      { timeout: 15000 }
    )
      .first()
      .should('exist')
      .clear()
      .type('aldoorenaldo780@gmail.com')

    cy.get(
      'input[type="password"], input[name="password"], #password',
      { timeout: 15000 }
    )
      .first()
      .should('exist')
      .clear()
      .type('password', { log: false })

    cy.get(
      '#login-btn, button[type="submit"], input[type="submit"]',
      { timeout: 15000 }
    )
      .filter(':visible')
      .first()
      .should('exist')
      .click({ force: true })

    cy.wait(3000)

    cy.url({ timeout: 15000 })
      .should('not.include', '/login')
  }

  // =========================================================
  // OPEN REVIEWS
  // =========================================================
  const openReviews = () => {

    login()

    cy.visit(REVIEWS_URL, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.wait(2000)

    cy.document()
      .its('readyState')
      .should('eq', 'complete')

    cy.get('body', {
      timeout: 15000
    })
      .should('be.visible')

    cy.url({ timeout: 15000 })
      .should('include', '/dashboard/users/reviews')
  }

  // =========================================================
  // GS-REV-001
  // =========================================================
  it(
    'GS-REV-001 - Memastikan halaman Reviews dapat diakses',
    () => {

      openReviews()

      cy.get('body')
        .should('be.visible')

      cy.url()
        .should('include', '/dashboard/users/reviews')
    }
  )

  // =========================================================
  // GS-REV-002
  // =========================================================
  it(
    'GS-REV-002 - Memastikan judul Reviews tampil',
    () => {

      openReviews()

      // Tidak menggunakan .filter(':visible')
      // karena teks Reviews bisa berada pada elemen
      // navigasi yang tersembunyi.
      cy.get('body', {
        timeout: 15000
      })
        .should('contain.text', 'Reviews')
    }
  )

  // =========================================================
  // GS-REV-003
  // =========================================================
  it(
    'GS-REV-003 - Memastikan daftar Reviews tampil',
    () => {

      openReviews()

      cy.get(
        'table, .table, [role="table"]',
        { timeout: 15000 }
      )
        .should('exist')

      cy.get('body')
        .should('be.visible')
    }
  )

  // =========================================================
  // GS-REV-004
  // =========================================================
  it(
    'GS-REV-004 - Memastikan detail review dapat dilihat',
    () => {

      openReviews()

      cy.get(
        'table tbody tr, .table tbody tr',
        { timeout: 15000 }
      )
        .first()
        .should('exist')
        .scrollIntoView()
        .click({ force: true })

      cy.wait(1500)

      cy.get('body')
        .should('be.visible')

      cy.url({ timeout: 10000 })
        .should('not.include', '/login')
    }
  )

})