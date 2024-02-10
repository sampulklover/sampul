async function updatePayment(order_id) {
  console.log('order_id', order_id);

  const { data, error } = await supabaseClient.from('payment_check').insert({
    data: order_id,
  });

  if (error) {
    console.error('Error', error.message);
    return;
  }
}

$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var order_id = urlParams.get('order_id');

  updatePayment(order_id);
});
