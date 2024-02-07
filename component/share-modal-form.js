function shareModalForm() {
  return `
    <div class="modal fade" id="share-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <div>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div>
            <div class="spacer-30"></div>
            <ul class="list-group">
              <li class="list-group-item">
                <button class="btn btn-primary btn-block" id="share-facebook-btn">
                  <span data-lang-key="global.share_on_facebook">Share on Facebook</span>
                </button>
              </li>
              <li class="list-group-item">
                <button class="btn btn-primary btn-block" id="share-twitter-btn">
                  <span data-lang-key="global.share_on_twitter">Share on Twitter</span>
                </button>
              </li>
              <li class="list-group-item">
                <button class="btn btn-primary btn-block" id="share-linkedin-btn">
                  <span data-lang-key="global.share_on_linkedIn">Share on LinkedIn</span>
                </button>
              </li>
              <li class="list-group-item">
                <button class="btn btn-primary btn-block" id="copy-link-btn">
                  <span data-lang-key="global.copy_link">Copy Link</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

function shareModalAction(url, title) {
  document
    .getElementById('share-facebook-btn')
    .addEventListener('click', function () {
      window.open(
        'https://www.facebook.com/sharer/sharer.php?u=' +
          encodeURIComponent(url) +
          '&title=' +
          encodeURIComponent(title),
        '_blank'
      );
    });

  document
    .getElementById('share-twitter-btn')
    .addEventListener('click', function () {
      window.open(
        'https://twitter.com/intent/tweet?url=' +
          encodeURIComponent(url) +
          '&text=' +
          encodeURIComponent(title),
        '_blank'
      );
    });

  document
    .getElementById('share-linkedin-btn')
    .addEventListener('click', function () {
      window.open(
        'https://www.linkedin.com/shareArticle?url=' +
          encodeURIComponent(url) +
          '&title=' +
          encodeURIComponent(title),
        '_blank'
      );
    });

  document
    .getElementById('copy-link-btn')
    .addEventListener('click', function () {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          showToast('alert-toast-container', 'Link copied!', 'success');
        })
        .catch((error) => {
          console.error('Failed to copy link: ', error);
        });
    });
}
