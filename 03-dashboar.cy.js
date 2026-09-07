Cypress.on('uncaught:exception', () => {
  return false
})

describe('Testing Dashboard GetSkill GS-DASH-001 sampai GS-DASH-012', () => {

  const BASE_URL = 'https://cmsdev-getskill.hummatech.com'

  // =========================================================
  // LOGIN
  // =========================================================
  beforeEach(() => {

    cy.visit(BASE_URL, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.wait(2000)

    cy.contains('Masuk', {
      timeout: 15000
    })
      .first()
      .scrollIntoView()
      .click({ force: true })

    cy.wait(2000)

    // Email
    cy.get('#email', {
      timeout: 15000
    })
      .should('exist')
      .clear()
      .type('aldoorenaldo780@gmail.com')

    // Password
    cy.get('input[type="password"]', {
      timeout: 15000
    })
      .first()
      .should('exist')
      .clear()
      .type('password', { log: false })

    // Login
    cy.get('#login-btn', {
      timeout: 15000
    })
      .should('exist')
      .click({ force: true })

    cy.wait(4000)

    cy.url({
      timeout: 15000
    }).should('include', '/dashboard/users')
  })


  // =========================================================
  // GS-DASH-001
  // =========================================================
  it('GS-DASH-001 - Memastikan menu Kursus Saya dapat diakses', () => {

    cy.contains('Kursus Saya', {
      matchCase: false,
      timeout: 15000
    })
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1000)
  })


  // =========================================================
  // GS-DASH-002
  // =========================================================
  it('GS-DASH-002 - Memastikan menu Event Saya dapat diakses', () => {

    cy.contains('Event Saya', {
      matchCase: false,
      timeout: 15000
    })
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1000)
  })


  // =========================================================
  // GS-DASH-003
  // =========================================================
  it('GS-DASH-003 - Memastikan menu Kelas Industri dapat diakses', () => {

    cy.contains('Kelas Industri', {
      matchCase: false,
      timeout: 15000
    })
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1000)
  })


  // =========================================================
  // GS-DASH-004
  // =========================================================
  it('GS-DASH-004 - Memastikan menu Sertifikat dapat diakses', () => {

    cy.contains('Sertifikat', {
      matchCase: false,
      timeout: 15000
    })
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1000)
  })


  // =========================================================
  // GS-DASH-005
  // =========================================================
  it('GS-DASH-005 - Memastikan menu Profil dapat diakses', () => {

    cy.contains('Profil', {
      matchCase: false,
      timeout: 15000
    })
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1000)
  })


  // =========================================================
  // GS-DASH-006
  // =========================================================
  it('GS-DASH-006 - Memastikan data Profil tersedia', () => {

    cy.contains('Profil', {
      matchCase: false,
      timeout: 15000
    })
      .should('exist')
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1000)
  })


  // =========================================================
  // GS-DASH-007
  // =========================================================
  it('GS-DASH-007 - Memastikan menu Kursus Saya tersedia', () => {

    cy.contains('Kursus Saya', {
      matchCase: false,
      timeout: 15000
    })
      .should('exist')
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1000)
  })


  // =========================================================
  // GS-DASH-008
  // =========================================================
  it('GS-DASH-008 - Memastikan menu Dashboard dapat diakses', () => {

    cy.contains('Dashboard', {
      matchCase: false,
      timeout: 15000
    })
      .should('exist')
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1000)

    cy.url()
      .should('include', '/dashboard/users')
  })


  // =========================================================
  // GS-DASH-009
  // =========================================================
  it('GS-DASH-009 - Memastikan tombol Logout tersedia', () => {

    cy.contains('Logout', {
      matchCase: false,
      timeout: 15000
    })
      .scrollIntoView()
      .should('exist')
  })


  // =========================================================
  // GS-DASH-010
  // =========================================================
  it('GS-DASH-010 - Memastikan halaman dashboard dapat direfresh', () => {

    cy.reload()

    cy.wait(2000)

    cy.url({
      timeout: 15000
    })
      .should('include', '/dashboard/users')
  })


  // =========================================================
  // GS-DASH-011
  // =========================================================
  it('GS-DASH-011 - Memastikan navigasi dashboard berjalan', () => {

    cy.get('body')
      .should('be.visible')

    cy.url()
      .should('include', '/dashboard/users')
  })


  // =========================================================
  // GS-DASH-012
  // LOGOUT
  // =========================================================
  it('GS-DASH-012 - Memastikan pengguna dapat melakukan Logout', () => {

    cy.contains('Logout', {
      matchCase: false,
      timeout: 15000
    })
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.wait(2000)

    // Setelah logout, pengguna tidak lagi berada di dashboard
    cy.url({
      timeout: 15000
    })
      .should('not.include', '/dashboard/users')

    // Pastikan tombol/link Masuk tampil kembali
    cy.contains('Masuk', {
      timeout: 15000
    })
      .should('exist')
  })

})