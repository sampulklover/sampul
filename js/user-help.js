document.getElementById('footer-container').innerHTML = footer();
newsletterFormAddAPI();
document.getElementById('nav-bar-container').innerHTML = navBar();
navBarAuthUpdate();

const inputElements = {
  view_contact: {
    email: document.getElementById('press-email-text'),
  },
};

inputElements.view_contact.email.innerHTML = companyInfo.email;
inputElements.view_contact.email.addEventListener(
  'click',
  async function (event) {
    openEmailApp(companyInfo.press_email);
  }
);

var userHelpData = [];

let typingTimer = null;
const doneTypingInterval = 500;

document.getElementById('input-search').addEventListener('input', function () {
  const userInput = this.value.toLowerCase();
  clearTimeout(typingTimer);

  typingTimer = setTimeout(function () {
    const filteredData = userHelpData.filter((item) => {
      const searchableProperties = ['title', 'description'];

      return searchableProperties.some((prop) =>
        item[prop].toLowerCase().includes(userInput)
      );
    });

    populateUserHelp(filteredData);
  }, doneTypingInterval);
});

async function populateUserHelp(allData = []) {
  const listLoader = document.getElementById('user-help-list-loader');
  const listEmpty = document.getElementById('user-help-list-empty');
  const listContainer = document.getElementById('user-help-list-container');
  const listBody = document.getElementById('user-help-list-body');

  var records = [];

  allData.forEach((item) => {
    const card = listBody.cloneNode(true);
    const divs = card.getElementsByTagName('div');

    const title = divs[0].getElementsByTagName('span');

    title[0].innerText = item.title;
    title[1].innerText = item.description;

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

async function fetchUserHelp() {
  const { data, error } = await supabaseClient
    .from(dbName.questions)
    .select('*');

  if (error) {
    console.error('Error', error.message);
    showToast('alert-toast-container', error.message, 'danger');
  } else {
    populateUserHelp(data);
    userHelpData = data;
  }
}

$(document).ready(function () {
  fetchUserHelp();
});
