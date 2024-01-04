document.getElementById('add-digital-assets-form-container').innerHTML =
  digitalAssetsForm(typeName.add.key);

document.getElementById('edit-digital-assets-form-container').innerHTML =
  digitalAssetsForm(typeName.edit.key);

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

const editUsernameInput = document.getElementById('input-edit-username');
const editEmailInput = document.getElementById('input-edit-email');
const editServicePlatformSelect = document.getElementById(
  'select-edit-service-platform'
);
const editAccountTypeSelect = document.getElementById('select-edit-type');
const editFrequencySelect = document.getElementById('select-edit-frequency');
const editDeclaredValueSelect = document.getElementById(
  'select-edit-declared-value'
);
const editInstructionsAfterDeathSelect = document.getElementById(
  'select-edit-instructions-after-death'
);
const editBeneficiarySelect = document.getElementById(
  'select-edit-beneficiary'
);
const editRemarksInput = document.getElementById('input-edit-remarks');

var editCurrentId = null;

function populateToEdit(id) {
  editCurrentId = id;
  $('#edit-digital-assets-modal').modal('show');
  var selectedCard = assetData.find((item) => item.id === id);
  if (selectedCard) {
    editUsernameInput.value = selectedCard.username;
    editEmailInput.value = selectedCard.email;
    editServicePlatformSelect.value = selectedCard.service_platform;
    editAccountTypeSelect.value = selectedCard.account_type;
    editFrequencySelect.value = selectedCard.frequency;
    editDeclaredValueSelect.value = selectedCard.declared_value_myr;
    editInstructionsAfterDeathSelect.value =
      selectedCard.instructions_after_death;
    editBeneficiarySelect.value = selectedCard.beneficiaries_id;
    editRemarksInput.value = selectedCard.remarks;
  }
}

document
  .getElementById('delete-digital-assets-btn')
  .addEventListener('click', async function (event) {
    if (confirm(`Are you sure you want to delete this record?`)) {
      var selectedCard = assetData.find((item) => item.id === editCurrentId);

      let useBtn = document.getElementById('delete-digital-assets-btn');
      let defaultBtnText = useBtn.innerHTML;
      useBtn.disabled = true;
      useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

      const userId = await getUserUUID();

      const { data, error } = await supabaseClient
        .from(dbName.digital_assets)
        .delete()
        .eq('uuid', userId)
        .eq('id', selectedCard.id);

      if (error) {
        console.error('Error', error.message);
        showToast('alert-toast-container', error.message, 'danger');
      } else {
        fetchAssets();
        $('#edit-digital-assets-modal').modal('hide');
        showToast('alert-toast-container', 'Deleted!', 'success');
      }

      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    }
  });

document
  .getElementById('add-digital-assets-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('add-digital-assets-btn');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserUUID();

    const { data, error } = await supabaseClient
      .from(dbName.digital_assets)
      .insert({
        uuid: userId,
        username: document.getElementById('input-add-username').value,
        email: document.getElementById('input-add-email').value,
        service_platform: document.getElementById('select-add-service-platform')
          .value,
        account_type: document.getElementById('select-add-type').value,
        frequency: document.getElementById('select-add-frequency').value,
        declared_value_myr: document.getElementById('select-add-declared-value')
          .value,
        instructions_after_death: document.getElementById(
          'select-add-instructions-after-death'
        ).value,
        beneficiaries_id: document.getElementById('select-add-beneficiary')
          .value,
        remarks: document.getElementById('input-add-remarks').value,
      });

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
    } else {
      fetchAssets();
      document
        .getElementById('add-success-body-container')
        .classList.remove('hidden');
      document
        .getElementById('add-form-body-container')
        .classList.add('hidden');
      showToast('alert-toast-container', 'Submitted!', 'success');
    }

    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
  });

document
  .getElementById('edit-digital-assets-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('edit-digital-assets-btn');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserUUID();

    const { data, error } = await supabaseClient
      .from(dbName.digital_assets)
      .update({
        username: editUsernameInput.value,
        email: editEmailInput.value,
        service_platform: editServicePlatformSelect.value,
        account_type: editAccountTypeSelect.value,
        frequency: editFrequencySelect.value,
        declared_value_myr: editDeclaredValueSelect.value,
        instructions_after_death: editInstructionsAfterDeathSelect.value,
        beneficiaries_id: editBeneficiarySelect.value,
        remarks: editRemarksInput.value,
      })
      .eq('uuid', userId)
      .eq('id', editCurrentId);

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
    } else {
      fetchAssets();
      $('#edit-digital-assets-modal').modal('hide');
      showToast('alert-toast-container', 'Updated!', 'success');
    }

    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
  });

async function fetchAssets() {
  const userId = await getUserUUID();

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

function populateAssets(allData = [], tabName = 'tab_1') {
  const listLoader = document.getElementById('asset-list-loader');
  const listEmpty = document.getElementById('asset-list-empty');
  const listContainer = document.getElementById('asset-list-container');
  const listBody = document.getElementById('asset-list-body');

  var records = [];

  if (tabName == 'tab_2') {
    const filteredData = allData.filter(function (item) {
      return item.account_type === 'digital_account';
    });
    allData = filteredData;
  }

  if (tabName == 'tab_3') {
    const filteredData = allData.filter(function (item) {
      return item.account_type === 'subscription_account';
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

    const dvObject = declaredValues().find(
      (y) => y.value === item.declared_value_myr
    );

    image[0].src = spObject.img;

    title[0].innerText = spObject.name;
    title[1].innerText = iadObject.name;
    title[2].innerText = dvObject.name;

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

var tabLinks = document.querySelectorAll('.tab-link');

tabLinks.forEach(function (tabLink) {
  tabLink.addEventListener('click', function (event) {
    event.preventDefault();
    var clickedTab = tabLink.getAttribute('data-w-tab');
    populateAssets(assetData, clickedTab);
  });
});

function mapElements() {
  for (let key in typeName) {
    mapToSelect(
      servicePlatforms(),
      `select-${typeName[key].key}-service-platform`
    );
    mapToSelect(
      servicePlatformAccountTypes(),
      `select-${typeName[key].key}-type`
    );
    mapToSelect(
      servicePlatformFrequencies(),
      `select-${typeName[key].key}-frequency`
    );
    mapToSelect(declaredValues(), `select-${typeName[key].key}-declared-value`);
    mapToSelect(
      instructionsAfterDeath(),
      `select-${typeName[key].key}-instructions-after-death`
    );
  }
}

async function fetchBeneficiaries() {
  const userId = await getUserUUID();

  if (userId) {
    const { data, error } = await supabaseClient
      .from(dbName.beneficiaries)
      .select('id, name, nickname')
      .eq('uuid', userId);
    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
    } else {
      for (let key in typeName) {
        if (data.length === 0) {
          mapToSelect(addNew(), `select-${typeName[key].key}-beneficiary`);
          document
            .getElementById(`select-${typeName[key].key}-beneficiary`)
            .addEventListener('change', (event) => {
              const selectedValue = event.target.value;
              if (selectedValue === 'add_new') {
                location.href = pageName.beloved;
              }
            });
        } else {
          const modifiedData = data.map((item) => ({
            value: item.id,
            name: item.name,
          }));
          mapToSelect(modifiedData, `select-${typeName[key].key}-beneficiary`);
        }
      }
    }
  }
}

$(document).ready(function () {
  mapElements();
  fetchAssets();
  fetchBeneficiaries();
});
