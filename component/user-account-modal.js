const profileTypeName = {
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

function profileModalForm(type) {
  if (!(type in profileTypeName)) {
    console.error(`Invalid type: ${type}`);
    return;
  }

  return `
  <div class="modal fade" id="${profileTypeName[type].key}-profile-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <div>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <div id="${profileTypeName[type].key}-form-body-container">
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
                      d="M6 21H9M15 21H18M17.5 6.5V14.5M3 6.2L3 14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18L17.8 18C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.7157 20.2843 3.40974 19.908 3.21799C19.4802 3 18.9201 3 17.8 3L6.2 3C5.0799 3 4.51984 3 4.09202 3.21799C3.7157 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.07989 3 6.2ZM11.5 10.5C11.5 11.8807 10.3807 13 9 13C7.61929 13 6.5 11.8807 6.5 10.5C6.5 9.11929 7.61929 8 9 8C10.3807 8 11.5 9.11929 11.5 10.5Z"
                      stroke="#3118D3"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="text-and-supporting-text-18">
                <div class="text-lg-semibold-4">Complete profile</div>
                <div class="text-sm-regular-6">
                  Ensure no assets will be left behind for your loved ones.
                </div>
              </div>
            </div>
            <div class="padding-bottom-3"></div>
          </div>
          <div class="spacer-30"></div>
          <form
            id="${profileTypeName[type].key}-profile-form"
            name="wf-form-Digital-Account-form"
            data-name="Digital Account form"
            method="get"
            class="form-digital-account"
          >
            <div class="w-layout-grid settings_component">
              <div class="text-and-supporting-text-14">
                <div class="field-label">Your photo</div>
                <div class="text-size-tiny">
                  This will be displayed on your profile.
                </div>
              </div>
              <div class="avatar-and-actions">
                <img
                  loading="lazy"
                  src="https://iriedoc.wu.ac.th/support/img/user.png"
                  alt=""
                  class="avatar-7"
                  id="preview-profile-${profileTypeName[type].key}-image"
                />
                <input
                  type="file"
                  id="input-profile-${profileTypeName[type].key}-image"
                  name=""
                  accept="image/*"
                  style="display: none"
                />
              </div>
            </div>
            <div class="form-field-wrapper">
              <label for="nric-name" class="field-label"
                >Name (As Per NRIC)<span class="text-span-9">*</span></label
              ><input
                type="text"
                class="form_input w-input"
                maxlength="256"
                name="nric-name"
                placeholder=""
                id="input-profile-${profileTypeName[type].key}-nric-name"
                required=""
              />
            </div>
            <div
              id="w-node-d437d727-6427-8a80-1587-727f64b15a9c-71f8de8a"
              class="form-content-2"
            >
              <div class="form-field-wrapper">
                <label for="nric-no" class="field-label">NRIC<span class="text-span-9">*</span></label>
                <input
                  type="number"
                  class="form_input w-input"
                  maxlength="256"
                  name="nric-no"
                  placeholder=""
                  id="input-profile-${profileTypeName[type].key}-nric-no"
                  required=""
                />
              </div>
              <div class="form-field-wrapper">
                <label for="username" class="field-label"
                  >Username<span class="text-span-9">*</span></label
                ><input
                  type="text"
                  class="form_input w-input"
                  maxlength="256"
                  name="username"
                  placeholder=""
                  id="input-profile-${profileTypeName[type].key}-username"
                  required=""
                />
              </div>
            </div>
            <div
              id="w-node-d437d727-6427-8a80-1587-727f64b15a7d-71f8de8a"
              class="form-content-2"
            >
              <div class="form-field-wrapper">
                <label for="contact" class="field-label"
                  >Contact<span class="text-span-10">*</span></label
                ><input
                  type="tel"
                  class="form_input w-input"
                  maxlength="256"
                  name="contact"
                  id="input-profile-${profileTypeName[type].key}-contact"
                  required=""
                />
              </div>
              <div class="form-field-wrapper">
              <label for="dob" class="field-label"
                >Date of Birth<span class="text-span-7">*</span></label
                ><input
                  type="date"
                  class="form_input w-input"
                  maxlength="256"
                  name="dob"
                  placeholder=""
                  id="input-profile-${profileTypeName[type].key}-dob"
                  required=""
                />
              </div>
            </div>
            <div
              id="w-node-b4693328-7fb9-86da-7895-ec4d49cba2d9-71f8de8a"
              class="form-content-2"
            >
              <div class="form-field-wrapper">
                <label for="marital-status" class="field-label"
                  >Marital Status<span class="text-span-6">*</span></label
                ><select
                  id="select-profile-${profileTypeName[type].key}-marital-status"
                  name="marital-status"
                  required=""
                  class="form_input w-select"
                >
                  <!-- auto generate -->
                </select>
              </div>
            </div>
            <div class="input-dropdown-7">
              <div class="address">
                <div class="field-label">Address</div>
                <input
                  type="text"
                  class="form_input w-input"
                  maxlength="256"
                  name="address-1"
                  placeholder="Address 1"
                  id="input-profile-${profileTypeName[type].key}-address-1"
                  required=""
                /><input
                  type="text"
                  class="form_input w-input"
                  maxlength="256"
                  name="address-2"
                  placeholder="Address 2 (optional)"
                  id="input-profile-${profileTypeName[type].key}-address-2"
                />
                <div class="form-content-2">
                  <input
                    type="text"
                    class="form_input w-input"
                    maxlength="256"
                    name="city"
                    placeholder="City"
                    id="input-profile-${profileTypeName[type].key}-city"
                    required=""
                  />
                  <input
                    type="text"
                    class="form_input w-input"
                    maxlength="256"
                    name="postcode"
                    placeholder="Zip/Postcode"
                    id="input-profile-${profileTypeName[type].key}-postcode"
                    required=""
                  />
                </div>
                <select
                  id="select-profile-${profileTypeName[type].key}-country"
                  name="country"
                  required=""
                  class="form_input w-select"
                >
                  <!-- auto generate -->
                </select>
              </div>
            </div>
            <div class="form-check">
              <input
                name="checkbox_name_confirmation"
                class="form-check-input"
                type="checkbox"
                id="checkbox-profile-${profileTypeName[type].key}-confirmation"
                required="true"
              />
              <label
                class="form-check-label"
                for="flexCheckCheckedJoinAffiliate"
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
            <button
                type="submit"
                class="button w-button"
                id="btn-profile-${profileTypeName[type].key}-form"
              >
                ${profileTypeName[type].button_title}
              </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
`;
}
