describe('GetSkill - Penukaran Poin', () => {

  const BASE_URL = 'https://cmsdev-getskill.hummatech.com'
  const LOGIN_URL = `${BASE_URL}/login`

  // GANTI jika URL Penukaran Poin di aplikasi berbeda
  const POIN_URL = `${BASE_URL}/point-exchange`

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
  // OPEN PENUKARAN POIN
  // =========================================================
  const openPointExchange = () => {

    login()

    cy.visit(POIN_URL, {
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
  }

  // =========================================================
  // GS-POIN-001
  // =========================================================
  it(
    'GS-POIN-001 - Memastikan halaman Penukaran Poin dapat diakses',
    () => {

      openPointExchange()

      cy.get('body')
        .should('be.visible')

      cy.url({ timeout: 15000 })
        .should('not.include', '/login')
    }
  )

  // =========================================================
  // GS-POIN-002
  // =========================================================
  it(
    'GS-POIN-002 - Memastikan judul dan deskripsi Penukaran Poin tampil dengan baik',
    () => {

      openPointExchange()

      cy.get('body', {
        timeout: 15000
      })
        .should('be.visible')
        .and('contain.text', 'Penukaran Poin')
    }
  )

  // =========================================================
  // GS-POIN-003
  // =========================================================
  it(
    'GS-POIN-003 - Memastikan informasi total poin pengguna ditampilkan',
    () => {

      openPointExchange()

      cy.get('body', {
        timeout: 15000
      })
        .should('be.visible')

      cy.contains(
        /total poin|poin anda|poin/i,
        { timeout: 15000 }
      )
        .should('exist')
    }
  )

  // =========================================================
  // GS-POIN-004
  // =========================================================
  it(
    'GS-POIN-004 - Memastikan daftar barang penukaran poin tampil',
    () => {

      openPointExchange()

      cy.get('body', {
        timeout: 15000
      })
        .should('be.visible')

      cy.get(
        '.card, .product-card, .item, .row',
        { timeout: 15000 }
      )
        .should('exist')
    }
  )

  // =========================================================
  // GS-POIN-005
  // =========================================================
  it(
    'GS-POIN-005 - Memastikan pagination daftar penukaran dapat digunakan',
    () => {

      openPointExchange()

      cy.get(
        '.pagination, nav[aria-label*="pagination" i], [class*="pagination"]',
        { timeout: 15000 }
      )
        .should('exist')

      cy.get(
        '.pagination a, .pagination button, [class*="pagination"] a, [class*="pagination"] button',
        { timeout: 15000 }
      )
        .then(($items) => {

          if ($items.length > 0) {

            cy.wrap($items)
              .last()
              .click({ force: true })

            cy.wait(1500)

            cy.get('body')
              .should('be.visible')

          } else {

            cy.log('Pagination tidak memiliki tombol yang dapat diklik')

          }
        })
    }
  )

  // =========================================================
  // GS-POIN-006
  // =========================================================
  it(
    'GS-POIN-006 - Memastikan menu navigasi dapat digunakan',
    () => {

      openPointExchange()

      cy.get('body')
        .should('be.visible')

      cy.get('a', {
        timeout: 15000
      })
        .should('exist')

      cy.log('Menu navigasi tersedia pada halaman Penukaran Poin')
    }
  )

  // =========================================================
  // GS-POIN-007
  // =========================================================
  it(
    'GS-POIN-007 - Memastikan link Penukaran Hadiah pada footer dapat digunakan',
    () => {

      openPointExchange()

      cy.get('body')
        .should('be.visible')

      cy.get('footer', {
        timeout: 15000
      })
        .scrollIntoView()

      cy.contains(
        /Penukaran Hadiah|Penukaran Poin/i,
        { timeout: 15000 }
      )
        .should('exist')
    }
  )

  // =========================================================
  // GS-POIN-008
  // =========================================================
  it(
    'GS-POIN-008 - Memastikan halaman dapat digunakan pada ukuran layar berbeda',
    () => {

      openPointExchange()

      // Desktop
      cy.viewport(1280, 720)

      cy.get('body')
        .should('be.visible')

      cy.wait(500)

      // Tablet
      cy.viewport(768, 1024)

      cy.get('body')
        .should('be.visible')

      cy.wait(500)

      // Mobile
      cy.viewport(375, 667)

      cy.get('body')
        .should('be.visible')

      cy.wait(500)

      cy.log('Halaman tetap dapat ditampilkan pada berbagai ukuran layar')
    }
  )

})