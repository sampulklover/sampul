document.getElementById('add-sign-out-modal-container').innerHTML =
  signOutModalForm();

document.getElementById('add-physical-assets-form-container').innerHTML =
  physicalAssetsModalForm(physicalAssetsTypeName.add.key);

document.getElementById('edit-physical-assets-form-container').innerHTML =
  physicalAssetsModalForm(physicalAssetsTypeName.edit.key);

const displayElementsSidebar = {
  image_path: document.getElementById('sidebar-profile-image'),
  username: document.getElementById('sidebar-profile-username'),
};

const inputElements = {
  add_physical_assets_modal: {
    username: document.getElementById('input-physical-assets-add-username'),
    email: document.getElementById('input-physical-assets-add-email'),
    asset_name: document.getElementById('input-physical-assets-add-asset-name'),
    institution: document.getElementById(
      'select-physical-assets-add-institution'
    ),
    account_no: document.getElementById('input-physical-assets-add-account-no'),
    account_type: document.getElementById('select-physical-assets-add-type'),
    loan_category: document.getElementById(
      'select-physical-assets-add-loan-category'
    ),
    rate: document.getElementById('input-physical-assets-add-rate'),
    declared_value_myr: document.getElementById(
      'input-physical-assets-add-declared-value'
    ),
    tenure_start_date: document.getElementById(
      'input-physical-assets-add-tenure-start-date'
    ),
    tenure_end_date: document.getElementById(
      'input-physical-assets-add-tenure-end-date'
    ),
    instructions_after_death: document.getElementById(
      'select-physical-assets-add-instructions-after-death'
    ),
    beloved_id: document.getElementById('select-physical-assets-add-beloved'),
    remarks: document.getElementById('input-physical-assets-add-remarks'),
    image_path: document.getElementById('preview-physical-assets-add-image'),
  },
  edit_physical_assets_modal: {
    username: document.getElementById('input-physical-assets-edit-username'),
    email: document.getElementById('input-physical-assets-edit-email'),
    asset_name: document.getElementById(
      'input-physical-assets-edit-asset-name'
    ),
    institution: document.getElementById(
      'select-physical-assets-edit-institution'
    ),
    account_no: document.getElementById(
      'input-physical-assets-edit-account-no'
    ),
    account_type: document.getElementById('select-physical-assets-edit-type'),
    loan_category: document.getElementById(
      'select-physical-assets-edit-loan-category'
    ),
    rate: document.getElementById('input-physical-assets-edit-rate'),
    declared_value_myr: document.getElementById(
      'input-physical-assets-edit-declared-value'
    ),
    tenure_start_date: document.getElementById(
      'input-physical-assets-edit-tenure-start-date'
    ),
    tenure_end_date: document.getElementById(
      'input-physical-assets-edit-tenure-end-date'
    ),
    instructions_after_death: document.getElementById(
      'select-physical-assets-edit-instructions-after-death'
    ),
    beloved_id: document.getElementById('select-physical-assets-edit-beloved'),
    remarks: document.getElementById('input-physical-assets-edit-remarks'),
    image_path: document.getElementById('preview-physical-assets-edit-image'),
  },
};

const imageElements = {
  add_physical_assets_modal: {
    preview: document.getElementById('preview-physical-assets-add-image'),
    edit: document.getElementById('input-physical-assets-add-image'),
  },
  edit_physical_assets_modal: {
    preview: document.getElementById('preview-physical-assets-edit-image'),
    edit: document.getElementById('input-physical-assets-edit-image'),
  },
};

mapImageElements(imageElements, imageElements);

const buttonConfigs = [
  {
    buttonId: 'open-sign-out-modal-btn',
    action: () => {
      $('#sign-out-modal').modal('show');
    },
  },
  {
    buttonId: 'new-physical-assets-btn',
    action: () => {
      $('#add-physical-assets-modal').modal('show');
      imageElements.add_physical_assets_modal.preview.src = addAnyImg;
      document
        .getElementById('add-success-body-container')
        .classList.add('hidden');
      document
        .getElementById('add-form-body-container')
        .classList.remove('hidden');
    },
  },
];

buttonConfigs.forEach((btnConfig) => {
  document
    .getElementById(btnConfig.buttonId)
    .addEventListener('click', function () {
      btnConfig.action();
    });
});

var assetData = [];

document.getElementById('input-search').addEventListener('input', function () {
  const userInput = this.value.toLowerCase();

  const filteredData = assetData.filter((item) => {
    const searchableProperties = [
      'account_type',
      'email',
      'institution',
      'username',
      'asset_name',
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
  $('#edit-physical-assets-modal').modal('show');
  var selectedCard = assetData.find((item) => item.id === id);
  if (selectedCard) {
    for (const key in inputElements.edit_physical_assets_modal) {
      inputElements.edit_physical_assets_modal[key].value = selectedCard[key];

      if (key == 'image_path') {
        const imageUrl = selectedCard[key]
          ? `${CDNURL}${selectedCard[key]}`
          : addAnyImg;
        inputElements.edit_physical_assets_modal.image_path.src = imageUrl;
      }
    }
  }
}

document
  .getElementById('btn-physical-assets-delete-form')
  .addEventListener('click', async function (event) {
    if (confirm(`Are you sure you want to delete this record?`)) {
      var selectedCard = assetData.find((item) => item.id === editCurrentId);

      let useBtn = document.getElementById('btn-physical-assets-delete-form');
      let defaultBtnText = useBtn.innerHTML;
      useBtn.disabled = true;
      useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

      const userId = await getUserSession();

      const { data, error } = await supabaseClient
        .from(dbName.physical_assets)
        .delete()
        .eq('uuid', userId)
        .eq('id', selectedCard.id);

      if (error) {
        console.error('Error', error.message);
        handleFormResult({ error, useBtn, defaultBtnText });
        return;
      }

      await deleteImage({
        returnData: selectedCard,
        useBtn,
        defaultBtnText,
      });

      fetchAssets();
      $('#edit-physical-assets-modal').modal('hide');
      handleFormResult({ error, useBtn, defaultBtnText });
    }
  });

document
  .getElementById('add-physical-assets-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-physical-assets-add-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserSession();

    const addData = processForm(inputElements.add_physical_assets_modal, false);

    const { data: returnData, error } = await supabaseClient
      .from(dbName.physical_assets)
      .insert({
        uuid: userId,
        uid: generateRandomId(),
        ...addData,
      })
      .select()
      .single();

    if (error) {
      console.error('Error', error.message);
      handleFormResult({ error, useBtn, defaultBtnText });
      return;
    }

    const directory = `/physical/${returnData.uid}/`;
    const imageInput = imageElements.add_physical_assets_modal.edit;

    await replaceOrAddImage({
      userId,
      returnData,
      directory,
      imageInput,
      useBtn,
      defaultBtnText,
      dataBase: dbName.physical_assets,
      isUpdateByReturnId: true,
    });

    processForm(inputElements.add_physical_assets_modal, true);

    fetchAssets();
    document
      .getElementById('add-success-body-container')
      .classList.remove('hidden');
    document.getElementById('add-form-body-container').classList.add('hidden');
    handleFormResult({ error, useBtn, defaultBtnText });
  });

document
  .getElementById('edit-physical-assets-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-physical-assets-edit-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserSession();
    const addData = processForm(
      inputElements.edit_physical_assets_modal,
      false
    );

    const { data: returnData, error } = await supabaseClient
      .from(dbName.physical_assets)
      .update({
        ...addData,
      })
      .eq('uuid', userId)
      .eq('id', editCurrentId)
      .select()
      .single();

    if (error) {
      console.error('Error', error.message);
      handleFormResult({ error, useBtn, defaultBtnText });
      return;
    }

    const directory = `/physical/${returnData.uid}/`;
    const imageInput = imageElements.edit_physical_assets_modal.edit;

    await replaceOrAddImage({
      userId,
      returnData,
      directory,
      imageInput,
      useBtn,
      defaultBtnText,
      dataBase: dbName.physical_assets,
      isUpdateByReturnId: true,
    });

    processForm(inputElements.edit_physical_assets_modal, true);

    fetchAssets();
    $('#edit-physical-assets-modal').modal('hide');
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
      return item.account_type === 'asset';
    });
    allData = filteredData;
  }

  if (tabName == 'tab_3') {
    const filteredData = allData.filter(function (item) {
      return item.account_type === 'loan';
    });
    allData = filteredData;
  }

  if (tabName == 'tab_4') {
    const filteredData = allData.filter(function (item) {
      return item.account_type === 'protection';
    });
    allData = filteredData;
  }

  allData.forEach((item) => {
    const card = listBody.cloneNode(true);
    const divs = card.getElementsByTagName('div');
    const title = divs[0].getElementsByTagName('span');
    const image = divs[0].getElementsByTagName('img');

    const loanCategoryObj = loanCategories().find(
      (y) => y.value === item.loan_category
    );

    const institutionObj = institutions().find(
      (y) => y.value === item.institution
    );

    const imageUrl = item.image_path
      ? `${CDNURL}${item.image_path}`
      : emptyPhysicalImg;
    image[0].src = imageUrl;

    const startDate = new Date(item.tenure_start_date);
    const endDate = new Date(item.tenure_end_date);
    const diffInMonths =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());
    const tenure = `${diffInMonths}/${diffInMonths * 3} months`;

    title[0].innerText = item.asset_name;
    title[1].innerText = loanCategoryObj.name;
    title[2].innerText = institutionObj.name;
    title[3].innerText = item.account_no;
    title[4].innerText = `RM ${item.declared_value_myr}`;
    title[5].innerText = `${item.rate}%`;
    title[6].innerText = tenure;

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
      .from(dbName.physical_assets)
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
  for (let key in physicalAssetsTypeName) {
    mapToSelect(
      institutions(),
      `select-physical-assets-${physicalAssetsTypeName[key].key}-institution`
    );
    mapToSelect(
      physicalAccountTypes(),
      `select-physical-assets-${physicalAssetsTypeName[key].key}-type`
    );
    mapToSelect(
      loanCategories(),
      `select-physical-assets-${physicalAssetsTypeName[key].key}-loan-category`
    );
    mapToSelect(
      instructionsAfterDeath(),
      `select-physical-assets-${physicalAssetsTypeName[key].key}-instructions-after-death`
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
      for (let key in physicalAssetsTypeName) {
        if (data.length === 0) {
          mapToSelect(
            addNew(),
            `select-physical-assets-${physicalAssetsTypeName[key].key}-beloved`
          );
          document
            .getElementById(
              `select-physical-assets-${physicalAssetsTypeName[key].key}-beloved`
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
            `select-physical-assets-${physicalAssetsTypeName[key].key}-beloved`
          );
        }
      }
    }
  }
}

$(document).ready(function () {
  roleUIbased('global');
  if (!getAccessControl('physical').authorized == true) {
    showToast(
      'alert-toast-container',
      'Access this page by upgrading your account.',
      'danger'
    );
  }
  mapElements();
  fetchAssets();
  fetchbeloved();

  var saveData = getSavedData('masterData');
  if (saveData) {
    mapViewElements(saveData, displayElementsSidebar);
  }
});
