const physicalAssetsTypeName = {
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
                physical Asset <br />successfully registered
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

function physicalAssetsModalForm(type) {
  if (!(type in physicalAssetsTypeName)) {
    console.error(`Invalid type: ${type}`);
    return;
  }

  return `
  <div
  class="modal fade"
  id="${physicalAssetsTypeName[type].key}-physical-assets-modal"
>
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
          id="${physicalAssetsTypeName[type].key}-success-body-container"
        >
          ${successModal()}
        </div>
        <div id="${physicalAssetsTypeName[type].key}-form-body-container">
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
                <div class="text-lg-semibold-4">Account Details</div>
                <div class="text-sm-regular-6">
                  Ensure no assets will be left behind for your loved ones.
                </div>
              </div>
            </div>
            <div class="padding-bottom-3"></div>
          </div>
          <div class="spacer-30"></div>
          <form
            id="${physicalAssetsTypeName[type].key}-physical-assets-form"
            name="wf-form-Digital-Account-form"
            data-name="Digital Account form"
            method="get"
            class="form-digital-account"
          >
            <div
              id="w-node-_4ac9bd4b-46c5-1204-d604-d2bf44b339a6-e2e93042"
              class="form-content-2"
            >
              <div class="form-field-wrapper">
                <label for="Username-4" class="field-label"
                  >Username<span class="text-span-9">*</span></label
                ><input
                  type="text"
                  class="form_input w-input"
                  maxlength="256"
                  name="Username-2"
                  data-name="Username 2"
                  placeholder=""
                  id="input-physical-assets-${
                    physicalAssetsTypeName[type].key
                  }-username"
                  required=""
                />
              </div>
              <div class="form-field-wrapper">
                <label for="email-4" class="field-label"
                  >Email<span class="text-span-10">*</span></label
                ><input
                  type="email"
                  class="form_input w-input"
                  maxlength="256"
                  name="email-2"
                  data-name="Email 2"
                  placeholder=""
                  id="input-physical-assets-${
                    physicalAssetsTypeName[type].key
                  }-email"
                  required=""
                />
              </div>
            </div>
            <div class="form-field-wrapper">
              <label for="asset-name" class="field-label"
                >Asset Name<span class="text-span-9">*</span></label
              ><input
                type="text"
                class="form_input w-input"
                maxlength="256"
                name="asset-name"
                data-name="asset-name"
                placeholder=""
                id="input-physical-assets-${
                  physicalAssetsTypeName[type].key
                }-asset-name"
                required=""
              />
            </div>
            <div
              id="w-node-_4ac9bd4b-46c5-1204-d604-d2bf44b339b6-e2e93042"
              class="form-content-2"
            >
              <div class="form-field-wrapper">
                <label for="institution-5" class="field-label"
                  >Institution<span class="text-span-8">*</span></label
                ><select
                  id="select-physical-assets-${
                    physicalAssetsTypeName[type].key
                  }-institution"
                  name="institution-4"
                  data-name="Service Platform 4"
                  required=""
                  class="form_input w-select"
                >
                  <!-- auto generate -->
                </select>
              </div>
              <div class="form-field-wrapper">
                <label for="Declared-value-4" class="field-label"
                  >Type<span class="text-span-7">*</span></label
                ><select
                  id="select-physical-assets-${
                    physicalAssetsTypeName[type].key
                  }-type"
                  name="Declared-value-3"
                  data-name="Declared Value 3"
                  class="form_input w-select"
                >
                  <!-- auto generate -->
                </select>
              </div>
            </div>
            <div
              id="w-node-_4ac9bd4b-46c5-1204-d604-d2bf44b339c5-e2e93042"
              class="form-content-2"
            >
              <div class="form-field-wrapper">
                <label for="loan-category-3" class="field-label"
                  >Loan Category<span class="text-span-7">*</span></label
                ><select
                  id="select-physical-assets-${
                    physicalAssetsTypeName[type].key
                  }-loan-category"
                  name="loan-category-3"
                  data-name="loan-category 3"
                  required=""
                  class="form_input w-select"
                >
                  <!-- auto generate -->
                </select>
              </div>
              <div class="form-field-wrapper">
                <label for="account-no" class="field-label"
                  >Account number<span class="text-span-9">*</span></label
                ><input
                  type="text"
                  class="form_input w-input"
                  maxlength="256"
                  name="account-no"
                  data-name="account-no"
                  placeholder=""
                  id="input-physical-assets-${
                    physicalAssetsTypeName[type].key
                  }-account-no"
                  required=""
                />
              </div>
            </div>
            <div
              id="w-node-_4ac9bd4b-46c5-1204-d604-d2bf44b339c5-e2e93042"
              class="form-content-2"
            >
              <div class="form-field-wrapper">
                <label for="rate-4" class="field-label"
                  >Rate (%)<span class="text-span-9">*</span></label
                ><input
                  type="number" 
                  step="0.01"
                  class="form_input w-input"
                  maxlength="256"
                  name="rate-2"
                  data-name="rate 2"
                  placeholder=""
                  id="input-physical-assets-${
                    physicalAssetsTypeName[type].key
                  }-rate"
                  required=""
                />
              </div>
              <div class="form-field-wrapper">
                <label for="Declared-value" class="field-label"
                  >Declared Value (MYR)<span class="text-span-6">*</span></label
                ><input
                type="number" 
                step="0.01"
                class="form_input w-input"
                maxlength="256"
                name="declared-value"
                data-name="declared-value"
                placeholder=""
                id="input-physical-assets-${
                  physicalAssetsTypeName[type].key
                }-declared-value"
                required=""
                />
              </div>
            </div>
            <div
              id="w-node-_4ac9bd4b-46c5-1204-d604-d2bf44b339c5-e2e93042"
              class="form-content-2"
            >
              <div class="form-field-wrapper">
                <label for="tenure-start-date" class="field-label"
                  >Tenure Start Date<span class="text-span-9">*</span></label
                ><input
                  type="date"
                  class="form_input w-input"
                  name="tenure-start-date"
                  data-name="tenure-start-date"
                  id="input-physical-assets-${
                    physicalAssetsTypeName[type].key
                  }-tenure-start-date"
                  required=""
                />
              </div>
              <div class="form-field-wrapper">
                <label for="tenure-end-date" class="field-label"
                  >Tenure End Date<span class="text-span-9">*</span></label
                ><input
                  type="date"
                  class="form_input w-input"
                  name="tenure-end-date"
                  data-name="tenure-end-date"
                  id="input-physical-assets-${
                    physicalAssetsTypeName[type].key
                  }-tenure-end-date"
                  required=""
                />
              </div>
            </div>
            <div class="form-field-wrapper">
              <label for="image" class="field-label"
                >Image</label>
              <img
                loading="lazy"
                src=""
                alt=""
                style="max-height: 250px"
                id="preview-physical-assets-${
                  physicalAssetsTypeName[type].key
                }-image"
              />
              <input
                type="file"
                id="input-physical-assets-${
                  physicalAssetsTypeName[type].key
                }-image"
                name=""
                accept="image/*"
                style="display: none"
              />
            </div>
            <div class="form-field-wrapper">
              <label for="field-3" class="field-label"
                >Instructions After Death<span class="text-span-11"
                  >*</span
                ></label
              ><select
                id="select-physical-assets-${
                  physicalAssetsTypeName[type].key
                }-instructions-after-death"
                name="field-2"
                data-name="Field 2"
                required=""
                class="form_input w-select"
              >
                <!-- auto generate -->
              </select>
            </div>
            <div class="form-field-wrapper">
              <label for="field-3" class="field-label"
                >Beneficiary<span class="text-span-11">*</span></label
              ><select
                id="select-physical-assets-${
                  physicalAssetsTypeName[type].key
                }-beloved"
                name="field-2"
                data-name="Field 2"
                required=""
                class="form_input w-select"
              >
                <!-- auto generate -->
              </select>
            </div>
            <div class="form-field-wrapper">
              <label for="Contact03-message-2" class="field-label"
                >Remarks</label
              ><textarea
                id="input-physical-assets-${
                  physicalAssetsTypeName[type].key
                }-remarks"
                name="Contact-03-message"
                maxlength="5000"
                data-name="Contact 03 message"
                placeholder="Type your message..."
                class="form_input_text-area text-area w-input"
              ></textarea>
            </div>

            <div class="form-check">
              <input
                name="checkbox_name_confirmation"
                class="form-check-input"
                type="checkbox"
                id="checkbox-${
                  physicalAssetsTypeName[type].key
                }-physical-assets"
                required="true"
              />
              <label
                class="form-check-label"
                for="checkbox-${
                  physicalAssetsTypeName[type].key
                }-physical-assets"
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
              physicalAssetsTypeName[type].allow_delete
                ? `
            <div class="content-22 p-0">
              <button
                type="button"
                class="button-secondary-gray size-w142"
                id="btn-physical-assets-delete-form"
              >
                Delete
              </button>
              <button
                type="submit"
                class="button size-w142"
                id="btn-physical-assets-${physicalAssetsTypeName[type].key}-form"
              >
                ${physicalAssetsTypeName[type].button_title}
              </button>
            </div>
            `
                : `<button
              type="submit"
              class="w-button button custom-btn"
              id="btn-physical-assets-${physicalAssetsTypeName[type].key}-form"
            >
              ${physicalAssetsTypeName[type].button_title}</button
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
