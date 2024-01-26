const formConfigs = [
  {
    containerId: 'nav-bar-container',
    formFunction: navBar(),
  },
  {
    containerId: 'footer-container',
    formFunction: footer(),
  },
];

formConfigs.forEach((item) => {
  document.getElementById(item.containerId).innerHTML = item.formFunction;
});

newsletterFormAddAPI();

const buttonConfigs = [
  {
    buttonId: 'btn-back-to-login',
    action: () => {
      location.href = pageName.log_in;
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

const inputElements = {
  add_update_password: {
    password: document.getElementById('input-update-passowrd-new-password'),
  },
};

document
  .getElementById('add-update-password-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-update-password-add-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const addData = processForm(inputElements.add_update_password, false);

    const { data, error } = await supabaseClient.auth.updateUser({
      ...addData,
    });

    if (error) {
      console.error('Error', error.message);
      handleFormResult({ error, useBtn, defaultBtnText });
      return;
    }

    processForm(inputElements.add_update_password, true);
    handleFormResult({
      error,
      useBtn,
      defaultBtnText,
    });
  });
