document.getElementById('add-sign-out-modal-container').innerHTML =
  signOutModalForm();

document.getElementById('add-digital-assets-form-container').innerHTML =
  digitalAssetsModalForm(digitalAssetsTypeName.add.key);

document.getElementById('edit-digital-assets-form-container').innerHTML =
  digitalAssetsModalForm(digitalAssetsTypeName.edit.key);

document
  .getElementById('open-sign-out-modal-btn')
  .addEventListener('click', function () {
    $('#sign-out-modal').modal('show');
  });

document
  .getElementById('new-digital-assets-btn')
  .addEventListener('click', function () {
    $('#add-digital-assets-modal').modal('show');
    document
      .getElementById('add-success-body-container')
      .classList.add('hidden');
    document
      .getElementById('add-form-body-container')
      .classList.remove('hidden');
  });

const displayElementsSidebar = {
  image_path: document.getElementById('sidebar-profile-image'),
  username: document.getElementById('sidebar-profile-username'),
};

const inputElements = {
  add_digital_assets_modal: {
    username: document.getElementById('input-digital-assets-add-username'),
    email: document.getElementById('input-digital-assets-add-email'),
    service_platform: document.getElementById(
      'select-digital-assets-add-service-platform'
    ),
    account_type: document.getElementById('select-digital-assets-add-type'),
    frequency: document.getElementById('select-digital-assets-add-frequency'),
    declared_value_myr: document.getElementById(
      'input-digital-assets-add-declared-value'
    ),
    instructions_after_death: document.getElementById(
      'select-digital-assets-add-instructions-after-death'
    ),
    beloved_id: document.getElementById('select-digital-assets-add-beloved'),
    remarks: document.getElementById('input-digital-assets-add-remarks'),
  },
  edit_digital_assets_modal: {
    username: document.getElementById('input-digital-assets-edit-username'),
    email: document.getElementById('input-digital-assets-edit-email'),
    service_platform: document.getElementById(
      'select-digital-assets-edit-service-platform'
    ),
    account_type: document.getElementById('select-digital-assets-edit-type'),
    frequency: document.getElementById('select-digital-assets-edit-frequency'),
    declared_value_myr: document.getElementById(
      'input-digital-assets-edit-declared-value'
    ),
    instructions_after_death: document.getElementById(
      'select-digital-assets-edit-instructions-after-death'
    ),
    beloved_id: document.getElementById('select-digital-assets-edit-beloved'),
    remarks: document.getElementById('input-digital-assets-edit-remarks'),
  },
};

var assetData = [];

document.getElementById('input-search').addEventListener('input', function () {
  const userInput = this.value.toLowerCase();

  const filteredData = assetData.filter((item) => {
    const searchableProperties = [
      'account_type',
      'email',
      'service_platform',
      'username',
      'instructions_after_death',
    ];

    return searchableProperties.some((prop) =>
      item[prop].toLowerCase().includes(userInput)
    );
  });

  populateAssets(filteredData);
});

var editCurrentId = null;

function populateToEdit(id) {
  editCurrentId = id;
  $('#edit-digital-assets-modal').modal('show');
  var selectedCard = assetData.find((item) => item.id === id);
  if (selectedCard) {
    for (const key in inputElements.edit_digital_assets_modal) {
      inputElements.edit_digital_assets_modal[key].value = selectedCard[key];
    }
  }
}

document
  .getElementById('btn-digital-assets-delete-form')
  .addEventListener('click', async function (event) {
    if (confirm(`Are you sure you want to delete this record?`)) {
      var selectedCard = assetData.find((item) => item.id === editCurrentId);

      let useBtn = document.getElementById('btn-digital-assets-delete-form');
      let defaultBtnText = useBtn.innerHTML;
      useBtn.disabled = true;
      useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

      const userId = await getUserSession();

      const { data, error } = await supabaseClient
        .from(dbName.digital_assets)
        .delete()
        .eq('uuid', userId)
        .eq('id', selectedCard.id);

      if (error) {
        console.error('Error', error.message);
        handleFormResult({ error, useBtn, defaultBtnText });
        return;
      }

      fetchAssets();
      $('#edit-digital-assets-modal').modal('hide');
      handleFormResult({ error, useBtn, defaultBtnText });
    }
  });

document
  .getElementById('add-digital-assets-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-digital-assets-add-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserSession();

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
      });

    if (error) {
      console.error('Error', error.message);
      handleFormResult({ error, useBtn, defaultBtnText });
      return;
    }

    for (const key in inputElements.add_digital_assets_modal) {
      if (key !== 'image_path') {
        inputElements.add_digital_assets_modal[key].value = '';
      }
    }

    fetchAssets();
    document
      .getElementById('add-success-body-container')
      .classList.remove('hidden');
    document.getElementById('add-form-body-container').classList.add('hidden');
    handleFormResult({ error, useBtn, defaultBtnText });
  });

document
  .getElementById('edit-digital-assets-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-digital-assets-edit-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserSession();

    const updateData = {};

    for (const key in inputElements.edit_digital_assets_modal) {
      if (key !== 'image_path') {
        updateData[key] = inputElements.edit_digital_assets_modal[key].value;
      }
    }

    const { data, error } = await supabaseClient
      .from(dbName.digital_assets)
      .update({
        ...updateData,
      })
      .eq('uuid', userId)
      .eq('id', editCurrentId);

    if (error) {
      console.error('Error', error.message);
      handleFormResult({ error, useBtn, defaultBtnText });
      return;
    }

    for (const key in inputElements.edit_digital_assets_modal) {
      if (key !== 'image_path') {
        inputElements.edit_digital_assets_modal[key].value = '';
      }
    }

    fetchAssets();
    $('#edit-digital-assets-modal').modal('hide');
    handleFormResult({ error, useBtn, defaultBtnText });
  });

function populateAssets(allData = [], tabName = 'tab_1') {
  const listLoader = document.getElementById('asset-list-loader');
  const listEmpty = document.getElementById('asset-list-empty');
  const listContainer = document.getElementById('asset-list-container');
  const listBody = document.getElementById('asset-list-body');

  var records = [];

  if (tabName == 'tab_2') {
    const filteredData = allData.filter(function (item) {
      return item.account_type === 'non_subscription';
    });
    allData = filteredData;
  }

  if (tabName == 'tab_3') {
    const filteredData = allData.filter(function (item) {
      return item.account_type === 'subscription';
    });
    allData = filteredData;
  }

  allData.forEach((item) => {
    const card = listBody.cloneNode(true);
    const divs = card.getElementsByTagName('div');
    const title = divs[0].getElementsByTagName('span');
    const image = divs[0].getElementsByTagName('img');

    const spObject = servicePlatforms().find(
      (x) => x.value === item.service_platform
    );

    const iadObject = instructionsAfterDeath().find(
      (y) => y.value === item.instructions_after_death
    );

    if (spObject.img) {
      image[0].src = spObject.img;
    }

    title[0].innerText = spObject.name;
    title[1].innerText = iadObject.name;
    title[2].innerText = `RM ${item.declared_value_myr}`;

    divs[0].addEventListener('click', function () {
      populateToEdit(item.id);
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

async function fetchAssets() {
  const userId = await getUserSession();

  if (userId) {
    const { data, error } = await supabaseClient
      .from(dbName.digital_assets)
      .select('*')
      .eq('uuid', userId)
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
    } else {
      populateAssets(data);
      assetData = data;
    }
  }
}

var tabLinks = document.querySelectorAll('.tab-link');

tabLinks.forEach(function (tabLink) {
  tabLink.addEventListener('click', function (event) {
    event.preventDefault();
    var clickedTab = tabLink.getAttribute('data-w-tab');
    populateAssets(assetData, clickedTab);
  });
});

function mapElements() {
  for (let key in digitalAssetsTypeName) {
    mapToSelect(
      servicePlatforms(),
      `select-digital-assets-${digitalAssetsTypeName[key].key}-service-platform`
    );
    mapToSelect(
      servicePlatformAccountTypes(),
      `select-digital-assets-${digitalAssetsTypeName[key].key}-type`
    );
    mapToSelect(
      servicePlatformFrequencies(),
      `select-digital-assets-${digitalAssetsTypeName[key].key}-frequency`
    );
    mapToSelect(
      instructionsAfterDeath(),
      `select-digital-assets-${digitalAssetsTypeName[key].key}-instructions-after-death`
    );
  }
}

async function fetchbeloved() {
  const userId = await getUserSession();

  if (userId) {
    const { data, error } = await supabaseClient
      .from(dbName.beloved)
      .select('*')
      .eq('uuid', userId);
    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
    } else {
      for (let key in digitalAssetsTypeName) {
        if (data.length === 0) {
          mapToSelect(
            addNew(),
            `select-digital-assets-${digitalAssetsTypeName[key].key}-beloved`
          );
          document
            .getElementById(
              `select-digital-assets-${digitalAssetsTypeName[key].key}-beloved`
            )
            .addEventListener('change', (event) => {
              const selectedValue = event.target.value;
              if (selectedValue === 'add_new') {
                location.href = pageName.beloved;
              }
            });
        } else {
          const modifiedData = data.map((item) => ({
            value: item.id,
            name: item.nric_name,
          }));
          mapToSelect(
            modifiedData,
            `select-digital-assets-${digitalAssetsTypeName[key].key}-beloved`
          );
        }
      }
    }
  }
}

$(document).ready(function () {
  roleUIbased('global');
  mapElements();
  fetchAssets();
  fetchbeloved();
  var saveData = getSavedData('masterData');
  if (saveData) {
    mapViewElements(saveData, displayElementsSidebar);
  }
});
