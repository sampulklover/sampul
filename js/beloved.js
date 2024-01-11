document.getElementById('add-beloved-form-container').innerHTML =
  belovedModalForm(belovedTypeName.add.key);

document.getElementById('edit-beloved-form-container').innerHTML =
  belovedModalForm(belovedTypeName.edit.key);

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

var editCurrentId = null;
const editNricNameInput = document.getElementById(
  'input-beloved-edit-nric-name'
);
const editNricNoInput = document.getElementById('input-beloved-edit-nric-no');
const editNicknameInput = document.getElementById(
  'input-beloved-edit-nickname'
);
const editPhoneNoInput = document.getElementById('input-beloved-edit-phone-no');
const editEmailInput = document.getElementById('input-beloved-edit-email');
const editRelationshipSelect = document.getElementById(
  'select-beloved-edit-relationship'
);
const editTypeSelect = document.getElementById('select-beloved-edit-type');
const editLevelSelect = document.getElementById('select-beloved-edit-level');
const editPreviewImage = document.getElementById('preview-beloved-edit-image');

var belovedData = [];

document.getElementById('input-search').addEventListener('input', function () {
  const userInput = this.value.toLowerCase();

  const filteredData = belovedData.filter((item) => {
    const searchableProperties = ['nric_name', 'nickname', 'email'];

    return searchableProperties.some((prop) =>
      item[prop].toLowerCase().includes(userInput)
    );
  });

  populateBeloved(filteredData, typeList.co_sampul);
  populateBeloved(filteredData, typeList.future_owner);
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
    let returnId = null;

    let setStop = false;

    const addTypeSelect = document.getElementById('select-beloved-add-type');
    const addLevelSelect = document.getElementById('select-beloved-add-level');

    if (belovedData.length !== 0) {
      belovedData.map((item) => {
        if (
          item.type == addTypeSelect.value &&
          item.level == addLevelSelect.value
        ) {
          if (item.level !== 'others') {
            var selectedLevel = belovedLevel().find(
              (item) => item.value === addLevelSelect.value
            );

            showToast(
              'alert-toast-container',
              `Beloved level "${selectedLevel.name}" already been assigned to a different person.`,
              'danger'
            );

            setStop = true;
            useBtn.disabled = false;
            useBtn.innerHTML = defaultBtnText;
          }
        }
      });
    }

    if (setStop) {
      return;
    }

    const { data, error } = await supabaseClient
      .from(dbName.beloved)
      .insert({
        uuid: userId,
        nric_name: document.getElementById('input-beloved-add-nric-name').value,
        nric_no: document.getElementById('input-beloved-add-nric-no').value,
        nickname: document.getElementById('input-beloved-add-nickname').value,
        phone_no: document.getElementById('input-beloved-add-phone-no').value,
        email: document.getElementById('input-beloved-add-email').value,
        relationship: document.getElementById('select-beloved-add-relationship')
          .value,
        type: document.getElementById('select-beloved-add-type').value,
        level: document.getElementById('select-beloved-add-level').value,
      })
      .select();

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      return;
    }

    returnId = data[0].id;
    const imageInput = document.getElementById('input-beloved-add-image');

    if (imageInput.files.length > 0 && returnId) {
      const file = imageInput.files[0];

      const imagePath = userId + `/beloved/${returnId}/avatar/` + file.name;

      const { data: uploadedImage, error } = await supabaseClient.storage
        .from(bucketName)
        .upload(imagePath, file);

      if (error) {
        console.error('Error', error.message);
        showToast('alert-toast-container', error.message, 'danger');
      } else {
        const { data, error } = await supabaseClient
          .from(dbName.beloved)
          .update({
            image_path: uploadedImage.path,
          })
          .eq('uuid', userId)
          .eq('id', returnId);

        if (error) {
          console.error('Error', error.message);
          showToast('alert-toast-container', error.message, 'danger');
        }
      }
    }

    fetchbeloved();
    showToast('alert-toast-container', 'Submitted!', 'success');
    $('#add-beloved-modal').modal('hide');

    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
  });

document
  .getElementById('edit-beloved-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-beloved-edit-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserUUID();
    let returnData = null;

    let setStop = false;

    if (belovedData.length !== 0) {
      belovedData.map((item) => {
        if (
          item.type == editTypeSelect.value &&
          item.level == editLevelSelect.value &&
          item.id !== editCurrentId
        ) {
          if (item.level !== 'others') {
            var selectedLevel = belovedLevel().find(
              (item) => item.value === editLevelSelect.value
            );

            showToast(
              'alert-toast-container',
              `Beloved level "${selectedLevel.name}" already been assigned to a different person.`,
              'danger'
            );

            setStop = true;
            useBtn.disabled = false;
            useBtn.innerHTML = defaultBtnText;
          }
        }
      });
    }

    if (setStop) {
      return;
    }

    const { data, error } = await supabaseClient
      .from(dbName.beloved)
      .update({
        nric_name: editNricNameInput.value,
        nric_no: editNricNoInput.value,
        nickname: editNicknameInput.value,
        phone_no: editPhoneNoInput.value,
        email: editEmailInput.value,
        relationship: editRelationshipSelect.value,
        type: editTypeSelect.value,
        level: editLevelSelect.value,
      })
      .eq('uuid', userId)
      .eq('id', editCurrentId)
      .select();

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      return;
    }

    returnData = data[0];
    const imageInput = document.getElementById('input-beloved-edit-image');

    if (imageInput.files.length > 0 && returnData.id) {
      if (returnData.image_path) {
        const { error } = await supabaseClient.storage
          .from(bucketName)
          .remove([returnData.image_path]);

        if (error) {
          showToast('alert-toast-container', error.message, 'danger');
          console.error('Error', error.message);
          fetchbeloved();
          $('#edit-beloved-modal').modal('hide');

          useBtn.disabled = false;
          useBtn.innerHTML = defaultBtnText;
          return;
        }
      }

      const file = imageInput.files[0];

      const imagePath =
        userId + `/beloved/${returnData.id}/avatar/` + file.name;

      const { data: uploadedImage, error } = await supabaseClient.storage
        .from(bucketName)
        .upload(imagePath, file);

      if (error) {
        console.error('Error', error.message);
        showToast('alert-toast-container', error.message, 'danger');
      } else {
        const { data, error } = await supabaseClient
          .from(dbName.beloved)
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

    fetchbeloved();
    $('#edit-beloved-modal').modal('hide');
    showToast('alert-toast-container', 'Updated!', 'success');

    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
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
    editNricNameInput.value = selectedCard.nric_name;
    editNricNoInput.value = selectedCard.nric_no;
    editNicknameInput.value = selectedCard.nickname;
    editPhoneNoInput.value = selectedCard.phone_no;
    editEmailInput.value = selectedCard.email;
    editRelationshipSelect.value = selectedCard.relationship;
    editTypeSelect.value = selectedCard.type;
    editLevelSelect.value = selectedCard.level;
    const imageUrl = selectedCard.image_path
      ? `${CDNURL}${selectedCard.image_path}`
      : addUserImg;
    editPreviewImage.src = imageUrl;
  }
}

const typeList = {
  co_sampul: { pre_text: 'co-sampul', key: 'co_sampul' },
  future_owner: { pre_text: 'future-owner', key: 'future_owner' },
};

function populateBeloved(allData = [], type) {
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

document
  .getElementById('btn-beloved-delete-form')
  .addEventListener('click', async function () {
    if (confirm(`Are you sure you want to delete this record?`)) {
      var selectedCard = belovedData.find((item) => item.id === editCurrentId);

      let useBtn = document.getElementById('btn-beloved-delete-form');
      let defaultBtnText = useBtn.innerHTML;
      useBtn.disabled = true;
      useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

      const userId = await getUserUUID();

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
          showToast('alert-toast-container', error.message, 'danger');
        }
      } else {
        fetchbeloved();
        $('#edit-beloved-modal').modal('hide');
        showToast('alert-toast-container', 'Deleted!', 'success');
      }

      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    }
  });

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
  const userId = await getUserUUID();

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
  mapElements();
  fetchbeloved();
});
