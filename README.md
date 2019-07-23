# Shifter Continuous Delivery Demo

Work in progress.

### Serverless

Deploy serverless function to AWS to get your API Gateway URL.

```
sls deploy
```

### Initial Setup

1. Install WP Pusher
2. Add plugin or theme to WP Pusher
3. Activate push-to-deploy
4. Get deploy URL from WP Pusher settings
5. Create and add Webhook URL to GitHub
6. Get Site ID from Shifter Dashboard

More info:
- [GitHub Webhooks and Push-to-Deploy](https://docs.wppusher.com/article/20-github-webhooks-and-push-to-deploy)

### Creating Webhook URL to GitHub

#### Example Params:

- WP Pusher Full URL: `https://123-456.app.getshifter.io:123/?wppusher-hook&token=123&package=abc==`
- WP Pusher Package: `123`
- WP Pusher Token: `abc==`
- Site ID: `abc123`
- Username: `example`
- Password: `password`

#### URL Example for GitHub:

```
https://lambda_url_example.amazonaws.com/dev/?site_id="abc123"&username="example"&password="password"&token="abc=="&package="123"
```

