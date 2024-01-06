const type_title = {
  type: {
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
    beneficiary: {
      title: 'Appoint your Beneficiary',
      subtitle: 'The future owner of your assets',
    },
  },
};

const typeName = {
  add: {
    key: 'add',
    button_title: 'Submit',
    allow_delete: false,
    type: type_title,
  },
  edit: {
    key: 'edit',
    button_title: 'Update',
    allow_delete: true,
    type: type_title,
  },
};

function successModal() {
  return `
        <div class="content-56">
          <img
            src="images/Digital-coins.png"
            loading="lazy"
            sizes="(max-width: 479px) 80vw, 351.9921875px"
            srcset="
              images/Digital-coins-p-500.png   500w,
              images/Digital-coins-p-800.png   800w,
              images/Digital-coins-p-1080.png 1080w,
              images/Digital-coins.png        1417w
            "
            alt=""
            class="image-12"
          />
        </div>
        <div class="modal-header-3">
          <div class="content-57">
            <div class="text-and-supporting-text-28">
              <div class="text-lg-semibold-6">
                Digital Asset <br />successfully registered
              </div>
              <div class="text-sm-regular-12">
                The account has been registered <br />and ready for your
                wasiat/will
              </div>
            </div>
          </div>
        </div>
        <div class="modal-actions-3">
          <div class="content-58">
            <a class="button-30" type="button" data-dismiss="modal">
              <div class="text-md-semibold-9">Finish</div>
            </a>
          </div>
        </div>`;
}

function belovedModalForm(type) {
  if (!(type in typeName)) {
    console.error(`Invalid type: ${type}`);
    return;
  }

  return `
  <div class="modal fade" id="${typeName[type].key}-beloved-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <div>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <div
          class="hidden"
          id="${typeName[type].key}-success-body-container"
        >
          ${successModal()}
        </div>
        <div id="${typeName[type].key}-form-body-container">
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
                <div class="text-lg-semibold-4">
                  Appoint your Beneficiary
                </div>
                <div class="text-sm-regular-6">
                  The future owner of your assets
                </div>
              </div>
            </div>
            <div class="padding-bottom-3"></div>
          </div>
          <div class="spacer-30"></div>
          <form
            id="${typeName[type].key}-beloved-form"
            name="wf-form-Digital-Account-form"
            data-name="Digital Account form"
            method="get"
            class="form-digital-account"
          >
            <div class="form-content-2">
              <div class="form-field-wrapper">
                <label for="name" class="field-label"
                  >Name<span class="text-span-9 mr-1">*</span
                  ><span class="text-size-tiny"
                    >must be &gt; 18 years old</span
                  ></label
                ><input
                  type="text"
                  class="form_input w-input"
                  maxlength="256"
                  name="name"
                  placeholder=""
                  id="input-${typeName[type].key}-name"
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
                  placeholder=""
                  id="input-${typeName[type].key}-nickname"
                  required=""
                />
              </div>
            </div>
            <div class="form-content-2">
              <div class="form-field-wrapper">
                <label for="phone-number" class="field-label"
                  >Phone number</label
                ><input
                  type="text"
                  class="form_input w-input"
                  maxlength="256"
                  name="phone-number"
                  placeholder=""
                  id="input-${typeName[type].key}-phone-number"
                  required=""
                />
              </div>
              <div class="form-field-wrapper">
                <label for="email" class="field-label"
                  >Email<span class="text-span-10">*</span></label
                ><input
                  type="email"
                  class="form_input w-input"
                  maxlength="256"
                  name="email"
                  placeholder=""
                  id="input-${typeName[type].key}-email"
                  required=""
                />
              </div>
            </div>
            <div
              id="w-node-_4ac9bd4b-46c5-1204-d604-d2bf44b339b6-e2e93042"
              class="form-content-2"
            >
              <div class="form-field-wrapper">
                <label for="relationship" class="field-label"
                  >Relationship<span class="text-span-8">*</span></label
                ><select
                  id="select-${typeName[type].key}-relationship"
                  name="relationship"
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
                id="preview-${typeName[type].key}-image"
              />
              <input
                type="file"
                id="input-${typeName[type].key}-image"
                name=""
                accept="image/*"
                style="display: none"
              />
            </div>
          </div>

            <div class="spacer-30"></div>
              ${
                typeName[type].allow_delete
                  ? `
              <div class="content-22 p-0">
                <button
                  type="button"
                  class="button-secondary-gray size-w142"
                  id="delete-beloved-btn"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  class="button size-w142"
                  id="${typeName[type].key}-beloved-btn"
                >
                ${typeName[type].button_title}
                </button>
              </div>
              `
                  : `<button
                type="submit"
                class="w-button button custom-btn"
                id="${typeName[type].key}-beloved-btn"
              >
                ${typeName[type].button_title}</button
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
