const displayUsername = document.getElementById('username');

const username = document.getElementById('input-username');
const nric_name = document.getElementById('input-nric-name');
const nric_no = document.getElementById('input-nric-no');
const password = document.getElementById('input-password');
const email = document.getElementById('input-email');
const contact = document.getElementById('input-contact');
const dob = document.getElementById('input-dob');
const marital_status = document.getElementById('select-marital-status');
const address_1 = document.getElementById('input-address-1');
const address_2 = document.getElementById('input-address-2');
const city = document.getElementById('input-city');
const postcode = document.getElementById('input-postcode');
const country = document.getElementById('select-country');

async function fetchProfile() {
  const userId = await getUserUUID();

  if (userId) {
    const { data, error } = await supabaseClient
      .from(dbName.profiles)
      .select('*')
      .eq('uuid', userId);
    if (error) {
      console.error('Error', error.message);
    } else {
      displayUsername.innerText = data[0].username;
      username.value = data[0].username;
      email.value = data[0].email;
      nric_name.value = data[0].nric_name;
      nric_no.value = data[0].nric_no;
      dob.value = data[0].dob;
      marital_status.value = data[0].marital_status;
      address_1.value = data[0].address_1;
      address_2.value = data[0].address_2;
      city.value = data[0].city;
      postcode.value = data[0].postcode;
      country.value = data[0].country;
    }
  }
}

document
  .getElementById('updateProfileForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const userId = await getUserUUID();

    const { data, error } = await supabaseClient.from(dbName.profiles).upsert([
      {
        uuid: userId,
        username: username.value,
        nric_name: nric_name.value,
        nric_no: nric_no.value,
        dob: dob.value,
        marital_status: marital_status.value,
        address_1: address_1.value,
        address_2: address_2.value,
        city: city.value,
        postcode: postcode.value,
        country: country.value,
      },
    ]);

    if (error) {
      console.error('Error', error.message);
    } else {
      console.log('Successful!', data);
    }
  });

const fileName = 'avatar.png';
const defaultUserImg = 'https://iriedoc.wu.ac.th/support/img/user.png';

async function deleteImage() {
  const userId = await getUserUUID();
  const imagePath = userId + '/avatar/' + fileName;

  const { error: deleteError } = await supabaseClient.storage
    .from(bucketName)
    .remove(imagePath);

  if (deleteError) {
    console.error('Error deleting image:', deleteError.message);
    return false;
  }

  selectedImageElement.src = defaultUserImg;
  console.log('Image deleted successfully:', imagePath);
}

async function uploadImage() {
  const fileInput = document.getElementById('uploadInput');

  if (!fileInput.files.length) {
    alert('Please select a file before updating.');
    return;
  }

  const file = fileInput.files[0];
  const userId = await getUserUUID();

  if (file) {
    const imagePath = userId + '/avatar/' + fileName;

    // Check if there's an existing image
    const { data: existingImageData, error: existingImageError } =
      await supabaseClient.storage.from(bucketName).getPublicUrl(imagePath);

    if (existingImageError) {
      console.error(
        'Error checking existing image:',
        existingImageError.message
      );
      return;
    }

    // Delete existing image if it exists
    if (existingImageData) {
      const { error: deleteError } = await supabaseClient.storage
        .from(bucketName)
        .remove([imagePath]);

      if (deleteError) {
        console.error('Error deleting existing image:', deleteError.message);
        return;
      }
    }

    // Upload the new image
    const { data, error } = await supabaseClient.storage
      .from(bucketName)
      .upload(imagePath, file);

    if (error) {
      console.error('Error uploading image:', error.message);
    } else {
      console.log('Successful!', data);
    }
  }
}

const selectedImageElement = document.getElementById('selectedImage');

async function getImageUrl() {
  const userId = await getUserUUID();
  const { data } = await supabaseClient.storage
    .from(bucketName)
    .list(userId + '/' + 'avatar' + '/');

  var privateImgUrl = CDNURL + userId + '/' + 'avatar' + '/' + data[0].name;
  const timestamp = new Date().getTime();
  selectedImageElement.src = `${privateImgUrl}?${timestamp}`;
}

document
  .getElementById('selectedImage')
  .addEventListener('click', function (event) {
    document.getElementById('uploadInput').click();
  });

document
  .getElementById('uploadInput')
  .addEventListener('change', function (event) {
    if (event.target.files.length > 0) {
      let imageURL = URL.createObjectURL(event.target.files[0]);
      selectedImageElement.src = `${imageURL}`;
    }
  });

$(document).ready(function () {
  mapToSelect(maritalStatus(), 'select-marital-status');
  fetchProfile();
  getImageUrl();
});
