document.getElementById('footer-container').innerHTML = footer();
newsletterFormAddAPI();
document.getElementById('nav-bar-container').innerHTML = navBar();
navBarAuthUpdate();

const displayElements = {
  detailsElements: {
    image_path: document.getElementById('view-featured-image'),
    category: document.getElementById('view-blog-category'),
    read_time: document.getElementById('view-read-time'),
    title: document.getElementById('view-title'),
    created_at: document.getElementById('view-created-at'),
    writer_name: document.getElementById('view-writer-name'),
    description: document.getElementById('view-description'),
  },
};

var currentLink = window.location.href;

document.getElementById('copy-link-btn').addEventListener('click', function () {
  navigator.clipboard
    .writeText(currentLink)
    .then(() => {
      showToast('alert-toast-container', 'Link copied!', 'success');
    })
    .catch((error) => {
      console.error('Failed to copy link: ', error);
    });
});

document
  .getElementById('share-facebook-btn')
  .addEventListener('click', function () {
    window.open(
      'https://www.facebook.com/sharer/sharer.php?u=' +
        encodeURIComponent(currentLink) +
        '_blank'
    );
  });

document
  .getElementById('share-twitter-btn')
  .addEventListener('click', function () {
    window.open(
      'https://twitter.com/intent/tweet?url=' +
        encodeURIComponent(currentLink) +
        '_blank'
    );
  });

document
  .getElementById('share-linkedin-btn')
  .addEventListener('click', function () {
    window.open(
      'https://www.linkedin.com/shareArticle?url=' +
        encodeURIComponent(currentLink) +
        '_blank'
    );
  });

document
  .getElementById('add-blog-post-newsletter-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let useBtn = document.getElementById('btn-blog-post-newsletter-add-form');
    let defaultBtnText = useBtn.innerHTML;
    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    var email_input = document.getElementById(
      'input-blog-post-newsletter-email'
    );

    const { data: existingEmail } = await supabaseClient
      .from(dbName.newsletter)
      .select('email')
      .eq('email', email_input.value)
      .single();

    if (existingEmail) {
      showToast('alert-toast-container', 'Email already subscribed!', 'danger');
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      return;
    }

    const { error } = await supabaseClient.from(dbName.newsletter).insert({
      email: email_input.value,
    });

    if (error) {
      console.error('Error', error.message);
      showToast('alert-toast-container', error.message, 'danger');
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      return;
    }

    showToast('alert-toast-container', 'Subscribed!', 'success');

    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
  });

function populatePressBlogPost(item) {
  const bcObject = blogCategories().find((x) => x.value === item.category);
  const estReadTime = estimateReadingTime(item.description);

  const imageUrl = item.image_path
    ? `${CDNURL}${item.image_path}`
    : emptyBlogImg;
  displayElements.detailsElements.image_path.src = imageUrl;

  displayElements.detailsElements.category.innerText = bcObject.name;
  displayElements.detailsElements.read_time.innerText = `${
    estReadTime ? `${estReadTime + ' min read'}` : ''
  }`;
  displayElements.detailsElements.title.innerText = item.title;
  displayElements.detailsElements.created_at.innerText = formatTimestamp(
    item.created_at
  );
  displayElements.detailsElements.writer_name.innerText = item.writer_name;
  displayElements.detailsElements.description.innerText = item.description;
}

async function fetchPressBlogPost(unique_id) {
  const { data, error } = await supabaseClient
    .from(dbName.press_blog_posts)
    .select(`*, ${dbName.profiles} ( * )`)
    .eq('unique_id', unique_id)
    .single();

  if (error) {
    console.error('Error', error.message);
    showToast('alert-toast-container', error.message, 'danger');
  } else {
    populatePressBlogPost(data);
  }
}

$(document).ready(function () {
  const unique_id = getQueryParam('id');

  if (unique_id) {
    fetchPressBlogPost(unique_id);
  } else {
    showToast('alert-toast-container', 'Post ID not found', 'danger');
  }
});
