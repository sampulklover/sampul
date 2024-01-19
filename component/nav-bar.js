function navBar() {
  return `
  <div
  data-w-id="18b61915-7758-894e-53f4-cebfa94c8583"
  data-animation="default"
  data-collapse="medium"
  data-duration="400"
  data-easing="ease"
  data-easing2="ease"
  role="banner"
  class="navbar_component w-nav"
>
  <div class="navbar_container">
    <a
      href="index.html"
      aria-current="page"
      class="navbar_logo-link w-nav-brand w--current"
    >
      <div class="logo_component">
        <img
          src="images/Logo-Default.svg"
          loading="lazy"
          alt="Untitled UI logotext"
          class="logo_logotype"
        />
      </div>
    </a>
    <nav role="navigation" class="navbar_menu w-nav-menu">
      <div class="navbar_menu-left"></div>
      <div class="navbar_menu-right">
        <div
          data-hover="true"
          data-delay="300"
          data-w-id="18b61915-7758-894e-53f4-cebfa94c858e"
          class="navbar_menu-dropdown w-dropdown"
        >
          <div class="navbar_dropdown-toggle w-dropdown-toggle">
            <div class="uui-dropdown-icon-2 w-embed">
              <svg
                width="20"
                height="20"
                viewbox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  stroke-width="1.67"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <div>Resources</div>
          </div>
          <nav class="uui-navbar02_dropdown-list w-dropdown-list">
            <div class="navbar_container">
              <div class="uui-navbar02_dropdown-content">
                <div class="uui-navbar02_dropdown-content-left">
                  <div class="uui-navbar02_dropdown-link-list">
                    <h4 class="navbar_heading">Solutions</h4>
                    <a href="#" class="navbar_dropdown-link w-inline-block">
                      <div class="uui-navbar02_icon-wrapper">
                        <div class="con-1x1-xsmall w-embed">
                          <svg
                            width="24"
                            height="24"
                            viewbox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.8778 20.0899C16.1693 21.3312 14.1117 21.9998 11.9999 21.9998C9.88812 21.9998 7.83054 21.3312 6.12206 20.0899M16.3836 3.01182C18.2817 3.93756 19.838 5.44044 20.8294 7.30504C21.8208 9.16964 22.1965 11.3002 21.9026 13.3915M2.09733 13.3914C1.80343 11.3002 2.17911 9.16955 3.17053 7.30494C4.16196 5.44034 5.71823 3.93747 7.6163 3.01172M11.4342 6.56544L6.5656 11.4341C6.36759 11.6321 6.26859 11.7311 6.23149 11.8452C6.19886 11.9457 6.19886 12.0538 6.23149 12.1543C6.26859 12.2684 6.36759 12.3674 6.5656 12.5654L11.4342 17.4341C11.6322 17.6321 11.7312 17.7311 11.8454 17.7682C11.9458 17.8008 12.054 17.8008 12.1544 17.7682C12.2686 17.7311 12.3676 17.6321 12.5656 17.4341L17.4342 12.5654C17.6322 12.3674 17.7312 12.2684 17.7683 12.1543C17.801 12.0538 17.801 11.9457 17.7683 11.8452C17.7312 11.7311 17.6322 11.6321 17.4342 11.4341L12.5656 6.56544C12.3676 6.36743 12.2686 6.26843 12.1544 6.23134C12.054 6.19871 11.9458 6.19871 11.8454 6.23134C11.7312 6.26843 11.6322 6.36743 11.4342 6.56544Z"
                              stroke="#3118D3"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div class="uui-navbar02_item-right">
                        <div class="navbar_item-heading">Digital Will</div>
                        <div
                          class="text-size-small-4 hide-mobile-landscape"
                        >
                          Analyze conversion rates and improve your sales.
                        </div>
                      </div>
                    </a>
                    <a href="#" class="navbar_dropdown-link w-inline-block">
                      <div class="uui-navbar02_icon-wrapper">
                        <div class="con-1x1-xsmall w-embed">
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
                      <div class="uui-navbar02_item-right">
                        <div class="uui-navbar02_text-wrapper">
                          <div class="navbar_item-heading margin-bottom-0">
                            Physical Will
                          </div>
                          <div class="badge-small-success">
                            <div>Coming Soon!</div>
                          </div>
                        </div>
                        <div
                          class="text-size-small-4 hide-mobile-landscape"
                        >
                          Measure active usage and target areas of
                          improvement.
                        </div>
                      </div>
                    </a>
                  </div>
                  <div class="uui-navbar02_dropdown-link-list">
                    <h4 class="navbar_heading">Resources</h4>
                    <a
                      href="pricing.html"
                      class="navbar_dropdown-link w-inline-block"
                    >
                      <div class="uui-navbar02_icon-wrapper">
                        <div class="con-1x1-xsmall w-embed">
                          <svg
                            width="24"
                            height="24"
                            viewbox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.5 14.6667C8.5 15.9553 9.54467 17 10.8333 17H13C14.3807 17 15.5 15.8807 15.5 14.5C15.5 13.1193 14.3807 12 13 12H11C9.61929 12 8.5 10.8807 8.5 9.5C8.5 8.11929 9.61929 7 11 7H13.1667C14.4553 7 15.5 8.04467 15.5 9.33333M12 5.5V7M12 17V18.5M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div class="uui-navbar02_item-right">
                        <div class="navbar_item-heading">Pricing</div>
                        <div
                          class="text-size-small-4 hide-mobile-landscape"
                        >
                          Find retention drivers and make your customers
                          smile.
                        </div>
                      </div>
                    </a>
                    <a
                      href="press-blog.html"
                      class="navbar_dropdown-link w-inline-block"
                    >
                      <div class="uui-navbar02_icon-wrapper">
                        <div class="con-1x1-xsmall w-embed">
                          <svg
                            width="25"
                            height="24"
                            viewbox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21.6666 11.5C21.6666 16.1944 17.861 20 13.1666 20C12.0898 20 11.0598 19.7998 10.1118 19.4345C9.93844 19.3678 9.85177 19.3344 9.78285 19.3185C9.71506 19.3029 9.66599 19.2963 9.59648 19.2937C9.5258 19.291 9.44826 19.299 9.29318 19.315L4.17216 19.8444C3.68392 19.8948 3.43979 19.9201 3.29579 19.8322C3.17036 19.7557 3.08494 19.6279 3.06219 19.4828C3.03609 19.3161 3.15274 19.1002 3.38605 18.6684L5.02171 15.6408C5.15641 15.3915 5.22376 15.2668 5.25427 15.1469C5.2844 15.0286 5.29168 14.9432 5.28204 14.8214C5.27229 14.6981 5.21819 14.5376 5.10999 14.2166C4.82246 13.3636 4.66662 12.45 4.66662 11.5C4.66662 6.80558 8.4722 3 13.1666 3C17.861 3 21.6666 6.80558 21.6666 11.5Z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div class="uui-navbar02_item-right">
                        <div class="navbar_item-heading">
                          Press &amp; Blog
                        </div>
                        <div
                          class="text-size-small-4 hide-mobile-landscape"
                        >
                          News and writings, press releases, and press
                          resources.
                        </div>
                      </div>
                    </a>
                  </div>
                  <div class="uui-navbar02_dropdown-link-list">
                    <h4 class="navbar_heading">Company</h4>
                    <a
                      href="about.html"
                      class="navbar_dropdown-link w-inline-block"
                    >
                      <div class="uui-navbar02_icon-wrapper">
                        <div class="con-1x1-xsmall w-embed">
                          <svg
                            width="25"
                            height="24"
                            viewbox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.66699 21L4.66699 4M4.66699 13H12.067C12.627 13 12.9071 13 13.121 12.891C13.3091 12.7951 13.4621 12.6422 13.558 12.454C13.667 12.2401 13.667 11.9601 13.667 11.4V4.6C13.667 4.03995 13.667 3.75992 13.558 3.54601C13.4621 3.35785 13.3091 3.20487 13.121 3.10899C12.9071 3 12.627 3 12.067 3H6.26699C5.70694 3 5.42691 3 5.213 3.10899C5.02484 3.20487 4.87186 3.35785 4.77599 3.54601C4.66699 3.75992 4.66699 4.03995 4.66699 4.6V13ZM13.667 5H20.067C20.627 5 20.9071 5 21.121 5.10899C21.3091 5.20487 21.4621 5.35785 21.558 5.54601C21.667 5.75992 21.667 6.03995 21.667 6.6V13.4C21.667 13.9601 21.667 14.2401 21.558 14.454C21.4621 14.6422 21.3091 14.7951 21.121 14.891C20.9071 15 20.627 15 20.067 15H15.267C14.7069 15 14.4269 15 14.213 14.891C14.0248 14.7951 13.8719 14.6422 13.776 14.454C13.667 14.2401 13.667 13.9601 13.667 13.4V5Z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div class="uui-navbar02_item-right">
                        <div class="navbar_item-heading">About</div>
                        <div
                          class="text-size-small-4 hide-mobile-landscape"
                        >
                          Learn about our story and our mission statement.
                        </div>
                      </div>
                    </a>
                    <a
                      href="career.html"
                      class="navbar_dropdown-link w-inline-block"
                    >
                      <div class="uui-navbar02_icon-wrapper">
                        <div class="con-1x1-xsmall w-embed">
                          <svg
                            width="25"
                            height="24"
                            viewbox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22.667 21V19C22.667 17.1362 21.3922 15.5701 19.667 15.126M16.167 3.29076C17.6329 3.88415 18.667 5.32131 18.667 7C18.667 8.67869 17.6329 10.1159 16.167 10.7092M17.667 21C17.667 19.1362 17.667 18.2044 17.3625 17.4693C16.9565 16.4892 16.1778 15.7105 15.1977 15.3045C14.4626 15 13.5308 15 11.667 15H8.66699C6.80323 15 5.87134 15 5.13626 15.3045C4.15615 15.7105 3.37745 16.4892 2.97147 17.4693C2.66699 18.2044 2.66699 19.1362 2.66699 21M14.167 7C14.167 9.20914 12.3761 11 10.167 11C7.95785 11 6.16699 9.20914 6.16699 7C6.16699 4.79086 7.95785 3 10.167 3C12.3761 3 14.167 4.79086 14.167 7Z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div class="uui-navbar02_item-right">
                        <div class="uui-navbar02_text-wrapper">
                          <div class="navbar_item-heading margin-bottom-0">
                            Careers
                          </div>
                        </div>
                        <div
                          class="text-size-small-4 hide-mobile-landscape"
                        >
                          We’re always looking for talented people. Join our
                          team!
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="uui-navbar02_dropdown-content-right">
                  <div class="uui-navbar02_dropdown-content-wrapper">
                    <div class="uui-navbar02_dropdown-blog-item-wrapper">
                      <a href="#" class="navbar_blog-item w-inline-block">
                        <div class="uui-navbar02_blog-image-wrapper">
                          <img
                            src="images/Digital-coins.png"
                            loading="eager"
                            sizes="(max-width: 479px) 0px, 100vw"
                            srcset="
                              images/Digital-coins-p-500.png   500w,
                              images/Digital-coins-p-800.png   800w,
                              images/Digital-coins-p-1080.png 1080w,
                              images/Digital-coins.png        1417w
                            "
                            alt=""
                            class="navbar_-image"
                          />
                        </div>
                        <div class="uui-navbar02_blog-content">
                          <div class="navbar_item-heading">
                            We&#x27;ve just released an update!
                          </div>
                          <div class="text-size-small-4 text-style-2lines">
                            Check out the all new dashboard view. Pages now
                            load faster.
                          </div>
                          <div
                            class="uui-navbar02_dropdown-content-button-wrapper"
                          >
                            <div class="button-row">
                              <div class="uui-button-wrapper-5">
                                <div
                                  class="uui-button-link-gray is-button-xsmall"
                                >
                                  <div class="text-block-27">Dismiss</div>
                                </div>
                              </div>
                              <div class="uui-button-wrapper-5">
                                <div
                                  class="uui-button-link-4 is-button-xsmall"
                                >
                                  <div class="text-block-26">Changelog</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class="navbar_dropdown-right-overlay-absolute"></div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div class="uui-navbar02_button-wrapper">
          <a
            href="log-in.html"
            class="button-tertiary-gray-2 w-inline-block"
            id="header-log-in-btn"
            style="display: none"
          >
            <div class="text-block-22">Log in</div>
          </a>
          <a
            href="sign-up.html"
            class="button w-inline-block"
            id="header-sign-up-btn"
            style="display: none"
          >
            <div>Sign up</div>
          </a>
          <a
            href="user-account.html"
            class="button w-inline-block hidden"
            id="header-dashboard-btn"
            style="display: none"
          >
            <div>Dashboard</div>
          </a>
        </div>
      </div>
    </nav>
    <div class="navbar_menu-button w-nav-button">
      <div class="menu-icon_component-2">
        <div class="menu-icon_line-top-2"></div>
        <div class="menu-icon_line-middle-2">
          <div class="menu-icon_line-middle-inner-2"></div>
        </div>
        <div class="menu-icon_line-bottom-2"></div>
      </div>
    </div>
  </div>
</div>
  `;
}

async function navBarAuthUpdate(
  extraAuthElements = {},
  extraGuestElements = {}
) {
  const userId = await getUserSession();

  const defaultElements = {
    auth: {
      dashboard_header: document.getElementById('header-dashboard-btn'),
    },
    guest: {
      log_in_header: document.getElementById('header-log-in-btn'),
      sign_up_header: document.getElementById('header-sign-up-btn'),
    },
  };

  const buttonElements = {
    auth: { ...defaultElements.auth, ...extraAuthElements },
    guest: { ...defaultElements.guest, ...extraGuestElements },
  };

  if (userId) {
    toggleVisibility(buttonElements.auth, true);
    toggleVisibility(buttonElements.guest, false);
  } else {
    toggleVisibility(buttonElements.auth, false);
    toggleVisibility(buttonElements.guest, true);
  }
}
