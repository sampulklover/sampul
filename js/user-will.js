window.jsPDF = window.jspdf.jsPDF; // required for jspdf
document.getElementById('sampul-will-logo').src = sampulWillLogo;

const formConfigs = [
  {
    containerId: 'add-sign-out-modal-container',
    modalFormFunction: signOutModalForm(),
  },
  {
    containerId: 'share-modal-form-container',
    modalFormFunction: shareModalForm(),
  },
];

formConfigs.forEach((item) => {
  document.getElementById(item.containerId).innerHTML = item.modalFormFunction;
});

const buttonConfigs = [
  {
    buttonId: 'open-sign-out-modal-btn',
    action: () => {
      $('#sign-out-modal').modal('show');
    },
  },
  {
    buttonId: 'open-share-modal-btn',
    action: () => {
      $('#share-modal').modal('show');
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

const displayElementsSidebar = {
  image_path: document.getElementById('sidebar-profile-image'),
  username: document.getElementById('sidebar-profile-username'),
};

const displayElements = {
  willElements: {
    nric_name: document.getElementById('view-certificate-nric-name'),
    label_code: document.getElementById('view-certificate-label-code'),
    will_code: document.getElementById('view-certificate-will-code'),
    last_updated: document.getElementById('view-certificate-last-generated'),
    image_path: document.getElementById('view-certificate-image'),
  },
  detailsElements: {
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
  },
};

const downloadWillBtn = document.getElementById('download-will-btn');
const genereateWillBtn = document.getElementById('generate-will-btn');
const genereateWillBtn2 = document.getElementById('generate-will-btn-2');

var proceed = true;
var myWillData = null;

downloadWillBtn.addEventListener('click', async function (event) {
  let useBtn = document.getElementById('download-will-btn');
  let defaultBtnText = useBtn.innerHTML;
  useBtn.disabled = true;
  useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

  var element = document.getElementById('certificate-container');
  let pdf = new jsPDF('p', 'pt', 'a4');

  const contentWidth = element.offsetWidth;
  const contentHeight = element.offsetHeight;
  const scaleX = pdf.internal.pageSize.width / contentWidth;
  const scaleY = pdf.internal.pageSize.height / contentHeight;
  const scale = Math.min(scaleX, scaleY);

  try {
    await new Promise((resolve, reject) => {
      pdf.html(element, {
        html2canvas: {
          scale: scale,
          logging: true,
        },
        callback: function () {
          // This code will run after PDF generation is complete
          pdf.save('will.pdf');
          resolve();
        },
      });
    });
  } catch (error) {
    // This code will run if an error occurs during PDF generation
    console.error('PDF generation error:', error);
  } finally {
    // This code will always run, regardless of success or failure
    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
  }
});

function showErrorAlert(type) {
  showToast(
    'alert-toast-container',
    `Please assign your "${type} Co-Sampul" on the Beloved page or <a href="beloved.html">click to here assign</a>.`,
    'secondary'
  );
}

function updateElementsView(data) {
  if (data?.profiles) {
    displayElements.willElements.nric_name.innerText = data.nric_name;
    displayElements.willElements.label_code.innerText = data.label_code;
    displayElements.willElements.will_code.innerText = data.will_code;
    displayElements.willElements.last_updated.innerText = formatTimestamp(
      data.last_updated
    );
    const imageUrl = data.image_path
      ? `${CDNURL}${data.image_path}`
      : emptyQrCodeImg;

    displayElements.willElements.image_path.src = imageUrl;

    displayElements.detailsElements.nric_name.innerText =
      data.profiles.nric_name;
    displayElements.detailsElements.last_updated.innerText = formatTimestamp(
      data.last_updated
    );
    displayElements.detailsElements.nric_no.innerText = data.profiles.nric_no;
    displayElements.detailsElements.address.innerText = `${data.profiles.address_1} ${data.profiles.address_2}, ${data.profiles.city}, ${data.profiles.country}`;

    displayElements.detailsElements.nric_name_2.innerText =
      data.profiles.nric_name;
    displayElements.detailsElements.last_updated_2.innerText = formatTimestamp(
      data.last_updated
    );
    displayElements.detailsElements.nric_no_2.innerText = data.profiles.nric_no;

    if (data.will_code) {
      var url = `${webInfo.parentUrl}/${pageName.view_will}?will_id=${data.will_code}`;
      shareModalAction(url, 'Will Certificate');
    }
  }
  if (data?.beloved) {
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
        displayElements.detailsElements.primary_co_sampul_name.innerText =
          primaryUser.nric_name;
        displayElements.detailsElements.primary_co_sampul_email.innerText =
          primaryUser.email;
        displayElements.detailsElements.primary_co_sampul_phone_no.innerText =
          primaryUser.phone_no;
        displayElements.detailsElements.primary_co_sampul_nric_no.innerText =
          primaryUser.nric_no;
        proceed = true;
      } else {
        proceed = false;
        showErrorAlert('primary');
        genereateWillBtn.addEventListener('click', function (event) {
          showErrorAlert('primary');
        });
        genereateWillBtn2.addEventListener('click', function (event) {
          showErrorAlert('primary');
        });
      }

      if (Object.keys(secondaryUser).length !== 0) {
        displayElements.detailsElements.secondary_co_sampul_name.innerText =
          secondaryUser.nric_name;
        displayElements.detailsElements.secondary_co_sampul_email.innerText =
          secondaryUser.email;
        displayElements.detailsElements.secondary_co_sampul_phone_no.innerText =
          secondaryUser.phone_no;
        displayElements.detailsElements.secondary_co_sampul_nric_no.innerText =
          secondaryUser.nric_no;
        proceed = true;
      } else {
        proceed = false;
        showErrorAlert('secondary');
        genereateWillBtn.addEventListener('click', function (event) {
          showErrorAlert('secondary');
        });
        genereateWillBtn2.addEventListener('click', function (event) {
          showErrorAlert('secondary');
        });
      }
    }
  }
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

async function generating(btnId) {
  if (proceed == true) {
    let useBtn = document.getElementById(btnId);
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserSession();
    const updatedTime = new Date().toISOString();

    const updateData = {
      label_code: generateLabelId(),
      last_updated: updatedTime,
      nric_name: myWillData.profiles.nric_name,
    };

    const addData = {
      ...updateData,
      will_code: generateWillId(),
    };

    const { data: checkExist, error: errorCheckExist } = await supabaseClient
      .from(dbName.wills)
      .select('*')
      .eq('uuid', userId)
      .select()
      .single();

    if (checkExist) {
      const { data, error } = await supabaseClient
        .from(dbName.wills)
        .update({
          ...updateData,
        })
        .eq('uuid', userId)
        .select()
        .single();

      generateQRCode(data, useBtn, defaultBtnText);

      if (error) {
        console.error('Error', error.message);
        showToast('alert-toast-container', error.message, 'danger');
      } else {
        showToast('alert-toast-container', 'Success!', 'success');
        reinitiate();
      }
    } else {
      const { data, error } = await supabaseClient
        .from(dbName.wills)
        .upsert({
          uuid: userId,
          ...addData,
        })
        .select()
        .single();

      generateQRCode(data, useBtn, defaultBtnText);

      if (error) {
        console.error('Error', error.message);
        showToast('alert-toast-container', error.message, 'danger');
      } else {
        showToast('alert-toast-container', 'Success!', 'success');
        reinitiate();
      }
    }

    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
  }
}

function dataURLtoFile(dataURL, filename) {
  var arr = dataURL.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

async function generateQRCode(data, useBtn, defaultBtnText) {
  var will_id = data.will_code;
  var container = document.getElementById('qr-code-container');
  container.innerHTML = '';

  var url = `${webInfo.parentUrl}/${pageName.view_will}?will_id=${will_id}`;
  var qrcode = new QRCode(container, {
    text: url,
    width: 150,
    height: 150,
  });
  qrcode.makeCode(url);

  var canvas = container.getElementsByTagName('canvas')[0];
  var imageDataUrl = canvas.toDataURL();
  var file = dataURLtoFile(imageDataUrl, `qr_code_${will_id}.png`);

  const userId = await getUserSession();
  const directory = `/will/`;
  const imageInput = {
    files: [file],
  };

  await replaceOrAddImage({
    userId,
    returnData: data,
    directory,
    imageInput,
    useBtn,
    defaultBtnText,
    dataBase: dbName.wills,
    isUpdateByReturnId: false,
  });
}

genereateWillBtn.addEventListener('click', async function (event) {
  generating('generate-will-btn');
});

document
  .getElementById('generate-wasiat-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();
    generating('generate-will-btn-2');
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
  const userId = await getUserSession();

  if (!userId) {
    return;
  }

  try {
    const [willData, belovedData, digitalAssetsData] = await Promise.all([
      fetchWillData(userId),
      fetchBelovedData(userId),
      fetchDigitalAssetsData(userId),
    ]);

    updateElementsView({ ...willData, beloved: belovedData });
    myWillData = willData;
    populateToAllDigitalAssetsTable(digitalAssetsData, belovedData);
  } catch (error) {
    console.error('Error', error.message);
    showToast('alert-toast-container', error.message, 'danger');
  }
}

async function fetchWillData(userId) {
  const { data, error } = await supabaseClient
    .from(dbName.wills)
    .select(`*, ${dbName.profiles} ( * )`)
    .eq('uuid', userId)
    .single();

  if (error) {
    console.log(error.message);
  }

  return data;
}

async function fetchBelovedData(userId) {
  const { data, error } = await supabaseClient
    .from(dbName.beloved)
    .select('*')
    .eq('uuid', userId);

  if (error) {
    console.log(error.message);
  }

  return data;
}

async function fetchDigitalAssetsData(userId) {
  const { data, error } = await supabaseClient
    .from(dbName.digital_assets)
    .select('*')
    .eq('uuid', userId);

  if (error) {
    console.log(error.message);
  }

  return data;
}

function populateToAllDigitalAssetsTable(tableData, belovedData) {
  const tableColumns = [
    {
      title: '<small class="smpl_text-xs-medium">Assets</small>',
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
                    <div class="smpl_text-sm-medium">${platformName}</div>
                    <div class="smpl_text-sm-regular">${row.email}</div>
                  </div>
              </div>
        `;
      },
    },
    {
      title: '<small class="smpl_text-xs-medium">Beneficiaries</small>',
      data: 'uui',
      render: function (data, type, row, meta) {
        const beloved = belovedData.find((item) => item.id === row.beloved_id);
        const relationshipValue = beloved?.relationship;
        const relation = relationships().find(
          (item) => item.value === relationshipValue
        );
        const relationName = relation?.name || '';
        const belovedImg = beloved?.image_path
          ? `${CDNURL}${beloved.image_path}`
          : emptyUserImg;

        return `<div class="custom-table-cell">
                  <img
                    loading="lazy"
                    src="${belovedImg}"
                    alt=""
                    class="avatar-8"
                  />
                  <div>
                    <div class="smpl_text-sm-medium">Ahmad</div>
                    <div class="smpl_text-sm-regular">${relationName}</div>
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
                  <div class="text-sm-regular-8">${declaredValueName}</div>
              </div>
        `;
      },
    },
    {
      title: '<small class="smpl_text-xs-medium">Type</small>',
      data: 'uui',
      render: function (data, type, row, meta) {
        let accountType = servicePlatformAccountTypes().find(
          (item) => item.value === row.account_type
        );
        const accountTypeName = accountType?.name || '';
        return `<div class="custom-table-cell">
                  <div class="badge-instructions w-inline-block" style="text-align:center">
                    <span class="text-xs-medium">${accountTypeName}</span>
                  <div>
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
                    <span class="text-xs-medium">${instructionsName}</span>
                  </div>
                </div>
        `;
      },
    },
  ];

  const tableLoader = document.getElementById(
    'all-digital-assets-table-loader'
  );
  populateToTable(
    '#all-digital-assets-table',
    tableData,
    tableColumns,
    tableLoader
  );
}

function reinitiate() {
  var table = $('#all-digital-assets-table').DataTable();
  table.destroy();
  fetchWill();
}

$(document).ready(function () {
  roleUIbased('global');
  fetchWill();

  var saveData = getSavedData('masterData');
  if (saveData) {
    mapViewElements(saveData, displayElementsSidebar);
  }
});
