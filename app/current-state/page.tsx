"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronRight, Layers, FileText, Package, Check, X, AlertCircle } from "lucide-react";
import recipeStats from "@/data/recipe-stats.json";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
} from "recharts";

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
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

export default function CurrentStatePage() {
  // Prepare chart data
  const matchRateData = [
    { name: "Exact Match", value: recipeStats.matchRates.exact, color: "var(--success)" },
    { name: "Contains All", value: recipeStats.matchRates.containsAll, color: "#7ED6A5" },
    { name: "Has Overlap", value: recipeStats.matchRates.hasOverlap - recipeStats.matchRates.containsAll - recipeStats.matchRates.exact, color: "var(--terracotta-light)" },
    { name: "Zero Overlap", value: recipeStats.matchRates.zeroOverlap, color: "var(--charcoal)" },
  ];

  const expansionData = Object.entries(recipeStats.expansionRates).map(([key, val]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    template: val.template,
    event: val.event,
    change: val.change
  }));

  const roleData = Object.entries(recipeStats.roleDistribution).map(([key, val]) => ({
    name: key.toUpperCase(),
    slots: val.slots,
    avgQty: val.avgQty,
    description: val.description
  }));

  const pricingData = recipeStats.pricingTiers.map(tier => ({
    range: tier.range,
    count: tier.count,
    avg: tier.avg,
    percentage: tier.percentage
  }));

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
            <Link href="/current-state" className="btn-ghost text-sm text-[var(--terracotta)] font-medium">Current State</Link>
            <Link href="/automation" className="btn-ghost text-sm">Automation</Link>
            <Link href="/future-vision" className="btn-ghost text-sm">Future Vision</Link>
            <Link href="/data-explorer" className="btn btn-secondary ml-2 text-sm py-2 px-4">
              Explore Data
            </Link>
          </nav>
        </div>
      </header>

      {/* Chapter Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="organic-blob w-[500px] h-[500px] -top-40 -right-20 opacity-10" />

        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
              <Link href="/" className="text-[var(--foreground-muted)] hover:text-[var(--terracotta)] transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <span className="badge badge-accent">Chapter 01</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-hero mb-6">
              Current State
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-[var(--foreground-muted)] max-w-3xl mb-8">
              How recipe writing works today. Understanding the three-tier system,
              the template-to-reality translation gap, and why over 32% of recipes
              share zero stems with their templates.
            </motion.p>

            {/* Quick Stats */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-8">
              <QuickStat value={recipeStats.totals.recipes.toLocaleString()} label="Total Recipes" />
              <QuickStat value={recipeStats.totals.templates.toLocaleString()} label="Templates" />
              <QuickStat value={recipeStats.totals.stems.toLocaleString()} label="Unique Stems" />
              <QuickStat value={recipeStats.totals.formulas.toString()} label="Formulas" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Three-Tier System */}
      <section className="section bg-[var(--background-warm)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="badge mb-4">The Architecture</span>
              <h2 className="text-title mb-4">Three-Tier System</h2>
              <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
                Recipes flow through three layers, each adding specificity and detail.
                Templates inspire, formulas constrain, event recipes execute.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-6">
              <TierCard
                tier="1"
                title="Templates"
                count={recipeStats.totals.templates.toLocaleString()}
                icon={<Layers className="w-6 h-6" />}
                description="Standard catalog items with base stem selections. Designed as inspiration, not production specs."
                items={["~2,000 standard catalog items", "Created by merchandising team", "5 stems average"]}
                color="var(--terracotta-light)"
              />
              <TierCard
                tier="2"
                title="Formulas"
                count={recipeStats.totals.formulas.toString()}
                icon={<FileText className="w-6 h-6" />}
                description="Rules for how products should be composed. Define roles, quantities, and constraints."
                items={["Role-based structure", "Quantity guidelines", "Price tier rules"]}
                color="var(--terracotta)"
              />
              <TierCard
                tier="3"
                title="Event Recipes"
                count={recipeStats.totals.recipes.toLocaleString()}
                icon={<Package className="w-6 h-6" />}
                description="Production specifications for actual orders. Written by recipe writers, executed by designers."
                items={["8.5 stems average", "Event-specific customizations", "Execution-ready specs"]}
                color="var(--charcoal)"
              />
            </motion.div>

            {/* Flow Arrows */}
            <motion.div
              variants={fadeInUp}
              className="flex justify-center items-center gap-4 mt-8 text-[var(--foreground-muted)]"
            >
              <span className="text-sm">Templates</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-sm">+ Formulas</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-sm">= Event Recipes</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Template Match Rates */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeInUp} className="badge mb-4">The Gap</motion.span>
              <motion.h2 variants={fadeInUp} className="text-title mb-6">
                Template Match Rates
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-[var(--foreground-muted)] mb-8 text-lg">
                When we compare event recipes to their source templates, we find a significant
                translation gap. Only <strong className="text-[var(--charcoal)]">10.3%</strong> of recipes
                exactly match their templates.
              </motion.p>

              <motion.div variants={fadeInUp} className="space-y-4">
                <MatchInsight
                  icon={<Check className="w-4 h-4" />}
                  label="Exact match"
                  value={`${recipeStats.matchRates.exact}%`}
                  description="Recipe uses exactly the same stems as template"
                  type="success"
                />
                <MatchInsight
                  icon={<AlertCircle className="w-4 h-4" />}
                  label="Contains all template stems"
                  value={`${recipeStats.matchRates.containsAll}%`}
                  description="Recipe includes all template stems plus additions"
                  type="warning"
                />
                <MatchInsight
                  icon={<AlertCircle className="w-4 h-4" />}
                  label="Has any overlap"
                  value={`${recipeStats.matchRates.hasOverlap}%`}
                  description="At least one stem matches the template"
                  type="neutral"
                />
                <MatchInsight
                  icon={<X className="w-4 h-4" />}
                  label="Zero overlap"
                  value={`${recipeStats.matchRates.zeroOverlap}%`}
                  description="Completely different stems from template"
                  type="error"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card card-elevated p-8"
            >
              <h3 className="text-subheading mb-6 text-center">Match Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={matchRateData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {matchRateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, '']}
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid var(--border-light)',
                      boxShadow: 'var(--shadow-md)'
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => <span style={{ color: 'var(--foreground-muted)', fontSize: '13px' }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stem Expansion by Product */}
      <section className="section bg-[var(--background-warm)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} className="badge mb-4">Expansion Patterns</motion.span>
            <motion.h2 variants={fadeInUp} className="text-title mb-4">
              Stem Count: Template vs Event
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
              Event recipes consistently expand beyond their templates.
              Installations show the most dramatic expansion at <strong>+102%</strong>.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card card-elevated p-8"
          >
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={expansionData} layout="vertical" barGap={4}>
                <XAxis type="number" domain={[0, 12]} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={100}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: 'var(--foreground-muted)', fontSize: 14 }}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `${value} stems`,
                    name === 'template' ? 'Template' : 'Event Recipe'
                  ]}
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid var(--border-light)',
                    boxShadow: 'var(--shadow-md)'
                  }}
                />
                <Bar dataKey="template" fill="var(--terracotta-light)" radius={[0, 4, 4, 0]} name="Template" />
                <Bar dataKey="event" fill="var(--terracotta)" radius={[0, 4, 4, 0]} name="Event Recipe" />
              </BarChart>
            </ResponsiveContainer>

            {/* Expansion percentages */}
            <div className="grid grid-cols-5 gap-4 mt-8 pt-6 border-t border-[var(--border-light)]">
              {expansionData.map((item) => (
                <div key={item.name} className="text-center">
                  <div className={`text-lg font-semibold ${item.change >= 0 ? 'text-[var(--terracotta)]' : 'text-[var(--success)]'}`}>
                    {item.change >= 0 ? '+' : ''}{item.change}%
                  </div>
                  <div className="text-caption">{item.name}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Role Distribution */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="badge mb-4">Stem Roles</span>
              <h2 className="text-title mb-4">Role Distribution</h2>
              <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
                Each stem in a recipe plays a specific role. Understanding these roles
                is key to automated recipe generation.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {roleData.map((role, index) => (
                <RoleCard key={role.name} role={role} index={index} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stem Pricing */}
      <section className="section bg-[var(--background-warm)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} className="badge mb-4">Cost Structure</motion.span>
            <motion.h2 variants={fadeInUp} className="text-title mb-4">
              Stem Pricing Distribution
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
              Most stems fall in the $1-2 range. Understanding pricing tiers helps
              automate margin-aware recipe generation.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card card-elevated p-8"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pricingData}>
                <XAxis
                  dataKey="range"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: 'var(--foreground-muted)', fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: 'var(--foreground-muted)', fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (name === 'count') return [`${value} stems`, 'Count'];
                    return [value, name];
                  }}
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid var(--border-light)',
                    boxShadow: 'var(--shadow-md)'
                  }}
                />
                <Bar dataKey="count" fill="var(--terracotta)" radius={[4, 4, 0, 0]}>
                  {pricingData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 1 ? 'var(--terracotta)' : 'var(--terracotta-light)'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Percentage breakdown */}
            <div className="grid grid-cols-6 gap-4 mt-8 pt-6 border-t border-[var(--border-light)]">
              {pricingData.map((tier) => (
                <div key={tier.range} className="text-center">
                  <div className="text-lg font-semibold text-[var(--charcoal)]">
                    {tier.percentage}%
                  </div>
                  <div className="text-caption">{tier.range}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Workflow */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="badge mb-4">Today&apos;s Process</span>
              <h2 className="text-title mb-4">Current Workflow</h2>
              <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
                From catalog selection to final recipe, every step requires human translation and expertise.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-8">
              {recipeStats.workflowPhases.current.map((phase, index) => (
                <WorkflowStep
                  key={phase.name}
                  step={index + 1}
                  title={phase.name}
                  description={phase.description}
                  items={phase.items}
                  isLast={index === recipeStats.workflowPhases.current.length - 1}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Insight */}
      <section className="section bg-[var(--charcoal)] text-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 variants={fadeInUp} className="text-title text-white mb-6">
              The Translation Gap is an Opportunity
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/70 text-lg mb-8">
              The fact that 32% of recipes share zero stems with their templates isn&apos;t a failure—
              it&apos;s evidence that recipe writing requires intelligence, not just copying.
              This is exactly where AI can help.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <Link href="/automation" className="btn bg-[var(--terracotta)] text-white hover:bg-[var(--terracotta-light)]">
                See How We Automate
                <ArrowRight className="w-4 h-4" />
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
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-[var(--foreground-muted)] hover:text-[var(--terracotta)]">Home</Link>
            <Link href="/automation" className="text-[var(--foreground-muted)] hover:text-[var(--terracotta)]">Automation</Link>
            <Link href="/future-vision" className="text-[var(--foreground-muted)] hover:text-[var(--terracotta)]">Future Vision</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ============================================
// COMPONENTS
// ============================================

function QuickStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold text-[var(--terracotta)]">{value}</div>
      <div className="text-sm text-[var(--foreground-muted)]">{label}</div>
    </div>
  );
}

function TierCard({ tier, title, count, icon, description, items, color }: {
  tier: string;
  title: string;
  count: string;
  icon: React.ReactNode;
  description: string;
  items: string[];
  color: string;
}) {
  return (
    <motion.div variants={scaleIn} className="card card-elevated h-full">
      <div className="flex items-start justify-between mb-4">
        <span className="text-caption font-mono text-[var(--foreground-subtle)]">TIER {tier}</span>
        <div
          className="p-3 rounded-xl text-white"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
      </div>
      <h3 className="text-heading mb-2">{title}</h3>
      <div className="text-2xl font-semibold text-[var(--terracotta)] mb-4">{count}</div>
      <p className="text-[var(--foreground-muted)] text-sm mb-4">{description}</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-[var(--foreground-muted)] flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-[var(--terracotta)] mt-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function MatchInsight({ icon, label, value, description, type }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
  type: 'success' | 'warning' | 'neutral' | 'error';
}) {
  const colors = {
    success: 'text-[var(--success)] bg-[rgba(0,184,148,0.1)]',
    warning: 'text-[var(--warning)] bg-[rgba(253,203,110,0.1)]',
    neutral: 'text-[var(--terracotta)] bg-[rgba(225,112,85,0.1)]',
    error: 'text-[var(--charcoal)] bg-[var(--background-warm)]'
  };

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border-light)]">
      <div className={`p-2 rounded-lg ${colors[type]}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-[var(--charcoal)]">{label}</span>
          <span className="font-semibold text-[var(--terracotta)]">{value}</span>
        </div>
        <p className="text-sm text-[var(--foreground-muted)]">{description}</p>
      </div>
    </div>
  );
}

function RoleCard({ role, index }: {
  role: { name: string; slots: number; avgQty: number; description: string };
  index: number
}) {
  const colors = [
    'var(--terracotta)',
    'var(--terracotta-light)',
    '#7ED6A5',
    'var(--charcoal-light)',
    'var(--charcoal)'
  ];

  return (
    <motion.div
      variants={scaleIn}
      className="card text-center"
      style={{ borderTop: `3px solid ${colors[index]}` }}
    >
      <div className="text-xs font-mono text-[var(--foreground-subtle)] mb-2">{role.name}</div>
      <div className="text-3xl font-semibold text-[var(--charcoal)] mb-1">{role.slots}</div>
      <div className="text-caption mb-3">slots</div>
      <div className="text-sm text-[var(--foreground-muted)] mb-2">
        Avg qty: <strong>{role.avgQty}</strong>
      </div>
      <p className="text-xs text-[var(--foreground-subtle)]">{role.description}</p>
    </motion.div>
  );
}

function WorkflowStep({ step, title, description, items, isLast }: {
  step: number;
  title: string;
  description: string;
  items: string;
  isLast: boolean;
}) {
  return (
    <div className="relative">
      <div className="card card-elevated h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-[var(--terracotta)] text-white flex items-center justify-center font-semibold">
            {step}
          </div>
          <h3 className="text-heading">{title}</h3>
        </div>
        <p className="text-[var(--foreground-muted)] mb-4">{description}</p>
        <div className="text-sm font-medium text-[var(--terracotta)]">{items}</div>
      </div>
      {!isLast && (
        <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
          <ChevronRight className="w-8 h-8 text-[var(--border)]" />
        </div>
      )}
    </div>
  );
}
