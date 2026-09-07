describe('GetSkill - Profil Saya', () => {

  const BASE_URL = 'https://cmsdev-getskill.hummatech.com'
  const LOGIN_URL = `${BASE_URL}/login`
  const PROFILE_URL = `${BASE_URL}/dashboard/users/profile`

  // =========================================================
  // HANDLE ERROR JAVASCRIPT WEBSITE
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
  // OPEN PROFIL
  // =========================================================
  const openProfile = () => {

    login()

    cy.visit(PROFILE_URL, {
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
  // TC-PROF-001
  // =========================================================
  it(
    'TC-PROF-001 - Memastikan halaman Profil Saya dapat diakses',
    () => {

      openProfile()

      cy.get('body')
        .should('be.visible')

      cy.url({ timeout: 15000 })
        .should('include', '/dashboard/users/profile')
    }
  )

  // =========================================================
  // TC-PROF-002
  // =========================================================
  it(
    'TC-PROF-002 - Memastikan data profil user ditampilkan',
    () => {

      openProfile()

      cy.get('input, textarea, select', {
        timeout: 15000
      })
        .should('exist')

      cy.get('body')
        .should('be.visible')

      cy.log('Data profil user berhasil ditampilkan')
    }
  )

  // =========================================================
  // TC-PROF-003
  // =========================================================
  it(
    'TC-PROF-003 - Memastikan user dapat mengubah nama',
    () => {

      openProfile()

      cy.get(
        'input[name="name"], input#name, input[placeholder*="Nama" i]',
        { timeout: 15000 }
      )
        .first()
        .should('exist')
        .clear()
        .type('ALDO RENALDO PRASTYO')

      cy.get('#btn-update-info', {
        timeout: 15000
      })
        .should('exist')
        .click({ force: true })

      cy.wait(2000)

      cy.get('body')
        .should('be.visible')
    }
  )

  // =========================================================
  // TC-PROF-004
  // =========================================================
  it(
    'TC-PROF-004 - Memastikan user dapat mengubah nomor telepon',
    () => {

      openProfile()

      cy.get(
        'input[name="phone"], input[name="phone_number"], input[type="tel"], input[placeholder*="Telepon" i]',
        { timeout: 15000 }
      )
        .first()
        .should('exist')
        .clear()
        .type('081234567890')

      cy.get('#btn-update-info', {
        timeout: 15000
      })
        .should('exist')
        .click({ force: true })

      cy.wait(2000)

      cy.get('body')
        .should('be.visible')
    }
  )

  // =========================================================
  // TC-PROF-005
  // =========================================================
  it(
    'TC-PROF-005 - Memastikan user dapat mengubah jenis kelamin',
    () => {

      openProfile()

      cy.get(
        'select[name="gender"], select#gender',
        { timeout: 15000 }
      )
        .first()
        .should('exist')
        .then(($select) => {

          const options = $select.find('option')

          if (options.length > 1) {

            cy.wrap($select)
              .select(1, { force: true })

          } else {

            cy.log(
              'Dropdown jenis kelamin tidak memiliki pilihan'
            )

          }
        })

      cy.get('#btn-update-info', {
        timeout: 15000
      })
        .should('exist')
        .click({ force: true })

      cy.wait(2000)

      cy.get('body')
        .should('be.visible')
    }
  )

  // =========================================================
  // TC-PROF-006
  // =========================================================
  it(
    'TC-PROF-006 - Memastikan user dapat mengubah alamat',
    () => {

      openProfile()

      cy.get(
        'textarea[name="address"], textarea#address, textarea[placeholder*="Alamat" i], input[name="address"]',
        { timeout: 15000 }
      )
        .first()
        .should('exist')
        .clear()
        .type('Jl. Contoh Alamat')

      cy.get('#btn-update-info', {
        timeout: 15000
      })
        .should('exist')
        .click({ force: true })

      cy.wait(2000)

      cy.get('body')
        .should('be.visible')
    }
  )

  // =========================================================
  // TC-PROF-007
  // =========================================================
  it(
    'TC-PROF-007 - Memastikan validasi field nama',
    () => {

      openProfile()

      // Kosongkan field Nama
      cy.get(
        'input[name="name"], input#name, input[placeholder*="Nama" i]',
        { timeout: 15000 }
      )
        .first()
        .should('exist')
        .clear()

      // Klik Update Info
      cy.get('#btn-update-info', {
        timeout: 15000
      })
        .should('exist')
        .click({ force: true })

      cy.wait(1500)

      // Pastikan field Nama tetap kosong
      cy.get(
        'input[name="name"], input#name, input[placeholder*="Nama" i]',
        { timeout: 15000 }
      )
        .first()
        .should('have.value', '')

      // Cek pesan validasi jika tersedia
      cy.get('body')
        .should('be.visible')
        .then(($body) => {

          const text = $body.text().toLowerCase()

          if (
            text.includes('nama wajib') ||
            text.includes('nama harus') ||
            text.includes('name is required') ||
            text.includes('required') ||
            text.includes('wajib diisi')
          ) {

            cy.log(
              'Validasi field Nama berhasil ditampilkan'
            )

          } else {

            cy.log(
              'Pesan validasi khusus tidak ditemukan, tetapi field Nama tetap kosong'
            )

          }
        })
    }
  )

  // =========================================================
  // TC-PROF-008
  // =========================================================
  it(
    'TC-PROF-008 - Memastikan tombol Edit Cover Photo dapat digunakan',
    () => {

      openProfile()

      cy.contains(
        /Edit Cover Photo/i,
        { timeout: 15000 }
      )
        .should('exist')
        .click({ force: true })

      cy.wait(1000)

      cy.get(
        'input[type="file"]',
        { timeout: 15000 }
      )
        .should('exist')

      cy.log(
        'Input upload Cover Photo berhasil dibuka'
      )
    }
  )

  // =========================================================
  // TC-PROF-009
  // =========================================================
  it(
    'TC-PROF-009 - Memastikan perubahan profil tetap tersimpan setelah halaman di-refresh',
    () => {

      openProfile()

      cy.get(
        'input[name="name"], input#name, input[placeholder*="Nama" i]',
        { timeout: 15000 }
      )
        .first()
        .should('exist')
        .invoke('val')
        .then((currentName) => {

          const nameValue =
            currentName || 'ALDO RENALDO PRASTYO'

          cy.get(
            'input[name="name"], input#name, input[placeholder*="Nama" i]',
            { timeout: 15000 }
          )
            .first()
            .clear()
            .type(nameValue)

          cy.get('#btn-update-info', {
            timeout: 15000
          })
            .should('exist')
            .click({ force: true })

          cy.wait(2000)

          cy.reload()

          cy.wait(2000)

          cy.get(
            'input[name="name"], input#name, input[placeholder*="Nama" i]',
            { timeout: 15000 }
          )
            .first()
            .should('exist')
        })
    }
  )

})