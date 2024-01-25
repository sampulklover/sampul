const formConfigs = [
  // {
  //   containerId: 'nav-bar-container',
  //   formFunction: navBar(),
  // },
  {
    containerId: 'footer-container',
    formFunction: footer(),
  },
];

formConfigs.forEach((item) => {
  document.getElementById(item.containerId).innerHTML = item.formFunction;
});

newsletterFormAddAPI();

// const extraAuthElements = {
//   dashboard_home: document.getElementById('home-dashboard-btn'),
// };

// const extraGuestElements = {
//   sign_up_home: document.getElementById('home-sign-up-btn'),
// };

// navBarAuthUpdate(extraAuthElements, extraGuestElements);
