document.getElementById('footer-container').innerHTML = footer();
newsletterFormAddAPI();
document.getElementById('nav-bar-container').innerHTML = navBar();

const extraAuthElements = {
  dashboard_home: document.getElementById('home-dashboard-btn'),
};

const extraGuestElements = {
  sign_up_home: document.getElementById('home-sign-up-btn'),
};

navBarAuthUpdate(extraAuthElements, extraGuestElements);
