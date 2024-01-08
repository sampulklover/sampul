const profileElements = {
  username: document.getElementById('input-username'),
  nric_name: document.getElementById('input-nric-name'),
  nric_no: document.getElementById('input-nric-no'),
  dob: document.getElementById('input-dob'),
  email: document.getElementById('input-email'),
  phone_no: document.getElementById('input-phone-no'),
  religion: document.getElementById('select-religion'),
  marital_status: document.getElementById('select-marital-status'),
  address_1: document.getElementById('input-address-1'),
  address_2: document.getElementById('input-address-2'),
  city: document.getElementById('input-city'),
  postcode: document.getElementById('input-postcode'),
  country: document.getElementById('input-country'),
  image_path: document.getElementById('preview-image'),
};

function mapElements() {
  mapToSelect(religions(), `select-religion`);
  mapToSelect(maritalStatus(), `select-marital-status`);
}

document
  .getElementById('profile-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('save-profile-btn');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserUUID();

    const updateData = {};

    for (const key in profileElements) {
      if (key === 'image_path' && profileElements[key].tagName === 'IMG') {
      } else {
        updateData[key] = profileElements[key].value;
      }
    }

    const { data, error } = await supabaseClient
      .from(dbName.profiles)
      .update(updateData)
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
    const imageInput = document.getElementById('input-image');

    if (imageInput.files.length > 0) {
      if (returnData.image_path) {
        const { data, error } = await supabaseClient.storage
          .from(bucketName)
          .remove([returnData.image_path]);

        if (error) {
          showToast('alert-toast-container', error.message, 'danger');
          console.error('Error', error.message);
          fetchProfile();
          return;
        }
      }

      const file = imageInput.files[0];

      const imagePath = userId + `/avatar/` + file.name;

      const { data: uploadedImage, error } = await supabaseClient.storage
        .from(bucketName)
        .upload(imagePath, file);

      if (error) {
        console.error('Error', error.message);
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        showToast('alert-toast-container', error.message, 'danger');
      } else {
        const { data, error } = await supabaseClient
          .from(dbName.profiles)
          .update({
            image_path: uploadedImage.path,
          })
          .eq('uuid', userId)
          .eq('id', returnData.id);

        if (error) {
          console.error('Error', error.message);
          showToast('alert-toast-container', error.message, 'danger');
        }
      }
    }

    fetchProfile();
    showToast('alert-toast-container', 'Saved!', 'success');

    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
  });

const previewImage = document.getElementById('preview-image');

document
  .getElementById('preview-image')
  .addEventListener('click', function (event) {
    document.getElementById('input-image').click();
  });

document
  .getElementById('input-image')
  .addEventListener('change', function (event) {
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
      showToast('alert-toast-container', error.message, 'danger');
    } else {
      for (const key in data[0]) {
        if (profileElements[key]) {
          if (key === 'image_path' && profileElements[key].tagName === 'IMG') {
            var imagePath = `${CDNURL}${data[0][key]}`;
            profileElements[key].src = imagePath;
          } else {
            profileElements[key].value = data[0][key];
          }
        }
      }
    }
  }
}

$(document).ready(function () {
  mapElements();
  fetchProfile();
});
