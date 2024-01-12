function signOutModalForm(type) {
  return `
  <div class="modal fade" id="sign-out-modal">
  <div class="modal-dialog">
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
              Are you confirm to signing out? this action will terminate the
              current session.
            </div>
          </div>
          <div class="padding-bottom-3"></div>
        </div>
        <div class="spacer-30"></div>
        <div class="content-22 p-0">
          <button
            type="button"
            class="button-secondary-gray"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <button type="submit" class="button" onclick="signOutUser();">
            Confirm Sign Out
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
`;
}
