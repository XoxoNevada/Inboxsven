import { motion } from "framer-motion";
import { Shield, Mail, Zap, Star, ArrowRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner.png";

const STRIPE_LINK = "https://buy.stripe.com/your-link"; // Replace with actual Stripe link

const plans = [
  {
    name: "Starter",
    price: "$9",
    period: "/mo",
    features: ["1 Inbox", "Basic spam filtering", "Email support"],
    popular: false,
  },
  {
    name: "Core",
    price: "$29",
    period: "/mo",
    features: ["5 Inboxes", "Advanced filtering", "Priority support", "Analytics dashboard"],
    popular: true,
  },
  {
    name: "Premium",
    price: "$79",
    period: "/mo",
    features: ["Unlimited Inboxes", "AI-powered sorting", "24/7 phone support", "Custom integrations", "Dedicated manager"],
    popular: false,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Index() {
  return (
    <div className="gradient-galaxy min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <span className="font-[var(--font-display)] text-xl font-bold tracking-tight text-foreground">
          Inbox<span className="text-primary">sven</span>
        </span>
        <a
          href={`mailto:contact@inboxsven.com`}
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Contact
        </a>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-10 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="rounded-2xl overflow-hidden glow-primary-lg mb-8"
        >
          <img
            src={heroBanner}
            alt="Inboxsven premium email management dashboard showcasing AI-powered inbox features"
            className="w-full h-auto"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-[var(--font-display)] text-4xl md:text-5xl font-bold mb-4 text-foreground"
        >
          Your inbox, <span className="text-primary">reimagined</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto"
        >
          Secure, AI-powered email management that keeps you focused on what matters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-3"
        >
          <a
            href={STRIPE_LINK}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-accent transition-colors glow-primary-sm"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="mailto:contact@inboxsven.com"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" /> Email Us
          </a>
        </motion.div>
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
          <Shield className="w-3 h-3" /> Secure & Reliable
        </p>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: "Bank-Level Security", desc: "End-to-end encryption keeps your emails private and safe." },
            { icon: Zap, title: "Lightning Fast", desc: "AI-powered sorting delivers the right emails instantly." },
            { icon: Star, title: "Smart Filters", desc: "Automatically categorize and prioritize what matters most." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <f.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-[var(--font-display)] text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-[var(--font-display)] text-3xl font-bold text-center mb-12"
        >
          Simple, transparent pricing
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={`relative bg-card border rounded-xl p-6 flex flex-col ${
                plan.popular ? "border-primary glow-primary-sm" : "border-border"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-[var(--font-display)] text-xl font-semibold mb-1">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href={STRIPE_LINK}
                className={`text-center py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-accent"
                    : "border border-border text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                Choose {plan.name}
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© 2026 Inboxsven. All rights reserved.</span>
          <a href="mailto:contact@inboxsven.com" className="hover:text-primary transition-colors">
            contact@inboxsven.com
          </a>
        </div>
      </footer>
    </div>
  );
}
