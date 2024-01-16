document.getElementById('footer-container').innerHTML = footer();
newsletterFormAddAPI();
document.getElementById('nav-bar-container').innerHTML = navBar();
navBarAuthUpdate();

var carrerData = [];

async function populateUserHelp(allData = []) {
  const listLoader = document.getElementById('carrer-list-loader');
  const listEmpty = document.getElementById('carrer-list-empty');
  const listContainer = document.getElementById('carrer-list-container');
  const listBody = document.getElementById('carrer-list-body');

  var records = [];

  allData.forEach((item) => {
    const card = listBody.cloneNode(true);
    const divs = card.getElementsByTagName('div');

    const title = divs[0].getElementsByTagName('span');

    const cObject = careerCategories().find((x) => x.value === item.category);

    title[0].innerText = cObject.name;

    const outerContainer = divs[8];

    item.data.map((item2) => {
      const innerContainer = divs[8].cloneNode(true);
      const innerItem = innerContainer.getElementsByTagName('div')[0];
      const nameSpan = innerItem.getElementsByTagName('span');
      const images = innerItem.getElementsByTagName('img');
      const link = innerItem.getElementsByTagName('a');

      const c2Object = countries().find((x) => x.value === item2.country);

      images[0].src = c2Object.flag_icon;
      nameSpan[0].innerText = item2.title;
      nameSpan[1].innerText = `${item2.city}, ${c2Object.name}`;
      nameSpan[2].innerText = item2.description;
      link[0].href = `mailto:${companyInfo.email}?subject=Application%20for%20${item2.title}%20at%20${companyInfo.name}`;

      outerContainer.appendChild(innerItem);
    });

    const firstInnerDiv = outerContainer.querySelector('div');
    if (firstInnerDiv) {
      outerContainer.removeChild(firstInnerDiv);
    }

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
      reloadWebflow();
    });
  }
}

function reloadWebflow() {
  var existingScript = document.querySelector('script[src="js/webflow.js"]');
  existingScript.parentNode.removeChild(existingScript);
  var newScript = document.createElement('script');
  newScript.src = 'js/webflow.js';
  newScript.type = 'text/javascript';
  document.body.appendChild(newScript);
}

async function fetchCareer() {
  const { data, error } = await supabaseClient
    .from(dbName.careers)
    .select('*')
    .eq('is_active', true);

  if (error) {
    console.error('Error', error.message);
    showToast('alert-toast-container', error.message, 'danger');
  } else {
    const organizedData = {};

    data.forEach((item) => {
      const category = item.category;
      if (!organizedData[category]) {
        organizedData[category] = { category, data: [] };
      }

      organizedData[category].data.push({ ...item });
    });

    const result = Object.values(organizedData).map((item) => ({
      category: item.category,
      data: item.data,
    }));

    populateUserHelp(result);
    carrerData = result;
  }
}

$(document).ready(function () {
  fetchCareer();
});
