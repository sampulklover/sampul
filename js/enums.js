function maritalStatus() {
  const items = [
    { name: 'Single', value: 'single' },
    { name: 'Married', value: 'married' },
    { name: 'Widowed', value: 'widowed' },
    { name: 'Divorced', value: 'divorced' },
  ];

  return items;
}

function servicePlatforms() {
  const items = [
    {
      name: 'Facebook',
      value: 'facebook',
      img: 'images/webclip.png',
    },
    {
      name: 'Instagram',
      value: 'instagram',
      img: 'images/webclip.png',
    },
    {
      name: 'Twitter',
      value: 'twitter',
      img: 'images/webclip.png',
    },
    {
      name: 'TikTok',
      value: 'tiktok',
      img: 'images/webclip.png',
    },
    { name: 'Luno', value: 'luno', img: 'images/webclip.png' },
    { name: 'Boost', value: 'boost', img: 'images/webclip.png' },
    {
      name: `Touch 'n Go`,
      value: 'touch_n_go',
      img: 'images/webclip.png',
    },
    {
      name: 'GrabPay',
      value: 'grabpay',
      img: 'images/webclip.png',
    },
    {
      name: 'AEON Wallet',
      value: 'aeon wallet',
      img: 'images/webclip.png',
    },
    {
      name: 'BigPay',
      value: 'bigpay',
      img: 'images/webclip.png',
    },
    {
      name: 'WeChat Pay',
      value: 'wechat_pay',
      img: 'images/webclip.png',
    },
    {
      name: 'Lazada',
      value: 'lazada',
      img: 'images/webclip.png',
    },
    {
      name: 'ShopeePay',
      value: 'shopeepay',
      img: 'images/webclip.png',
    },
    { name: 'Wahed', value: 'wahed', img: 'images/webclip.png' },
    { name: 'Raiz', value: 'raiz', img: 'images/webclip.png' },
    {
      name: 'PublicGold',
      value: 'publicgold',
      img: 'images/webclip.png',
    },
    {
      name: 'StashAway',
      value: 'stashaway',
      img: 'images/webclip.png',
    },
    { name: 'NFTs', value: 'nfts', img: 'images/webclip.png' },
    {
      name: 'Mobile Legends',
      value: 'mobile_legends',
      img: 'images/webclip.png',
    },
    {
      name: 'Spotify',
      value: 'spotify',
      img: 'images/webclip.png',
    },
    {
      name: 'YouTube',
      value: 'youtube',
      img: 'images/webclip.png',
    },
    {
      name: 'iCloud',
      value: 'icloud',
      img: 'images/webclip.png',
    },
    {
      name: 'Microsoft Azure',
      value: 'microsoft_azure',
      img: 'images/webclip.png',
    },
    {
      name: 'Google Cloud',
      value: 'google_cloud',
      img: 'images/webclip.png',
    },
    {
      name: 'Dropbox',
      value: 'dropbox',
      img: 'images/webclip.png',
    },
    { name: 'Box', value: 'box', img: 'images/webclip.png' },
    { name: 'AWS', value: 'aws', img: 'images/webclip.png' },
    {
      name: 'Alibaba Cloud',
      value: 'alibaba_cloud',
      img: 'images/webclip.png',
    },
    {
      name: 'OneDrive',
      value: 'onedrive',
      img: 'images/webclip.png',
    },
    {
      name: 'WordPress',
      value: 'wordpress',
      img: 'images/webclip.png',
    },
    {
      name: 'Blogspot',
      value: 'blogspot',
      img: 'images/webclip.png',
    },
  ];

  return items;
}

function servicePlatformAccountTypes() {
  const items = [
    { name: 'Digital Account', value: 'digital_account' },
    { name: 'Subscription Account', value: 'subscription_account' },
  ];

  return items;
}

function servicePlatformFrequencies() {
  const items = [
    { name: 'N/A', value: 'n_a' },
    { name: 'Weekly', value: 'weekly' },
    { name: 'Monthly', value: 'monthly' },
    { name: 'Yearly', value: 'yearly' },
  ];

  return items;
}

function declaredValues() {
  const items = [
    { name: 'N/A', value: 'n_a' },
    { name: 'RM 1000 - RM 5000', value: '1k_5k' },
    { name: 'RM 5001 - RM 10,000', value: '5k_10k' },
    { name: 'RM 10,001 - RM 15,000', value: '10k_15k' },
    { name: 'RM 15,001 - RM 50,000', value: '15k_50k' },
    { name: 'RM 50,001 - RM 100,000', value: '50k_100k' },
    { name: 'RM 100,001 - RM 250,000', value: '100k_250k' },
    { name: 'More than RM 250,001', value: 'more_than_250k' },
  ];

  return items;
}

function instructionsAfterDeath() {
  const options = [
    { name: 'Faraid', value: 'faraid' },
    { name: 'Hibah', value: 'hibah' },
    {
      name: '1/3 N/W (Distribute 1/3 to Non-Faraid Heirs)',
      value: 'distribute',
    },
  ];

  return options;
}

function addNew() {
  const options = [
    { name: 'Please select...', value: '' },
    { name: 'Add New', value: 'add_new' },
  ];

  return options;
}
