export default async function handler(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send('<p>Invalid unsubscribe link.</p>');
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  try {
    await fetch(
      `${SUPABASE_URL}/rest/v1/signal_subscribers?unsubscribe_token=eq.${encodeURIComponent(token)}`,
      {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ active: false })
      }
    );
  } catch (err) {
    console.error('Unsubscribe error:', err);
  }

  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Unsubscribed — AI Builder Signal</title>
<link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Bebas+Neue&display=swap" rel="stylesheet">
<style>
  body { background: #040408; color: #e8e8f0; font-family: 'Share Tech Mono', monospace; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; text-align: center; }
  .box { max-width: 400px; padding: 40px; }
  h1 { font-family: 'Bebas Neue', sans-serif; font-size: 48px; color: #00fff0; margin-bottom: 16px; letter-spacing: .1em; }
  p { color: #4a4a6a; font-size: 12px; line-height: 1.8; letter-spacing: .05em; }
  a { color: #7c3aed; text-decoration: none; }
  a:hover { color: #a855f7; }
</style>
</head>
<body>
<div class="box">
  <h1>UNSUBSCRIBED</h1>
  <p>You've been unsubscribed from AI Builder Signal.</p>
  <p style="margin-top:20px;"><a href="https://builtbyclaude.xyz">← builtbyclaude.xyz</a></p>
</div>
</body>
</html>`);
}
