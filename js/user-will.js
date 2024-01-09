const willElements = {
  nric_name: document.getElementById('input-certificate-name'),
  label_code: document.getElementById('input-certificate-label-code'),
  will_code: document.getElementById('input-certificate-will-code'),
  last_updated: document.getElementById('input-certificate-last-generated'),
};

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

function generateLabelId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const idLength = 10;
  let randomId = '';

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

function generateWillId() {
  const currentYear = new Date().getFullYear();
  const randomDigits = Math.floor(Math.random() * 10000000000);
  const randomId = `SMPL-${currentYear}-${randomDigits
    .toString()
    .padStart(10, '0')}`;

  return randomId;
}

document
  .getElementById('generate-will-btn')
  .addEventListener('click', async function (event) {
    let useBtn = event.target;
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserUUID();
    const updatedTime = new Date().toISOString();

    const updateData = {
      label_code: generateLabelId(),
      will_code: generateWillId(),
      last_updated: updatedTime,
    };

    const { data, error } = await supabaseClient
      .from(dbName.wills)
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
    } else {
      showToast('alert-toast-container', 'Success!', 'success');
      fetchWill();
    }

    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
  });

function updateElements(source, target) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object') {
        for (const nestedKey in source[key]) {
          if (target[nestedKey]) {
            target[nestedKey].value = source[key][nestedKey];
          }
        }
      } else if (target[key]) {
        if (key == 'last_updated') {
          target[key].value = formatTimestamp(source[key]);
        } else {
          target[key].value = source[key];
        }
      }
    }
  }
}

async function fetchWill() {
  const userId = await getUserUUID();

  if (userId) {
    const { data, error } = await supabaseClient
      .from(dbName.wills)
      .select(`*, ${dbName.profiles} ( * )`);

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
    } else {
      updateElements(data[0], willElements);
    }
  }
}

$(document).ready(function () {
  fetchWill();
});
