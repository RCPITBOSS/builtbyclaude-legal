export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/signal_subscribers`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ email })
    });

    if (response.status === 201) {
      return res.status(200).json({ success: true });
    }

    const text = await response.text();
    // 23505 = PostgreSQL unique violation — already subscribed, treat as success
    if (text.includes('23505') || text.includes('unique')) {
      return res.status(200).json({ success: true });
    }

    console.error('Supabase error:', response.status, text);
    return res.status(500).json({ error: 'Something went wrong. Try again.' });
  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(500).json({ error: 'Something went wrong. Try again.' });
  }
}
