function mapToSelect(list, elementId) {
  if (list.length > 0 && elementId) {
    list.forEach((items) => {
      const option = document.createElement('option');
      option.value = items.value;
      option.text = items.name;
      document.getElementById(elementId).appendChild(option);
    });
  }
}

function spinnerLoading(text) {
  return (
    text + `<div class="spinner-border spinner-border-sm" role="status"></div>`
  );
}

function showToast(parentContainerId = '', message, type = '') {
  const toastContainer = document.getElementById(parentContainerId);

  const alertHTML = `
      <div class="toast toast-container align-items-center text-white bg-${type} border-0"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style="position: fixed; top: 20px; right: 20px; z-index: 9999"
      >
      <div class="d-flex">
        <div class="toast-body"></span>${message}</div>
        <button
          type="button"
          class="close mr-2"
          aria-label="Close"
          data-dismiss="toast"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      </div>
      `;
  toastContainer.innerHTML = alertHTML;

  $('.toast').toast({
    autohide: true,
    delay: 5000,
  });
  $('.toast').toast('show');
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

function populateToTable(
  tableId,
  tableData,
  columns,
  loaderId,
  information = true,
  searchBar = true,
  pagingination = true
) {
  const table = $(tableId).DataTable({
    data: tableData,
    columns: columns,
    lengthChange: false,
    info: information,
    searching: searchBar,
    paging: pagingination,
    buttons: [
      {
        extend: 'csv',
        // split: ["pdf", "excel"],
      },
    ],
    drawCallback: function () {
      loaderId.style.display = 'none';
    },
  });

  let checkedRows = [];

  // Add click event handler for checkAll checkbox
  $(`${tableId}_checkAll`).on('click', function () {
    const isChecked = $(this).prop('checked');
    if (isChecked) {
      // Set checked attribute and push data for all checkboxes with id="checkItem"
      table
        .rows()
        .nodes()
        .each(function (row) {
          const checkbox = $(row).find("input[type='checkbox']");
          if (checkbox.attr('id') === 'checkItem') {
            checkbox.prop('checked', true);
            const rowData = table.row(row).data();
            if (!isCheckedRow(rowData)) {
              checkedRows.push(rowData);
            }
          }
        });
    } else {
      // Remove checked attribute and remove data for all checkboxes with id="checkItem"
      table
        .rows()
        .nodes()
        .each(function (row) {
          const checkbox = $(row).find("input[type='checkbox']");
          if (checkbox.attr('id') === 'checkItem') {
            checkbox.prop('checked', false);
            const rowData = table.row(row).data();
            const index = checkedRows.findIndex(
              (item) => item.id === rowData.id
            );
            if (index >= 0) {
              checkedRows.splice(index, 1);
            }
          }
        });
    }
  });

  // Add click event handler for individual checkboxes
  $(document).on('click', `${tableId}_checkItem`, function () {
    const rowData = table.row($(this).closest('tr')).data();
    if ($(this).prop('checked')) {
      if (!isCheckedRow(rowData)) {
        checkedRows.push(rowData);
      }
    } else {
      const index = checkedRows.findIndex((item) => item.id === rowData.id);
      if (index >= 0) {
        checkedRows.splice(index, 1);
      }
    }
  });

  // Function to check if a row is already checked
  function isCheckedRow(rowData) {
    return checkedRows.some((item) => item.id === rowData.id);
  }
}

function mapValueElements(source, target) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object') {
        for (const nestedKey in source[key]) {
          if (target[nestedKey]) {
            target[nestedKey].value = source[key][nestedKey];
          }
        }
      } else if (target[key]) {
        if (target[key].tagName === 'IMG') {
          target[key].src = `${CDNURL}${source[key]}`;
        } else {
          target[key].value = source[key];
        }
      }
    }
  }
}

function mapViewElements(source, target) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object') {
        for (const nestedKey in source[key]) {
          if (target[nestedKey]) {
            if (nestedKey == 'last_updated') {
              target[nestedKey].innerText = formatTimestamp(
                source[key][nestedKey]
              );
            } else {
              target[nestedKey].innerText = source[key][nestedKey];
            }
          }
        }
      } else if (target[key]) {
        if (target[key].tagName === 'IMG') {
          target[key].src = `${CDNURL}${source[key]}`;
        } else {
          target[key].innerText = source[key];
        }
      }
    }
  }
}

function mapImageElements(source, target) {
  for (const key in source) {
    target[key].preview.addEventListener('click', function (event) {
      target[key].edit.click();
    });

    target[key].edit.addEventListener('change', function (event) {
      if (event.target.files.length > 0) {
        let imageURL = URL.createObjectURL(event.target.files[0]);
        target[key].preview.src = `${imageURL}`;
      }
    });
  }
}

async function replaceOrAddImage(
  userId,
  returnData,
  directory,
  imageInput,
  useBtn,
  type,
  db
) {
  if (imageInput.files.length > 0) {
    if (returnData.image_path && type == 'replace') {
      const { data, error } = await supabaseClient.storage
        .from(bucketName)
        .remove([returnData.image_path]);

      if (error) {
        showToast('alert-toast-container', error.message, 'danger');
        console.error('Error', error.message);
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
      }
    }

    const file = imageInput.files[0];
    const imagePath = userId + directory + file.name;

    const { data: uploadedImage, error } = await supabaseClient.storage
      .from(bucketName)
      .upload(imagePath, file);

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
    } else {
      if (type == 'replace') {
        const { data, error } = await supabaseClient
          .from(db)
          .update({
            image_path: uploadedImage.path,
          })
          .eq('uuid', userId);

        if (error) {
          console.error('Error', error.message);
          showToast('alert-toast-container', error.message, 'danger');
        }
      } else {
        const { data, error } = await supabaseClient
          .from(db)
          .update({
            image_path: uploadedImage.path,
          })
          .eq('uuid', userId)
          .eq('id', returnData.id);

        if (error) {
          console.error('Error', error.message);
          showToast('alert-toast-container', error.message, 'danger');
        }
      }
    }
  }
}

function toggleVisibility(elements, isVisible) {
  for (const key in elements) {
    if (elements.hasOwnProperty(key)) {
      const element = elements[key];
      element.style.display = isVisible ? 'block' : 'none';
    }
  }
}

function processForm(elements, clearFields = false) {
  const addData = {};

  for (const key in elements) {
    if (key !== 'image_path') {
      addData[key] = elements[key].value;
    }
  }

  if (clearFields) {
    for (const key in elements) {
      if (key !== 'image_path') {
        elements[key].value = '';
      }
    }
  }

  return addData;
}

function openEmailApp(emailTo) {
  if (emailTo) {
    var emailAddress = emailTo;
    var mailtoUrl = 'mailto:' + emailAddress;
    window.location.href = mailtoUrl;
  } else {
    showToast('alert-toast-container', 'Contact email to found!', 'danger');
  }
}
