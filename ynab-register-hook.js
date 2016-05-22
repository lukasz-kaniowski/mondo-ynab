const request = require('request');
const api_url = 'https://api.getmondo.co.uk'

const account_id = process.env.ACCOUNT_ID;
const access_token = process.env.ACCESS_TOKEN;
const webhook_url = process.env.WEBHOOK_URL;

request.post({
  url: `${api_url}/webhooks?account_id=${account_id}`,
  form: {
    "account_id": account_id,
	  "url": webhook_url
  },
  headers: {
    'Authorization': `Bearer ${access_token}`
  }
}, function (error, response, body) {
  console.log(error, response.statusCode)
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
})
