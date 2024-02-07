const type_title = {
  co_sampul: {
    title: 'Appoint your Co-Sampul',
    subtitle: `Co-Sampul is your trusted person for
      whom which all information in this
      Sampul will be passed on. He/she must
      be 18 years old and above, will be
      responsible to ensure the proper
      managementof your assets distribution
      after your demise.`,
  },
  future_owner: {
    title: 'Appoint your Beneficiary',
    subtitle: 'The future owner of your assets',
  },
};

const belovedTypeName = {
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

function belovedModalForm(type) {
  if (!(type in belovedTypeName)) {
    console.error(`Invalid type: ${type}`);
    return;
  }

  return `
  <div class="modal fade" id="${belovedTypeName[type].key}-beloved-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <div>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <div id="${belovedTypeName[type].key}-form-body-container">
          <div class="modal-header-2">
            <div class="content-32">
              <div class="smpl-icon-featured-outline-large">
                <div class="uui-icon-1x1-xsmall-2 w-embed">
                  <svg
                    width="24"
                    height="24"
                    viewbox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V13M12 8H16V12M15.5 3.5V2M19.4393 4.56066L20.5 3.5M20.5103 8.5H22.0103M3 13.3471C3.65194 13.4478 4.31987 13.5 5 13.5C9.38636 13.5 13.2653 11.3276 15.6197 8"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="text-and-supporting-text-18">
                <div class="text-lg-semibold-4" id="modal-beloved-${
                  belovedTypeName[type].key
                }-title">...</div>
                <div class="text-sm-regular-6" id="modal-beloved-${
                  belovedTypeName[type].key
                }-subtitle">...</div>
              </div>
            </div>
            <div class="padding-bottom-3"></div>
          </div>
          <div class="spacer-30"></div>
          <form
            id="${belovedTypeName[type].key}-beloved-form"
            name="wf-form-Digital-Account-form"
            data-name="Digital Account form"
            method="get"
            class="form-digital-account"
          >
            <div class="form-content-2">
              <div class="form-field-wrapper">
                <label for="nric-name" class="field-label"
                  >Name (As Per NRIC)<span class="text-span-9 mr-1">*</span
                  ></label
                ><input
                  type="text"
                  class="form_input w-input"
                  maxlength="256"
                  name="nric-name"
                  placeholder=""
                  id="input-beloved-${belovedTypeName[type].key}-nric-name"
                  required=""
                />
              </div>
              <div class="form-field-wrapper">
                <label for="nickname" class="field-label"
                  >Nickname<span class="text-span-9">*</span></label
                ><input
                  type="text"
                  class="form_input w-input"
                  maxlength="256"
                  name="nickname"
                  placeholder="e.g. Along, Angah, Acik"
                  id="input-beloved-${belovedTypeName[type].key}-nickname"
                  required=""
                />
              </div>
            </div>
            <div class="form-content-2">
              <div class="form-field-wrapper">
                <label for="nric-no" class="field-label"
                  >NRIC<span class="text-span-9">*</span></label
                ><input
                  type="text"
                  class="form_input w-input"
                  maxlength="256"
                  name="nric-no"
                  placeholder=""
                  id="input-beloved-${belovedTypeName[type].key}-nric-no"
                  required=""
                />
              </div>
              <div class="form-field-wrapper">
                <label for="phone-no" class="field-label"
                  >Phone number</label
                ><input
                  type="text"
                  class="form_input w-input"
                  maxlength="256"
                  name="phone-no"
                  placeholder=""
                  id="input-beloved-${belovedTypeName[type].key}-phone-no"
                  required=""
                />
              </div>
            </div>

            <div class="form-content-2">
              <div class="form-field-wrapper">
              <label for="email" class="field-label"
                >Email<span class="text-span-10">*</span></label
              ><input
                type="email"
                class="form_input w-input"
                maxlength="256"
                name="email"
                placeholder=""
                id="input-beloved-${belovedTypeName[type].key}-email"
                required=""
              />
              </div>
              <div class="form-field-wrapper">
                <label for="relationship" class="field-label"
                  >Relationship<span class="text-span-8">*</span></label
                ><select
                  id="select-beloved-${belovedTypeName[type].key}-relationship"
                  name="relationship"
                  required=""
                  class="form_input w-select"
                >
                  <!-- auto generate -->
                </select>
              </div>
              <div class="form-field-wrapper hidden">
                <label for="type" class="field-label"
                  >Beneficiary Type<span class="text-span-8">*</span></label
                ><select
                  id="select-beloved-${belovedTypeName[type].key}-type"
                  name="type"
                  required=""
                  class="form_input w-select"
                >
                  <!-- auto generate -->
                </select>
              </div>
            </div>

            <div class="form-content-2">
              <div class="form-field-wrapper">
              <label for="level" class="field-label"
                >Beloved level<span class="text-span-8">*</span></label
              ><select
                id="select-beloved-${belovedTypeName[type].key}-level"
                name="level"
                required=""
                class="form_input w-select"
              >
                <!-- auto generate -->
              </select>
              </div>
            </div>

            <div class="w-layout-grid settings_component">
              <div class="text-and-supporting-text-14">
                <div class="field-label">Profile photo</div>
                <div class="text-size-tiny">
                  This will be displayed on profile.
                </div>
              </div>
              <div class="avatar-and-actions">
                <img
                  loading="lazy"
                  src="https://iriedoc.wu.ac.th/support/img/user.png"
                  alt=""
                  class="avatar-7"
                  id="preview-beloved-${belovedTypeName[type].key}-image"
                />
                <input
                  type="file"
                  id="input-beloved-${belovedTypeName[type].key}-image"
                  name=""
                  accept="image/*"
                  style="display: none"
                />
              </div>
            </div>
            <div class="spacer-30"></div>
            ${
              belovedTypeName[type].allow_delete
                ? `
            <div class="content-22 p-0">
              <button
                type="button"
                class="button-secondary-gray size-w142"
                id="btn-beloved-delete-form"
              >
                Delete
              </button>
              <button
                type="submit"
                class="button size-w142"
                id="btn-beloved-${belovedTypeName[type].key}-form"
              >
                ${belovedTypeName[type].button_title}
              </button>
            </div>
            `
                : `<button
              type="submit"
              class="w-button button custom-btn"
              id="btn-beloved-${belovedTypeName[type].key}-form"
            >
              ${belovedTypeName[type].button_title}</button
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
