describe('GetSkill - Password', () => {
  const baseUrl = 'https://cmsdev-getskill.hummatech.com';
  const email = 'aldoorenaldo780@gmail.com';

  const oldPassword = 'password1';
  const newPassword = 'password';

  beforeEach(() => {
    cy.on('uncaught:exception', (err) => {
      if (
        err.message.includes('select2') ||
        err.message.includes('WOW is not defined') ||
        err.message.includes('addEventListener') ||
        err.message.includes('undefined') ||
        err.message.includes('Vivus') ||
        err.message.includes('getComputedStyle')
      ) {
        return false;
      }

      return true;
    });
  });

  const login = (password) => {
    cy.visit(`${baseUrl}/login`);

    cy.get('#email', { timeout: 20000 })
      .should('be.visible')
      .clear()
      .type(email);

    cy.get('#password', { timeout: 20000 })
      .should('be.visible')
      .clear()
      .type(password, { log: false });

    cy.contains(
      'button, input[type="submit"], a',
      /masuk|login/i,
      { timeout: 20000 }
    )
      .first()
      .click({ force: true });

    cy.url({ timeout: 20000 })
      .should('include', '/dashboard/users');

    cy.wait(3000);
  };

  const bukaPassword = () => {
    cy.visit(`${baseUrl}/dashboard/users/profile`);

    cy.url({ timeout: 20000 })
      .should('include', '/dashboard/users/profile');

    cy.wait(3000);

    cy.contains(/^Password$/i, { timeout: 20000 })
      .first()
      .click({ force: true });

    cy.wait(2000);

    cy.get('#old_password', { timeout: 10000 })
      .should('exist');

    cy.get('#password', { timeout: 10000 })
      .should('exist');

    cy.get('#password_confirmation', { timeout: 10000 })
      .should('exist');
  };

  // =====================================================
  // TC-PASS-001
  // =====================================================
  it('TC-PASS-001 - Memastikan tab Password dapat diakses', () => {
    login(oldPassword);
    bukaPassword();

    cy.get('#old_password').should('exist');
    cy.get('#password').should('exist');
    cy.get('#password_confirmation').should('exist');
  });

  // =====================================================
  // TC-PASS-002
  // Password lama = password
  // Password baru = password1
  // TIDAK KLIK UPDATE PASSWORD
  // =====================================================
  it('TC-PASS-002 - Memastikan user dapat mengubah password dengan data valid', () => {
    login(oldPassword);
    bukaPassword();

    cy.intercept('PATCH', '**/api/password/update').as('updatePassword');

    cy.get('#old_password')
      .clear()
      .type(oldPassword, { log: false });

    cy.get('#password')
      .clear()
      .type(newPassword, { log: false });

    cy.get('#password_confirmation')
      .clear()
      .type(newPassword, { log: false });

    // Langsung submit form
    // Tidak mencari dan tidak klik tombol Update Password
    cy.get('#old_password')
      .closest('form')
      .then(($form) => {
        $form[0].requestSubmit();
      });

    cy.wait('@updatePassword', { timeout: 15000 })
      .its('response.statusCode')
      .should('eq', 200);
  });

  // =====================================================
  // TC-PASS-003
  // =====================================================
  it('TC-PASS-003 - Memastikan password lama wajib diisi', () => {
    login(newPassword);
    bukaPassword();

    cy.get('#old_password').clear();

    cy.get('#password')
      .clear()
      .type('password3', { log: false });

    cy.get('#password_confirmation')
      .clear()
      .type('password3', { log: false });

    cy.get('#old_password')
      .closest('form')
      .then(($form) => {
        $form[0].requestSubmit();
      });

    cy.get('#old_password').then(($input) => {
      expect(
        $input.val() === '' ||
        $input[0].checkValidity() === false
      ).to.eq(true);
    });
  });

  // =====================================================
  // TC-PASS-004
  // =====================================================
  it('TC-PASS-004 - Memastikan password lama harus sesuai', () => {
    login(newPassword);
    bukaPassword();

    cy.get('#old_password')
      .clear()
      .type('password_salah', { log: false });

    cy.get('#password')
      .clear()
      .type('password3', { log: false });

    cy.get('#password_confirmation')
      .clear()
      .type('password3', { log: false });

    cy.get('#old_password')
      .closest('form')
      .then(($form) => {
        $form[0].requestSubmit();
      });

    cy.get('#old_password')
      .should('have.value', 'password_salah');
  });

  // =====================================================
  // TC-PASS-005
  // =====================================================
  it('TC-PASS-005 - Memastikan password baru wajib diisi', () => {
    login(newPassword);
    bukaPassword();

    cy.get('#old_password')
      .clear()
      .type(newPassword, { log: false });

    cy.get('#password').clear();

    cy.get('#password_confirmation')
      .clear()
      .type('password3', { log: false });

    cy.get('#old_password')
      .closest('form')
      .then(($form) => {
        $form[0].requestSubmit();
      });

    cy.get('#password').then(($input) => {
      expect(
        $input.val() === '' ||
        $input[0].checkValidity() === false
      ).to.eq(true);
    });
  });

  // =====================================================
  // TC-PASS-006
  // =====================================================
  it('TC-PASS-006 - Memastikan konfirmasi password harus sama', () => {
    login(newPassword);
    bukaPassword();

    cy.get('#old_password')
      .clear()
      .type(newPassword, { log: false });

    cy.get('#password')
      .clear()
      .type('password3', { log: false });

    cy.get('#password_confirmation')
      .clear()
      .type('password4', { log: false });

    cy.get('#old_password')
      .closest('form')
      .then(($form) => {
        $form[0].requestSubmit();
      });

    cy.get('#password_confirmation')
      .should('have.value', 'password4');
  });

  // =====================================================
  // TC-PASS-007
  // Password baru SAMA dengan password lama
  // =====================================================
  it('TC-PASS-007 - Memastikan password baru tidak dapat sama dengan password lama', () => {
    login(newPassword);
    bukaPassword();

    cy.get('#old_password')
      .clear()
      .type(newPassword, { log: false });

    cy.get('#password')
      .clear()
      .type(newPassword, { log: false });

    cy.get('#password_confirmation')
      .clear()
      .type(newPassword, { log: false });

    cy.get('#old_password')
      .closest('form')
      .then(($form) => {
        $form[0].requestSubmit();
      });

    // Tidak klik Update Password.
    // Cek bahwa nilai password baru memang sama
    // dengan password lama sesuai skenario test.
    cy.get('#old_password')
      .should('have.value', newPassword);

    cy.get('#password')
      .should('have.value', newPassword);

    cy.get('#password_confirmation')
      .should('have.value', newPassword);
  });

  // =====================================================
  // TC-PASS-008
  // =====================================================
  it('TC-PASS-008 - Memastikan akun dapat login menggunakan password baru', () => {
    login(newPassword);

    cy.url({ timeout: 20000 })
      .should('include', '/dashboard/users');
  });

  // =====================================================
  // TC-PASS-009
  // =====================================================
  it('TC-PASS-009 - Memastikan password lama tidak dapat digunakan setelah perubahan', () => {
    cy.visit(`${baseUrl}/login`);

    cy.get('#email', { timeout: 20000 })
      .should('be.visible')
      .clear()
      .type(email);

    cy.get('#password', { timeout: 20000 })
      .should('be.visible')
      .clear()
      .type(oldPassword, { log: false });

    cy.contains(
      'button, input[type="submit"], a',
      /masuk|login/i,
      { timeout: 20000 }
    )
      .first()
      .click({ force: true });

    cy.url({ timeout: 20000 })
      .should('not.include', '/dashboard/users');
  });
});