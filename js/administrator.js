const formConfigs = [
  {
    containerId: 'add-sign-out-modal-container',
    modalFormFunction: signOutModalForm(),
  },
  {
    containerId: 'edit-user-form-container',
    modalFormFunction: userModalForm(userTypeName.edit.key),
  },
  {
    containerId: 'add-blog-form-container',
    modalFormFunction: blogModalForm(blogTypeName.add.key),
  },
  {
    containerId: 'edit-blog-form-container',
    modalFormFunction: blogModalForm(blogTypeName.edit.key),
  },
  {
    containerId: 'add-career-form-container',
    modalFormFunction: careerModalForm(careerTypeName.add.key),
  },
  {
    containerId: 'edit-career-form-container',
    modalFormFunction: careerModalForm(careerTypeName.edit.key),
  },
];

formConfigs.forEach((item) => {
  document.getElementById(item.containerId).innerHTML = item.modalFormFunction;
});

const selectConfigs = [
  {
    data: blogCategories(),
    element_id: 'select-blog-add-category',
  },
  {
    data: blogCategories(),
    element_id: 'select-blog-edit-category',
  },
  {
    data: careerCategories(),
    element_id: 'select-career-add-category',
  },
  {
    data: careerCategories(),
    element_id: 'select-career-edit-category',
  },
  {
    data: countries(),
    element_id: 'select-career-add-country',
  },
  {
    data: countries(),
    element_id: 'select-career-edit-country',
  },
];

selectConfigs.forEach((item) => {
  mapToSelect(item.data, item.element_id);
});

const inputElements = {
  edit_user_modal: {
    username: document.getElementById('input-user-edit-username'),
    email: document.getElementById('input-user-edit-email'),
  },
  add_blog_modal: {
    writer_name: document.getElementById('input-blog-add-writer-name'),
    title: document.getElementById('input-blog-add-title'),
    teaser: document.getElementById('input-blog-add-teaser'),
    category: document.getElementById('select-blog-add-category'),
    description: document.getElementById('input-blog-add-description'),
    image_path: document.getElementById('preview-blog-add-image'),
  },
  edit_blog_modal: {
    writer_name: document.getElementById('input-blog-edit-writer-name'),
    title: document.getElementById('input-blog-edit-title'),
    teaser: document.getElementById('input-blog-edit-teaser'),
    category: document.getElementById('select-blog-edit-category'),
    description: document.getElementById('input-blog-edit-description'),
    image_path: document.getElementById('preview-blog-edit-image'),
  },
  add_career_modal: {
    title: document.getElementById('input-career-add-title'),
    category: document.getElementById('select-career-add-category'),
    country: document.getElementById('select-career-add-country'),
    city: document.getElementById('input-career-add-city'),
    description: document.getElementById('input-career-add-description'),
  },
  edit_career_modal: {
    title: document.getElementById('input-career-edit-title'),
    category: document.getElementById('select-career-edit-category'),
    country: document.getElementById('select-career-edit-country'),
    city: document.getElementById('input-career-edit-city'),
    description: document.getElementById('input-career-edit-description'),
  },
};

const imageElements = {
  add_blog_modal: {
    preview: document.getElementById('preview-blog-add-image'),
    edit: document.getElementById('input-blog-add-image'),
  },
  edit_blog_modal: {
    preview: document.getElementById('preview-blog-edit-image'),
    edit: document.getElementById('input-blog-edit-image'),
  },
};

const buttonConfigs = [
  {
    buttonId: 'open-sign-out-modal-btn',
    action: () => {
      $('#sign-out-modal').modal('show');
    },
  },
  {
    buttonId: 'new-blog-modal-btn',
    action: () => {
      $('#add-blog-modal').modal('show');
      imageElements.add_blog_modal.preview.src = emptyBlogImg;
    },
  },
  {
    buttonId: 'new-career-modal-btn',
    action: () => {
      $('#add-career-modal').modal('show');
      imageElements.add_blog_modal.preview.src = emptyBlogImg;
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

mapImageElements(imageElements, imageElements);

var userData = [];
var blogData = [];
var careerData = [];

var editCurrentUserId = null;
var editCurrentBlogId = null;
var editCurrentCareerId = null;

function populateToEditBlog(id) {
  editCurrentBlogId = id;
  $('#edit-blog-modal').modal('show');
  var selectedCard = blogData.find((item) => item.id === id);
  if (selectedCard) {
    for (const key in inputElements.edit_blog_modal) {
      inputElements.edit_blog_modal[key].value = selectedCard[key];

      if (key == 'image_path') {
        const imageUrl = selectedCard[key]
          ? `${CDNURL}${selectedCard[key]}`
          : emptyBlogImg;
        inputElements.edit_blog_modal.image_path.src = imageUrl;
      }
    }
  }
}

function populateToEditCareer(id) {
  editCurrentCareerId = id;
  $('#edit-career-modal').modal('show');
  var selectedCard = careerData.find((item) => item.id === id);
  if (selectedCard) {
    for (const key in inputElements.edit_career_modal) {
      inputElements.edit_career_modal[key].value = selectedCard[key];
    }
  }
}

function populateToEditUser(id) {
  editCurrentCareerId = id;
  $('#edit-user-modal').modal('show');
  var selectedCard = userData.find((item) => item.id === id);
  if (selectedCard) {
    for (const key in inputElements.edit_user_modal) {
      inputElements.edit_user_modal[key].value = selectedCard[key];
    }

    $('#view-user-edit-beloved-list').empty();

    if (selectedCard.beloved.length === 0) {
      $('#view-user-edit-beloved-list').append(
        '<li class="list-group-item"><small class="crop-text" style="text-align: center">No results found.</small></li>'
      );
    } else {
      var listItems = selectedCard.beloved.map(function (item, index) {
        let content = `<small class="crop-text">${item.nric_name}</small>
          <small class="crop-text">${item.email}</small>`;

        return `<li class="list-group-item"><span>${content}</span></li>`;
      });

      $('#view-user-edit-beloved-list').append(listItems.join(''));
    }
  }
}

document
  .getElementById('add-blog-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-blog-add-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserSession();

    const addData = processForm(inputElements.add_blog_modal, false);

    const { data: returnData, error } = await supabaseClient
      .from(dbName.press_blog_posts)
      .insert({
        uuid: userId,
        uid: generateRandomId(),
        ...addData,
      })
      .select()
      .single();

    if (error) {
      console.error('Error', error.message);
      handleFormResult({ error, useBtn, defaultBtnText });
      return;
    }

    const directory = `/blog/${returnData.uid}/featured/`;
    const imageInput = imageElements.add_blog_modal.edit;

    await replaceOrAddImage({
      userId,
      returnData,
      directory,
      imageInput,
      useBtn,
      defaultBtnText,
      dataBase: dbName.press_blog_posts,
      isUpdateByReturnId: true,
    });

    processForm(inputElements.add_blog_modal, true);
    reinitiate();
    $('#add-blog-modal').modal('hide');
    handleFormResult({ error, useBtn, defaultBtnText });
  });

document
  .getElementById('add-career-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-career-add-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserSession();
    const addData = processForm(inputElements.add_career_modal, false);

    const { data, error } = await supabaseClient.from(dbName.careers).insert({
      uuid: userId,
      uid: generateRandomId(),
      ...addData,
    });

    if (error) {
      console.error('Error', error.message);
      handleFormResult({ error, useBtn, defaultBtnText });
      return;
    }

    processForm(inputElements.add_career_modal, true);
    reinitiate();
    $('#add-career-modal').modal('hide');
    handleFormResult({ error, useBtn, defaultBtnText });
  });

document
  .getElementById('edit-blog-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-blog-edit-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserSession();
    const addData = processForm(inputElements.edit_blog_modal, false);

    const { data: returnData, error } = await supabaseClient
      .from(dbName.press_blog_posts)
      .update({
        ...addData,
      })
      .eq('uuid', userId)
      .eq('id', editCurrentBlogId)
      .select()
      .single();

    if (error) {
      console.error('Error', error.message);
      handleFormResult({ error, useBtn, defaultBtnText });
      return;
    }

    const directory = `/blog/${returnData.uid}/featured/`;
    const imageInput = imageElements.edit_blog_modal.edit;

    await replaceOrAddImage({
      userId,
      returnData,
      directory,
      imageInput,
      useBtn,
      defaultBtnText,
      dataBase: dbName.press_blog_posts,
      isUpdateByReturnId: true,
    });

    processForm(inputElements.edit_blog_modal, true);
    reinitiate();
    $('#edit-blog-modal').modal('hide');
    handleFormResult({ error, useBtn, defaultBtnText });
  });

document
  .getElementById('edit-career-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-career-edit-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserSession();
    const addData = processForm(inputElements.edit_career_modal, false);

    const { data, error } = await supabaseClient
      .from(dbName.careers)
      .update({
        ...addData,
      })
      .eq('uuid', userId)
      .eq('id', editCurrentCareerId);

    if (error) {
      console.error('Error', error.message);
      handleFormResult({ error, useBtn, defaultBtnText });
      return;
    }

    processForm(inputElements.edit_career_modal, true);
    reinitiate();
    $('#edit-career-modal').modal('hide');
    handleFormResult({ error, useBtn, defaultBtnText });
  });

document
  .getElementById('btn-blog-delete-form')
  .addEventListener('click', async function (event) {
    if (confirm(`Are you sure you want to delete this record?`)) {
      var selectedCard = blogData.find((item) => item.id === editCurrentBlogId);

      let useBtn = document.getElementById('btn-blog-delete-form');
      let defaultBtnText = useBtn.innerHTML;
      useBtn.disabled = true;
      useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

      const userId = await getUserSession();

      const { data, error } = await supabaseClient
        .from(dbName.press_blog_posts)
        .delete()
        .eq('uuid', userId)
        .eq('id', selectedCard.id);

      if (error) {
        console.error('Error', error.message);
        handleFormResult({ error, useBtn, defaultBtnText });
        return;
      }

      await deleteImage({
        returnData: selectedCard,
        useBtn,
        defaultBtnText,
      });

      reinitiate();
      $('#edit-blog-modal').modal('hide');
      handleFormResult({ error, useBtn, defaultBtnText });
    }
  });

document
  .getElementById('btn-career-delete-form')
  .addEventListener('click', async function (event) {
    if (confirm(`Are you sure you want to delete this record?`)) {
      var selectedCard = careerData.find(
        (item) => item.id === editCurrentCareerId
      );

      let useBtn = document.getElementById('btn-career-delete-form');
      let defaultBtnText = useBtn.innerHTML;
      useBtn.disabled = true;
      useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

      const userId = await getUserSession();

      const { data, error } = await supabaseClient
        .from(dbName.careers)
        .delete()
        .eq('uuid', userId)
        .eq('id', selectedCard.id);

      if (error) {
        console.error('Error', error.message);
        handleFormResult({ error, useBtn, defaultBtnText });
        return;
      }

      reinitiate();
      $('#edit-career-modal').modal('hide');
      handleFormResult({ error, useBtn, defaultBtnText });
    }
  });

const tableConfig = {
  users: {
    table_id: '#users-table',
    loader_id: 'users-table-loader',
    content: [
      {
        title: '<small class="smpl_text-xs-medium">Users</small>',
        data: 'uui',
        render: function (data, type, row, meta) {
          const imageUrl = row.image_path
            ? `${CDNURL}${row.image_path}`
            : emptyUserImg;

          return `<div class="custom-table-cell">
                    <img
                      loading="lazy"
                      src="${imageUrl}"
                      alt=""
                      class="avatar-8"
                    />
                    <div>
                      <div class="smpl_text-sm-medium">${row.username}</div>
                      <div class="smpl_text-sm-regular">${row.email}</div>
                    </div>
                </div>
          `;
        },
      },
      {
        title: '<small class="smpl_text-xs-medium">Created at</small>',
        data: 'uui',
        render: function (data, type, row, meta) {
          return `<div class="custom-table-cell">
                    <div class="smpl_text-sm-regular crop-text">${formatTimestamp(
                      row.created_at
                    )}</div>
                </div>
          `;
        },
      },
      {
        title: '<small class="smpl_text-xs-medium">Action</small>',
        data: 'id',
        render: function (data, type, row, meta) {
          return `<div class="custom-table-cell pointer-on-hover" onclick="populateToEditUser(${data})" >
                    <div class="smpl_text-sm-semibold text-color-primary700">More</div>
                  </div>
          `;
        },
      },
    ],
  },
  blogs: {
    table_id: '#blogs-table',
    loader_id: 'blogs-table-loader',
    content: [
      {
        title: '<small class="smpl_text-xs-medium">Writer</small>',
        data: 'uui',
        render: function (data, type, row, meta) {
          return `<div class="custom-table-cell">
                    <div class="smpl_text-sm-regular crop-text">${row.writer_name}</div>
                </div>
          `;
        },
      },
      {
        title: '<small class="smpl_text-xs-medium">Title</small>',
        data: 'uui',
        render: function (data, type, row, meta) {
          return `<div class="custom-table-cell">
                    <div class="smpl_text-sm-regular crop-text">${row.title}</div>
                </div>
          `;
        },
      },
      {
        title: '<small class="smpl_text-xs-medium">Description</small>',
        data: 'uui',
        render: function (data, type, row, meta) {
          return `<div class="custom-table-cell">
                    <div class="smpl_text-sm-regular crop-text">${row.description}</div>
                </div>
          `;
        },
      },
      {
        title: '<small class="smpl_text-xs-medium">Category</small>',
        data: 'uui',
        render: function (data, type, row, meta) {
          let categoryValue = blogCategories().find(
            (item) => item.value === row.category
          );
          const categoryValueName = categoryValue?.name || '';
          return `<div class="custom-table-cell">
                    <div class="smpl_text-sm-regular crop-text">${categoryValueName}</div>
                </div>
          `;
        },
      },
      {
        title: '<small class="smpl_text-xs-medium">Action</small>',
        data: 'id',
        render: function (data, type, row, meta) {
          return `<div class="custom-table-cell pointer-on-hover" onclick="populateToEditBlog(${data})" >
                    <div class="smpl_text-sm-semibold text-color-primary700">More</div>
                  </div>
          `;
        },
      },
    ],
  },
  careers: {
    table_id: '#careers-table',
    loader_id: 'careers-table-loader',
    content: [
      {
        title: '<small class="smpl_text-xs-medium">Job Title</small>',
        data: 'uui',
        render: function (data, type, row, meta) {
          return `<div class="custom-table-cell">
                    <div class="smpl_text-sm-regular crop-text">${row.title}</div>
                </div>
          `;
        },
      },
      {
        title: '<small class="smpl_text-xs-medium">Description</small>',
        data: 'uui',
        render: function (data, type, row, meta) {
          return `<div class="custom-table-cell">
                    <div class="smpl_text-sm-regular crop-text">${row.description}</div>
                </div>
          `;
        },
      },
      {
        title: '<small class="smpl_text-xs-medium">Category</small>',
        data: 'uui',
        render: function (data, type, row, meta) {
          let categoryValue = careerCategories().find(
            (item) => item.value === row.category
          );
          const categoryValueName = categoryValue?.name || '';
          return `<div class="custom-table-cell">
                    <div class="smpl_text-sm-regular crop-text">${categoryValueName}</div>
                </div>
          `;
        },
      },
      {
        title: '<small class="smpl_text-xs-medium">Action</small>',
        data: 'id',
        render: function (data, type, row, meta) {
          return `<div class="custom-table-cell pointer-on-hover" onclick="populateToEditCareer(${data})" >
                    <div class="smpl_text-sm-semibold text-color-primary700">More</div>
                  </div>
          `;
        },
      },
    ],
  },
};

function populateToUsersTable(tableData) {
  populateToTable(
    tableConfig.users.table_id,
    tableData,
    tableConfig.users.content,
    document.getElementById(tableConfig.users.loader_id)
  );
}

function populateToBlogsTable(tableData) {
  populateToTable(
    tableConfig.blogs.table_id,
    tableData,
    tableConfig.blogs.content,
    document.getElementById(tableConfig.blogs.loader_id)
  );
}

function populateToCareersTable(tableData) {
  populateToTable(
    tableConfig.careers.table_id,
    tableData,
    tableConfig.careers.content,
    document.getElementById(tableConfig.careers.loader_id)
  );
}

async function fetchUsersData() {
  const { data, error } = await supabaseClient
    .from(dbName.profiles)
    .select(`*, ${dbName.beloved} ( * )`);

  if (error) {
    console.log(error.message);
  }
  return data;
}

async function fetchBlogsData() {
  const { data, error } = await supabaseClient
    .from(dbName.press_blog_posts)
    .select('*');

  if (error) {
    console.log(error.message);
  }
  return data;
}

async function fetchCareersData() {
  const { data, error } = await supabaseClient.from(dbName.careers).select('*');

  if (error) {
    console.log(error.message);
  }
  return data;
}

async function initialFetch() {
  try {
    const [usersData = [], blogsData = [], careersData = []] =
      await Promise.all([
        fetchUsersData(),
        fetchBlogsData(),
        fetchCareersData(),
      ]);

    populateToUsersTable(usersData);
    populateToBlogsTable(blogsData);
    populateToCareersTable(careersData);

    userData = usersData;
    blogData = blogsData;
    careerData = careersData;
  } catch (error) {
    console.error('Error', error.message);
    showToast('alert-toast-container', error.message, 'danger');
  }
}

function reinitiate() {
  for (const tableName in tableConfig) {
    const tableId = tableConfig[tableName].table_id;
    const table = $(tableId).DataTable();
    table.destroy();
  }
  initialFetch();
}

$(document).ready(function () {
  roleUIbased('global');
  initialFetch();
});
