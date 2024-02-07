const userTypeName = {
  add: {
    key: 'add',
    button_title: 'Submit',
    allow_delete: false,
  },
  edit: {
    key: 'edit',
    button_title: 'Update',
    allow_delete: false,
  },
};

function userModalForm(type) {
  if (!(type in userTypeName)) {
    console.error(`Invalid type: ${type}`);
    return;
  }

  return `
    <div class="modal fade" id="${userTypeName[type].key}-user-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <div>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div id="${userTypeName[type].key}-form-body-container">
            <div class="spacer-30"></div>
            <form
              id="${userTypeName[type].key}-user-form"
              name="wf-form-Digital-Account-form"
              data-name="Digital Account form"
              method="get"
              class="form-digital-account"
            >
                <div class="form-field-wrapper">
                    <label for="title" class="field-label"
                    >Username</label
                    ><input
                    type="text"
                    class="form_input w-input"
                    maxlength="256"
                    name="title"
                    placeholder=""
                    id="input-user-${userTypeName[type].key}-username"
                    required=""
                    disabled
                    />
                </div>
                <div class="form-field-wrapper">
                <label for="email" class="field-label"
                    >Email</label
                ><input
                    type="email"
                    class="form_input w-input"
                    maxlength="256"
                    name="email"
                    placeholder=""
                    id="input-user-${userTypeName[type].key}-email"
                    required=""
                    disabled
                />
                </div>
                <div class="form-field-wrapper">
                    <label for="email" class="field-label">Beloved List</label>
                    <input
                    type="text"
                    class="form_input w-input"
                    maxlength="256"
                    name="email"
                    placeholder="Filter by username..."
                    id="input-user-${userTypeName[type].key}-beloved-filter"
                    onkeyup="listFilter('input-user-${userTypeName[type].key}-beloved-filter','view-user-${userTypeName[type].key}-beloved-list')"
                />
                </div>
                <div class="form-field-wrapper">
                    <ul
                    id='view-user-${userTypeName[type].key}-beloved-list'
                    class="list-group-flush mt-1 p-0"
                    style="max-height: 400px; overflow-y: auto"
                    >
                    <!-- auto populate -->
                    </ul>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}
