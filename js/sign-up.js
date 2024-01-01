async function handleSignInWithGoogle(response) {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.error('Error during Google login:', error.message);
  } else {
    console.log('Google login successful!', data);
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
      options: {
        data: {
          username: username,
          accept_tnc: accept_tnc == 'on' ? true : false,
          accept_marketing: accept_marketing == 'on' ? true : false,
        },
      },
    });

    if (error) {
      console.error('Error', error.message);
    } else {
      console.log('Successful!', data);
    }
  });
