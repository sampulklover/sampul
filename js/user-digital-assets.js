async function fetchBeneficiaries() {
  const userId = await getUserUUID();

  if (userId) {
    const { data, error } = await supabaseClient
      .from(dbName.beneficiaries)
      .select('id, name, nickname')
      .eq('uuid', userId);
    if (error) {
      console.error('Error', error.message);
    } else {
      if (data.length === 0) {
        mapToSelect(addNew(), 'select-beneficiary');
        document
          .getElementById('select-beneficiary')
          .addEventListener('change', (event) => {
            const selectedValue = event.target.value;
            console.log(selectedValue);
            if (selectedValue === 'add_new') {
              location.href = pageName.beloved;
            }
          });
      } else {
        const modifiedData = data.map((item) => ({
          value: item.id,
          name: item.name,
        }));
        mapToSelect(modifiedData, 'select-beneficiary');
      }
    }
  }
}

const input_username = document.getElementById('input-username');
const input_email = document.getElementById('input-email');
const select_service_platform = document.getElementById(
  'select-service-platform'
);
const select_type = document.getElementById('select-type');
const select_frequency = document.getElementById('select-frequency');
const select_declared_value = document.getElementById('select-declared-value');
const select_instructions_after_death = document.getElementById(
  'select-instructions-after-death'
);
const select_beneficiary = document.getElementById('select-beneficiary');
const input_remarks = document.getElementById('input-remarks');

document
  .getElementById('addDigitalAssetForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const userId = await getUserUUID();

    const { data, error } = await supabaseClient
      .from(dbName.digital_assets)
      .insert({
        uuid: userId,
        username: input_username.value,
        email: input_email.value,
        service_platform: select_service_platform.value,
        account_type: select_type.value,
        frequency: select_frequency.value,
        declared_value_myr: select_declared_value.value,
        instructions_after_death: select_instructions_after_death.value,
        beneficiaries_id: select_beneficiary.value,
        remarks: input_remarks.value,
      });

    if (error) {
      console.error('Error', error.message);
    } else {
      console.log('Successful!', data);
      fetchAssets();
    }
  });

var assetData = [];
async function fetchAssets() {
  const userId = await getUserUUID();

  if (userId) {
    const { data, error } = await supabaseClient
      .from(dbName.digital_assets)
      .select('*')
      .eq('uuid', userId);
    if (error) {
      console.error('Error', error.message);
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

$(document).ready(function () {
  mapToSelect(servicePlatforms(), 'select-service-platform');
  mapToSelect(servicePlatformAccountTypes(), 'select-type');
  mapToSelect(servicePlatformFrequencies(), 'select-frequency');
  mapToSelect(declaredValues(), 'select-declared-value');
  mapToSelect(instructionsAfterDeath(), 'select-instructions-after-death');

  fetchBeneficiaries();
  fetchAssets();
});
