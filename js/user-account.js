document.getElementById('edit-profile-form-container').innerHTML =
  profileModalForm(typeName.edit.key);

document
  .getElementById('open-edit-profile-btn')
  .addEventListener('click', function (event) {
    $('#edit-profile-modal').modal('show');
  });

const displayElements = {
  username: document.getElementById('username'),
};

const editProfileElements = {
  username: document.getElementById('input-edit-username'),
  nric_name: document.getElementById('input-edit-nric-name'),
  nric_no: document.getElementById('input-edit-nric-no'),
  phone_no: document.getElementById('input-edit-contact'),
  dob: document.getElementById('input-edit-dob'),
  marital_status: document.getElementById('select-edit-marital-status'),
  address_1: document.getElementById('input-edit-address-1'),
  address_2: document.getElementById('input-edit-address-2'),
  city: document.getElementById('input-edit-city'),
  postcode: document.getElementById('input-edit-postcode'),
  country: document.getElementById('select-edit-country'),
  image_path: document.getElementById('preview-edit-image'),
};

document
  .getElementById('editProfileForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('edit-profile-btn');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserUUID();

    const updateData = {};

    for (const key in editProfileElements) {
      if (key !== 'image_path') {
        updateData[key] = editProfileElements[key].value;
      }
    }

    const { data, error } = await supabaseClient
      .from(dbName.profiles)
      .update({
        ...updateData,
      })
      .eq('uuid', userId)
      .select();

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      return;
    }

    returnData = data[0];

    const imageInput = document.getElementById('input-edit-image');
    if (imageInput.files.length > 0) {
      if (returnData.image_path) {
        const { data, error } = await supabaseClient.storage
          .from(bucketName)
          .remove([returnData.image_path]);

        if (error) {
          showToast('alert-toast-container', error.message, 'danger');
          console.error('Error', error.message);
          fetchProfile();
          useBtn.disabled = false;
          useBtn.innerHTML = defaultBtnText;
          return;
        }
      }

      const file = imageInput.files[0];
      const imagePath = userId + `/avatar/profile/` + file.name;

      const { data: uploadedImage, error } = await supabaseClient.storage
        .from(bucketName)
        .upload(imagePath, file);

      if (error) {
        console.error('Error', error.message);
        showToast('alert-toast-container', error.message, 'danger');
      } else {
        const { data, error } = await supabaseClient
          .from(dbName.profiles)
          .update({
            image_path: uploadedImage.path,
          })
          .eq('uuid', userId);

        if (error) {
          console.error('Error', error.message);
          showToast('alert-toast-container', error.message, 'danger');
        }
      }
    }

    fetchProfile();
    showToast('alert-toast-container', 'Successful!', 'success');

    $('#edit-profile-modal').modal('hide');

    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
  });

const previewImage = document.getElementById('preview-edit-image');
const inputImage = document.getElementById('input-edit-image');

previewImage.addEventListener('click', function (event) {
  inputImage.click();
});

inputImage.addEventListener('change', function (event) {
  if (event.target.files.length > 0) {
    let imageURL = URL.createObjectURL(event.target.files[0]);
    previewImage.src = `${imageURL}`;
  }
});

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
      valueElements(data[0], editProfileElements);
      viewElements(data[0], displayElements);
    }
  }
}

$(document).ready(function () {
  mapToSelect(maritalStatus(), 'select-edit-marital-status');
  mapToSelect(countries(), 'select-edit-country');
  fetchProfile();
});
