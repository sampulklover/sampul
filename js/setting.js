document.getElementById('add-sign-out-modal-container').innerHTML =
  signOutModalForm();

document
  .getElementById('open-sign-out-modal-btn')
  .addEventListener('click', function () {
    $('#sign-out-modal').modal('show');
  });

const displayElementsSidebar = {
  image_path: document.getElementById('sidebar-profile-image'),
  username: document.getElementById('sidebar-profile-username'),
};

const inputElements = {
  profileForms: {
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
  },
  passwordForms: {
    new_password: document.getElementById('input-new-password'),
    confirm_new_password: document.getElementById('input-confirm-new-password'),
  },
  informDeathForms: {
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
  },
  planForm: {
    package: document.getElementById('select-plan-package'),
    order_id: document.getElementById('input-plan-order-id'),
    nric_name: document.getElementById('input-plan-nric-name'),
    email: document.getElementById('input-plan-email'),
    phone_no: document.getElementById('input-plan-phone-no'),
  },
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
      for (const key in inputElements.passwordForms) {
        inputElements.passwordForms[key].value = '';
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

    const userId = await getUserSession();

    const updateData = {};

    for (const key in inputElements.profileForms) {
      if (key !== 'image_path') {
        updateData[key] = inputElements.profileForms[key].value;
      }
    }

    const { data: returnData, error } = await supabaseClient
      .from(dbName.profiles)
      .update(updateData)
      .eq('uuid', userId)
      .select()
      .single();

    if (error) {
      console.error('Error', error.message);
      handleFormResult({ error, useBtn, defaultBtnText });
      return;
    }

    const directory = `/avatar/profile/`;
    const imageInput = document.getElementById('input-image');

    await replaceOrAddImage({
      userId,
      returnData,
      directory,
      imageInput,
      useBtn,
      defaultBtnText,
      dataBase: dbName.profiles,
      isUpdateByReturnId: false,
    });

    fetchProfile();
    handleFormResult({ error, useBtn, defaultBtnText });
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
  const userId = await getUserSession();

  if (userId) {
    const { data, error } = await supabaseClient
      .from(dbName.profiles)
      .select('*')
      .eq('uuid', userId)
      .single();

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
    } else {
      for (const key in data) {
        if (inputElements.profileForms[key]) {
          if (
            key === 'image_path' &&
            inputElements.profileForms[key].tagName === 'IMG'
          ) {
            var imagePath = `${CDNURL}${data[key]}`;
            inputElements.profileForms[key].src = imagePath;
          } else {
            inputElements.profileForms[key].value = data[key];
          }
        }
      }

      var myData = getSavedData('masterData');
      if (myData) {
        saveData('masterData', {
          ...myData,
          username: data.username,
          image_path: data.image_path,
        });
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
      const newPassword = inputElements.passwordForms.new_password.value;
      const confirmNewPassword =
        inputElements.passwordForms.confirm_new_password.value;
      return newPassword === confirmNewPassword;
    }

    if (arePasswordsEqual()) {
      const updateData = {};

      for (const key in inputElements.passwordForms) {
        updateData[key] = inputElements.passwordForms[key].value;
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

    const useBtn = document.getElementById('save-inform-death-btn');
    const defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserSession();
    const updateData = {};

    for (const key in inputElements.informDeathForms) {
      if (
        key !== 'image_path' ||
        inputElements.informDeathForms[key].tagName !== 'IMG'
      ) {
        updateData[key] = inputElements.informDeathForms[key].value;
      }
    }

    const { data: checkExist, error: errorCheckExist } = await supabaseClient
      .from(dbName.inform_death)
      .select('*')
      .eq('uuid', userId)
      .single();

    submitInformDeathForm({
      operation: checkExist ? 'update' : 'insert',
      userId,
      updateData,
      useBtn,
      defaultBtnText,
    });
  });

async function submitInformDeathForm(options) {
  const { operation, userId, updateData, useBtn, defaultBtnText } = options;

  let query = supabaseClient.from(dbName.inform_death);

  switch (operation) {
    case 'update':
      query = query.update(updateData).eq('uuid', userId).select().single();
      break;
    case 'insert':
      query = query
        .upsert({ uuid: userId, ...updateData })
        .select()
        .single();
      break;
    default:
      throw new Error('Invalid operation');
  }

  const { data: returnData, error } = await query;

  if (error) {
    handleFormResult({ error, useBtn, defaultBtnText });
    return;
  }

  const directory = `/avatar/inform_death/`;
  const imageInput = document.getElementById('input-inform-death-image');

  await replaceOrAddImage({
    userId,
    returnData,
    directory,
    imageInput,
    useBtn,
    defaultBtnText,
    dataBase: dbName.inform_death,
    isUpdateByReturnId: false,
  });
}

async function fetchInformDeath() {
  const userId = await getUserSession();

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
        if (inputElements.informDeathForms[key]) {
          if (
            key === 'image_path' &&
            inputElements.informDeathForms[key].tagName === 'IMG'
          ) {
            var imagePath = `${CDNURL}${data[0][key]}`;
            inputElements.informDeathForms[key].src = imagePath;
          } else {
            inputElements.informDeathForms[key].value = data[0][key];
          }
        }
      }
    }
  }
}

document
  .getElementById('plan-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('save-plan-btn');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    console.log(`${senangPay.recurringAPi}${senangPay.merchantId}`);
    const userId = await getUserSession();
    const addData = {
      recurring_id: '170652994334',
      order_id: '667788',
      name: 'Hafiz',
      email: 'clickerhizers@gmail.com',
      phone: '017423212',
      hash: '9811cd47a2b23902090b0ec8bc5ccdb7837eb6105317bc0227b0057c39e4811c',
    };

    // Define options for the fetch request
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addData),
    };

    // Make the fetch request
    fetch('https://x8ki-letl-twmt.n7.xano.io/api:mHY0z6q4/test', options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const newWindow = window.open();
        newWindow.document.write(data.response.result);
      })
      .catch((error) => {
        console.error('There was a problem with the request:', error);
      });

    // const { data, error } = await supabaseClient
    //   .from(dbName.payment_session)
    //   .insert({
    //     uuid: userId,
    //     ...addData,
    //   });

    // console.log('data', data);

    // if (error) {
    //   console.error('Error', error.message);
    //   handleFormResult({ error, useBtn, defaultBtnText });
    //   return;
    // }

    // handleFormResult({ error, useBtn, defaultBtnText });

    // const addData = processForm(inputElements.planForm, false);
    // const hashedString = sha256(
    //   senangPay.secretKey +
    //     decodeURIComponent(
    //       document.getElementById('select-plan-package').value
    //     ) +
    //     decodeURIComponent(document.getElementById('input-plan-order-id').value)
    // );
    // console.log('hashedString', hashedString);

    // console.log(`${senangPay.recurringAPi}${senangPay.merchantId}`);
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ hash: hashedString, ...addData }),
    // };

    // fetch(`${senangPay.recurringAPi}${senangPay.merchantId}`, options)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log('Response from server:', data);
    //   })
    //   .catch((error) => {
    //     console.error('Error submitting data:', error);
    // });

    // const { data: returnData, error } = await supabaseClient
    //   .from(dbName.press_blog_posts)
    //   .insert({
    //     uuid: userId,
    //     uid: generateRandomId(),
    //     ...addData,
    //   })
    //   .select()
    //   .single();

    // if (error) {
    //   console.error('Error', error.message);
    //   handleFormResult({ error, useBtn, defaultBtnText });
    //   return;
    // }

    // handleFormResult({ error, useBtn, defaultBtnText });
  });

var currentPlanUid = null;

function populateBilling(allData = []) {
  const listLoader = document.getElementById('billing-list-loader');
  const listEmpty = document.getElementById('billing-list-empty');
  const listContainer = document.getElementById('billing-list-container');
  const listBody = document.getElementById('billing-list-body');

  var records = [];

  allData.forEach((item) => {
    const card = listBody.cloneNode(true);
    const divs = card.getElementsByTagName('div');
    const title = divs[0].getElementsByTagName('span');

    title[0].innerHTML = item.title;
    title[1].innerHTML = `RM ${item.price_myr}`;
    title[2].innerHTML = item.duration;
    title[3].innerHTML = item.description;

    if (currentPlanUid === item.uid) {
      card.style.border = '1px solid blue';
      card.setAttribute('data-selected', 'true');
    }

    divs[0].addEventListener('click', function () {
      const prevSelectedCard = listContainer.querySelector(
        '[data-selected="true"]'
      );
      if (prevSelectedCard) {
        prevSelectedCard.style.border = '';
        prevSelectedCard.removeAttribute('data-selected');
      }

      card.style.border = '1px solid blue';
      card.setAttribute('data-selected', 'true');

      currentPlanUid = item.uid;
    });

    records.push(card);
  });

  listLoader.classList.add('hidden');

  if (records.length === 0) {
    listEmpty.classList.remove('hidden');
    listContainer.classList.add('hidden');
  } else {
    listEmpty.classList.add('hidden');
    listContainer.classList.remove('hidden');

    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }
    records.forEach((item) => {
      listContainer.appendChild(item);
    });
  }
}

async function fetchBilling(accountData) {
  const userId = await getUserSession();

  if (userId) {
    const { data, error } = await supabaseClient
      .from(dbName.products)
      .select('*');

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
    } else {
      populateBilling(data, accountData);
    }
  }
}

function populateToAllBillingHistoryTable(tableData) {
  const tableColumns = [
    {
      title: '<small class="smpl_text-xs-medium">Invoice</small>',
      data: 'id',
      render: function (data, type, row, meta) {
        return `<div class="custom-table-cell">
                  <div class="text-sm-regular-8">${data}</div>
              </div>
        `;
      },
    },
    {
      title: '<small class="smpl_text-xs-medium">Amount</small>',
      data: 'id',
      render: function (data, type, row, meta) {
        return `<div class="custom-table-cell">
                  <div class="text-sm-regular-8">${data}</div>
              </div>
        `;
      },
    },
    {
      title: '<small class="smpl_text-xs-medium">Date</small>',
      data: 'id',
      render: function (data, type, row, meta) {
        return `<div class="custom-table-cell">
                  <div class="text-sm-regular-8">${data}</div>
              </div>
        `;
      },
    },
    {
      title: '<small class="smpl_text-xs-medium">Status</small>',
      data: 'id',
      render: function (data, type, row, meta) {
        return `<div class="custom-table-cell">
                  <div class="text-sm-regular-8">${data}</div>
              </div>
        `;
      },
    },
  ];

  const tableLoader = document.getElementById(
    'all-billing-history-table-loader'
  );
  populateToTable(
    '#all-billing-history-table',
    tableData,
    tableColumns,
    tableLoader
  );
}

$(document).ready(function () {
  roleUIbased('global');
  mapElements();
  fetchProfile();
  fetchInformDeath();

  var saveData = getSavedData('masterData');
  if (saveData) {
    mapViewElements(saveData, displayElementsSidebar);
    currentPlanUid = saveData?.accounts?.product_uid;
    fetchBilling();
    populateToAllBillingHistoryTable();
  }
});
