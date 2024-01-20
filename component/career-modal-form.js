const careerTypeName = {
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

function careerModalForm(type) {
  if (!(type in careerTypeName)) {
    console.error(`Invalid type: ${type}`);
    return;
  }

  return `
  <div class="modal fade" id="${careerTypeName[type].key}-career-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <div>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <div id="${careerTypeName[type].key}-form-body-container">
          <div class="spacer-30"></div>
          <form
            id="${careerTypeName[type].key}-career-form"
            name="wf-form-Digital-Account-form"
            data-name="Digital Account form"
            method="get"
            class="form-digital-account"
          >
            <div class="form-field-wrapper">
              <label for="title" class="field-label"
                >Job Title<span class="text-span-9">*</span></label
              ><input
                type="text"
                class="form_input w-input"
                maxlength="256"
                name="title"
                placeholder=""
                id="input-career-${careerTypeName[type].key}-title"
                required=""
              />
            </div>
            <div class="form-field-wrapper">
              <label for="category" class="field-label"
                >Category<span class="text-span-11">*</span></label
              ><select
                id="select-career-${careerTypeName[type].key}-category"
                name="category"
                required=""
                class="form_input w-select"
              >
                <!-- auto generate -->
              </select>
            </div>
            <div class="form-content-2">
              <div class="form-field-wrapper">
                <label for="city" class="field-label"
                  >City<span class="text-span-9">*</span></label
                ><input
                  type="text"
                  class="form_input w-input"
                  maxlength="256"
                  name="city"
                  placeholder=""
                  id="input-career-${careerTypeName[type].key}-city"
                  required=""
                />
              </div>
              <div class="form-field-wrapper">
                <label for="country" class="field-label"
                  >Country<span class="text-span-11">*</span></label
                ><select
                  id="select-career-${careerTypeName[type].key}-country"
                  name="country"
                  required=""
                  class="form_input w-select"
                >
                  <!-- auto generate -->
                </select>
              </div>
            </div>
            <div class="form-field-wrapper">
              <label for="description" class="field-label"
                >Description</label
              ><textarea
                id="input-career-${careerTypeName[type].key}-description"
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
                id="checkbox-career-${careerTypeName[type].key}-tnc"
                required="true"
              />
              <label
                class="form-check-label"
                for="checkbox-career-${careerTypeName[type].key}-tnc"
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
              careerTypeName[type].allow_delete
                ? `
            <div class="content-22 p-0">
              <button
                type="button"
                class="button-secondary-gray size-w142"
                id="btn-career-delete-form"
              >
                Delete
              </button>
              <button
                type="submit"
                class="button size-w142"
                id="btn-career-${careerTypeName[type].key}-form"
              >
                ${careerTypeName[type].button_title}
              </button>
            </div>
            `
                : `<button
              type="submit"
              class="w-button button custom-btn"
              id="btn-career-${careerTypeName[type].key}-form"
            >
              ${careerTypeName[type].button_title}</button
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
