const username = document.getElementById('username');

async function fetchProfile() {
  const userId = await getUserUUID();
  if (userId) {
    const { data, error } = await supabaseClient
      .from(dbName.profiles)
      .select('*')
      .eq('id', userId);
    if (error) {
      console.error('Error', error.message);
    } else {
      username.innerText = data[0].first_name;
      console.log('Successful!', data);
    }
  }
}

fetchProfile();
