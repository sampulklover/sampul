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

document
  .getElementById('signinForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('wf-log-in-email').value;
    const password = document.getElementById('wf-log-in-password').value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
    } else {
      loginSuccess();
    }
  });
