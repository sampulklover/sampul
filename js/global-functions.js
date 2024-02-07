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

function formatTimestamp(
  timestamp,
  options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
) {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', options);
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
      if (Array.isArray(source[key]) === true) {
        if (target[key]) {
          for (var i = 0; i < target[key].options.length; i++) {
            var optionValue = target[key].options[i].value;
            if (source[key].includes(optionValue)) {
              target[key].options[i].selected = true;
            }
          }
        }
      } else if (typeof source[key] === 'object') {
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
        if (key == 'last_updated') {
          target[key].innerText = formatTimestamp(source[key]);
        } else if (target[key].tagName === 'IMG') {
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

async function replaceOrAddImage(options) {
  const {
    userId,
    returnData,
    directory,
    imageInput,
    useBtn,
    defaultBtnText,
    dataBase,
    isUpdateByReturnId = false,
  } = options;

  if (imageInput.files.length > 0) {
    await deleteImage({
      returnData,
      useBtn,
      defaultBtnText,
    });

    const file = imageInput.files[0];
    const imagePath = userId + directory + file.name;

    const { data: uploadedImage, error } = await supabaseClient.storage
      .from(bucketName)
      .upload(imagePath, file);

    if (error) {
      console.error('Error', error.message);
      handleFormResult({ error, useBtn, defaultBtnText });
      return;
    } else {
      let query = supabaseClient.from(dataBase);

      if (isUpdateByReturnId) {
        query = query
          .update({
            image_path: uploadedImage.path,
          })
          .eq('uuid', userId)
          .eq('id', returnData.id);
      } else {
        query = query
          .update({
            image_path: uploadedImage.path,
          })
          .eq('uuid', userId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error', error.message);
        handleFormResult({ error, useBtn, defaultBtnText });
        return;
      }
    }
  }
}

async function deleteImage(options) {
  const { returnData, useBtn, defaultBtnText } = options;

  if (returnData?.image_path) {
    const { data, error } = await supabaseClient.storage
      .from(bucketName)
      .remove([returnData.image_path]);

    if (error) {
      handleFormResult({ error, useBtn, defaultBtnText });
    }
  }
}

function handleFormResult(options) {
  const {
    error,
    useBtn,
    defaultBtnText,
    successText = 'Success!',
    failedText = '',
  } = options;

  if (error) {
    if (error.message) {
      console.error('Error', error.message);
      showToast(
        'alert-toast-container',
        failedText ? failedText : error.message,
        'danger'
      );
    } else {
      console.error('Error', error);
    }
  } else {
    showToast('alert-toast-container', successText, 'success');
  }

  if (useBtn) {
    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
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

  if (clearFields) {
    for (const key in elements) {
      if (key !== 'image_path') {
        elements[key].value = '';
      }
    }
  } else {
    for (const key in elements) {
      if (key !== 'image_path') {
        if (elements[key].tagName == 'SELECT' && elements[key].multiple) {
          var selectedValues = [];
          for (var i = 0; i < elements[key].length; i++) {
            if (elements[key][i].selected) {
              selectedValues.push(elements[key][i].value);
            }
          }
          addData[key] = selectedValues;
        } else {
          addData[key] = elements[key].value;
        }
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

function estimateReadingTime(text) {
  // Assuming average reading speed is 200 words per minute
  var wordsPerMinute = 200;

  // Counting the number of words in the text
  var wordCount = text.split(/\s+/).length;

  // Calculating the estimated reading time in minutes
  var readingTime = Math.ceil(wordCount / wordsPerMinute);

  return readingTime;
}

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function saveData(key, data) {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  } catch (error) {
    console.error('Error:', error);
  }
}

function getSavedData(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

function roleUIbased(pageName) {
  const roleUIconfig = {
    admin: {
      global: [
        {
          element_id: 'sidebar-tab-administrator',
          visibility: 'block',
        },
      ],
    },
    user: {
      global: [
        {
          element_id: 'sidebar-tab-administrator',
          visibility: 'none',
        },
      ],
    },
  };

  const masterData = getSavedData('masterData');
  const userRole = masterData?.roles.role;

  if (userRole && roleUIconfig[userRole] && roleUIconfig[userRole][pageName]) {
    roleUIconfig[userRole][pageName].forEach((config) => {
      const element = document.getElementById(config.element_id);
      if (element) {
        element.style.display = config.visibility;
      } else {
        console.error(`Element with ID ${config.element_id} not found`);
      }
    });
  } else {
    console.error('Invalid role, page, or role/page not found');
  }
}

function getAccessControl(pageName) {
  const masterData = getSavedData('masterData');
  const authorizedConfig = masterData?.products.access_control;
  return pageName ? authorizedConfig?.pages[pageName] : authorizedConfig.pages;
}

function generateRandomId(length = 8) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

function listFilter(inputId, listId) {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById(inputId);
  filter = input.value.toUpperCase();
  ul = document.getElementById(listId);
  li = ul.getElementsByTagName('li');
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName('span')[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}
