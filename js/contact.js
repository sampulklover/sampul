document.getElementById('footer-container').innerHTML = footer();
newsletterFormAddAPI();
document.getElementById('nav-bar-container').innerHTML = navBar();
navBarAuthUpdate();

const inputElements = {
  add_contact_us_form: {
    name: document.getElementById('input-contact-us-name'),
    email: document.getElementById('input-contact-us-email'),
    message: document.getElementById('input-contact-us-message'),
  },
  view_contact: {
    email: document.getElementById('view-contact-email'),
    phone_no: document.getElementById('view-contact-phone-no'),
    address: document.getElementById('view-contact-address'),
  },
};

function updateViewContactInfo(info) {
  for (const key in inputElements.view_contact) {
    if (info.hasOwnProperty(key)) {
      inputElements.view_contact[key].innerHTML = info[key];
    }
  }
}

inputElements.view_contact.email.addEventListener(
  'click',
  async function (event) {
    openEmailApp(companyInfo.email);
  }
);

document
  .getElementById('add-contact-us-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-contact-us-add-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const addData = processForm(inputElements.add_contact_us_form);

    const { data, error } = await supabaseClient
      .from(dbName.contact_us)
      .insert({
        ...addData,
      });

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
    } else {
      processForm(inputElements.add_contact_us_form, true);
      showToast(
        'alert-toast-container',
        'Thank you for reaching out! your message has been successfully submitted!',
        'success'
      );
    }

    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
  });

$(document).ready(function () {
  updateViewContactInfo(companyInfo);
});
