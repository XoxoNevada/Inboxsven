

## Plan: Build Dashboard, Inbox, and Integrations Pages

This is a large feature set spanning 4 pages with complex layouts. Here's the implementation plan.

### New Dependency
- **recharts** — lightweight React charting library (no Chart.js needed, works well with React/Tailwind)

### Files to Create

**1. Shared Layout — `src/components/DashboardLayout.tsx`**
- Collapsible left sidebar with nav items: Inbox, AI Replies, Analytics, Integrations, Settings, Billing
- Uses lucide-react icons, responsive (hamburger menu on mobile, slide-out drawer)
- Dark theme using existing CSS variables, neon purple active states
- Wraps all app pages (dashboard, inbox, integrations)

**2. Dashboard — `src/pages/Dashboard.tsx`**
- Welcome header: "Your Unified Inbox – Ready to Manage IG & FB"
- 4 stat cards: Total Messages (247), Unread (18), Avg Response Time (2.4m), Active Conversations (34) — purple glow accents
- Recharts line chart showing messages over last 30 days (mock data)

**3. Inbox — `src/pages/Inbox.tsx`**
- Three-column Slack-like layout (stacked on mobile):
  - **Left column**: Filter tabs (All, Unread, Leads, Customers, Spam) + 8-10 mock conversation threads with avatars, platform icons (IG/FB), preview text, timestamps, unread badges, colored category tags (Lead/Customer/Support/Spam)
  - **Center column**: Active message thread with chat bubbles (sent vs received styling), text input at bottom, "Generate AI Reply" button
  - **Right sidebar**: Customer profile details (name, platform, last active), conversation summary, 3 AI-suggested reply buttons (dynamic per selected conversation), quick actions (Mark as Read, Set Priority, Add Tag, Archive)
- Mock data with ~10 conversations, each pre-tagged and with contextual AI suggestions

**4. Integrations — `src/pages/Integrations.tsx`**
- Cards for Instagram Graph API and Facebook Messenger API
- "Connect Account" button per card → shows modal "Connecting via Meta..."
- Toggle connection status on mock click (Not Connected → Connected with green indicator)
- Info note about connecting business accounts

**5. Mock Data — `src/data/mockData.ts`**
- All mock conversations, messages, stats, chart data in one file

### Routes Update — `src/App.tsx`
- Add `/dashboard`, `/inbox`, `/integrations` routes, all wrapped in `DashboardLayout`

### Technical Approach
- Sidebar: pure Tailwind + state toggle (no shadcn sidebar needed — keeps it lightweight)
- Mobile: sidebar becomes a slide-over with overlay, inbox columns stack vertically
- Charts: recharts `<LineChart>` with purple gradient fill
- All data is static/mock — no backend calls

