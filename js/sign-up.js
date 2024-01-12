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

document
  .getElementById('signupForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('wf-sign-up-email').value;
    const username = document.getElementById('wf-sign-up-name').value;
    const password = document.getElementById('wf-sign-up-password').value;
    const accept_tnc = document.getElementById(
      'wf-sign-up-accept-privacy'
    ).value;
    const accept_marketing = document.getElementById(
      'wf-sign-up-accept-communications'
    ).value;

    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
    } else {
      showToast('alert-toast-container', 'Success!', 'success');
    }
  });
