document.getElementById('add-sign-out-modal-container').innerHTML =
  signOutModalForm();

document.getElementById('add-beloved-form-container').innerHTML =
  belovedModalForm(belovedTypeName.add.key);

document.getElementById('edit-beloved-form-container').innerHTML =
  belovedModalForm(belovedTypeName.edit.key);

document
  .getElementById('open-sign-out-modal-btn')
  .addEventListener('click', function () {
    $('#sign-out-modal').modal('show');
  });

document
  .getElementById('open-co-sampul-modal-btn')
  .addEventListener('click', function () {
    $('#add-beloved-modal').modal('show');
    changeModalType('co_sampul', belovedTypeName.add.key);
    document.getElementById('select-beloved-add-type').value = 'co_sampul';
  });

document
  .getElementById('open-future-owner-modal-btn')
  .addEventListener('click', function () {
    $('#add-beloved-modal').modal('show');
    changeModalType('future_owner', belovedTypeName.add.key);
    document.getElementById('select-beloved-add-type').value = 'future_owner';
  });

function changeModalType(typeName, type) {
  document.getElementById(`modal-beloved-${type}-title`).innerText =
    type_title[typeName].title;
  document.getElementById(`modal-beloved-${type}-subtitle`).innerText =
    type_title[typeName].subtitle;
}

const displayElementsSidebar = {
  image_path: document.getElementById('sidebar-profile-image'),
  username: document.getElementById('sidebar-profile-username'),
};

const inputElements = {
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
  edit_beloved_modal: {
    nric_name: document.getElementById('input-beloved-edit-nric-name'),
    nric_no: document.getElementById('input-beloved-edit-nric-no'),
    nickname: document.getElementById('input-beloved-edit-nickname'),
    phone_no: document.getElementById('input-beloved-edit-phone-no'),
    email: document.getElementById('input-beloved-edit-email'),
    relationship: document.getElementById('select-beloved-edit-relationship'),
    type: document.getElementById('select-beloved-edit-type'),
    level: document.getElementById('select-beloved-edit-level'),
    image_path: document.getElementById('preview-beloved-edit-image'),
  },
};

var editCurrentId = null;
var belovedData = [];

document.getElementById('input-search').addEventListener('input', function () {
  const userInput = this.value.toLowerCase();

  const filteredData = belovedData.filter((item) => {
    const searchableProperties = ['nric_name', 'nickname', 'email'];

    return searchableProperties.some((prop) =>
      item[prop].toLowerCase().includes(userInput)
    );
  });

  populateBeloved(filteredData, typeList.co_sampul, true);
  populateBeloved(filteredData, typeList.future_owner, true);
});

document
  .getElementById('add-beloved-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-beloved-add-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserSession();
    const addData = {};

    for (const key in inputElements.add_beloved_modal) {
      if (key !== 'image_path') {
        addData[key] = inputElements.add_beloved_modal[key].value;
      }
    }

    const { data: returnData, error } = await supabaseClient
      .from(dbName.beloved)
      .insert({
        uuid: userId,
        ...addData,
      })
      .select()
      .single();

    if (error) {
      console.error('Error', error.message);
      handleFormResult({ error, useBtn, defaultBtnText });
      return;
    }

    const directory = `/beloved/${returnData.id}/avatar/`;
    const imageInput = document.getElementById('input-beloved-add-image');

    await replaceOrAddImage({
      userId,
      returnData,
      directory,
      imageInput,
      useBtn,
      defaultBtnText,
      dataBase: dbName.beloved,
      isUpdateByReturnId: true,
    });

    for (const key in inputElements.add_beloved_modal) {
      if (key !== 'image_path') {
        inputElements.add_beloved_modal[key].value = '';
      }
    }

    fetchbeloved();
    $('#add-beloved-modal').modal('hide');
    handleFormResult({ error, useBtn, defaultBtnText });
  });

document
  .getElementById('edit-beloved-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-beloved-edit-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserSession();
    const updateData = {};

    for (const key in inputElements.edit_beloved_modal) {
      if (key !== 'image_path') {
        updateData[key] = inputElements.edit_beloved_modal[key].value;
      }
    }

    const { data: returnData, error } = await supabaseClient
      .from(dbName.beloved)
      .update({
        ...updateData,
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

    const directory = `/beloved/${returnData.id}/avatar/`;
    const imageInput = document.getElementById('input-beloved-edit-image');

    await replaceOrAddImage({
      userId,
      returnData,
      directory,
      imageInput,
      useBtn,
      defaultBtnText,
      dataBase: dbName.beloved,
      isUpdateByReturnId: true,
    });

    for (const key in inputElements.edit_beloved_modal) {
      if (key !== 'image_path') {
        inputElements.edit_beloved_modal[key].value = '';
      }
    }

    fetchbeloved();
    $('#edit-beloved-modal').modal('hide');
    handleFormResult({ error, useBtn, defaultBtnText });
  });

document
  .getElementById('btn-beloved-delete-form')
  .addEventListener('click', async function () {
    if (confirm(`Are you sure you want to delete this record?`)) {
      var selectedCard = belovedData.find((item) => item.id === editCurrentId);

      let useBtn = document.getElementById('btn-beloved-delete-form');
      let defaultBtnText = useBtn.innerHTML;
      useBtn.disabled = true;
      useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

      const userId = await getUserSession();

      const { data, error } = await supabaseClient
        .from(dbName.beloved)
        .delete()
        .eq('uuid', userId)
        .eq('id', selectedCard.id);

      if (error) {
        console.error('Error', error.message);
        if (error.code === '23503') {
          showToast(
            'alert-toast-container',
            'User cannot be deleted as they are linked to your digital assets. Please reassign the digital assets to another user, and try deleting again.',
            'danger'
          );
        } else {
          handleFormResult({ error, useBtn, defaultBtnText });
        }
        return;
      }

      await deleteImage({
        returnData: selectedCard,
        useBtn,
        defaultBtnText,
      });

      fetchbeloved();
      $('#edit-beloved-modal').modal('hide');
      handleFormResult({ error, useBtn, defaultBtnText });
    }
  });

const previewAddImage = document.getElementById('preview-beloved-add-image');
const previewEditImage = document.getElementById('preview-beloved-edit-image');

document
  .getElementById('preview-beloved-add-image')
  .addEventListener('click', function (event) {
    document.getElementById('input-beloved-add-image').click();
  });

document
  .getElementById('input-beloved-add-image')
  .addEventListener('change', function (event) {
    if (event.target.files.length > 0) {
      let imageURL = URL.createObjectURL(event.target.files[0]);
      previewAddImage.src = `${imageURL}`;
    }
  });

document
  .getElementById('preview-beloved-edit-image')
  .addEventListener('click', function (event) {
    document.getElementById('input-beloved-edit-image').click();
  });

document
  .getElementById('input-beloved-edit-image')
  .addEventListener('change', function (event) {
    if (event.target.files.length > 0) {
      let imageURL = URL.createObjectURL(event.target.files[0]);
      previewEditImage.src = `${imageURL}`;
    }
  });

function populateToEdit(id) {
  editCurrentId = id;
  $('#edit-beloved-modal').modal('show');
  var selectedCard = belovedData.find((item) => item.id === id);
  if (selectedCard) {
    for (const key in inputElements.edit_beloved_modal) {
      inputElements.edit_beloved_modal[key].value = selectedCard[key];

      if (key == 'image_path') {
        const imageUrl = selectedCard[key]
          ? `${CDNURL}${selectedCard[key]}`
          : addUserImg;
        inputElements.edit_beloved_modal.image_path.src = imageUrl;
      }
    }
  }
}

const typeList = {
  co_sampul: {
    pre_text: 'co-sampul',
    key: 'co_sampul',
    btnModalId: 'open-co-sampul-modal-btn',
    insert_limit: 2,
  },
  future_owner: {
    pre_text: 'future-owner',
    key: 'future_owner',
    btnModalId: 'open-future-owner-modal-btn',
    insert_limit: null,
  },
};

function toggleAddBelovedBtn(type, data) {
  const { insert_limit, btnModalId } = type;
  const btnModal = document.getElementById(btnModalId);

  if (insert_limit && data.length >= insert_limit) {
    btnModal.classList.add('hidden');
  } else {
    btnModal.classList.remove('hidden');
  }
}

function populateBeloved(allData = [], type, searching = false) {
  const listLoader = document.getElementById(`${type.pre_text}-list-loader`);
  const listEmpty = document.getElementById(`${type.pre_text}-list-empty`);
  const listContainer = document.getElementById(
    `${type.pre_text}-list-container`
  );
  const listBody = document.getElementById(`${type.pre_text}-list-body`);

  var records = [];

  allData.forEach((item) => {
    const card = listBody.cloneNode(true);
    const divs = card.getElementsByTagName('div');
    const image = divs[0].getElementsByTagName('img');
    const title = divs[0].getElementsByTagName('span');
    const tagTitle = divs[5].getElementsByTagName('span');

    const rObject = relationships().find((x) => x.value === item.relationship);
    const lObject = belovedLevel().find((x) => x.value === item.level);

    if (item.type == type.key) {
      const imageUrl = item.image_path
        ? `${CDNURL}${item.image_path}`
        : emptyUserImg;

      image[0].src = imageUrl;
      title[0].innerText = item.nickname;
      title[1].innerText = rObject.name;
      tagTitle[0].innerText = lObject.name;

      card.addEventListener('click', function () {
        populateToEdit(item.id);
        changeModalType(type.key, belovedTypeName.edit.key);
      });

      records.push(card);
    }
  });

  if (!searching) {
    toggleAddBelovedBtn(type, records);
  }

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

function mapElements() {
  for (let key in belovedTypeName) {
    mapToSelect(
      relationships(),
      `select-beloved-${belovedTypeName[key].key}-relationship`
    );
    mapToSelect(
      beneficiaryTypes(),
      `select-beloved-${belovedTypeName[key].key}-type`
    );
    mapToSelect(
      belovedLevel(),
      `select-beloved-${belovedTypeName[key].key}-level`
    );
    document.getElementById('select-beloved-add-type').value == 'future_owner';
  }
}

async function fetchbeloved() {
  const userId = await getUserSession();

  if (userId) {
    const { data, error } = await supabaseClient
      .from(dbName.beloved)
      .select('*')
      .eq('uuid', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
    } else {
      populateBeloved(data, typeList.co_sampul);
      populateBeloved(data, typeList.future_owner);
      belovedData = data;
    }
  }
}

$(document).ready(function () {
  roleUIbased('global');
  mapElements();
  fetchbeloved();

  var saveData = getSavedData('masterData');
  if (saveData) {
    mapViewElements(saveData, displayElementsSidebar);
  }
});
