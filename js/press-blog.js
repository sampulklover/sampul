document.getElementById('footer-container').innerHTML = footer();
newsletterFormAddAPI();
document.getElementById('nav-bar-container').innerHTML = navBar();
navBarAuthUpdate();

var pressBlogData = [];

async function populatePressBlog(allData = []) {
  const listLoader = document.getElementById('press-blog-list-loader');
  const listEmpty = document.getElementById('press-blog-list-empty');
  const listContainer = document.getElementById('press-blog-list-container');
  const listBody = document.getElementById('press-blog-list-body');

  var records = [];

  allData.forEach((item) => {
    const card = listBody.cloneNode(true);

    const title = card.getElementsByTagName('span');
    const image = card.getElementsByTagName('img');

    const bcObject = blogCategories().find((x) => x.value === item.category);
    const estReadTime = estimateReadingTime(item.description);

    title[0].innerText = bcObject.name;
    title[1].innerText = `${estReadTime ? `${estReadTime + ' min read'}` : ''}`;
    title[2].innerText = item.title;
    title[3].innerText = item.teaser;

    const imageUrl = item.image_path
      ? `${CDNURL}${item.image_path}`
      : emptyBlogImg;
    image[0].src = imageUrl;

    records.push(card);

    card.addEventListener('click', function () {
      window.open(`press-blog-post?id=${item.unique_id}`, '_blank');
    });
  });

  listLoader.classList.add('hidden');

  if (records.length === 0) {
    listEmpty.classList.remove('hidden');
    listContainer.classList.add('hidden');
  } else {
    listEmpty.classList.add('hidden');
    listContainer.classList.remove('hidden');

    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }
    records.forEach((item) => {
      listContainer.appendChild(item);
      reloadWebflow();
    });
  }
}

function filterCategory(input) {
  const filteredData = pressBlogData.filter((item) => {
    const searchableProperties = ['category'];

    return searchableProperties.some((prop) =>
      item[prop].toLowerCase().includes(input)
    );
  });

  if (input == 'view_all') {
    populatePressBlog(pressBlogData);
  } else {
    populatePressBlog(filteredData);
  }
}

async function populateBlogCategory(allData = []) {
  const listLoader = document.getElementById('press-blog-category-list-loader');
  const listEmpty = document.getElementById('press-blog-category-list-empty');
  const listContainer = document.getElementById(
    'press-blog-category-list-container'
  );
  const listBody = document.getElementById('press-blog-category-list-body');

  var records = [];

  allData.forEach((item) => {
    const card = listBody.cloneNode(true);
    const title = card.getElementsByTagName('span');
    title[0].innerText = item.name;

    records.push(card);

    card.addEventListener('click', function () {
      filterCategory(item.value);
    });
  });

  listLoader.classList.add('hidden');

  if (records.length === 0) {
    listEmpty.classList.remove('hidden');
    listContainer.classList.add('hidden');
  } else {
    listEmpty.classList.add('hidden');
    listContainer.classList.remove('hidden');

    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }
    records.forEach((item) => {
      listContainer.appendChild(item);
    });
  }
}

function reloadWebflow() {
  var existingScript = document.querySelector('script[src="js/webflow.js"]');
  existingScript.parentNode.removeChild(existingScript);
  var newScript = document.createElement('script');
  newScript.src = 'js/webflow.js';
  newScript.type = 'text/javascript';
  document.body.appendChild(newScript);
}

async function fetchPressBlog() {
  const { data, error } = await supabaseClient
    .from(dbName.press_blog_posts)
    .select('*')
    .eq('is_active', true);

  if (error) {
    console.error('Error', error.message);
    showToast('alert-toast-container', error.message, 'danger');
  } else {
    populatePressBlog(data);

    var blog_category_data = blogCategories();
    blog_category_data.unshift({ name: 'View All', value: 'view_all' });

    populateBlogCategory(blog_category_data);
    pressBlogData = data;
  }
}

$(document).ready(function () {
  fetchPressBlog();
});
