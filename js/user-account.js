document.getElementById('add-sign-out-modal-container').innerHTML =
  signOutModalForm();

document.getElementById('edit-profile-modal-container').innerHTML =
  profileModalForm(profileTypeName.edit.key);

document.getElementById('add-beloved-modal-container').innerHTML =
  belovedModalForm(belovedTypeName.add.key);

document.getElementById('add-digital-assets-modal-container').innerHTML =
  digitalAssetsModalForm(digitalAssetsTypeName.add.key);

document
  .getElementById('open-sign-out-modal-btn')
  .addEventListener('click', function () {
    $('#sign-out-modal').modal('show');
  });

const displayElements = {
  username: document.getElementById('username'),
  count_digital: document.getElementById('count-digital-account'),
  count_subscription: document.getElementById('count-subscription-account'),
  last_updated: document.getElementById('last-updated-will'),
};

const inputElements = {
  edit_profile_modal: {
    username: document.getElementById('input-profile-edit-username'),
    nric_name: document.getElementById('input-profile-edit-nric-name'),
    nric_no: document.getElementById('input-profile-edit-nric-no'),
    phone_no: document.getElementById('input-profile-edit-contact'),
    dob: document.getElementById('input-profile-edit-dob'),
    marital_status: document.getElementById(
      'select-profile-edit-marital-status'
    ),
    address_1: document.getElementById('input-profile-edit-address-1'),
    address_2: document.getElementById('input-profile-edit-address-2'),
    city: document.getElementById('input-profile-edit-city'),
    postcode: document.getElementById('input-profile-edit-postcode'),
    country: document.getElementById('select-profile-edit-country'),
    image_path: document.getElementById('preview-profile-edit-image'),
  },
  add_beloved_modal: {
    nric_name: document.getElementById('input-beloved-add-nric-name'),
    nric_no: document.getElementById('input-beloved-add-nric-no'),
    nickname: document.getElementById('input-beloved-add-nickname'),
    phone_no: document.getElementById('input-beloved-add-phone-no'),
    email: document.getElementById('input-beloved-add-email'),
    relationship: document.getElementById('select-beloved-add-relationship'),
    type: document.getElementById('select-beloved-add-type'),
    level: document.getElementById('select-beloved-add-level'),
    image_path: document.getElementById('preview-beloved-add-image'),
  },
  add_digital_assets_modal: {
    username: document.getElementById('input-digital-assets-add-username'),
    email: document.getElementById('input-digital-assets-add-email'),
    service_platform: document.getElementById(
      'select-digital-assets-add-service-platform'
    ),
    account_type: document.getElementById('select-digital-assets-add-type'),
    frequency: document.getElementById('select-digital-assets-add-frequency'),
    declared_value_myr: document.getElementById(
      'select-digital-assets-add-declared-value'
    ),
    instructions_after_death: document.getElementById(
      'select-digital-assets-add-instructions-after-death'
    ),
    beloved_id: document.getElementById('select-digital-assets-add-beloved'),
    remarks: document.getElementById('input-digital-assets-add-remarks'),
  },
};

const imageElements = {
  edit_profile_modal: {
    preview: document.getElementById('preview-profile-edit-image'),
    edit: document.getElementById('input-profile-edit-image'),
  },
  add_beloved_modal: {
    preview: document.getElementById('preview-beloved-add-image'),
    edit: document.getElementById('input-beloved-add-image'),
  },
};

document
  .getElementById('open-edit-profile-btn')
  .addEventListener('click', function (event) {
    $('#edit-profile-modal').modal('show');
  });

document
  .getElementById('open-add-beloved-btn')
  .addEventListener('click', function (event) {
    $('#add-beloved-modal').modal('show');
    changeModalType('co_sampul', belovedTypeName.add.key);
  });

document
  .getElementById('open-add-digital-assets-btn')
  .addEventListener('click', function (event) {
    $('#add-digital-assets-modal').modal('show');
  });

document
  .getElementById('open-add-digital-assets-btn-2')
  .addEventListener('click', function (event) {
    $('#add-digital-assets-modal').modal('show');
    inputElements.add_digital_assets_modal.account_type =
      servicePlatformAccountTypes()[0].value;
  });

document
  .getElementById('open-add-digital-assets-btn-3')
  .addEventListener('click', function (event) {
    $('#add-digital-assets-modal').modal('show');
    inputElements.add_digital_assets_modal.account_type =
      servicePlatformAccountTypes()[1].value;
  });

function changeModalType(titleKey, type) {
  document.getElementById(`modal-beloved-${type}-title`).innerText =
    type_title[titleKey].title;
  document.getElementById(`modal-beloved-${type}-subtitle`).innerText =
    type_title[titleKey].subtitle;
}

document
  .getElementById('edit-profile-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-profile-edit-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserUUID();

    const updateData = {};

    for (const key in inputElements.edit_profile_modal) {
      if (key !== 'image_path') {
        updateData[key] = inputElements.edit_profile_modal[key].value;
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

    const directory = `/avatar/profile/`;
    const imageInput = imageElements.edit_profile_modal.edit;
    replaceAddImage(
      userId,
      data[0],
      directory,
      imageInput,
      useBtn,
      'replace',
      dbName.profiles
    );

    reinitiate();
    showToast('alert-toast-container', 'Successful!', 'success');
    $('#edit-profile-modal').modal('hide');

    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
  });

document
  .getElementById('add-beloved-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-beloved-add-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserUUID();

    const addData = {};

    for (const key in inputElements.add_beloved_modal) {
      if (key !== 'image_path') {
        addData[key] = inputElements.add_beloved_modal[key].value;
      }
    }

    const { data, error } = await supabaseClient
      .from(dbName.beloved)
      .insert({
        uuid: userId,
        ...addData,
      })
      .select();

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      return;
    }

    const directory = `/beloved/${data[0].id}/avatar/`;
    const imageInput = imageElements.add_beloved_modal.edit;
    replaceAddImage(
      userId,
      data[0],
      directory,
      imageInput,
      useBtn,
      'add',
      dbName.beloved
    );

    reinitiate();
    showToast('alert-toast-container', 'Successful!', 'success');
    $('#add-beloved-modal').modal('hide');

    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
  });

document
  .getElementById('add-digital-assets-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-digital-assets-add-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserUUID();

    const addData = {};

    for (const key in inputElements.add_digital_assets_modal) {
      if (key !== 'image_path') {
        addData[key] = inputElements.add_digital_assets_modal[key].value;
      }
    }

    const { data, error } = await supabaseClient
      .from(dbName.digital_assets)
      .insert({
        uuid: userId,
        ...addData,
      })
      .select();

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      return;
    }

    reinitiate();
    showToast('alert-toast-container', 'Successful!', 'success');
    $('#add-digital-assets-modal').modal('hide');

    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
  });

async function replaceAddImage(
  userId,
  returnData,
  directory,
  imageInput,
  useBtn,
  type,
  db
) {
  if (imageInput.files.length > 0) {
    if (returnData.image_path && type == 'replace') {
      const { data, error } = await supabaseClient.storage
        .from(bucketName)
        .remove([returnData.image_path]);

      if (error) {
        showToast('alert-toast-container', error.message, 'danger');
        console.error('Error', error.message);
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
      }
    }

    const file = imageInput.files[0];
    const imagePath = userId + directory + file.name;

    const { data: uploadedImage, error } = await supabaseClient.storage
      .from(bucketName)
      .upload(imagePath, file);

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
    } else {
      if (type == 'replace') {
        const { data, error } = await supabaseClient
          .from(db)
          .update({
            image_path: uploadedImage.path,
          })
          .eq('uuid', userId);

        if (error) {
          console.error('Error', error.message);
          showToast('alert-toast-container', error.message, 'danger');
        }
      } else {
        const { data, error } = await supabaseClient
          .from(db)
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
  }
}

function handleTableData(data) {
  populateToAllDigitalAssetsTable(data?.digital_account ?? [], 'digital');
  populateToAllDigitalAssetsTable(
    data?.subscription_account ?? [],
    'subscription'
  );
}

async function fetchProfile() {
  const userId = await getUserUUID();

  if (userId) {
    const { data: singleData, error } = await supabaseClient
      .from(dbName.profiles)
      .select(
        `*, ${dbName.beloved} ( * ), ${dbName.digital_assets} ( * ), ${dbName.wills} ( * )`
      )
      .eq('uuid', userId)
      .single();

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
      handleTableData([]);
    } else {
      mapValueElements(singleData, inputElements.edit_profile_modal);

      singleData.digital_account = [];
      singleData.subscription_account = [];

      singleData.digital_assets.forEach((item) => {
        if (item.account_type === 'digital_account') {
          singleData.digital_account.push(item);
        }
        if (item.account_type === 'subscription_account') {
          singleData.subscription_account.push(item);
        }
      });

      singleData.count_digital = singleData.digital_account.length;
      singleData.count_subscription = singleData.subscription_account.length;

      mapViewElements(singleData, displayElements);
      handleTableData(singleData);

      if (singleData.beloved.length === 0) {
        mapToSelect(addNew(), `select-digital-assets-add-beloved`);
        document
          .getElementById(`select-digital-assets-add-beloved`)
          .addEventListener('change', (event) => {
            const selectedValue = event.target.value;
            if (selectedValue === 'add_new') {
              location.href = pageName.beloved;
            }
          });
      } else {
        const modifiedData = singleData.beloved.map((item) => ({
          value: item.id,
          name: item.nric_name,
        }));
        mapToSelect(modifiedData, `select-digital-assets-add-beloved`);
      }
    }
  }
}

function populateToAllDigitalAssetsTable(tableData, key) {
  const tableColumns = [
    {
      title: '<small class="smpl_text-xs-medium">Subscriptions</small>',
      data: 'uui',
      render: function (data, type, row, meta) {
        let platform = servicePlatforms().find(
          (item) => item.value === row.service_platform
        );
        const platformName = platform?.name || '';
        const platformImg = platform?.img || '';

        return `<div class="custom-table-cell">
                  <img
                    loading="lazy"
                    src="${platformImg}"
                    alt=""
                    class="avatar-8"
                  />
                  <div>
                    <div class="smpl_text-sm-medium crop-text">${platformName}</div>
                    <div class="smpl_text-sm-regular crop-text">${row.email}</div>
                  </div>
              </div>
        `;
      },
    },
    {
      title: '<small class="smpl_text-xs-medium">Value</small>',
      data: 'uui',
      render: function (data, type, row, meta) {
        let declaredValue = declaredValues().find(
          (item) => item.value === row.declared_value_myr
        );
        const declaredValueName = declaredValue?.name || '';
        return `<div class="custom-table-cell">
                  <div class="text-sm-regular-8 crop-text">${declaredValueName}</div>
              </div>
        `;
      },
    },
    {
      title: '<small class="smpl_text-xs-medium">Instructions</small>',
      data: 'uui',
      render: function (data, type, row, meta) {
        let instructions = instructionsAfterDeath().find(
          (item) => item.value === row.instructions_after_death
        );
        const instructionsName = instructions?.name || '';
        return `<div class="custom-table-cell">
                  <div class="badge-instructions w-inline-block">
                    <div class="html-embed-9 w-embed" style="text-align:center">
                       <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_5391_410258)">
                            <path d="M5.24976 6.75009L10.4998 1.50009M5.31355 6.91412L6.62761 10.2931C6.74337 10.5908 6.80125 10.7396 6.88465 10.7831C6.95695 10.8208 7.04308 10.8208 7.11542 10.7832C7.19887 10.7399 7.25693 10.5911 7.37304 10.2936L10.6682 1.84969C10.773 1.5811 10.8254 1.4468 10.7968 1.36099C10.7719 1.28646 10.7134 1.22798 10.6389 1.20308C10.553 1.17441 10.4188 1.22682 10.1502 1.33164L1.70629 4.62681C1.40875 4.74292 1.25998 4.80098 1.21663 4.88443C1.17904 4.95677 1.1791 5.0429 1.21676 5.1152C1.26022 5.1986 1.40905 5.25648 1.70673 5.37224L5.08573 6.6863C5.14615 6.70979 5.17636 6.72154 5.20181 6.73969C5.22435 6.75577 5.24407 6.77549 5.26016 6.79804C5.2783 6.82348 5.29005 6.85369 5.31355 6.91412Z" stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_5391_410258">
                              <rect width="12" height="12" fill="white"></rect>
                            </clipPath>
                          </defs>
                         </svg>
                    </div>
                    <span class="text-xs-medium crop-text">${instructionsName}</span>
                  </div>
                </div>
        `;
      },
    },
  ];

  const tableName = `#all-${key}-account-table`;

  const tableLoader = document.getElementById(
    `all-${key}-account-table-loader`
  );

  const tableContainer = document.getElementById(
    `all-${key}-account-table-container`
  );

  const emptyContainer = document.getElementById(
    `empty-${key}-account-table-cotainer`
  );

  populateToTable(
    tableName,
    tableData,
    tableColumns,
    tableLoader,
    false,
    false,
    false
  );

  if (tableData.length == 0) {
    tableContainer.classList.add('hidden');
    emptyContainer.classList.remove('hidden');
  }
}

function reinitiate() {
  var table = $('#all-digital-account-table').DataTable();
  table.destroy();
  var table2 = $('#all-subscription-account-table').DataTable();
  table2.destroy();
  fetchProfile();
}

$(document).ready(function () {
  // profile
  mapToSelect(maritalStatus(), 'select-profile-edit-marital-status');
  mapToSelect(countries(), 'select-profile-edit-country');

  // beloved
  mapToSelect(relationships(), 'select-beloved-add-relationship');
  mapToSelect(beneficiaryTypes(), 'select-beloved-add-type');
  mapToSelect(belovedLevel(), 'select-beloved-add-level');
  mapImageElements(imageElements, imageElements);

  //digital assets
  mapToSelect(servicePlatforms(), 'select-digital-assets-add-service-platform');
  mapToSelect(servicePlatformAccountTypes(), 'select-digital-assets-add-type');
  mapToSelect(
    servicePlatformFrequencies(),
    'select-digital-assets-add-frequency'
  );
  mapToSelect(declaredValues(), 'select-digital-assets-add-declared-value');
  mapToSelect(
    instructionsAfterDeath(),
    'select-digital-assets-add-instructions-after-death'
  );

  fetchProfile();
});
