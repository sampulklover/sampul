const typeName = {
  add: {
    key: 'add',
    buttonTitle: 'Submit',
  },
  edit: {
    key: 'edit',
    buttonTitle: 'Update',
  },
};

function digitalAssetsForm(type) {
  if (!(type in typeName)) {
    console.error(`Invalid type: ${type}`);
    return;
  }

  return `
  <div
  class="modal fade"
  id="${typeName[type].key}-digital-assets-modal"
>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content rounded-3">
      <div class="modal-header">
        <button
          type="button"
          class="close"
          data-dismiss="modal"
        >
          &times;
        </button>
      </div>

      <div class="modal-body">
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
              <div class="text-lg-semibold-4">
                Account Details
              </div>
              <div class="text-sm-regular-6">
                Ensure no assets will be left behind for
                your loved ones.
              </div>
            </div>
          </div>
          <div class="padding-bottom-3"></div>
        </div>
        <div class="spacer-30"></div>
        <div id="digital-assets-form-container">
          <form
            id="${typeName[type].key}-digital-assets-form"
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
                <label
                  for="Username-4"
                  class="field-label"
                  >Username<span class="text-span-9"
                    >*</span
                  ></label
                ><input
                  type="text"
                  class="form_input w-input"
                  maxlength="256"
                  name="Username-2"
                  data-name="Username 2"
                  placeholder="abc123"
                  id="input-${typeName[type].key}-username"
                  required=""
                />
              </div>
              <div class="form-field-wrapper">
                <label for="email-4" class="field-label"
                  >Email<span class="text-span-10"
                    >*</span
                  ></label
                ><input
                  type="email"
                  class="form_input w-input"
                  maxlength="256"
                  name="email-2"
                  data-name="Email 2"
                  placeholder="you@example.com"
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
                <label
                  for="Service-Platform-5"
                  class="field-label"
                  >Service Platform<span
                    class="text-span-8"
                    >*</span
                  ></label
                ><select
                  id="select-${typeName[type].key}-service-platform"
                  name="Service-Platform-4"
                  data-name="Service Platform 4"
                  required=""
                  class="form_input w-select"
                >
                  <!-- auto generate -->
                </select>
              </div>
              <div class="form-field-wrapper">
                <label
                  for="Declared-value-4"
                  class="field-label"
                  >Type<span class="text-span-7"
                    >*</span
                  ></label
                ><select
                  id="select-${typeName[type].key}-type"
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
                <label
                  for="Declared-value-4"
                  class="field-label"
                  >Frequency<span class="text-span-7"
                    >*</span
                  ></label
                ><select
                  id="select-${typeName[type].key}-frequency"
                  name="Declared-value-3"
                  data-name="Declared Value 3"
                  required=""
                  class="form_input w-select"
                >
                  <!-- auto generate -->
                </select>
              </div>
              <div class="form-field-wrapper">
                <label
                  for="Declared-value-4"
                  class="field-label"
                  >Declared Value (MYR)<span
                    class="text-span-6"
                    >*</span
                  ></label
                ><select
                  id="select-${typeName[type].key}-declared-value"
                  name="Declared-value-3"
                  data-name="Declared Value 3"
                  required=""
                  class="form_input w-select"
                >
                  <!-- auto generate -->
                </select>
              </div>
            </div>
            <div class="form-field-wrapper">
              <label for="field-3" class="field-label"
                >Instructions After Death<span
                  class="text-span-11"
                  >*</span
                ></label
              ><select
                id="select-${typeName[type].key}-instructions-after-death"
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
                >Beneficiary<span class="text-span-11"
                  >*</span
                ></label
              ><select
                id="select-${typeName[type].key}-beneficiary"
                name="field-2"
                data-name="Field 2"
                required=""
                class="form_input w-select"
              >
                <!-- auto generate -->
              </select>
            </div>
            <div class="form-field-wrapper">
              <label
                for="Contact03-message-2"
                class="field-label"
                >Remarks</label
              ><textarea
                id="input-${typeName[type].key}-remarks"
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
                id="flexCheckCheckedJoinAffiliate"
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
                  <a
                    href="legal.html"
                    class="text-style-link"
                    >privacy policy</a
                  >.</span
                >
              </label>
            </div>

            <input
              type="submit"
              value="${typeName[type].buttonTitle}"
              data-wait="Please wait..."
              id="w-node-_4ac9bd4b-46c5-1204-d604-d2bf44b33a31-e2e93042"
              class="button w-button"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
`;
}
