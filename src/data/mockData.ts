export const stats = [
  { label: "Total Messages", value: "247", change: "+12%", icon: "MessageSquare" },
  { label: "Unread Messages", value: "18", change: "-3%", icon: "MailOpen" },
  { label: "Avg Response Time", value: "2.4m", change: "-18%", icon: "Clock" },
  { label: "Active Conversations", value: "34", change: "+8%", icon: "MessagesSquare" },
];

export const chartData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  messages: Math.floor(Math.random() * 30) + 10,
}));

export type Tag = "Lead" | "Customer" | "Support" | "Spam";

export interface Message {
  id: string;
  text: string;
  fromUser: boolean;
  time: string;
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  platform: "instagram" | "facebook";
  preview: string;
  time: string;
  unread: number;
  tag: Tag;
  summary: string;
  messages: Message[];
  aiSuggestions: string[];
  lastActive: string;
}

export const tagColors: Record<Tag, string> = {
  Lead: "bg-amber-500/20 text-amber-400",
  Customer: "bg-emerald-500/20 text-emerald-400",
  Support: "bg-sky-500/20 text-sky-400",
  Spam: "bg-red-500/20 text-red-400",
};

export const conversations: Conversation[] = [
  {
    id: "1", name: "Sarah Martinez", avatar: "SM", platform: "instagram",
    preview: "Hey, can I get a quote for driveway cleaning?",
    time: "2m ago", unread: 2, tag: "Lead",
    summary: "Lead interested in driveway cleaning – 3 messages exchanged",
    lastActive: "Just now",
    messages: [
      { id: "m1", text: "Hey, can I get a quote for driveway cleaning?", fromUser: false, time: "10:42 AM" },
      { id: "m2", text: "My driveway is about 40ft long, concrete.", fromUser: false, time: "10:43 AM" },
      { id: "m3", text: "Hi Sarah! I'd be happy to help. Let me put together a quote for you.", fromUser: true, time: "10:45 AM" },
    ],
    aiSuggestions: ["Sure! What's your address so I can give an accurate quote?", "Our standard driveway cleaning starts at $120. Want to schedule a visit?", "I can have someone out this week for a free estimate!"],
  },
  {
    id: "2", name: "Jake Thompson", avatar: "JT", platform: "facebook",
    preview: "Thanks for the great job last week!",
    time: "15m ago", unread: 0, tag: "Customer",
    summary: "Returning customer – satisfied with recent service",
    lastActive: "15 minutes ago",
    messages: [
      { id: "m1", text: "Thanks for the great job last week!", fromUser: false, time: "9:30 AM" },
      { id: "m2", text: "The patio looks brand new 🙌", fromUser: false, time: "9:30 AM" },
      { id: "m3", text: "So glad you're happy, Jake! Feel free to reach out anytime.", fromUser: true, time: "9:45 AM" },
    ],
    aiSuggestions: ["Thank you for the kind words! Would you like to leave us a review?", "Glad you loved it! We also offer gutter cleaning if you're interested.", "Thanks Jake! Here's 10% off your next service as a thank you."],
  },
  {
    id: "3", name: "Emily Chen", avatar: "EC", platform: "instagram",
    preview: "Do you service the Westside area?",
    time: "1h ago", unread: 1, tag: "Lead",
    summary: "New lead asking about service area – 1 message",
    lastActive: "1 hour ago",
    messages: [
      { id: "m1", text: "Do you service the Westside area?", fromUser: false, time: "8:15 AM" },
    ],
    aiSuggestions: ["Yes, we cover all of Westside! What service are you looking for?", "Absolutely! We service a 30-mile radius. What can I help you with?", "We do! I can schedule a free consultation at your convenience."],
  },
  {
    id: "4", name: "Mike Davis", avatar: "MD", platform: "facebook",
    preview: "My invoice seems wrong, can you check?",
    time: "2h ago", unread: 1, tag: "Support",
    summary: "Billing issue – customer disputing invoice amount",
    lastActive: "2 hours ago",
    messages: [
      { id: "m1", text: "My invoice seems wrong, can you check?", fromUser: false, time: "7:00 AM" },
      { id: "m2", text: "It says $350 but we agreed on $280.", fromUser: false, time: "7:01 AM" },
    ],
    aiSuggestions: ["I'm sorry about that! Let me pull up your invoice and correct it right away.", "Thanks for catching that, Mike. I'll send a revised invoice within the hour.", "Apologies for the error. I've updated the amount to $280. You'll receive the corrected invoice shortly."],
  },
  {
    id: "5", name: "Lisa Park", avatar: "LP", platform: "instagram",
    preview: "WIN A FREE iPHONE!!! Click here now!!!",
    time: "3h ago", unread: 0, tag: "Spam",
    summary: "Spam message – no action needed",
    lastActive: "3 hours ago",
    messages: [
      { id: "m1", text: "WIN A FREE iPHONE!!! Click here now!!!", fromUser: false, time: "6:00 AM" },
    ],
    aiSuggestions: ["This looks like spam. I'd recommend blocking this account.", "No action needed – this is a spam message.", "Would you like me to archive and block this sender?"],
  },
  {
    id: "6", name: "Ryan Foster", avatar: "RF", platform: "facebook",
    preview: "Can I book for next Saturday?",
    time: "4h ago", unread: 1, tag: "Lead",
    summary: "Lead wanting to book service for weekend",
    lastActive: "4 hours ago",
    messages: [
      { id: "m1", text: "Can I book for next Saturday?", fromUser: false, time: "5:30 AM" },
      { id: "m2", text: "I need the full exterior wash package.", fromUser: false, time: "5:31 AM" },
    ],
    aiSuggestions: ["Saturday looks open! What time works best for you?", "We have a 9 AM and 2 PM slot available. Which do you prefer?", "Absolutely! I'll pencil you in. Can I get your address?"],
  },
  {
    id: "7", name: "Amanda Lee", avatar: "AL", platform: "instagram",
    preview: "Do you offer recurring monthly plans?",
    time: "5h ago", unread: 0, tag: "Lead",
    summary: "Potential recurring customer asking about subscription plans",
    lastActive: "5 hours ago",
    messages: [
      { id: "m1", text: "Do you offer recurring monthly plans?", fromUser: false, time: "4:00 AM" },
      { id: "m2", text: "Yes! We have monthly, bi-weekly, and weekly plans with discounts.", fromUser: true, time: "4:30 AM" },
    ],
    aiSuggestions: ["Our monthly plan starts at $89/month. Would you like more details?", "Great question! Monthly subscribers save 15%. Want me to send pricing?", "We offer flexible plans! I can set up a quick call to go over options."],
  },
  {
    id: "8", name: "Carlos Ruiz", avatar: "CR", platform: "facebook",
    preview: "The team was very professional, thanks!",
    time: "1d ago", unread: 0, tag: "Customer",
    summary: "Happy customer – completed service yesterday",
    lastActive: "1 day ago",
    messages: [
      { id: "m1", text: "The team was very professional, thanks!", fromUser: false, time: "Yesterday" },
      { id: "m2", text: "Thank you Carlos! We appreciate your business.", fromUser: true, time: "Yesterday" },
    ],
    aiSuggestions: ["We're so glad to hear that! Would you mind leaving us a Google review?", "Thank you! We'd love to have you back. Here's a referral code for 10% off.", "Glad everything went well! Don't hesitate to reach out for future needs."],
  },
  {
    id: "9", name: "Nina Patel", avatar: "NP", platform: "instagram",
    preview: "What chemicals do you use? Are they pet safe?",
    time: "1d ago", unread: 1, tag: "Support",
    summary: "Customer inquiry about cleaning product safety",
    lastActive: "1 day ago",
    messages: [
      { id: "m1", text: "What chemicals do you use? Are they pet safe?", fromUser: false, time: "Yesterday" },
    ],
    aiSuggestions: ["Great question! All our products are eco-friendly and 100% pet safe.", "We use biodegradable, non-toxic solutions. Safe for pets and kids!", "Our cleaning agents are EPA-approved and pet-friendly. Want more details?"],
  },
  {
    id: "10", name: "Tom Wilson", avatar: "TW", platform: "facebook",
    preview: "FREE MONEY! Send your bank details!",
    time: "2d ago", unread: 0, tag: "Spam",
    summary: "Spam/scam message – block recommended",
    lastActive: "2 days ago",
    messages: [
      { id: "m1", text: "FREE MONEY! Send your bank details!", fromUser: false, time: "2 days ago" },
    ],
    aiSuggestions: ["This is a scam message. Recommend blocking immediately.", "Spam detected. Would you like to block and report?", "No action needed – marking as spam."],
  },
];
