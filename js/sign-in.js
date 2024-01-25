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
  add_sign_in: {
    // username: document.getElementById('input-username'),
    email: document.getElementById('input-sign-in-email'),
    password: document.getElementById('input-sign-in-password'),
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
      console.error('Error', error.message);
      handleFormResult({ error, useBtn, defaultBtnText });
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
          access_type: 'offline',
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

$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var code = urlParams.get('refresh');
  if (code) {
    setUserData();
  }
});
