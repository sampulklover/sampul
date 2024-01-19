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
  } catch (error) {
    console.error('Error', error.message);
    showToast('alert-toast-container', error.message, 'danger');
  }
}

$(document).ready(function () {
  initialFetch();
});
