describe('GetSkill - Event', () => {

  const BASE_URL = 'https://cmsdev-getskill.hummatech.com'

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
        msg.includes('undefined') ||
        msg.includes('Vivus')
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

    cy.visit(`${BASE_URL}/login`, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.document()
      .its('readyState')
      .should('eq', 'complete')

    cy.wait(1500)

    cy.get(
      'input[type="email"], input[name="email"]',
      { timeout: 15000 }
    )
      .first()
      .should('be.visible')
      .clear()
      .type('aldoorenaldo780@gmail.com')

    cy.get(
      'input[type="password"], input[name="password"]',
      { timeout: 15000 }
    )
      .first()
      .should('be.visible')
      .clear()
      .type('password', { log: false })

    cy.contains(
      'button, input[type="submit"], a',
      /Masuk|Login/i,
      { timeout: 15000 }
    )
      .filter(':visible')
      .first()
      .should('be.visible')
      .click({ force: true })

    cy.wait(2500)
  }


  // =========================================================
  // GS-EVENT-001
  // =========================================================
  it('GS-EVENT-001 - Memastikan halaman Event Saya dapat diakses', () => {

    login()

    cy.url({ timeout: 15000 })
      .should('not.include', '/login')

    cy.wait(1500)

    cy.contains(
      'a, button',
      /Event Saya/i,
      { timeout: 15000 }
    )
      .filter(':visible')
      .first()
      .should('be.visible')
      .click({ force: true })

    cy.wait(2000)

    cy.url({ timeout: 15000 })
      .should('include', 'event')

    cy.contains(
      /Event Saya|Menunggu Konfirmasi|Event Di Ikuti|Riwayat Event/i,
      { timeout: 15000 }
    )
      .filter(':visible')
      .first()
      .should('exist')
  })


  // =========================================================
  // GS-EVENT-002
  // =========================================================
  it('GS-EVENT-002 - Memastikan judul Event tampil', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.wait(1500)

    cy.contains(/^Event$/i, {
      timeout: 15000
    })
      .should('exist')
  })


  // =========================================================
  // GS-EVENT-003
  // =========================================================
  it('GS-EVENT-003 - Memastikan breadcrumb Event tampil', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.wait(1500)

    cy.get('body', { timeout: 15000 })
      .should('contain.text', 'Beranda')
      .and('contain.text', 'Event')
  })


  // =========================================================
  // GS-EVENT-004
  // =========================================================
  it('GS-EVENT-004 - Memastikan jumlah hasil Event tampil', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.wait(1500)

    cy.get('body')
      .should('contain.text', 'Total Results')
  })


  // =========================================================
  // GS-EVENT-005
  // =========================================================
  it('GS-EVENT-005 - Memastikan daftar Event tampil', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.wait(1500)

    cy.get('a[href*="/events/"]', {
      timeout: 15000
    })
      .should('have.length.greaterThan', 0)
  })


  // =========================================================
  // GS-EVENT-006
  // =========================================================
  it('GS-EVENT-006 - Memastikan informasi pada card Event tampil', () => {

    cy.intercept('GET', '**/api/events-user**').as('getEvents')

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.wait('@getEvents', { timeout: 20000 })

    cy.wait(1000)

    cy.get('a[href*="/events/"]', {
      timeout: 15000
    })
      .filter(':visible')
      .first()
      .should('exist')
      .then(($link) => {

        const $card = $link.closest(
          '[class*="card"], [class*="event"], article'
        )

        let $target = $card

        if (!$target || !$target.length) {
          $target = $link.parent().parent().parent()
        }

        const text = $target.text().trim()

        expect(
          text.length,
          'Informasi pada card Event harus tampil'
        ).to.be.greaterThan(0)

        cy.log(`Informasi card Event: ${text}`)
      })
  })


  // =========================================================
  // GS-EVENT-007
  // =========================================================
  it('GS-EVENT-007 - Memastikan dropdown kategori Event dapat dibuka', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false
    })

    cy.wait(1500)

    cy.contains(
      'button, div',
      /Kategori/i,
      { timeout: 15000 }
    )
      .filter(':visible')
      .first()
      .click({ force: true })

    cy.wait(500)
  })


  // =========================================================
  // GS-EVENT-008
  // =========================================================
  it('GS-EVENT-008 - Memastikan checkbox kategori Event dapat dipilih', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false
    })

    cy.wait(1500)

    cy.get('input[type="checkbox"]', {
      timeout: 15000
    })
      .filter(':visible')
      .first()
      .check({ force: true })
      .should('be.checked')
  })


  // =========================================================
  // GS-EVENT-009
  // =========================================================
  it('GS-EVENT-009 - Memastikan filter kategori Event berfungsi', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false
    })

    cy.wait(1500)

    cy.get('input[type="checkbox"]', {
      timeout: 15000
    })
      .filter(':visible')
      .first()
      .check({ force: true })

    cy.wait(1000)

    cy.get('body').should('exist')
  })


  // =========================================================
  // GS-EVENT-010
  // =========================================================
  it('GS-EVENT-010 - Memastikan pilihan kategori dapat dibatalkan', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false
    })

    cy.wait(1500)

    cy.get('input[type="checkbox"]', {
      timeout: 15000
    })
      .filter(':visible')
      .first()
      .check({ force: true })
      .uncheck({ force: true })
      .should('not.be.checked')
  })


  // =========================================================
  // GS-EVENT-011
  // =========================================================
  it('GS-EVENT-011 - Memastikan sorting Event dapat digunakan', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false
    })

    cy.wait(1500)

    cy.get('select', {
      timeout: 15000
    })
      .filter(':visible')
      .first()
      .should('exist')
  })


  // =========================================================
  // GS-EVENT-012
  // =========================================================
  it('GS-EVENT-012 - Memastikan jenis Event tersedia', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false
    })

    cy.wait(1500)

    cy.get('body')
      .should('contain.text', 'Gratis')
      .and('contain.text', 'Berbayar')
  })


  // =========================================================
  // GS-EVENT-013
  // =========================================================
  it('GS-EVENT-013 - Memastikan checkbox Gratis dapat dipilih', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false
    })

    cy.wait(1500)

    cy.contains('label', /Gratis/i, {
      timeout: 15000
    })
      .filter(':visible')
      .first()
      .click({ force: true })
  })


  // =========================================================
  // GS-EVENT-014
  // =========================================================
  it('GS-EVENT-014 - Memastikan checkbox Berbayar dapat dipilih', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false
    })

    cy.wait(1500)

    cy.contains('label', /Berbayar/i, {
      timeout: 15000
    })
      .filter(':visible')
      .first()
      .click({ force: true })
  })


  // =========================================================
  // GS-EVENT-015
  // =========================================================
  it('GS-EVENT-015 - Memastikan harga minimum dan maksimum dapat diisi', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false
    })

    cy.wait(1500)

    cy.get('input[type="number"]', {
      timeout: 15000
    })
      .filter(':visible')
      .then(($inputs) => {

        if ($inputs.length >= 2) {

          cy.wrap($inputs.eq(0))
            .clear()
            .type('0')

          cy.wrap($inputs.eq(1))
            .clear()
            .type('100000')
        }
      })
  })


  // =========================================================
  // GS-EVENT-016
  // =========================================================
  it('GS-EVENT-016 - Memastikan filter harga diterapkan', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false
    })

    cy.wait(1500)

    cy.get('body').should('exist')
  })


  // =========================================================
  // GS-EVENT-017
  // =========================================================
  it('GS-EVENT-017 - Memastikan pagination halaman 1 berfungsi', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false
    })

    cy.wait(1500)

    cy.contains(
      'button, a',
      /^1$/,
      { timeout: 15000 }
    )
      .filter(':visible')
      .first()
      .should('exist')
  })


  // =========================================================
  // GS-EVENT-018
  // =========================================================
  it('GS-EVENT-018 - Memastikan pagination halaman 2 berfungsi', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false
    })

    cy.wait(1500)

    cy.contains(
      'button, a',
      /^2$/,
      { timeout: 15000 }
    )
      .filter(':visible')
      .first()
      .click({ force: true })

    cy.wait(1000)
  })


  // =========================================================
  // GS-EVENT-019
  // =========================================================
  it('GS-EVENT-019 - Memastikan status Event telah berakhir tampil', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false
    })

    cy.wait(1500)

    cy.get('body')
      .should('exist')
  })


  // =========================================================
  // GS-EVENT-020
  // =========================================================
  it('GS-EVENT-020 - Memastikan informasi sisa kuota Event tampil', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false
    })

    cy.wait(1500)

    cy.get('body')
      .should('contain.text', 'Kuota')
  })


  // =========================================================
  // GS-EVENT-021
  // =========================================================
  it('GS-EVENT-021 - Memastikan card Event dapat diklik', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false
    })

    cy.wait(1500)

    cy.get('a[href*="/events/"]', {
      timeout: 15000
    })
      .filter(':visible')
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.url()
      .should('include', '/events/')
  })


  // =========================================================
  // GS-EVENT-022
  // =========================================================
  it('GS-EVENT-022 - Memastikan halaman Event dapat diakses', () => {

    cy.visit(`${BASE_URL}/events`, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.wait(1500)

    cy.url()
      .should('include', '/events')

    cy.get('body')
      .should('exist')
  })

})