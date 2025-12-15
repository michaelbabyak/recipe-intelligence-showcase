"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles, Eye, ChevronRight } from "lucide-react";
import recipeStats from "@/data/recipe-stats.json";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border-light)]">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Poppy"
              width={100}
              height={28}
              className="h-7 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/current-state" className="btn-ghost text-sm">Current State</Link>
            <Link href="/automation" className="btn-ghost text-sm">Automation</Link>
            <Link href="/future-vision" className="btn-ghost text-sm">Future Vision</Link>
            <Link href="/data-explorer" className="btn btn-secondary ml-2 text-sm py-2 px-4">
              Explore Data
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Decorative blobs */}
        <div className="organic-blob w-[600px] h-[600px] -top-40 -right-40" />
        <div className="organic-blob w-[400px] h-[400px] bottom-20 -left-20 opacity-10" />

        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="badge badge-accent">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Internal Stakeholder Preview
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-display mb-6"
            >
              Recipe<br />
              <span className="text-[var(--terracotta)]">Intelligence</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-[var(--foreground-muted)] max-w-2xl mb-10 leading-relaxed"
            >
              The journey from manual recipe writing to visual-first automation.
              Explore how we&apos;re transforming the way Poppy creates wedding florals.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link href="/current-state" className="btn btn-primary">
                Start Exploring
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#chapters" className="btn btn-secondary">
                View Chapters
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            <StatCard
              value={recipeStats.totals.recipes.toLocaleString()}
              label="Recipes Written"
              suffix="by hand"
            />
            <StatCard
              value={recipeStats.matchRates.zeroOverlap + "%"}
              label="Rewritten"
              suffix="from scratch"
            />
            <StatCard
              value={recipeStats.automationTargets.automationRate.target + "%"}
              label="Target"
              suffix="automation"
            />
            <StatCard
              value={recipeStats.automationTargets.timeSavings.target + "%"}
              label="Time Savings"
              suffix="projected"
            />
          </motion.div>
        </div>
      </section>

      {/* Chapter Cards Section */}
      <section id="chapters" className="section bg-[var(--background-warm)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="divider divider-large mx-auto mb-8" />
            <motion.h2 variants={fadeInUp} className="text-title mb-4">
              Three Chapters
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[var(--foreground-muted)] max-w-xl mx-auto">
              Understanding where we are, where we&apos;re going, and the transformative vision ahead.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <ChapterCard
              number="01"
              title="Current State"
              description="How recipe writing works today. The three-tier system, template-to-reality gaps, and why 32% of recipes share zero stems with their templates."
              href="/current-state"
              icon={<BookOpen className="w-6 h-6" />}
              color="bg-[#F8F4F1]"
              stats={[
                { value: "51K", label: "recipes" },
                { value: "10.3%", label: "match rate" }
              ]}
            />

            <ChapterCard
              number="02"
              title="Automation"
              description="The Claude + Gemini partnership. How we combine orchestration intelligence with floral design expertise to automate recipe creation."
              href="/automation"
              icon={<Sparkles className="w-6 h-6" />}
              color="bg-[#FAF3EE]"
              accent
              stats={[
                { value: "7", label: "phases" },
                { value: "80%+", label: "target" }
              ]}
            />

            <ChapterCard
              number="03"
              title="Future Vision"
              description="Visual-first proposals. Where designer photos become shoppable products, recipes come attached, and WYSIWYG becomes reality."
              href="/future-vision"
              icon={<Eye className="w-6 h-6" />}
              color="bg-[#F5F3F0]"
              stats={[
                { value: "136K", label: "photos" },
                { value: "WYSIWYG", label: "goal" }
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeInUp} className="badge mb-6">The Challenge</motion.span>
              <motion.h2 variants={fadeInUp} className="text-title mb-6">
                The Translation Gap
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-[var(--foreground-muted)] mb-8 text-lg">
                Recipe templates are designed as <em>inspiration</em>, not production specs.
                When a template has 5 stems but the event recipe needs 8.5, that&apos;s not deviation—it&apos;s translation.
              </motion.p>

              <motion.div variants={fadeInUp} className="space-y-4">
                <InsightRow
                  label="Templates average"
                  value="5 stems"
                  accent
                />
                <InsightRow
                  label="Event recipes average"
                  value="8.5 stems"
                />
                <InsightRow
                  label="Installations expand by"
                  value="+102%"
                  highlight
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="card card-elevated p-8">
                <h3 className="text-subheading mb-6">Template Match Rates</h3>

                <div className="space-y-6">
                  <MatchRateBar
                    label="Exact match"
                    value={recipeStats.matchRates.exact}
                    color="var(--success)"
                  />
                  <MatchRateBar
                    label="Contains all template stems"
                    value={recipeStats.matchRates.containsAll}
                    color="var(--terracotta-light)"
                  />
                  <MatchRateBar
                    label="Has any overlap"
                    value={recipeStats.matchRates.hasOverlap}
                    color="var(--terracotta)"
                  />
                  <MatchRateBar
                    label="Zero overlap"
                    value={recipeStats.matchRates.zeroOverlap}
                    color="var(--charcoal)"
                    highlight
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-[var(--charcoal)] text-white">
        <div className="container text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-2xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-title text-white mb-6">
              Ready to explore?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/70 text-lg mb-10">
              Dive into the data, understand the workflows, and see the vision
              for how recipe intelligence will transform Poppy.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <Link
                href="/current-state"
                className="btn bg-[var(--terracotta)] text-white hover:bg-[var(--terracotta-light)]"
              >
                Begin with Current State
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/data-explorer"
                className="btn border border-white/20 text-white hover:bg-white/10"
              >
                Jump to Data Explorer
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[var(--border-light)]">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
            <Image src="/logo.svg" alt="Poppy" width={60} height={16} className="h-4 w-auto opacity-50" />
            <span>Recipe Intelligence</span>
          </div>
          <p className="text-sm text-[var(--foreground-subtle)]">
            Internal stakeholder preview • December 2025
          </p>
        </div>
      </footer>
    </main>
  );
}

// ============================================
// COMPONENTS
// ============================================

function StatCard({ value, label, suffix }: { value: string; label: string; suffix?: string }) {
  return (
    <div className="text-center">
      <div className="metric-value">{value}</div>
      <div className="metric-label">{label}</div>
      {suffix && <div className="text-caption mt-1">{suffix}</div>}
    </div>
  );
}

function ChapterCard({
  number,
  title,
  description,
  href,
  icon,
  color,
  accent,
  stats
}: {
  number: string;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
  accent?: boolean;
  stats: { value: string; label: string }[];
}) {
  return (
    <motion.div variants={fadeInUp}>
      <Link href={href} className="block group">
        <div className={`card card-interactive h-full ${color} border-0`}>
          <div className="flex items-start justify-between mb-6">
            <span className="text-caption text-[var(--foreground-subtle)] font-mono">
              {number}
            </span>
            <div className={`p-3 rounded-xl ${accent ? 'bg-[var(--terracotta)] text-white' : 'bg-[var(--background)]'}`}>
              {icon}
            </div>
          </div>

          <h3 className="text-heading mb-3 group-hover:text-[var(--terracotta)] transition-colors">
            {title}
          </h3>
          <p className="text-[var(--foreground-muted)] mb-6 leading-relaxed">
            {description}
          </p>

          <div className="flex gap-6 pt-4 border-t border-[var(--border-light)]">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="font-semibold text-[var(--charcoal)]">{stat.value}</div>
                <div className="text-caption">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-6 text-sm font-medium text-[var(--terracotta)] opacity-0 group-hover:opacity-100 transition-opacity">
            Explore chapter
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function InsightRow({ label, value, accent, highlight }: {
  label: string;
  value: string;
  accent?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[var(--border-light)]">
      <span className="text-[var(--foreground-muted)]">{label}</span>
      <span className={`font-semibold ${highlight ? 'text-[var(--terracotta)]' : accent ? 'text-[var(--charcoal)]' : ''}`}>
        {value}
      </span>
    </div>
  );
}

function MatchRateBar({ label, value, color, highlight }: {
  label: string;
  value: number;
  color: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className={`text-sm ${highlight ? 'font-medium' : 'text-[var(--foreground-muted)]'}`}>
          {label}
        </span>
        <span className={`text-sm font-semibold ${highlight ? 'text-[var(--terracotta)]' : ''}`}>
          {value}%
        </span>
      </div>
      <div className="h-2 bg-[var(--border-light)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
