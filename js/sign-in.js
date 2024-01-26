const formConfigs = [
  {
    containerId: 'nav-bar-container',
    formFunction: navBar(),
  },
  {
    containerId: 'footer-container',
    formFunction: footer(),
  },
  {
    containerId: 'reverify-email-container',
    formFunction: reverifyEmailModalForm(),
  },
  {
    containerId: 'forgot-password-container',
    formFunction: forgotPasswordModalForm(),
  },
];

formConfigs.forEach((item) => {
  document.getElementById(item.containerId).innerHTML = item.formFunction;
});

newsletterFormAddAPI();

const buttonConfigs = [
  {
    buttonId: 'btn-forgot-password',
    action: () => {
      $('#forgot-password-modal').modal('show');
    },
  },
];

buttonConfigs.forEach((btnConfig) => {
  document
    .getElementById(btnConfig.buttonId)
    .addEventListener('click', function () {
      btnConfig.action();
    });
});

const inputElements = {
  add_sign_in: {
    email: document.getElementById('input-sign-in-email'),
    password: document.getElementById('input-sign-in-password'),
  },
  add_reverify_email: {
    email: document.getElementById('input-reverify-email'),
  },
  add_forgot_password: {
    email: document.getElementById('input-forgot-password-email'),
  },
};

async function handleSignInWithGoogle(response) {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.error('Error during Google login:', error.message);
    showToast('alert-toast-container', error.message, 'danger');
  } else {
    console.log('Google login successful!', data);
    showToast('alert-toast-container', 'Success!', 'success');
    // Redirect or perform other actions after successful login
  }
}

async function loginSuccess() {
  const userId = await getUserSession();

  if (userId) {
    const { data, error } = await supabaseClient
      .from(dbName.profiles)
      .select(
        `*,
          ${dbName.roles}(*),
          ${dbName.accounts}(*)`
      )
      .eq('uuid', userId)
      .single();

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
    } else {
      const { data: productData, error } = await supabaseClient
        .from(dbName.products)
        .select(`*`)
        .single()
        .eq('uid', data.accounts.product_uid);

      const masterData = { ...data, products: productData };
      saveData('masterData', masterData);
      location.href = pageName.user_account;
    }

    return;
  }
}

async function setUserData() {
  const userId = await getUserSession();
  if (userId) {
    const { data, error: error } = await supabaseClient
      .from(dbName.profiles)
      .select(
        `*,
            ${dbName.roles}(*),
            ${dbName.accounts}(*)`
      )
      .eq('uuid', userId)
      .single();

    if (error) {
      console.error('Error', error.message);
      return;
    }

    const { data: productData, error: error2 } = await supabaseClient
      .from(dbName.products)
      .select(`*`)
      .single()
      .eq('uid', data.accounts.product_uid);

    if (error2) {
      console.error('Error', error2.message);
      return;
    }

    const masterData = { ...data, products: productData };
    saveData('masterData', masterData);
    location.href = pageName.user_account;
  } else {
    handleFormResult({ error: { message: '' } });
  }
}

async function openResendVerificationModal() {
  inputElements.add_reverify_email.email.value =
    inputElements.add_sign_in.email.value;
  $('#reverify-email-modal').modal('show');
}

document
  .getElementById('add-reverify-email-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-reverify-add-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const { data, error } = await supabaseClient.auth.resend({
      type: 'signup',
      email: inputElements.add_reverify_email.email.value,
      options: {
        emailRedirectTo: redirectUrl.googleRedirectUrl,
      },
    });

    if (error) {
      console.error('Error', error.message);
      handleFormResult({ error });
      return;
    }

    $('#reverify-email-modal').modal('hide');
    handleFormResult({
      error,
      useBtn,
      defaultBtnText,
      successText: 'Confirmation email has been sent, please check your inbox.',
    });
  });

document
  .getElementById('add-forgot-password-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-forgot-password-add-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
      inputElements.add_forgot_password.email.value,
      {
        redirectTo: redirectUrl.updatePasswordRedirectUrl,
      }
    );

    if (error) {
      console.error('Error', error.message);
      handleFormResult({ error });
      return;
    }

    $('#forgot-password-modal').modal('hide');
    handleFormResult({
      error,
      useBtn,
      defaultBtnText,
      successText:
        'Password recovery email has been sent, please check your inbox.',
    });
  });

document
  .getElementById('add-sign-in-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-sign-in-add-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const addData = processForm(inputElements.add_sign_in, false);

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      ...addData,
    });

    if (error) {
      if (error.message === 'Email not confirmed') {
        let errorMessage = `Email not yet confirmed. Check your inbox for the confirmation link or <b onClick="openResendVerificationModal()" style=" text-decoration: underline; cursor: pointer;">click here to resend verification</b>.`;

        handleFormResult({
          error,
          useBtn,
          defaultBtnText,
          failedText: errorMessage,
        });
      } else {
        handleFormResult({ error, useBtn, defaultBtnText });
      }
      return;
    }

    setUserData();
    processForm(inputElements.add_sign_in, true);
    handleFormResult({
      error,
      useBtn,
      defaultBtnText,
    });
  });

document
  .getElementById('btn-sign-in-google')
  .addEventListener('click', async function (event) {
    let useBtn = document.getElementById('btn-sign-in-google');
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
      handleFormResult({ error, useBtn, defaultBtnText });
      return;
    }
  });

$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var code = urlParams.get('refresh');
  if (code) {
    setUserData();
  }
});
