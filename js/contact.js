const inputElements = {
  add_contact_us_form: {
    name: document.getElementById('input-contact-us-name'),
    email: document.getElementById('input-contact-us-email'),
    message: document.getElementById('input-contact-us-message'),
  },
};

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
      handleFormResult({ error, useBtn, defaultBtnText });
      return;
    }

    processForm(inputElements.add_contact_us_form, true);

    handleFormResult({
      error,
      useBtn,
      defaultBtnText,
      successText:
        'Thank you for reaching out! your message has been successfully submitted!',
    });
  });
