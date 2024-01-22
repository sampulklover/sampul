const blogTypeName = {
  add: {
    key: 'add',
    button_title: 'Submit',
    allow_delete: false,
  },
  edit: {
    key: 'edit',
    button_title: 'Update',
    allow_delete: true,
  },
};

function blogModalForm(type) {
  if (!(type in blogTypeName)) {
    console.error(`Invalid type: ${type}`);
    return;
  }

  return `
  <div class="modal fade" id="${blogTypeName[type].key}-blog-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <div>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <div id="${blogTypeName[type].key}-form-body-container">
          <div class="spacer-30"></div>
          <form
            id="${blogTypeName[type].key}-blog-form"
            name="wf-form-Digital-Account-form"
            data-name="Digital Account form"
            method="get"
            class="form-digital-account"
          >
            <div class="form-field-wrapper">
              <label for="writer-name" class="field-label"
                >Writer's name<span class="text-span-9">*</span></label
              ><input
                type="text"
                class="form_input w-input"
                maxlength="256"
                name="writer-name"
                placeholder=""
                id="input-blog-${blogTypeName[type].key}-writer-name"
                required=""
              />
            </div>
            <div class="form-field-wrapper">
              <label for="category" class="field-label"
                >Category<span class="text-span-11">*</span></label
              ><select
                id="select-blog-${blogTypeName[type].key}-category"
                name="category"
                required=""
                class="form_input w-select"
              >
                <!-- auto generate -->
              </select>
            </div>
            <div class="form-field-wrapper">
              <label for="image" class="field-label"
                >Featured Image</label>
              <img
                loading="lazy"
                src=""
                alt=""
                style="max-height: 250px"
                id="preview-blog-${blogTypeName[type].key}-image"
              />
              <input
                type="file"
                id="input-blog-${blogTypeName[type].key}-image"
                name=""
                accept="image/*"
                style="display: none"
              />
            </div>
            <div class="form-field-wrapper">
              <label for="title" class="field-label"
                >Title<span class="text-span-9">*</span></label
              ><input
                type="text"
                class="form_input w-input"
                maxlength="256"
                name="title"
                placeholder=""
                id="input-blog-${blogTypeName[type].key}-title"
                required=""
              />
            </div>
            <div class="form-field-wrapper">
              <label for="teaser" class="field-label"
                >Teaser<span class="text-span-9">*</span></label
              ><input
                type="text"
                class="form_input w-input"
                maxlength="256"
                name="teaser"
                placeholder=""
                id="input-blog-${blogTypeName[type].key}-teaser"
                required=""
              />
            </div>
            <div class="form-field-wrapper">
              <label for="description" class="field-label"
                >Description</label
              ><textarea
                id="input-blog-${blogTypeName[type].key}-description"
                name="description"
                placeholder=""
                class="form_input_text-area text-area w-input"
              ></textarea>
            </div>
            <div class="form-check">
              <input
                name="checkbox_name_confirmation"
                class="form-check-input"
                type="checkbox"
                id="checkbox-blog-${blogTypeName[type].key}-tnc"
                required="true"
              />
              <label
                class="form-check-label"
                for="checkbox-blog-${blogTypeName[type].key}-tnc"
              >
                <span
                  for="Contact-03-checkbox"
                  class="text-size-small w-form-label"
                  >You agree to our friendly
                  <a href="legal.html" class="text-style-link">privacy policy</a
                  >.</span
                >
              </label>
            </div>
            ${
              blogTypeName[type].allow_delete
                ? `
            <div class="content-22 p-0">
              <button
                type="button"
                class="button-secondary-gray size-w142"
                id="btn-blog-delete-form"
              >
                Delete
              </button>
              <button
                type="submit"
                class="button size-w142"
                id="btn-blog-${blogTypeName[type].key}-form"
              >
                ${blogTypeName[type].button_title}
              </button>
            </div>
            `
                : `<button
              type="submit"
              class="w-button button custom-btn"
              id="btn-blog-${blogTypeName[type].key}-form"
            >
              ${blogTypeName[type].button_title}</button
            >`
            }
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
`;
}
