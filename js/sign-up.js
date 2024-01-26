const formConfigs = [
  {
    containerId: 'nav-bar-container',
    formFunction: navBar(),
  },
  {
    containerId: 'footer-container',
    formFunction: footer(),
  },
];

formConfigs.forEach((item) => {
  document.getElementById(item.containerId).innerHTML = item.formFunction;
});

newsletterFormAddAPI();

const inputElements = {
  add_sign_up: {
    email: document.getElementById('input-sign-up-email'),
    password: document.getElementById('input-sign-up-password'),
  },
};

document
  .getElementById('add-sign-up-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-sign-up-add-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const addData = processForm(inputElements.add_sign_up, false);

    const { data, error } = await supabaseClient.auth.signUp({
      ...addData,
      options: {
        emailRedirectTo: redirectUrl.googleRedirectUrl,
        data: {
          name: document.getElementById('input-username').value,
        },
      },
    });

    if (error) {
      console.error('Error', error.message);
      handleFormResult({ error, useBtn, defaultBtnText });
      return;
    }

    if (
      data.user &&
      data.user.identities &&
      data.user.identities.length === 0
    ) {
      authError = {
        name: 'AuthApiError',
        message: 'User already exists',
      };

      console.error('Error', authError.message);
      handleFormResult({ error: authError, useBtn, defaultBtnText });
      return;
    }

    processForm(inputElements.add_sign_up, true);
    document.getElementById('input-username').value = '';
    handleFormResult({
      error,
      useBtn,
      defaultBtnText,
      successText:
        'Registration successfully submitted. Please check your email for confirmation.',
    });
  });

document
  .getElementById('btn-sign-up-google')
  .addEventListener('click', async function (event) {
    let useBtn = document.getElementById('btn-sign-up-google');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          // access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: redirectUrl.googleRedirectUrl,
      },
    });

    if (error) {
      console.error('Error', error.message);
      handleFormResult({ error, useBtn, defaultBtnText });
      return;
    }
  });
