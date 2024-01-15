document.getElementById('footer-container').innerHTML = footer();
newsletterFormAddAPI();
document.getElementById('nav-bar-container').innerHTML = navBar();
navBarAuthUpdate();

const inputElements = {
  view_contact: {
    email: document.getElementById('press-email-text'),
  },
};

inputElements.view_contact.email.innerHTML = companyInfo.press_email;
inputElements.view_contact.email.addEventListener(
  'click',
  async function (event) {
    openEmailApp(companyInfo.press_email);
  }
);

document
  .getElementById('btn-about-contact-us')
  .addEventListener('click', async function (event) {
    openEmailApp(companyInfo.press_email);
  });
