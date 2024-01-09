const willElements = {
  nric_name: document.getElementById('input-certificate-name'),
  label_code: document.getElementById('input-certificate-label-code'),
  will_code: document.getElementById('input-certificate-will-code'),
  last_updated: document.getElementById('input-certificate-last-generated'),
};

const detailsElements = {
  nric_name: document.getElementById('view-details-nric-name'),
  last_updated: document.getElementById('view-details-last-updated'),
  nric_no: document.getElementById('view-details-nric-no'),
  address: document.getElementById('view-details-address'),
  primary_co_sampul_name: document.getElementById(
    'view-details-primary-co-sampul-name'
  ),
  primary_co_sampul_email: document.getElementById(
    'view-details-primary-co-sampul-email'
  ),
  primary_co_sampul_phone_no: document.getElementById(
    'view-details-primary-co-sampul-phone-no'
  ),
  primary_co_sampul_nric_no: document.getElementById(
    'view-details-primary-co-sampul-nric-no'
  ),
  secondary_co_sampul_name: document.getElementById(
    'view-details-secondary-co-sampul-name'
  ),
  secondary_co_sampul_email: document.getElementById(
    'view-details-secondary-co-sampul-email'
  ),
  secondary_co_sampul_phone_no: document.getElementById(
    'view-details-secondary-co-sampul-phone-no'
  ),
  secondary_co_sampul_nric_no: document.getElementById(
    'view-details-secondary-co-sampul-nric-no'
  ),
  nric_name_2: document.getElementById('view-details-nric-name-2'),
  last_updated_2: document.getElementById('view-details-last-updated-2'),
  nric_no_2: document.getElementById('view-details-nric-no-2'),
};

const downloadWillBtn = document.getElementById('download-will-btn');
const genereateWillBtn = document.getElementById('generate-will-btn');
var proceed = true;

function showErrorAlert(type) {
  showToast(
    'alert-toast-container',
    `Please assign your "${type} Co-Sampul" on the Beloved page or <b><a href="beloved.html">click to here assign</a></b>.`,
    'danger'
  );
}
function updateElementsView(data) {
  detailsElements.nric_name.innerText = data.profiles.nric_name;
  detailsElements.last_updated.innerText = formatTimestamp(data.last_updated);
  detailsElements.nric_no.innerText = data.profiles.nric_no;
  detailsElements.address.innerText = `${data.profiles.address_1} ${data.profiles.address_2}, ${data.profiles.city}, ${data.profiles.country}`;

  detailsElements.nric_name_2.innerText = data.profiles.nric_name;
  detailsElements.last_updated_2.innerText = formatTimestamp(data.last_updated);
  detailsElements.nric_no_2.innerText = data.profiles.nric_no;

  if (data.beloved.length !== 0) {
    var primaryUser = {};
    var secondaryUser = {};

    data.beloved.map((item) => {
      if (item.type == 'co_sampul' && item.level == 'primary') {
        primaryUser = item;
      }
      if (item.type == 'co_sampul' && item.level == 'secondary') {
        secondaryUser = item;
      }
    });

    if (Object.keys(primaryUser).length !== 0) {
      detailsElements.primary_co_sampul_name.innerText = primaryUser.nric_name;
      detailsElements.primary_co_sampul_email.innerText = primaryUser.email;
      detailsElements.primary_co_sampul_phone_no.innerText =
        primaryUser.phone_no;
      detailsElements.primary_co_sampul_nric_no.innerText = primaryUser.nric_no;
      proceed = true;
    } else {
      proceed = false;
      showErrorAlert('primary');
      genereateWillBtn.addEventListener('click', function (event) {
        showErrorAlert('primary');
      });
    }

    if (Object.keys(secondaryUser).length !== 0) {
      detailsElements.secondary_co_sampul_name.innerText =
        secondaryUser.nric_name;
      detailsElements.secondary_co_sampul_email.innerText = secondaryUser.email;
      detailsElements.secondary_co_sampul_phone_no.innerText =
        secondaryUser.phone_no;
      detailsElements.secondary_co_sampul_nric_no.innerText =
        secondaryUser.nric_no;
      proceed = true;
    } else {
      proceed = false;
      showErrorAlert('secondary');
      genereateWillBtn.addEventListener('click', function (event) {
        showErrorAlert('secondary');
      });
    }
  }
}

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

genereateWillBtn.addEventListener('click', async function (event) {
  if (proceed == false) {
    return;
  }

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
    const { data: willsData, error: willsError } = await supabaseClient
      .from(dbName.wills)
      .select(`*, ${dbName.profiles} ( * )`);

    if (willsError) {
      console.error('Error', willsError.message);
      showToast('alert-toast-container', willsError.message, 'danger');
    } else {
      const willData = willsData[0];

      if (willData) {
        const { data: belovedData, error: belovedError } = await supabaseClient
          .from(dbName.beloved)
          .select('*')
          .eq('uuid', userId);

        if (belovedError) {
          console.error('Error', belovedError.message);
          showToast('alert-toast-container', belovedError.message, 'danger');
        } else {
          updateElements(willData, willElements);
          updateElementsView({ ...willData, beloved: belovedData });
        }
      }
    }
  }
}

$(document).ready(function () {
  fetchWill();
});
