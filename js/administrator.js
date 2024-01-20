document.getElementById('add-blog-form-container').innerHTML = blogModalForm(
  blogTypeName.add.key
);

document.getElementById('edit-blog-form-container').innerHTML = blogModalForm(
  blogTypeName.edit.key
);

document
  .getElementById('new-blog-modal-btn')
  .addEventListener('click', function () {
    $('#add-blog-modal').modal('show');
  });

const inputElements = {
  add_blog_modal: {
    writer_name: document.getElementById('input-blog-add-writer-name'),
    title: document.getElementById('input-blog-add-title'),
    teaser: document.getElementById('input-blog-add-teaser'),
    category: document.getElementById('select-blog-add-category'),
    description: document.getElementById('input-blog-add-description'),
  },
  edit_blog_modal: {
    writer_name: document.getElementById('input-blog-edit-writer-name'),
    title: document.getElementById('input-blog-edit-title'),
    teaser: document.getElementById('input-blog-edit-teaser'),
    category: document.getElementById('select-blog-edit-category'),
    description: document.getElementById('input-blog-edit-description'),
  },
};

var blogData = [];

document
  .getElementById('add-blog-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-blog-add-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserSession();

    const addData = {};

    for (const key in inputElements.add_blog_modal) {
      if (key !== 'image_path') {
        addData[key] = inputElements.add_blog_modal[key].value;
      }
    }

    const { data, error } = await supabaseClient
      .from(dbName.press_blog_posts)
      .insert({
        uuid: userId,
        ...addData,
      });

    if (error) {
      console.error('Error', error.message);
      handleFormResult({ error, useBtn, defaultBtnText });
      return;
    }

    for (const key in inputElements.add_blog_modal) {
      if (key !== 'image_path') {
        inputElements.add_blog_modal[key].value = '';
      }
    }

    reinitiate();
    $('#add-blog-modal').modal('hide');
    handleFormResult({ error, useBtn, defaultBtnText });
  });

var editCurrentBlogId = null;

function populateToEditBlog(id) {
  editCurrentBlogId = id;
  $('#edit-blog-modal').modal('show');
  var selectedCard = blogData.find((item) => item.id === id);
  if (selectedCard) {
    for (const key in inputElements.edit_blog_modal) {
      inputElements.edit_blog_modal[key].value = selectedCard[key];
    }
  }
}

document
  .getElementById('edit-blog-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-blog-edit-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const userId = await getUserSession();

    const updateData = {};

    for (const key in inputElements.edit_blog_modal) {
      if (key !== 'image_path') {
        updateData[key] = inputElements.edit_blog_modal[key].value;
      }
    }

    const { data, error } = await supabaseClient
      .from(dbName.press_blog_posts)
      .update({
        ...updateData,
      })
      .eq('uuid', userId)
      .eq('id', editCurrentBlogId);

    if (error) {
      console.error('Error', error.message);
      handleFormResult({ error, useBtn, defaultBtnText });
      return;
    }

    for (const key in inputElements.edit_blog_modal) {
      if (key !== 'image_path') {
        inputElements.edit_blog_modal[key].value = '';
      }
    }

    reinitiate();
    $('#edit-blog-modal').modal('hide');
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

      reinitiate();
      $('#edit-blog-modal').modal('hide');
      handleFormResult({ error, useBtn, defaultBtnText });
    }
  });

function populateToUsersTable(tableData) {
  const tableColumns = [
    {
      title: '<small class="smpl_text-xs-medium">Profiles</small>',
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
  ];

  const tableLoader = document.getElementById('users-table-loader');
  populateToTable('#users-table', tableData, tableColumns, tableLoader);
}

function populateToBlogsTable(tableData) {
  const tableColumns = [
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
        return `<div class="custom-table-cell" onclick="populateToEditBlog(${data})" >
                  <div class="smpl_text-sm-semibold text-color-primary700">More</div>
                </div>
        `;
      },
    },
  ];

  const tableLoader = document.getElementById('blogs-table-loader');
  populateToTable('#blogs-table', tableData, tableColumns, tableLoader);
}

async function fetchUsersData() {
  const { data, error } = await supabaseClient
    .from(dbName.profiles)
    .select('*');

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

async function initialFetch() {
  try {
    const [usersData = [], blogsData = []] = await Promise.all([
      fetchUsersData(),
      fetchBlogsData(),
    ]);

    populateToUsersTable(usersData);
    populateToBlogsTable(blogsData);
    blogData = blogsData;
  } catch (error) {
    console.error('Error', error.message);
    showToast('alert-toast-container', error.message, 'danger');
  }
}

function mapElements() {
  for (let key in blogTypeName) {
    mapToSelect(
      blogCategories(),
      `select-blog-${blogTypeName[key].key}-category`
    );
  }
}

function reinitiate() {
  var table1 = $('#users-table').DataTable();
  var table2 = $('#blogs-table').DataTable();
  table1.destroy();
  table2.destroy();
  initialFetch();
}

$(document).ready(function () {
  mapElements();
  initialFetch();
});
