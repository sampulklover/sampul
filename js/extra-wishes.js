const formConfigs = [
  {
    containerId: 'add-sign-out-modal-container',
    formFunction: signOutModalForm(),
  },
];

formConfigs.forEach((item) => {
  document.getElementById(item.containerId).innerHTML = item.formFunction;
});

const displayElementsSidebar = {
  image_path: document.getElementById('sidebar-profile-image'),
  username: document.getElementById('sidebar-profile-username'),
};

const buttonConfigs = [
  {
    buttonId: 'open-sign-out-modal-btn',
    action: () => {
      $('#sign-out-modal').modal('show');
    },
  },
  {
    buttonId: 'btn-extra-wishes-nazar-cancel-form',
    action: () => {},
  },
  {
    buttonId: 'btn-extra-wishes-nazar-save-form',
    action: () => {},
  },
];

buttonConfigs.forEach((btnConfig) => {
  document
    .getElementById(btnConfig.buttonId)
    .addEventListener('click', function () {
      btnConfig.action();
    });
});

var extra_wishes_data = null;

const inputElements = {
  nazar: {
    form: document.getElementById('extra-wishes-nazar-form'),
    elements: {
      nazar_wishes: document.getElementById('input-extra-wishes-nazar-wishes'),
      nazar_est_cost_myr: document.getElementById(
        'input-extra-wishes-nazar-est-cost'
      ),
    },
    button: {
      cancel: document.getElementById('btn-extra-wishes-nazar-cancel-form'),
      action: () => {
        elements = inputElements.nazar.elements;
        elements.nazar_wishes.value = extra_wishes_data.nazar_wishes;
        elements.nazar_est_cost_myr.value =
          extra_wishes_data.nazar_est_cost_myr;
      },
    },
  },
  fidyah: {
    form: document.getElementById('extra-wishes-fidyah-form'),
    elements: {
      fidyah_fast_left_days: document.getElementById(
        'input-extra-wishes-fidyah-fast-left-days'
      ),
      fidyah_amout_due_myr: document.getElementById(
        'input-extra-wishes-fidyah-amount-due'
      ),
    },
    button: {
      cancel: document.getElementById('btn-extra-wishes-fidyah-cancel-form'),
      action: () => {
        elements = inputElements.fidyah.elements;
        elements.fidyah_fast_left_days.value =
          extra_wishes_data.fidyah_fast_left_days;
        elements.fidyah_amout_due_myr.value =
          extra_wishes_data.fidyah_amout_due_myr;
      },
    },
  },
  charity: {
    form: document.getElementById('extra-wishes-charity-form'),
    elements: {
      charity_bodies: document.getElementById(
        'multiselect-extra-wishes-charity-bodies'
      ),
      charity_amout_myr: document.getElementById(
        'input-extra-wishes-charity-amount'
      ),
    },
    button: {
      cancel: document.getElementById('btn-extra-wishes-charity-cancel-form'),
      action: () => {
        elements = inputElements.charity.elements;
        elements.charity_amout_myr.value = extra_wishes_data.charity_amout_myr;

        // for (var i = 0; i < elements.charity_bodies.length; i++) {
        //   if (
        //     elements.charity_bodies[i].value.includes(
        //       extra_wishes_data.charity_bodies
        //     )
        //   ) {
        //     elements.charity_bodies[i].selected = true;
        //   } else {
        //     elements.charity_bodies[i].selected = false;
        //   }
        // }

        // var selectedValues = [];
        // for (var i = 0; i < elements.charity_bodies.length; i++) {
        //   if (elements.charity_bodies[i].selected) {
        //     selectedValues.push(elements.charity_bodies[i].value);
        //   }
        // }
      },
    },
  },
  waqf: {
    form: document.getElementById('extra-wishes-waqf-form'),
    elements: {
      waqf_bodies: document.getElementById(
        'multiselect-extra-wishes-waqf-foundation'
      ),
      waqf_amout_myr: document.getElementById('input-extra-wishes-waqf-amount'),
    },
    button: {
      cancel: document.getElementById('btn-extra-wishes-waqf-cancel-form'),
      action: () => {
        elements = inputElements.waqf.elements;
        elements.waqf_amout_myr.value = extra_wishes_data.waqf_amout_myr;
      },
    },
  },
};

for (const key in inputElements) {
  const form = inputElements[key].form;
  const elements = inputElements[key].elements;

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = event.submitter;
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserSession();
    const addData = processForm(elements, false);
    const db = supabaseClient.from(dbName.extra_wishes);

    try {
      const { data } = await db.select('*').eq('uuid', userId);

      if (data.length !== 0) {
        await db.update(addData).eq('uuid', userId);
      } else {
        await db.insert({ uuid: userId, ...addData });
      }

      handleFormResult({ useBtn, defaultBtnText });
    } catch (error) {
      console.error('Error', error.message);
      handleFormResult({ error, useBtn, defaultBtnText });
    }
  });

  inputElements[key].button.cancel.addEventListener('click', function (event) {
    inputElements[key].button.action();
  });
}

async function initialFetch() {
  const userId = await getUserSession();

  if (userId) {
    const { data, error } = await supabaseClient
      .from(dbName.extra_wishes)
      .select('*')
      .eq('uuid', userId);

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
    } else {
      if (data.lenght !== 0) {
        for (const key in inputElements) {
          if (inputElements.hasOwnProperty(key)) {
            mapValueElements(data[0], inputElements[key].elements);
          }
        }
      }

      $('.chosen-select').chosen();
      extra_wishes_data = data[0];
    }
  }
}

function mapElements() {
  mapToSelect(charityBodies(), 'multiselect-extra-wishes-charity-bodies');
  mapToSelect(waqfBodies(), 'multiselect-extra-wishes-waqf-foundation');
}

$(document).ready(function () {
  var saveData = getSavedData('masterData');
  if (saveData) {
    mapViewElements(saveData, displayElementsSidebar);
  }
  mapElements();
  initialFetch();
});
