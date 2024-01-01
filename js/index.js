const { createClient } = supabase;
const dbName = {
  profiles: 'profiles',
};

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmemJsYWlhbmxkcmZ3ZHFkaWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwMDM5OTMsImV4cCI6MjAxOTU3OTk5M30.QOxPgVvOV0Efon8aleoAnlNKgkI2XwEPgIgz76_oIBU';
const supabaseUrl = 'https://rfzblaianldrfwdqdijl.supabase.co';
const supabaseClient = createClient(supabaseUrl, supabaseKey);

const todoList = document.getElementById('todoList');

async function fetchTodos() {
  const { data, error } = await supabaseClient
    .from(dbName.profiles)
    .select('*');

  if (error) {
    console.error('Error fetching todos:', error.message);
    return;
  }

  todoList.innerHTML = '';
  data.forEach((todo) => {
    const li = document.createElement('li');
    li.textContent = todo.first_name;
    todoList.appendChild(li);
  });
}

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

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Error', error.message);
    } else {
      console.log('Successful!', data);
    }
  });

var myUserId = null;

document
  .getElementById('signinForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Error', error.message);
    } else {
      console.log('Successful!', data);
      myUserId = data.user.id;
    }
  });

document
  .getElementById('forgotPasswordForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const forgotEmail = document.getElementById('forgotEmail').value;

    const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
      forgotEmail
    );

    if (error) {
      console.error('Error', error.message);
    } else {
      console.log('Successful!', data);
    }
  });

document
  .getElementById('updatePasswordForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const newPassword = document.getElementById('newPassword').value;

    const { data, error } = await supabaseClient.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error('Error', error.message);
    } else {
      console.log('Successful!', data);
    }
  });

async function getUserDetails() {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabaseClient.auth.getUser();

    if (error) {
      console.error('Error', error.message);
      reject(error);
    } else {
      resolve(data.user);
    }
  });
}

function getUserUUID() {
  if (myUserId) {
    return myUserId;
  } else {
    getUserDetails()
      .then((userDetails) => {
        myUserId = userDetails.id;
        console.log('retrieved id', myUserId);
        alert('Something went wrong, please try again.');
      })
      .catch((error) => {
        alert('User not authenticated. Please login.');
      });
  }
}

document
  .getElementById('updateUserDetailsForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    const { data, error } = await supabaseClient
      .from(dbName.profiles) // Replace 'your_table_name' with your actual table name
      .upsert([
        {
          id: getUserUUID(),
          first_name: firstName,
          last_name: lastName,
        },
      ]);

    if (error) {
      console.error('Error', error.message);
    } else {
      console.log('Successful!', data);
    }
  });

async function signOut() {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    console.error('Error', error.message);
  } else {
    console.log('Successful!');
  }
}

async function getUserEmail() {
  const { data, error } = await supabaseClient.auth.getUser();

  if (error) {
    console.error('Error', error.message);
  } else {
    myUserId = data.user.id;
    const userEmail = data.user.email;
    const emailHeading = document.getElementById('userEmail');
    emailHeading.textContent = `, ${userEmail}`;
  }
}

getUserEmail();
document.addEventListener('DOMContentLoaded', function () {
  fetchTodos();
});
