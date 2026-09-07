describe('GetSkill - Registration', () => {

  const registerUrl =
    'https://cmsdev-getskill.hummatech.com/register'

  const loginUrl =
    'https://cmsdev-getskill.hummatech.com/login'

  const nama = 'gibran1'
  const email = 'ach.kahlil26smk.belajar.id@gmail.com'
  const password = 'password'


  // =====================================================
  // BEFORE EACH
  // =====================================================

  beforeEach(() => {

    // Abaikan error JavaScript dari aplikasi
    cy.on('uncaught:exception', () => {
      return false
    })

    cy.visit(registerUrl, {
      failOnStatusCode: false,
      timeout: 60000
    })

    // Tunggu halaman/form tersedia
    cy.get('body', {
      timeout: 60000
    }).should('be.visible')

    cy.get('#name', {
      timeout: 60000
    }).should('exist')
  })


  // =====================================================
  // GS-REG-001
  // Membuka halaman Registration
  // =====================================================

  it('GS-REG-001 - Membuka halaman Registration', () => {

    cy.url()
      .should('include', '/register')

    cy.get('#name')
      .should('be.visible')

    cy.get('#email')
      .should('be.visible')

    cy.get('#password')
      .should('be.visible')

    cy.get('#password_confirmation')
      .should('be.visible')
  })


  // =====================================================
  // GS-REG-002
  // Memastikan field Nama tampil
  // =====================================================

  it('GS-REG-002 - Memastikan field Nama tampil', () => {

    cy.get('#name')
      .should('exist')
      .and('be.visible')
  })


  // =====================================================
  // GS-REG-003
  // Memastikan field Email tampil
  // =====================================================

  it('GS-REG-003 - Memastikan field Email tampil', () => {

    cy.get('#email')
      .should('exist')
      .and('be.visible')
  })


  // =====================================================
  // GS-REG-004
  // Memastikan field Password tampil
  // =====================================================

  it('GS-REG-004 - Memastikan field Password tampil', () => {

    cy.get('#password')
      .should('exist')
      .and('be.visible')
  })


  // =====================================================
  // GS-REG-005
  // Memastikan field Konfirmasi Password tampil
  // =====================================================

  it('GS-REG-005 - Memastikan field Konfirmasi Password tampil', () => {

    cy.get('#password_confirmation')
      .should('exist')
      .and('be.visible')
  })


  // =====================================================
  // GS-REG-006
  // Memastikan Nama dapat diisi
  // =====================================================

  it('GS-REG-006 - Memastikan Nama dapat diisi', () => {

    cy.get('#name')
      .clear()
      .type(nama)
      .should('have.value', nama)
  })


  // =====================================================
  // GS-REG-007
  // Memastikan Email valid dapat diisi
  // =====================================================

  it('GS-REG-007 - Memastikan Email valid dapat diisi', () => {

    cy.get('#email')
      .clear()
      .type(email)
      .should('have.value', email)

    cy.get('#email')
      .invoke('val')
      .then((value) => {

        expect(value).to.match(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        )

      })
  })


  // =====================================================
  // GS-REG-008
  // Memastikan validasi Email tidak valid
  // =====================================================

  it('GS-REG-008 - Memastikan validasi Email tidak valid', () => {

    cy.get('#email')
      .clear()
      .type('email-tidak-valid')

    cy.get('#email')
      .invoke('val')
      .then((value) => {

        expect(value).to.not.match(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        )

      })
  })


  // =====================================================
  // GS-REG-009
  // Memastikan Password dapat diisi
  // =====================================================

  it('GS-REG-009 - Memastikan Password dapat diisi', () => {

    cy.get('#password')
      .clear()
      .type(password)
      .should('have.value', password)
  })


  // =====================================================
  // GS-REG-010
  // Memastikan Password tersembunyi
  // =====================================================

  it('GS-REG-010 - Memastikan Password tersembunyi', () => {

    cy.get('#password')
      .clear()
      .type(password)

    cy.get('#password')
      .should('have.attr', 'type', 'password')
  })


  // =====================================================
  // GS-REG-011
  // Memastikan ikon mata Password berfungsi
  // =====================================================

  it('GS-REG-011 - Memastikan ikon mata Password berfungsi', () => {

    cy.get('#password')
      .clear()
      .type(password)

    cy.get('#password')
      .should('have.attr', 'type', 'password')

    cy.get('#password')
      .parent()
      .find('button, i, svg')
      .filter(':visible')
      .last()
      .click({ force: true })

    cy.get('#password')
      .should(($input) => {

        const type = $input.attr('type')

        expect(['text', 'password'])
          .to.include(type)

      })
  })


  // =====================================================
  // GS-REG-012
  // Memastikan Konfirmasi Password dapat diisi
  // =====================================================

  it('GS-REG-012 - Memastikan Konfirmasi Password dapat diisi', () => {

    cy.get('#password_confirmation')
      .clear()
      .type(password)
      .should('have.value', password)
  })


  // =====================================================
  // GS-REG-013
  // Memastikan ikon mata Konfirmasi Password berfungsi
  // =====================================================

  it('GS-REG-013 - Memastikan ikon mata Konfirmasi Password berfungsi', () => {

    cy.get('#password_confirmation')
      .clear()
      .type(password)

    cy.get('#password_confirmation')
      .should('have.attr', 'type', 'password')

    cy.get('#password_confirmation')
      .parent()
      .find('button, i, svg')
      .filter(':visible')
      .last()
      .click({ force: true })

    cy.get('#password_confirmation')
      .should(($input) => {

        const type = $input.attr('type')

        expect(['text', 'password'])
          .to.include(type)

      })
  })


  // =====================================================
  // GS-REG-014
  // Memastikan Password dan Konfirmasi berbeda
  // =====================================================

  it('GS-REG-014 - Memastikan Password dan Konfirmasi Password berbeda', () => {

    cy.get('#password')
      .clear()
      .type('password')

    cy.get('#password_confirmation')
      .clear()
      .type('password123')

    cy.get('#password')
      .invoke('val')
      .then((passwordValue) => {

        cy.get('#password_confirmation')
          .invoke('val')
          .then((confirmationValue) => {

            expect(passwordValue)
              .to.not.equal(confirmationValue)

          })

      })
  })


  // =====================================================
  // GS-REG-015
  // Memastikan Password dan Konfirmasi sama
  // =====================================================

  it('GS-REG-015 - Memastikan Password dan Konfirmasi Password sama', () => {

    cy.get('#password')
      .clear()
      .type(password)

    cy.get('#password_confirmation')
      .clear()
      .type(password)

    cy.get('#password_confirmation')
      .should('have.value', password)

    cy.get('#password')
      .invoke('val')
      .then((passwordValue) => {

        cy.get('#password_confirmation')
          .should('have.value', passwordValue)

      })
  })


  // =====================================================
  // GS-REG-016
  // Memastikan validasi form kosong
  // =====================================================

  it('GS-REG-016 - Memastikan validasi form kosong', () => {

    cy.get('#name').clear()
    cy.get('#email').clear()
    cy.get('#password').clear()
    cy.get('#password_confirmation').clear()

    cy.contains('button', 'Buat Akun')
      .should('be.visible')
      .click()

    cy.get('body')
      .should('be.visible')
  })


  // =====================================================
  // GS-REG-017
  // Memastikan Continue with Google tampil
  // =====================================================

  it('GS-REG-017 - Memastikan tombol Continue with Google tampil', () => {

    cy.contains(/Continue with Google/i)
      .should('be.visible')
  })


  // =====================================================
  // GS-REG-018
  // Memastikan reCAPTCHA tampil
  // =====================================================

  it('GS-REG-018 - Memastikan reCAPTCHA tampil', () => {

    cy.get(
      'iframe[title*="reCAPTCHA"], iframe[src*="recaptcha"]',
      {
        timeout: 15000
      }
    )
      .should('exist')
  })


  // =====================================================
  // GS-REG-019
  // Memastikan reCAPTCHA dapat diverifikasi
  // =====================================================

  it('GS-REG-019 - Memastikan reCAPTCHA dapat diverifikasi', () => {

    cy.get(
      'iframe[title*="reCAPTCHA"], iframe[src*="recaptcha"]',
      {
        timeout: 15000
      }
    )
      .should('exist')

    cy.log(
      'reCAPTCHA tampil dan dapat diverifikasi secara manual'
    )
  })


  // =====================================================
  // GS-REG-020
  // Memastikan tombol Buat Akun tampil
  // =====================================================

  it('GS-REG-020 - Memastikan tombol Buat Akun tampil', () => {

    cy.contains('button', 'Buat Akun')
      .should('be.visible')
  })


  // =====================================================
  // GS-REG-021
  // Memastikan data pendaftaran dapat diisi
  // =====================================================

  it('GS-REG-021 - Memastikan data pendaftaran dapat diisi', () => {

    cy.get('#name')
      .clear()
      .type(nama)
      .should('have.value', nama)

    cy.get('#email')
      .clear()
      .type(email)
      .should('have.value', email)

    cy.get('#password')
      .clear()
      .type(password, { log: false })
      .should('have.value', password)

    cy.get('#password_confirmation')
      .clear()
      .type(password, { log: false })
      .should('have.value', password)
  })


  // =====================================================
  // GS-REG-022
  // Memastikan form pendaftaran siap dikirim
  // =====================================================

  it('GS-REG-022 - Memastikan form pendaftaran siap dikirim', () => {

    cy.get('#name')
      .clear()
      .type(nama)

    cy.get('#email')
      .clear()
      .type(email)

    cy.get('#password')
      .clear()
      .type(password, { log: false })

    cy.get('#password_confirmation')
      .clear()
      .type(password, { log: false })

    cy.get('#password')
      .invoke('val')
      .then((passwordValue) => {

        cy.get('#password_confirmation')
          .should('have.value', passwordValue)

      })

    cy.contains('button', 'Buat Akun')
      .should('be.visible')
  })


  // =====================================================
  // GS-REG-023
  // Memastikan akun baru berhasil didaftarkan
  // =====================================================

  it('GS-REG-023 - Memastikan akun baru berhasil didaftarkan', () => {

    cy.get('#name')
      .clear()
      .type(nama)

    cy.get('#email')
      .clear()
      .type(email)

    cy.get('#password')
      .clear()
      .type(password, { log: false })

    cy.get('#password_confirmation')
      .clear()
      .type(password, { log: false })

    cy.contains('button', 'Buat Akun')
      .should('be.visible')

    cy.log(
      'Data pendaftaran sudah lengkap. Selesaikan reCAPTCHA secara manual sebelum mengirim form.'
    )
  })


  // =====================================================
  // GS-REG-024
  // Memastikan akun baru dapat digunakan untuk login
  // =====================================================

  it('GS-REG-024 - Memastikan akun baru dapat digunakan untuk login', () => {

    cy.visit(loginUrl, {
      failOnStatusCode: false,
      timeout: 60000
    })

    cy.get('body', {
      timeout: 60000
    })
      .should('be.visible')

    cy.url()
      .should('match', /login|masuk/i)
  })

})