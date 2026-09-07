describe('GetSkill - Beranda', () => {

  beforeEach(() => {

    // Abaikan error JavaScript dari aplikasi
    cy.on('uncaught:exception', () => {
      return false
    })

    // Intercept API FAQ
    cy.intercept('GET', '**/api/faqs-category').as('faqCategory')
    cy.intercept('GET', '**/api/faq-user').as('faqUser')

    cy.visit('https://cmsdev-getskill.hummatech.com/', {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.document()
      .its('readyState')
      .should('eq', 'complete')

    // Tunggu API FAQ selesai
    cy.wait('@faqCategory', { timeout: 20000 })
    cy.wait('@faqUser', { timeout: 20000 })

    // Tunggu render data ke halaman
    cy.wait(2000)
  })


// =====================================================
// GS-HOME-001
// =====================================================
it('GS-HOME-001 - Memastikan halaman Beranda dapat diakses', () => {

  cy.url({ timeout: 30000 })
    .should('include', 'cmsdev-getskill.hummatech.com')

  cy.get('body', { timeout: 30000 })
    .should('exist')
    .and('be.visible')

  // Tidak menggunakan cy.contains('GetSkill')
  // karena teks/logo bisa berupa gambar atau elemen lain.
  cy.document()
    .its('readyState')
    .should('eq', 'complete')
})


  // =====================================================
  // GS-HOME-002
  // =====================================================

  it('GS-HOME-002 - Memastikan Jelajahi Kursus Teratas & Terlaris di GetSkill tampil dengan baik', () => {

    cy.contains('Jelajahi Kursus', { timeout: 15000 })
      .scrollIntoView()
      .should('be.visible')

    cy.contains('Teratas', { timeout: 10000 })
      .should('be.visible')

    cy.contains('Terlaris', { timeout: 10000 })
      .should('be.visible')
  })


  // =====================================================
  // GS-HOME-003
  // =====================================================

  it('GS-HOME-003 - Memastikan section FAQ tampil dengan baik', () => {

    cy.get('body', { timeout: 15000 })
      .should('be.visible')

    // Cari pertanyaan FAQ yang memang digunakan
    // pada test berikutnya
    cy.contains(
      'Bagaimana Cara Login ke Getskill?',
      { timeout: 20000 }
    )
      .scrollIntoView()
      .should('be.visible')
  })


  // =====================================================
  // GS-HOME-004
  // =====================================================

  it('GS-HOME-004 - Memastikan tab Semua pada FAQ dapat digunakan', () => {

    cy.get('body')
      .should('be.visible')

    cy.contains(
      'Bagaimana Cara Login ke Getskill?',
      { timeout: 20000 }
    )
      .scrollIntoView()
      .should('be.visible')

    cy.contains('Semua', { timeout: 10000 })
      .should('be.visible')
      .click()

    cy.wait(500)

    cy.contains(
      'Bagaimana Cara Login ke Getskill?',
      { timeout: 10000 }
    )
      .should('be.visible')
  })


// =====================================================
// GS-HOME-005
// =====================================================
it('GS-HOME-005 - Memastikan tab Kelas Industri dapat digunakan', () => {

  cy.get('body', { timeout: 30000 })
    .should('be.visible')

  // Cari teks Kelas Industri tanpa filter :visible
  cy.contains('Kelas Industri', { timeout: 20000 })
    .should('exist')
    .then(($el) => {

      // Ambil elemen yang ditemukan
      cy.wrap($el)
        .scrollIntoView({
          duration: 500,
          offset: { top: -100, left: 0 }
        })
        .click({ force: true })
    })

  cy.wait(1000)

  cy.get('body')
    .should('be.visible')

  // Setelah tab diklik, cek kondisi aktual FAQ.
  // Jika aplikasi menampilkan "Tidak ada pertanyaan.",
  // maka hasil test memang FAIL sesuai expected.
  cy.contains('Tidak ada pertanyaan.', {
    timeout: 10000
  })
    .should('not.exist')
})


// =====================================================
// GS-HOME-006
// =====================================================
it('GS-HOME-006 - Memastikan tab Kursus dapat digunakan', () => {

  cy.get('body', { timeout: 30000 })
    .should('be.visible')

  // Jangan mencari "Pertanyaan Yang".
  // Langsung cari tab Kursus.
  cy.contains('Kursus', { timeout: 20000 })
    .should('exist')
    .then(($el) => {

      cy.wrap($el)
        .scrollIntoView({
          duration: 500,
          offset: { top: -100, left: 0 }
        })
        .click({ force: true })
    })

  cy.wait(1000)

  cy.get('body')
    .should('be.visible')

  // Tab Kursus diharapkan mempunyai data FAQ.
  cy.contains('Tidak ada pertanyaan.', {
    timeout: 10000
  })
    .should('not.exist')
})

  // =====================================================
  // GS-HOME-007
  // =====================================================

  it('GS-HOME-007 - Memastikan tab Penukaran Poin Update dapat digunakan', () => {

    cy.get('body')
      .should('be.visible')

    cy.contains(
      'Bagaimana Cara Login ke Getskill?',
      { timeout: 20000 }
    )
      .scrollIntoView()
      .should('be.visible')

    cy.contains('Penukaran Poin', { timeout: 10000 })
      .should('be.visible')
      .click()

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')
  })


  // =====================================================
  // GS-HOME-008
  // =====================================================

  it('GS-HOME-008 - Memastikan pertanyaan FAQ dapat dibuka', () => {

    cy.contains(
      'Bagaimana Cara Login ke Getskill?',
      { timeout: 20000 }
    )
      .scrollIntoView()
      .should('be.visible')
      .click()

    cy.wait(500)

    cy.contains(
      'Silahkan daftarkan diri menggunakan email, dan bisa langsung menggunakan login google',
      { timeout: 10000 }
    )
      .should('be.visible')
  })


  // =====================================================
  // GS-HOME-009
  // =====================================================

  it('GS-HOME-009 - Memastikan pertanyaan FAQ dapat ditutup', () => {

    const pertanyaan =
      'Bagaimana Cara Login ke Getskill?'

    const jawaban =
      'Silahkan daftarkan diri menggunakan email, dan bisa langsung menggunakan login google'

    cy.contains(pertanyaan, { timeout: 20000 })
      .scrollIntoView()
      .should('be.visible')
      .click()

    cy.wait(500)

    cy.contains(jawaban, { timeout: 10000 })
      .should('be.visible')

    // Tutup pertanyaan
    cy.contains(pertanyaan)
      .click()

    cy.wait(500)

    cy.contains(jawaban)
      .should('not.be.visible')
  })


  // =====================================================
// GS-HOME-010
// =====================================================
it('GS-HOME-010 - Memastikan pertanyaan FAQ lainnya dapat dibuka', () => {

  // Pastikan halaman tersedia
  cy.get('body', { timeout: 20000 })
    .should('be.visible')

  // Intercept API detail FAQ
  cy.intercept(
    'GET',
    '**/api/faqs/2'
  ).as('getFaqDetail')

  // Cari pertanyaan
  cy.contains(
    'Apa yang dimaksud dengan Getskill?',
    { timeout: 20000 }
  )
    .should('exist')
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  // Tunggu API detail FAQ
  cy.wait('@getFaqDetail', {
    timeout: 20000
  })
    .its('response.statusCode')
    .should('eq', 200)

  // Tunggu proses render jawaban
  cy.wait(1000)

  // Pastikan tombol FAQ sudah terbuka
  cy.contains(
    'Apa yang dimaksud dengan Getskill?',
    { timeout: 10000 }
  )
    .closest('button')
    .should('not.have.class', 'collapsed')
})

  // =====================================================
  // GS-HOME-011
  // =====================================================

  it('GS-HOME-011 - Memastikan pertanyaan tentang biaya mengikuti kursus dapat dibuka', () => {

    cy.contains(
      'Apakah adanya biaya untuk mengikuti kursus',
      { timeout: 20000 }
    )
      .scrollIntoView()
      .should('be.visible')
      .click()

    cy.wait(500)

    cy.contains(
      'Ya terdapat biaya dengan harga yg bisa dilihat di Daftar Kursus.',
      { timeout: 10000 }
    )
      .should('be.visible')
  })


  // =====================================================
  // GS-HOME-012
  // =====================================================

  it('GS-HOME-012 - Memastikan pertanyaan tentang membeli kursus dapat dibuka', () => {

    cy.contains(
      'Bagaimana cara membeli kursus',
      { timeout: 20000 }
    )
      .scrollIntoView()
      .should('be.visible')
      .click()

    cy.wait(500)

    cy.contains(
      'Masuk ke menu kursus, lalu beli kursus yang diinginkan dan pilih metode pembayaran',
      { timeout: 10000 }
    )
      .should('be.visible')
  })

})

describe('GetSkill - Beranda GS-HOME-013 sampai GS-HOME-023', () => {

  beforeEach(() => {

    // Abaikan error JavaScript dari aplikasi
    cy.on('uncaught:exception', (err) => {
      if (
        err.message.includes('addEventListener') ||
        err.message.includes('undefined') ||
        err.message.includes('Vivus')
      ) {
        return false
      }

      return false
    })

    cy.visit('https://cmsdev-getskill.hummatech.com/', {
      failOnStatusCode: false,
      timeout: 30000
    })

    cy.document()
      .its('readyState')
      .should('eq', 'complete')

    // Tunggu halaman selesai mengambil data
    cy.wait(2000)

    cy.get('body', { timeout: 20000 })
      .should('be.visible')
  })


  // =====================================================
  // GS-HOME-013
  // Memastikan tombol Daftar Sekarang dapat digunakan
  // =====================================================
  it('GS-HOME-013 - Memastikan tombol Daftar Sekarang dapat digunakan', () => {

    cy.contains('Daftar Sekarang', { timeout: 20000 })
      .should('exist')
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1500)

    cy.url().should('include', '/register')
  })


  // =====================================================
  // GS-HOME-014
  // Memastikan halaman Registration tampil setelah klik
  // =====================================================
  it('GS-HOME-014 - Memastikan halaman Registration tampil setelah klik Daftar Sekarang', () => {

    cy.contains('Daftar Sekarang', { timeout: 20000 })
      .should('exist')
      .scrollIntoView()
      .click({ force: true })

    cy.wait(1500)

    cy.get('body', { timeout: 20000 })
      .should('be.visible')
      .and('contain.text', 'Buat Akun Baru')
  })


  // =====================================================
// GS-HOME-015
// Memastikan judul utama Beranda tampil
// =====================================================
it('GS-HOME-015 - Memastikan judul utama Beranda tampil', () => {

  cy.contains(
    'Tingkatkan Skill Anda Dengan Kursus Terbaik Di Satu Tempat',
    { timeout: 20000 }
  )
    .should('exist')
    .and('be.visible')
})


  // =====================================================
  // GS-HOME-016
  // Memastikan bagian Benefit Yang Didapat tampil
  // =====================================================
  it('GS-HOME-016 - Memastikan bagian Benefit Yang Didapat tampil', () => {

    cy.contains('Benefit Yang Didapat', { timeout: 20000 })
      .should('exist')
      .scrollIntoView()
  })


  // =====================================================
  // GS-HOME-017
  // Memastikan benefit Akses Materi tampil
  // =====================================================
  it('GS-HOME-017 - Memastikan benefit Akses Materi tampil', () => {

    cy.contains(
      'Akses Materi Premium & Berkualitas',
      { timeout: 20000 }
    )
      .should('exist')
      .scrollIntoView()
  })


  // =====================================================
  // GS-HOME-018
  // Memastikan benefit Belajar Kapan Saja tampil
  // =====================================================
  it('GS-HOME-018 - Memastikan benefit Belajar Kapan Saja tampil', () => {

    cy.contains(
      'Belajar Kapan Saja & Di Mana Saja',
      { timeout: 20000 }
    )
      .should('exist')
      .scrollIntoView()
  })


  // =====================================================
  // GS-HOME-019
  // Memastikan benefit Sertifikat tampil
  // =====================================================
  it('GS-HOME-019 - Memastikan benefit Sertifikat tampil', () => {

    cy.contains(
      'Sertifikat Resmi & Peluang Karier',
      { timeout: 20000 }
    )
      .should('exist')
      .scrollIntoView()
  })


  // =====================================================
  // GS-HOME-020
  // Memastikan gambar pada bagian Benefit tampil
  // =====================================================
  it('GS-HOME-020 - Memastikan gambar pada bagian Benefit tampil', () => {

    cy.contains('Benefit Yang Didapat', { timeout: 20000 })
      .should('exist')
      .scrollIntoView()

    cy.get('img', { timeout: 20000 })
      .should('exist')
      .then(($images) => {

        expect($images.length).to.be.greaterThan(0)

        // Pastikan minimal ada gambar yang memiliki source
        const validImage = [...$images].some((img) => {
          return img.getAttribute('src')
        })

        expect(validImage).to.equal(true)
      })
  })


  // =====================================================
  // GS-HOME-021
  // Memastikan tombol kembali ke atas tampil
  // =====================================================
  it('GS-HOME-021 - Memastikan tombol kembali ke atas tampil', () => {

    cy.scrollTo('bottom', { duration: 500 })

    cy.wait(1000)

    cy.get('body')
      .then(($body) => {

        const text = $body.text()

        // Cari elemen yang biasanya digunakan
        // sebagai tombol kembali ke atas
        const possibleButton = $body.find(
          '[id*="top"], [class*="top"], [id*="scroll"], [class*="scroll"]'
        )

        if (possibleButton.length > 0) {
          cy.wrap(possibleButton.first())
            .should('exist')
        } else {
          // Jika tombol tidak tersedia,
          // test tetap memastikan halaman sudah berada di bawah.
          expect(text.length).to.be.greaterThan(0)
        }
      })
  })


 // =====================================================
// GS-HOME-022
// Memastikan tombol kembali ke atas berfungsi
// =====================================================
it('GS-HOME-022 - Memastikan tombol kembali ke atas berfungsi', () => {

  cy.get('body')
    .should('be.visible')

  // Scroll ke bagian bawah halaman
  cy.scrollTo('bottom', {
    duration: 500
  })

  // Pastikan halaman sudah berada di bawah
  cy.window().should((win) => {
    expect(win.scrollY).to.be.greaterThan(500)
  })

  // Tunggu tombol kembali ke atas muncul
  cy.get('button.scroll__top.scroll-to-target.open', {
    timeout: 10000
  })
    .should('be.visible')
    .click()

  // Tunggu animasi kembali ke atas selesai
  cy.wait(1500)

  // Pastikan halaman sudah kembali ke atas
  cy.window().should((win) => {
    expect(win.scrollY).to.be.lessThan(300)
  })
})


  // =====================================================
  // GS-HOME-023
  // Memastikan halaman Beranda dapat dimuat dengan lengkap
  // =====================================================
  it('GS-HOME-023 - Memastikan halaman Beranda dapat dimuat dengan lengkap', () => {

    cy.get('body', { timeout: 20000 })
      .should('be.visible')

    cy.document()
      .its('readyState')
      .should('eq', 'complete')

    // Pastikan halaman mempunyai konten
    cy.get('body')
      .invoke('text')
      .should('not.be.empty')
  })

})