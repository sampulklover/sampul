window.jsPDF = window.jspdf.jsPDF; // required for jspdf
document.getElementById('sampul-will-logo').src = sampulWillLogo;

var will_found = false;

const formConfigs = [
  {
    containerId: 'share-modal-form-container',
    modalFormFunction: shareModalForm(),
  },
];

formConfigs.forEach((item) => {
  document.getElementById(item.containerId).innerHTML = item.modalFormFunction;
});

const inputElements = {
  willElements: {
    nric_name: document.getElementById('view-certificate-nric-name'),
    label_code: document.getElementById('view-certificate-label-code'),
    will_code: document.getElementById('view-certificate-will-code'),
    last_updated: document.getElementById('view-certificate-last-generated'),
    image_path: document.getElementById('view-certificate-image'),
  },
};

const buttonConfigs = [
  {
    buttonId: 'download-will-btn',
    action: async () => {
      if (!will_found) {
        showToast('alert-toast-container', 'Will Id not found!', 'danger');
        return;
      }
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
              pdf.save('my_will.pdf');
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
    },
  },
  {
    buttonId: 'open-share-modal-btn',
    action: () => {
      if (!will_found) {
        showToast('alert-toast-container', 'Will Id not found!', 'danger');
        return;
      }
      $('#share-modal').modal('show');
    },
  },
  {
    buttonId: 'go-home-btn',
    action: () => {
      location.href = 'index.html';
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

async function initialFetch() {
  var urlParams = new URLSearchParams(window.location.search);
  var will_id = urlParams.get('will_id');

  if (!will_id) {
    showToast('alert-toast-container', 'Will Id not found!', 'danger');
    return;
  }

  try {
    const [willData] = await Promise.all([fetchWillData(will_id)]);
    mapViewElements(willData, inputElements.willElements);

    if (willData?.will_code) {
      will_found = true;
      var url = `${webInfo.parentUrl}/${pageName.view_will}?will_id=${willData.will_code}`;
      shareModalAction(url, 'Will Certificate');
    }
  } catch (error) {
    console.error('Error', error.message);
    showToast('alert-toast-container', error.message, 'danger');
  }
}

async function fetchWillData(will_id) {
  const { data, error } = await supabaseClient
    .from(dbName.wills)
    .select(`*, ${dbName.profiles} ( nric_name )`)
    .eq('will_code', will_id)
    .single();

  if (error) {
    console.log(error.message);
  }

  if (!data) {
    showToast('alert-toast-container', 'Will Id not found!', 'danger');
  }

  return data;
}

$(document).ready(function () {
  initialFetch();
});
