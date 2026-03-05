# builtbyclaude.xyz — Handoff Document

**Site:** https://builtbyclaude.xyz
**GitHub:** https://github.com/rcpitboss/builtbyclaude-legal
**Hosting:** Vercel (auto-deploys on push to `main`)
**Stack:** Static HTML + Vercel serverless functions (`/api/`)
**Last updated:** March 2026

---

## Site Overview

Single-page portfolio at builtbyclaude.xyz documenting projects built by Brian + Claude Code. Dark aesthetic — black background (`#040408`), cyan/purple accent palette, Share Tech Mono + Bebas Neue fonts. Three projects live; more planned.

**Sections (top to bottom):**
1. Hero
2. PROJECT_01 — NicheFlow V2
3. PROJECT_02 — SuperOffRoadRC.com
4. PROJECT_03 — AI Builder Signal
5. Tech Stack
6. Social / Footer

---

## File Structure

```
builtbyclaude-legal/
├── index.html              # Entire site — one file, all CSS + JS inline
├── api/
│   ├── subscribe.js        # POST /api/subscribe — email signup for Signal
│   └── unsubscribe.js      # GET /api/unsubscribe?token= — one-click unsub
├── terms.html              # Terms of service page
├── privacy.html            # Privacy policy page
└── BUILTBYCLAUDE_HANDOFF.md
```

---

## Vercel Environment Variables

Set in Vercel Dashboard → builtbyclaude-legal → Settings → Environment Variables.

| Variable | Used By | Notes |
|----------|---------|-------|
| `SUPABASE_URL` | `api/subscribe.js`, `api/unsubscribe.js` | `https://cgpiltgxyeaxjgwcsewu.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | `api/subscribe.js`, `api/unsubscribe.js` | Service role key — NOT the anon key |

> **Status:** These may not yet be set in Vercel. Must be added before subscribe/unsubscribe endpoints go live.

---

## API Routes

### `POST /api/subscribe`
**File:** `api/subscribe.js`
- Accepts JSON body: `{ "email": "user@example.com" }`
- Validates email format with regex
- Inserts row into Supabase `signal_subscribers` table
- Returns `{ success: true }` on 201 or duplicate (PostgreSQL error 23505)
- Returns `{ error: "..." }` on validation failure or Supabase error
- Uses native `fetch()` — no npm dependencies

### `GET /api/unsubscribe?token=<uuid>`
**File:** `api/unsubscribe.js`
- Reads `token` query param
- PATCHes `signal_subscribers` where `unsubscribe_token = token`, sets `active = false`
- Returns a styled HTML confirmation page matching site aesthetic
- Uses native `fetch()` — no npm dependencies

---

## PROJECT_01 — NicheFlow V2

**Label:** `PROJECT_01 // NICHEFLOW V2`
**Title:** FULLY AUTOMATED CONTENT FACTORY
**Description:** End-to-end AI video pipeline. Scrapes public domain footage, writes scripts with Claude, synthesizes voice, renders captions, and posts to TikTok + YouTube. 24/7. Zero manual work after setup.

**Stats Grid:**
| Stat | Label |
|------|-------|
| 7 | PM2 Workers |
| 4 | Video Sources |
| ∞ | Niches |
| 24/7 | Automated |

**Tech Tags:** Next.js, Node.js, Supabase, FFmpeg, Claude AI, edge-tts, PM2, Vercel, PostgreSQL, ChromaDB

**Pipeline Nodes:** Scraper → ScriptGen → VoiceGen → Renderer → Review → Poster

**Feature Cards:**
1. CLIP-FIRST MODE — Toggle niche to write scripts around available footage
2. REJECTION LEARNING — AI avoids rejected patterns per niche or globally
3. PER-NICHE CONTROLS — Independent tone, mode, and style notes per niche
4. UNLIMITED NICHES — Each niche runs its own independent pipeline
5. WORD-LEVEL CAPTIONS — Frame-perfect caption timing from edge-tts timestamps
6. 100% PUBLIC DOMAIN — Archive.org, Wikimedia Commons, C-SPAN, NASA

**Video Sources:** Archive.org, C-SPAN / IA, Wikimedia Commons, NASA Image Gallery

**Live Element:** Terminal ticker showing simulated PM2 log output (`nicheflow@vps — pm2 logs --all --raw`)

**Backend location:** NicheFlow is a separate project — not documented here. See NicheFlow handoff.

---

## PROJECT_02 — SuperOffRoadRC.com

**Label:** `PROJECT_02 // SUPEROFFROADRC.COM`
**Title:** AI SETUP NOTEBOOK
**Description:** Intelligent setup assistant for Yokomo SO 2.0 and SO 3.0 racers. Track every change, compare runs, and let AI tell you exactly what made you faster.

**Live site:** https://superoffroadrc.com

**Feature Cards:**
1. SETUP SNAPSHOTS — Log every setting, auto-generate diffs between sessions
2. RUN COMPARISON — Compare any two runs; AI identifies lap-time correlations
3. 1,582-CHUNK KNOWLEDGE BASE — YouTube transcripts + Yokomo manuals in ChromaDB
4. SO 2.0 + SO 3.0 SPECIFIC — Gearing calculators, setup templates, hard pack guides
5. FREEMIUM MODEL — Free logging; AI insights behind paid subscription

**Terminal Demo:** Live JSON diff panel showing before/after setup changes with AI analysis block

---

## PROJECT_03 — AI Builder Signal

**Label:** `PROJECT_03 // AI BUILDER SIGNAL`
**Title:** WEEKLY REDDIT INTELLIGENCE / DIGEST
**Description:** We scrape the AI builder subreddits so you don't have to. Every week: trending topics, emerging pain points, product gaps, and one prompt worth stealing. Free. Automated. Straight to your inbox.

**Stats Grid:**
| Stat | Label |
|------|-------|
| 25 | Subreddits |
| 3K+ | Posts / Week |
| 1 | Digest / Week |
| FREE | Forever |

**Tech Tags:** Reddit API, Node.js, Supabase, Groq / Llama 3, Resend, PM2, Vercel, PostgreSQL

**Subscribe Form:**
```html
<input type="email" id="signalEmail" placeholder="your@email.com" />
<button onclick="subscribeSignal()">GET THE SIGNAL →</button>
```
Posts to `/api/subscribe`. Success/error shown inline via `#signalMsg` span.

**Live Signal Feed Component:**
- Header: "THIS WEEK'S SIGNAL" with live pulse dot + "LIVE TRENDS" badge
- Shows 5 hardcoded demo trends (r/ClaudeAI, r/LocalLLaMA, r/SideProject)
- Ranks 01–05 with color-coded heat (🔥 hot, 📈 warm, → cold)
- Data is static/demo — not yet pulling live from Supabase

**Subreddit Badges shown:** r/ClaudeAI, r/LocalLLaMA, r/ChatGPT, r/SideProject, r/MachineLearning, r/OpenAI, r/AI_Agents, r/artificial

**Feature Cards:**
1. TRENDING TOPICS — Conversations gaining traction before they peak on Twitter
2. PAIN POINT OF THE WEEK — Most upvoted frustration; pure product research
3. OPPORTUNITY SPOTLIGHT — Recurring questions with no good answer yet
4. SUBREDDIT HEAT MAP — Which communities are growing/dying week over week
5. TOOL OF THE WEEK — One project that got traction; not sponsored
6. ONE PROMPT WORTH STEALING — Claude Code workflow pulled from top posts

### PROJECT_03 Backend

The AI Builder Signal pipeline is a **separate Node.js project** — not in this repo.

| Location | Contents |
|----------|---------|
| Mac: `/Users/bg/Downloads/ai-builder-signal/` | `discover.js`, `scraper.js`, `digest.js`, `send.js`, `.env` |
| VPS: `/root/ai-builder-signal/` | `digest.js`, `send.js`, `ecosystem.config.cjs`, `.env` |
| VPS SSH: `ssh -i ~/.ssh/nicheflow root@5.161.220.250` | |

**Automated workers:**

| Worker | Runs on | Schedule | What it does |
|--------|---------|----------|-------------|
| `discover.js` (launchd) | Mac | Daily 5am | Finds AI builder subreddits, upserts to `signal_subreddits` |
| `scraper.js` (launchd) | Mac | Daily 6am | Scrapes posts from active subreddits, populates `signal_posts` + `signal_trends` |
| `signal-digest` (PM2) | VPS | Sunday 8am | Calls Groq/LLaMA 3.3, generates digest, saves to `signal_digests` |
| `signal-sender` (PM2) | VPS | Sunday 9am | Sends digest to all subscribers via Resend |

**Why Mac for scrapers:** Hetzner VPS IP (5.161.220.250) is blocked by Reddit (HTTP 403). Mac runs from a residential IP. Reddit OAuth credentials were explicitly not used — scraper uses public `.json` endpoints only.

**Supabase tables:**

| Table | Purpose |
|-------|---------|
| `signal_subreddits` | Discovered subreddits (name, active, subscriber_count) |
| `signal_posts` | Scraped posts (subreddit, title, url, score, week_of) |
| `signal_trends` | Weekly aggregates per subreddit (avg_score, post_count) |
| `signal_digests` | Generated newsletters (subject, content_html, sent, sent_at) |
| `signal_subscribers` | Email list (email, active, unsubscribe_token UUID) |

**VPS env vars needed** (in `/root/ai-builder-signal/.env`):
```
SUPABASE_URL=https://cgpiltgxyeaxjgwcsewu.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
GROQ_API_KEY=gsk_...
RESEND_API_KEY=re_...   ← MUST BE FILLED IN before first send
USER_AGENT=ai-builder-signal/1.0 (by builtbyclaude.xyz)
```

---

## Bugs Fixed This Session (PROJECT_03)

### 1. Groq model decommissioned
`llama3-70b-8192` removed from Groq API. Fixed: updated `digest.js` to `llama-3.3-70b-versatile`.

### 2. PM2 ecosystem config ESM error
`ecosystem.config.js` failed with "module is not defined in ES module scope" because `package.json` has `"type": "module"`. Fixed: renamed to `ecosystem.config.cjs` — `.cjs` forces CommonJS parsing.

### 3. `signal_trends` UNIQUE constraint missing
Scraper upsert failed — no unique constraint on `(week_of, subreddit)`. Fixed: ran in Supabase SQL editor:
```sql
ALTER TABLE signal_trends
ADD CONSTRAINT signal_trends_week_subreddit_unique
UNIQUE (week_of, subreddit);
```

### 4. PROJECT_03 section spacing tweaks (done)
Multiple rounds of margin/padding adjustments to the PROJECT_03 section:
- `sdesc` margin-bottom: 24px
- `cta-row` moved above `nf-intro`, margin-top: 32px / margin-bottom: 48px
- `subscribe-form` set to `inline-flex` (not full width)
- `nf-intro` left column set to `flex-direction: column`, `stat-grid` flex: 1
- `signal-feed` set to `overflow: hidden`
- `nf-intro` align-items: flex-start, margin-bottom: 32px
- All `sec-sep` dividers made consistent: P01→P02 and P02→P03 now use `padding: 92px 0` to match P03→Stack gap

---

## Open Issues

### PROJECT_03 — Digest HTML needs redesign
The generated email HTML from `digest.js` doesn't match the builtbyclaude.xyz aesthetic. It should use the dark background (`#040408`), cyan/purple palette, Share Tech Mono font, and Bebas Neue headers. Currently generic.

### PROJECT_03 — Subreddit blocklist needs tuning
`discover.js` surfaces off-topic subreddits (e.g., r/Showerthoughts) via its keyword searches. A blocklist or relevance filter is needed in `discover.js` to exclude non-AI-builder communities.

### PROJECT_03 — Supabase usage limits warning
Supabase flagged a usage warning after the initial bulk scrape (~3,000+ posts). Investigate which limit was hit. May need a retention policy to prune `signal_posts` older than 30 days.

### PROJECT_03 — Live signal feed not pulling real data
The trend items in the signal feed on the site are static/hardcoded demo data. A future improvement would be a Vercel API route that queries `signal_trends` and returns live data for the frontend to render.

### PROJECT_03 — No digest preview before send
The Sunday pipeline is fully automatic (digest at 8am → send at 9am). There's no way to review the digest before it goes out. Consider adding a Saturday preview step or a manual trigger for the send.

---

## Next Steps

1. **Add `RESEND_API_KEY` to VPS** — required before first email send
   ```bash
   ssh -i ~/.ssh/nicheflow root@5.161.220.250
   nano /root/ai-builder-signal/.env
   pm2 restart signal-sender
   ```

2. **Set Vercel env vars** — `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` on builtbyclaude-legal project

3. **Create `signal_subscribers` table** — run in Supabase SQL editor if not yet done:
   ```sql
   CREATE TABLE signal_subscribers (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     email text UNIQUE NOT NULL,
     active boolean DEFAULT true,
     unsubscribe_token uuid DEFAULT gen_random_uuid(),
     created_at timestamptz DEFAULT now()
   );
   ```

4. **Test subscribe form** — visit builtbyclaude.xyz, submit an email, verify row in Supabase

5. **Send first real email** — once RESEND key is set, `node send.js` from VPS

6. **Tune subreddit discovery** — review `signal_subreddits` in Supabase, deactivate off-topic ones, add blocklist to `discover.js`

7. **Redesign digest email template** — update HTML template in `digest.js` to match site aesthetic

---

## Deployment

Push to `main` → Vercel auto-deploys. No build step — static HTML.

```bash
git add .
git commit -m "your message"
git push origin main
```
