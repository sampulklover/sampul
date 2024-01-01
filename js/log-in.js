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
    } else {
      console.log('Successful!', data);
    }
  });
