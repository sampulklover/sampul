function reverifyEmailModalForm() {
  return `
  <div class="modal fade" id="reverify-email-modal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-body">
        <div>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <div class="modal-header-2">
          <div class="content-32">
            <div class="smpl_text-md-regular">
             Please enter your email address to send the reverification email.
            </div>
          </div>
          <form id="add-reverify-email-form" class="uui-contact05_form mt-3">
            <div class="uui-form-field-wrapper">
              <label for="email" class="uui-field-label">Email</label
              ><input
                type="email"
                id="input-reverify-email"
                class="uui-form_input-5 w-input"
                maxlength="256"
                name="email"
                placeholder=""
                required=""
              />
            </div>
            <div
              id="w-node-fa944745-e0aa-01e0-b005-234c071918d9-df847475"
              class="uui-form-button-wrapper"
            >
              <button
                type="submit"
                id="btn-reverify-add-form"
                class="smpl-button w-button"
              >
                Send
              </button>
            </div>
          </form>
        </div>
        <div class="spacer-30"></div>
      </div>
    </div>
  </div>
</div>
`;
}
