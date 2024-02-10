const { createClient } = supabase;

const webInfo = {
  version: 'v1.1.6',
  parentUrl: 'https://www.sampul.co',
};

const dbName = {
  profiles: 'profiles',
  beloved: 'beloved',
  digital_assets: 'digital_assets',
  physical_assets: 'physical_assets',
  inform_death: 'inform_death',
  wills: 'wills',
  newsletter: 'newsletter',
  contact_us: 'contact_us',
  questions: 'questions',
  careers: 'careers',
  press_blog_posts: 'press_blog_posts',
  roles: 'roles',
  accounts: 'accounts',
  products: 'products',
  payment_session: 'payment_session',
  extra_wishes: 'extra_wishes',
};

const bucketName = 'images';

const pageName = {
  index: 'index',
  log_in: 'sign-in',
  user_account: 'user-account',
  beloved: 'beloved',
  user_will: 'user-will',
  view_will: 'view-will',
};

const companyInfo = {
  name: 'Sampul',
  press_email: 'press@sampul.co',
  email: 'hello@sampul.co',
  phone_no: '+6 (03) 123-4567',
  address: 'Cyberjaya, Malaysia',
};

const redirectUrl = {
  googleRedirectUrl: 'https://sampul.co/sign-in?refresh=true',
  updatePasswordRedirectUrl: 'https://sampul.co/update-password',
};

const emptyUserImg = `https://image.pngaaa.com/291/5335291-middle.png`;
const addUserImg = `https://iriedoc.wu.ac.th/support/img/user.png`;
const addAnyImg = `https://content.hostgator.com/img/weebly_image_sample.png`;
const emptyBlogImg = `https://d1lf7jq9a5epx3.cloudfront.net/wp-content/uploads/sites/4/2022/02/what-is-a-blog-1200x600-1.jpeg`;
const emptyQrCodeImg = `https://mydatamerge.com/wp-content/uploads/qrcode_placeholder-300x300.png`;
const sampulWillLogo = `https://rfzblaianldrfwdqdijl.supabase.co/storage/v1/object/public/website/sampul_logo.png`;
const emptyPhysicalImg = `https://archive.org/download/placeholder-image/placeholder-image.jpg`;

const senangPay = {
  secretKey: '6421-177',
  merchantId: '643170643986746',
  recurringAPi: 'https://api.sandbox.senangpay.my/recurring/payment/',
};

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmemJsYWlhbmxkcmZ3ZHFkaWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwMDM5OTMsImV4cCI6MjAxOTU3OTk5M30.QOxPgVvOV0Efon8aleoAnlNKgkI2XwEPgIgz76_oIBU';
const supabaseUrl = 'https://rfzblaianldrfwdqdijl.supabase.co';
const supabaseClient = createClient(supabaseUrl, supabaseKey);
const CDNURL = `https://rfzblaianldrfwdqdijl.supabase.co/storage/v1/object/public/images/`;

function getCurrentPageName() {
  const path = window.location.pathname;
  const currentPageWithExtension = path.split('/').pop();
  const currentPage = currentPageWithExtension.replace(/\.html$/, ''); // Remove .html extension if present
  return currentPage;
}

const guestPages = [
  'index',
  'log-in',
  'sign-up',
  'about',
  'contact',
  'pricing',
  'user-help',
  'career',
  'press-blog',
  'press-blog-post',
];

async function getUserUUID(returnFullData = false) {
  try {
    const { data, error } = await supabaseClient.auth.getUser();

    if (error) {
      showToast('alert-toast-container', error, 'danger');
      throw error;
    }

    return returnFullData ? data.user : data.user.id;
  } catch (error) {
    const currentPage = getCurrentPageName();
    if (!guestPages.includes(currentPage)) {
      showToast(
        'alert-toast-container',
        `Please <a style="color: white" href='${pageName.log_in}'><b>login</b></a> to continue`,
        'danger'
      );
    }
    return null;
  }
}

async function getUserSession(returnFullData = false) {
  try {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
      showToast('alert-toast-container', error, 'danger');
      throw error;
    }

    if (data) {
      return returnFullData ? data.session.user : data.session.user.id;
    } else {
      showToast(
        'alert-toast-container',
        `Please <a style="color: white" href='${pageName.log_in}'><b>login</b></a> to continue`,
        'danger'
      );
    }

    return data;
  } catch (error) {
    const currentPage = getCurrentPageName();
    if (!guestPages.includes(currentPage)) {
      showToast(
        'alert-toast-container',
        `Please <a style="color: white" href='${pageName.log_in}'><b>login</b></a> to continue`,
        'danger'
      );
    }
    return null;
  }
}

async function signOutUser() {
  try {
    const { data, error } = await supabaseClient.auth.signOut();

    if (error) {
      throw error;
    }

    localStorage.removeItem('masterData');
    location.href = pageName.index;
  } catch (error) {
    console.log(error);
    return null;
  }
}
