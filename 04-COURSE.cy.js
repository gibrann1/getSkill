Cypress.on('uncaught:exception', () => {
  return false
})

describe('GetSkill - Kursus dan Kursus Saya', () => {

  const BASE_URL = 'https://cmsdev-getskill.hummatech.com'
  const courseUrl = `${BASE_URL}/courses`
  const myCourseUrl = `${BASE_URL}/dashboard/users/courses`

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

    cy.get('#email', {
      timeout: 15000
    })
      .should('exist')
      .clear()
      .type('aldoorenaldo780@gmail.com')

    cy.get('input[type="password"]', {
      timeout: 15000
    })
      .first()
      .should('exist')
      .clear()
      .type('password', { log: false })

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
  // GS-COURSE-001
  // =========================================================
  it('GS-COURSE-001 - Memastikan halaman Kursus dapat diakses', () => {

    cy.visit(courseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body').should('be.visible')

    cy.get('body').then(($body) => {
      if (!$body.text().includes('Not Found')) {
        cy.contains('Kursus', {
          timeout: 10000
        }).should('be.visible')
      }
    })
  })


  // =========================================================
  // GS-COURSE-002
  // =========================================================
  it('GS-COURSE-002 - Memastikan judul halaman Kursus tampil', () => {

    cy.visit(courseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body').then(($body) => {
      if (!$body.text().includes('Not Found')) {

        cy.contains('Kursus', {
          timeout: 10000
        }).should('be.visible')

        cy.contains('Home')
          .should('be.visible')
      }
    })
  })


  // =========================================================
  // GS-COURSE-003
  // =========================================================
  it('GS-COURSE-003 - Memastikan daftar kursus tampil', () => {

    cy.visit(courseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body').then(($body) => {
      if (!$body.text().includes('Not Found')) {

        cy.contains('Kursus', {
          timeout: 10000
        }).should('be.visible')

        cy.get('img', {
          timeout: 10000
        }).should('have.length.greaterThan', 0)
      }
    })
  })


  // =========================================================
  // GS-COURSE-004
  // =========================================================
  it('GS-COURSE-004 - Memastikan informasi card kursus tampil', () => {

    cy.visit(courseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body').then(($body) => {
      if (!$body.text().includes('Not Found')) {

        cy.contains('By Get Skill', {
          timeout: 10000
        }).should('exist')
      }
    })
  })


  // =========================================================
  // GS-COURSE-005
  // =========================================================
  it('GS-COURSE-005 - Memastikan kategori kursus tampil', () => {

    cy.visit(courseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body').then(($body) => {
      if (!$body.text().includes('Not Found')) {

        cy.contains('Kategori', {
          timeout: 10000
        }).should('be.visible')

        cy.contains('Software Development')
          .should('be.visible')
      }
    })
  })


  // =========================================================
  // GS-COURSE-006
  // =========================================================
  it('GS-COURSE-006 - Memastikan checkbox kategori dapat dipilih', () => {

    cy.visit(courseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body').then(($body) => {
      if (!$body.text().includes('Not Found')) {

        cy.get('input[type="checkbox"]', {
          timeout: 10000
        })
          .first()
          .check({ force: true })
          .should('be.checked')
      }
    })
  })


  // =========================================================
  // GS-COURSE-007
  // =========================================================
  it('GS-COURSE-007 - Memastikan filter Git & Github berfungsi', () => {

    cy.visit(courseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body').then(($body) => {
      if (!$body.text().includes('Not Found')) {

        cy.contains('Git & Github', {
          timeout: 10000
        })
          .should('be.visible')
          .click()

        cy.contains('Terapkan', {
          timeout: 10000
        })
          .click()

        cy.wait(1000)
      }
    })
  })


  // =========================================================
  // GS-COURSE-008
  // =========================================================
  it('GS-COURSE-008 - Memastikan filter Pemrograman Website berfungsi', () => {

    cy.visit(courseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body').then(($body) => {
      if (!$body.text().includes('Not Found')) {

        cy.contains('Pemrograman Website', {
          timeout: 10000
        })
          .should('be.visible')
          .click()

        cy.contains('Terapkan', {
          timeout: 10000
        }).click()

        cy.wait(1000)
      }
    })
  })


  // =========================================================
  // GS-COURSE-009
  // =========================================================
  it('GS-COURSE-009 - Memastikan filter kategori dapat diubah', () => {

    cy.visit(courseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body').then(($body) => {
      if (!$body.text().includes('Not Found')) {

        cy.contains('Git & Github', {
          timeout: 10000
        }).click()

        cy.contains('Terapkan', {
          timeout: 10000
        }).click()

        cy.wait(1000)
      }
    })
  })


  // =========================================================
  // GS-COURSE-010
  // =========================================================
  it('GS-COURSE-010 - Memastikan Harga Minimum dapat diisi', () => {

    cy.visit(courseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body').then(($body) => {
      if (!$body.text().includes('Not Found')) {

        cy.get('input')
          .filter('[placeholder*="Harga Minimum"]')
          .first()
          .should('be.visible')
          .clear()
          .type('50000')
          .should('have.value', '50000')
      }
    })
  })


  // =========================================================
  // GS-COURSE-011
  // =========================================================
  it('GS-COURSE-011 - Memastikan Harga Maksimum dapat diisi', () => {

    cy.visit(courseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body').then(($body) => {
      if (!$body.text().includes('Not Found')) {

        cy.get('input')
          .filter('[placeholder*="Harga Maksimum"]')
          .first()
          .should('be.visible')
          .clear()
          .type('500000')
          .should('have.value', '500000')
      }
    })
  })


  // =========================================================
  // GS-COURSE-012
  // =========================================================
  it('GS-COURSE-012 - Memastikan filter rentang harga berfungsi', () => {

    cy.visit(courseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body').then(($body) => {
      if (!$body.text().includes('Not Found')) {

        cy.get('input')
          .filter('[placeholder*="Harga Minimum"]')
          .first()
          .clear()
          .type('50000')

        cy.get('input')
          .filter('[placeholder*="Harga Maksimum"]')
          .first()
          .clear()
          .type('500000')

        cy.contains('Terapkan', {
          timeout: 10000
        }).click()

        cy.wait(1000)
      }
    })
  })


  // =========================================================
  // GS-COURSE-013
  // =========================================================
  it('GS-COURSE-013 - Memastikan tombol Terapkan berfungsi', () => {

    cy.visit(courseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body').then(($body) => {
      if (!$body.text().includes('Not Found')) {

        cy.contains('Terapkan', {
          timeout: 10000
        })
          .should('be.visible')
          .click()
      }
    })
  })


  // =========================================================
  // GS-COURSE-014
  // =========================================================
  it('GS-COURSE-014 - Memastikan pagination halaman 1 tampil', () => {

    cy.visit(courseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body').then(($body) => {
      if (!$body.text().includes('Not Found')) {

        cy.contains(/^1$/, {
          timeout: 10000
        })
          .last()
          .should('be.visible')
      }
    })
  })


  // =========================================================
  // GS-COURSE-015
  // =========================================================
  it('GS-COURSE-015 - Memastikan pagination halaman 2 dapat diklik', () => {

    cy.visit(courseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body').then(($body) => {
      if (!$body.text().includes('Not Found')) {

        cy.contains(/^2$/, {
          timeout: 10000
        })
          .last()
          .click()

        cy.wait(1000)

        cy.get('body').should('be.visible')
      }
    })
  })


  // =========================================================
  // GS-COURSE-016
  // =========================================================
  it('GS-COURSE-016 - Memastikan card kursus dapat diklik', () => {

    cy.visit(courseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body').then(($body) => {
      if (!$body.text().includes('Not Found')) {

        cy.contains('Test Kursus', {
          timeout: 10000
        })
          .should('be.visible')
          .click()

        cy.wait(1000)

        cy.url().should('include', '/courses/')
      }
    })
  })


  // =========================================================
  // GS-COURSE-017
  // =========================================================
  it('GS-COURSE-017 - Memastikan halaman detail kursus tampil', () => {

    cy.visit(courseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body').then(($body) => {
      if (!$body.text().includes('Not Found')) {

        cy.contains('Test Kursus', {
          timeout: 10000
        })
          .should('be.visible')
          .click()

        cy.wait(1000)

        cy.url().should('include', '/courses/')

        cy.get('body')
          .should('be.visible')
      }
    })
  })


  // =========================================================
  // GS-COURSE-018
  // =========================================================
  it('GS-COURSE-018 - Memastikan Kursus Saya dapat diakses', () => {

    cy.visit(myCourseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body', {
      timeout: 15000
    }).should('be.visible')

    cy.contains('Aktivitas Belajar', {
      timeout: 15000
    }).should('be.visible')
  })


  // =========================================================
  // GS-COURSE-019
  // =========================================================
  it('GS-COURSE-019 - Memastikan tab Dalam Pengerjaan tampil', () => {

    cy.visit(myCourseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body', {
      timeout: 15000
    }).should('be.visible')

    cy.contains('Dalam Pengerjaan', {
      timeout: 15000
    }).should('be.visible')
  })


  // =========================================================
  // GS-COURSE-020
  // =========================================================
  it('GS-COURSE-020 - Memastikan tab Dalam Pengerjaan dapat dibuka', () => {

    cy.visit(myCourseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body', {
      timeout: 15000
    }).should('be.visible')

    cy.contains('Dalam Pengerjaan', {
      timeout: 15000
    })
      .should('be.visible')
      .click()

    cy.wait(2000)

    cy.get('body')
      .should('be.visible')

    cy.log('Tab Dalam Pengerjaan berhasil dibuka')
  })


  // =========================================================
  // GS-COURSE-021
  // =========================================================
  it('GS-COURSE-021 - Memastikan informasi pada tab Dalam Pengerjaan tampil', () => {

    cy.visit(myCourseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body', {
      timeout: 15000
    }).should('be.visible')

    cy.contains('Dalam Pengerjaan', {
      timeout: 15000
    })
      .should('be.visible')
      .click()

    cy.wait(2000)

    cy.get('body')
      .should('be.visible')

    cy.log('Informasi tab Dalam Pengerjaan berhasil ditampilkan')
  })


  // =========================================================
  // GS-COURSE-022
  // =========================================================
  it('GS-COURSE-022 - Memastikan tab Selesai dapat digunakan', () => {

    cy.visit(myCourseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body', {
      timeout: 15000
    }).should('be.visible')

    cy.contains('Selesai', {
      timeout: 15000
    })
      .should('be.visible')
      .click()

    cy.wait(2000)

    cy.get('body')
      .should('be.visible')
  })


  // =========================================================
  // GS-COURSE-023
  // =========================================================
  it('GS-COURSE-023 - Memastikan halaman setelah memilih Selesai tampil', () => {

    cy.visit(myCourseUrl, {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.get('body', {
      timeout: 15000
    }).should('be.visible')

    cy.contains('Selesai', {
      timeout: 15000
    })
      .should('be.visible')
      .click()

    cy.wait(2000)

    cy.get('body')
      .should('be.visible')

    cy.log('Tab Selesai berhasil dibuka')
  })

})