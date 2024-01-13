const { createClient } = supabase;

const webInfo = {
  version: 'v1.0.36',
  parentUrl: 'https://www.sampul.com',
};

const dbName = {
  profiles: 'profiles',
  beloved: 'beloved',
  digital_assets: 'digital_assets',
  inform_death: 'inform_death',
  wills: 'wills',
};

const bucketName = 'images';

const pageName = {
  index: 'index',
  log_in: 'log-in',
  user_account: 'user-account',
  beloved: 'beloved',
  user_will: 'user_will',
};

const emptyUserImg = `https://image.pngaaa.com/291/5335291-middle.png`;
const addUserImg = `https://iriedoc.wu.ac.th/support/img/user.png`;
const addAnyImg = `https://content.hostgator.com/img/weebly_image_sample.png`;
const emptyQrCodeImg = `https://mydatamerge.com/wp-content/uploads/qrcode_placeholder-300x300.png`;

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmemJsYWlhbmxkcmZ3ZHFkaWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwMDM5OTMsImV4cCI6MjAxOTU3OTk5M30.QOxPgVvOV0Efon8aleoAnlNKgkI2XwEPgIgz76_oIBU';
const supabaseUrl = 'https://rfzblaianldrfwdqdijl.supabase.co';
const supabaseClient = createClient(supabaseUrl, supabaseKey);
const CDNURL = `https://rfzblaianldrfwdqdijl.supabase.co/storage/v1/object/public/images/`;

async function getUserUUID() {
  try {
    const { data, error } = await supabaseClient.auth.getUser();

    if (error) {
      throw error;
    }

    return data.user.id;
  } catch (error) {
    alert('User not authenticated. Please login.');
    location.href = pageName.log_in;

    return null;
  }
}

async function signOutUser() {
  try {
    const { data, error } = await supabaseClient.auth.signOut();

    if (error) {
      throw error;
    }

    location.href = pageName.index;
  } catch (error) {
    console.log(error);
    return null;
  }
}
