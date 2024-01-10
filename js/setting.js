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

const passwordElements = {
  new_password: document.getElementById('input-new-password'),
  confirm_new_password: document.getElementById('input-confirm-new-password'),
};

const informDeathElements = {
  nric_name: document.getElementById('input-inform-death-nric-name'),
  nric_no: document.getElementById('input-inform-death-nric-no'),
  certification: document.getElementById('input-inform-death-certification'),
  phone_no: document.getElementById('input-inform-death-phone-no'),
  email: document.getElementById('input-inform-death-email'),
  address_1: document.getElementById('input-inform-death-address-1'),
  address_2: document.getElementById('input-inform-death-address-2'),
  city: document.getElementById('input-inform-death-city'),
  postcode: document.getElementById('input-inform-death-postcode'),
  country: document.getElementById('input-inform-death-country'),
  image_path: document.getElementById('preview-inform-death-image'),
};

document
  .getElementById('cancel-profile-btn')
  .addEventListener('click', function (event) {
    if (
      confirm(
        `Are you sure you want to cancel? your changes will be discarded.`
      )
    ) {
      let useBtn = document.getElementById('cancel-profile-btn');
      let defaultBtnText = useBtn.innerHTML;
      useBtn.disabled = true;
      useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);
      const imageInput = document.getElementById('input-image');
      imageInput.value = '';
      fetchProfile();
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    }
  });

document
  .getElementById('cancel-password-btn')
  .addEventListener('click', function (event) {
    if (
      confirm(
        `Are you sure you want to cancel? your changes will be discarded.`
      )
    ) {
      let useBtn = document.getElementById('cancel-password-btn');
      let defaultBtnText = useBtn.innerHTML;
      useBtn.disabled = true;
      useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);
      for (const key in passwordElements) {
        passwordElements[key].value = '';
      }
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    }
  });

document
  .getElementById('cancel-inform-death-btn')
  .addEventListener('click', function (event) {
    if (
      confirm(
        `Are you sure you want to cancel? your changes will be discarded.`
      )
    ) {
      let useBtn = document.getElementById('cancel-inform-death-btn');
      let defaultBtnText = useBtn.innerHTML;
      useBtn.disabled = true;
      useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);
      const imageInput = document.getElementById('input-inform-death-image');
      imageInput.value = '';
      fetchInformDeath();
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    }
  });

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
          .eq('uuid', userId);

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

const previewInformDeathImage = document.getElementById(
  'preview-inform-death-image'
);

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
}

function updateImageInput(file) {
  const imageInput = document.getElementById('input-inform-death-image');
  const newFile = new File([file], file.name, {
    type: file.type,
    lastModified: file.lastModified,
  });
  const fileList = new DataTransfer();
  fileList.items.add(newFile);
  imageInput.files = fileList.files;
}

function handleDrop(event) {
  event.preventDefault();
  if (event.dataTransfer.files.length > 0) {
    let imageURL = URL.createObjectURL(event.dataTransfer.files[0]);
    previewInformDeathImage.src = imageURL;
    let files = event.dataTransfer.files;
    updateImageInput(files[0]);
  }
}

document
  .getElementById('input-inform-death-image')
  .addEventListener('change', function (event) {
    if (event.target.files.length > 0) {
      let imageURL = URL.createObjectURL(event.target.files[0]);
      previewInformDeathImage.src = imageURL;
      let files = event.target.files;
      updateImageInput(files[0]);
    }
  });

document
  .getElementById('dropArea-selfie-container')
  .addEventListener('click', function () {
    document.getElementById('input-inform-death-image').click();
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

document
  .getElementById('password-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('save-password-btn');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    function arePasswordsEqual() {
      const newPassword = passwordElements.new_password.value;
      const confirmNewPassword = passwordElements.confirm_new_password.value;
      return newPassword === confirmNewPassword;
    }

    if (arePasswordsEqual()) {
      const updateData = {};

      for (const key in passwordElements) {
        updateData[key] = passwordElements[key].value;
      }

      const { data, error } = await supabaseClient.auth.updateUser({
        password: updateData.new_password,
      });

      if (error) {
        console.error('Error', error.message);
        showToast('alert-toast-container', error.message, 'danger');
      } else {
        showToast('alert-toast-container', 'Updated!', 'success');
      }
    } else {
      showToast('alert-toast-container', 'Password do not match', 'danger');
    }

    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
  });

document
  .getElementById('inform-death-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('save-inform-death-btn');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserUUID();

    const updateData = {};

    for (const key in informDeathElements) {
      if (key === 'image_path' && informDeathElements[key].tagName === 'IMG') {
      } else {
        updateData[key] = informDeathElements[key].value;
      }
    }

    const { data, error } = await supabaseClient
      .from(dbName.inform_death)
      .upsert([
        {
          uuid: userId, //primary key
          ...updateData,
        },
      ])
      .select();

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      return;
    }

    returnData = data[0];
    const imageInput = document.getElementById('input-inform-death-image');

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

      const imagePath = userId + `/avatar/inform_death/` + file.name;

      const { data: uploadedImage, error } = await supabaseClient.storage
        .from(bucketName)
        .upload(imagePath, file);

      if (error) {
        console.error('Error', error.message);
        showToast('alert-toast-container', error.message, 'danger');
      } else {
        const { data, error } = await supabaseClient
          .from(dbName.inform_death)
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
    showToast('alert-toast-container', 'Saved!', 'success');

    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
  });

async function fetchInformDeath() {
  const userId = await getUserUUID();

  if (userId) {
    const { data, error } = await supabaseClient
      .from(dbName.inform_death)
      .select('*')
      .eq('uuid', userId);

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
    } else {
      for (const key in data[0]) {
        if (informDeathElements[key]) {
          if (
            key === 'image_path' &&
            informDeathElements[key].tagName === 'IMG'
          ) {
            var imagePath = `${CDNURL}${data[0][key]}`;
            informDeathElements[key].src = imagePath;
          } else {
            informDeathElements[key].value = data[0][key];
          }
        }
      }
    }
  }
}

$(document).ready(function () {
  mapElements();
  fetchProfile();
  fetchInformDeath();
});
