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
