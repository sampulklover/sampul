const { createClient } = supabase;

const AppVersion = 'v1.0.13';

const dbName = {
  profiles: 'profiles',
  beneficiaries: 'beneficiaries',
  digital_assets: 'digital_assets',
};

const pageName = {
  user_account: 'user-account',
  beloved: 'beloved',
};

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
    return null;
  }
}
