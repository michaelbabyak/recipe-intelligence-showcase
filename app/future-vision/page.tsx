"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ChevronRight, RefreshCcw, Camera, ShoppingBag,
  Palette, FileText, Eye, Sparkles, Package, Users, TrendingUp,
  Database, Image as ImageIcon, Receipt, Layers, CheckCircle
} from "lucide-react";
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
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

export default function FutureVisionPage() {
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
            <Link href="/future-vision" className="btn-ghost text-sm text-[var(--terracotta)] font-medium">Future Vision</Link>
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
              <Link href="/automation" className="text-[var(--foreground-muted)] hover:text-[var(--terracotta)] transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <span className="badge badge-accent">Chapter 03</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-hero mb-6">
              Future Vision
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-[var(--foreground-muted)] max-w-3xl mb-8">
              Visual-first proposals where every image a client sees represents an actual arrangement
              with a known recipe, known costs, and proven aesthetics. What you see is what you get.
            </motion.p>

            {/* Key Insight */}
            <motion.div variants={fadeInUp} className="card bg-[var(--background-warm)] border-l-4 border-[var(--terracotta)] max-w-2xl">
              <p className="text-lg font-medium text-[var(--charcoal)]">
                &ldquo;The designer photo catalog IS the product catalog. Every wedding executed adds to the shoppable inventory.&rdquo;
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Paradigm Shift */}
      <section className="section bg-[var(--background-warm)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="badge mb-4">The Transformation</span>
              <h2 className="text-title mb-4">From SKU-First to Visual-First</h2>
              <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
                A fundamental shift in how clients discover and select their wedding florals.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Current State */}
              <div className="card card-elevated">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--charcoal-light)] text-white flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--charcoal)]">Current State</h3>
                    <p className="text-caption">SKU-First Approach</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <ShiftRow label="Browsing" value="SKU-based product catalog" type="old" />
                  <ShiftRow label="Selection" value="Abstract product templates" type="old" />
                  <ShiftRow label="Recipe Writing" value="Post-sale, manual interpretation" type="old" />
                  <ShiftRow label="Pricing" value="Calculated after recipe written" type="old" />
                  <ShiftRow label="Expectations" value="&ldquo;Inspired by&rdquo; catalog images" type="old" />
                  <ShiftRow label="Cohesion" value="Designer interprets across products" type="old" />
                </div>
              </div>

              {/* Future State */}
              <div className="card card-elevated border-2 border-[var(--terracotta)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--terracotta)] text-white flex items-center justify-center">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--charcoal)]">Future State</h3>
                    <p className="text-caption">Visual-First Approach</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <ShiftRow label="Browsing" value="Visual gallery of executed recipes" type="new" />
                  <ShiftRow label="Selection" value="Real photos with exact recipes" type="new" />
                  <ShiftRow label="Recipe Writing" value="Pre-sale, already exists" type="new" />
                  <ShiftRow label="Pricing" value="Margins baked in at browse time" type="new" />
                  <ShiftRow label="Expectations" value="WYSIWYG - what you select is what you get" type="new" />
                  <ShiftRow label="Cohesion" value="Same-event products suggested together" type="new" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Data Model */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="badge mb-4">Foundation</span>
              <h2 className="text-title mb-4">The Data Model</h2>
              <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
                Every image backed by a recipe, every recipe backed by real costs.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
              <div className="card card-elevated p-8">
                {/* Entity Diagram */}
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Photos */}
                  <EntityCard
                    icon={<Camera className="w-6 h-6" />}
                    title="Designer Photos"
                    count={recipeStats.totals.designerPhotos.toLocaleString()}
                    description="Real wedding photos organized by event"
                    color="var(--terracotta)"
                  />

                  {/* Arrow */}
                  <div className="hidden md:flex items-center justify-center">
                    <div className="flex flex-col items-center text-[var(--foreground-subtle)]">
                      <ChevronRight className="w-8 h-8" />
                      <span className="text-xs font-mono">event_id</span>
                    </div>
                  </div>

                  {/* Recipes */}
                  <EntityCard
                    icon={<Receipt className="w-6 h-6" />}
                    title="Executed Recipes"
                    count={recipeStats.totals.recipes.toLocaleString()}
                    description="Production specs with exact stems"
                    color="var(--charcoal)"
                  />
                </div>

                {/* Center connection */}
                <div className="flex justify-center my-8">
                  <div className="flex flex-col items-center text-[var(--foreground-subtle)]">
                    <div className="w-px h-8 bg-[var(--border)]" />
                    <span className="text-xs font-mono my-2">join</span>
                    <div className="w-px h-8 bg-[var(--border)]" />
                  </div>
                </div>

                {/* Result */}
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Shoppable Products */}
                  <div className="md:col-start-2">
                    <EntityCard
                      icon={<ShoppingBag className="w-6 h-6" />}
                      title="Shoppable Products"
                      count="New"
                      description="Recipe-backed images with pricing"
                      color="var(--success)"
                      highlighted
                    />
                  </div>
                </div>

                {/* Supporting entities */}
                <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-[var(--border-light)]">
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-[var(--terracotta)] mb-1">{recipeStats.totals.stems.toLocaleString()}</div>
                    <div className="text-caption">Unique Stems</div>
                    <div className="text-xs text-[var(--foreground-subtle)] mt-1">With pricing & seasonality</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-[var(--terracotta)] mb-1">{recipeStats.totals.stemPalettes}</div>
                    <div className="text-caption">Stem Palettes</div>
                    <div className="text-xs text-[var(--foreground-subtle)] mt-1">Curated color combinations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-[var(--terracotta)] mb-1">{recipeStats.colorPalettes.length}</div>
                    <div className="text-caption">Color Palettes</div>
                    <div className="text-xs text-[var(--foreground-subtle)] mt-1">From Blush to Wildflower</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5-Phase Lifecycle */}
      <section className="section bg-[var(--charcoal)] text-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="badge bg-white/10 text-white/80 mb-4">The Journey</span>
              <h2 className="text-title text-white mb-4">5-Phase Lifecycle</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                From bootstrapping the catalog to the virtuous cycle of continuous growth.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-white/10" />

                {/* Phases */}
                <div className="grid md:grid-cols-5 gap-6">
                  {recipeStats.workflowPhases.future.map((phase, index) => (
                    <PhaseCard
                      key={phase.phase}
                      number={phase.phase}
                      title={phase.name}
                      description={phase.description}
                      isActive={index === 0}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Browse Experience Mockup */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="badge mb-4">The Experience</span>
              <h2 className="text-title mb-4">Visual Browse Experience</h2>
              <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
                Clients see real photos, select what they love, and get exactly what they picked.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-5xl mx-auto">
              {/* Browser mockup */}
              <div className="card card-elevated p-0 overflow-hidden">
                {/* Browser chrome */}
                <div className="bg-[var(--charcoal)] px-4 py-3 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27CA40]" />
                  </div>
                  <div className="flex-1 bg-white/10 rounded-md px-3 py-1 text-sm text-white/60">
                    poppy.com/browse
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Filters */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    <FilterChip label="Spring" active />
                    <FilterChip label="Blush & Ivory" active />
                    <FilterChip label="Standard Tier" active />
                    <FilterChip label="Garden Style" />
                  </div>

                  {/* Product grid mockup */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <ProductMockup type="Bridal Bouquet" price="$185-220" selected />
                    <ProductMockup type="Bridesmaid" price="$95-120" />
                    <ProductMockup type="Centerpiece" price="$85-110" />
                    <ProductMockup type="Boutonniere" price="$22-28" />
                  </div>

                  {/* Cohesion suggestion */}
                  <div className="p-6 bg-[var(--background-warm)] rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[var(--terracotta-light)] text-[var(--terracotta-dark)] flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[var(--charcoal)] mb-1">
                          This bouquet was part of a Spring wedding
                        </h4>
                        <p className="text-sm text-[var(--foreground-muted)] mb-3">
                          See the centerpieces, installations, and boutonnieres that were designed together.
                          These products share 8 stem types and have proven visual cohesion.
                        </p>
                        <button className="btn btn-secondary text-sm py-2 px-4">
                          See Full Wedding
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Nano Banana Customization */}
      <section className="section bg-[var(--background-warm)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="badge mb-4">Customization</span>
              <h2 className="text-title mb-4">AI-Powered Variants</h2>
              <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
                Nano Banana generates visual variants, but every variant is backed by a real, executable recipe.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <CustomizationOption
                title="More Greenery"
                description="Add eucalyptus and ruscus while maintaining proportions"
                delta="+$32"
              />
              <CustomizationOption
                title="Fuller Arrangement"
                description="Increase stem quantities across all roles"
                delta="+$48"
              />
              <CustomizationOption
                title="Color Shift"
                description="Swap accent stems to adjust the color balance"
                delta="+$12"
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-2xl mx-auto mt-12 text-center">
              <p className="text-sm text-[var(--foreground-muted)]">
                <strong className="text-[var(--charcoal)]">Recipe-backed generation:</strong> Every generated image has an exact stem list.
                No aesthetic hallucinations. Clients see exactly what changed and the price impact.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Virtuous Cycle */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="badge mb-4">The Flywheel</span>
              <h2 className="text-title mb-4">The Virtuous Cycle</h2>
              <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
                Every executed wedding automatically grows the catalog.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Cycle visualization */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <CycleStep
                    number={1}
                    icon={<Camera className="w-6 h-6" />}
                    title="More Weddings Executed"
                    description="Each event creates new QA photos"
                  />
                  <CycleStep
                    number={2}
                    icon={<Receipt className="w-6 h-6" />}
                    title="More QA Photos with Recipes"
                    description="Photos automatically linked to recipes"
                  />
                  <CycleStep
                    number={3}
                    icon={<Database className="w-6 h-6" />}
                    title="Larger Visual Catalog"
                    description="Shoppable products grow organically"
                  />
                  <CycleStep
                    number={4}
                    icon={<Palette className="w-6 h-6" />}
                    title="More Selection Options"
                    description="Clients find better matches"
                  />
                  <CycleStep
                    number={5}
                    icon={<TrendingUp className="w-6 h-6" />}
                    title="Higher Conversion Rates"
                    description="WYSIWYG builds trust"
                  />
                  <CycleStep
                    number={6}
                    icon={<RefreshCcw className="w-6 h-6" />}
                    title="More Weddings Booked"
                    description="Cycle continues..."
                    highlighted
                  />
                </div>

                {/* Center icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex">
                  <div className="w-16 h-16 rounded-full bg-[var(--terracotta)] text-white flex items-center justify-center animate-[pulse-soft_3s_ease-in-out_infinite]">
                    <RefreshCcw className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Role Transformation */}
      <section className="section bg-[var(--background-warm)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="badge mb-4">Human Roles</span>
              <h2 className="text-title mb-4">Role Transformation</h2>
              <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
                The goal is elevation, not replacement. Humans gain clarity and focus on higher-value work.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {Object.entries(recipeStats.humanRoleTransformation).map(([key, value]) => (
                  <RoleTransformCard key={key} current={value.current} future={value.future} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="section bg-[var(--charcoal)] text-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2 variants={fadeInUp} className="text-title text-white mb-12">
              The Assets We Have Today
            </motion.h2>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <BigStat value={recipeStats.totals.designerPhotos.toLocaleString()} label="Designer Photos" suffix="in archives" />
              <BigStat value={recipeStats.totals.recipes.toLocaleString()} label="Executed Recipes" suffix="with stems" />
              <BigStat value={recipeStats.totals.stems.toLocaleString()} label="Unique Stems" suffix="with pricing" />
              <BigStat value={recipeStats.totals.pviImages.toLocaleString()} label="PVI Images" suffix="indexed" />
            </motion.div>

            <motion.p variants={fadeInUp} className="text-white/60 max-w-2xl mx-auto mb-10">
              We already have the photos, the recipes, and the pricing. The visual-first future
              is about connecting them into a seamless client experience.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Link href="/data-explorer" className="btn bg-[var(--terracotta)] text-white hover:bg-[var(--terracotta-light)]">
                Explore the Data
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
            <Link href="/current-state" className="text-[var(--foreground-muted)] hover:text-[var(--terracotta)]">Current State</Link>
            <Link href="/automation" className="text-[var(--foreground-muted)] hover:text-[var(--terracotta)]">Automation</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ============================================
// COMPONENTS
// ============================================

function ShiftRow({ label, value, type }: { label: string; value: string; type: 'old' | 'new' }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-[var(--border-light)] last:border-0">
      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${type === 'new' ? 'bg-[var(--success)]' : 'bg-[var(--border)]'}`} />
      <div>
        <div className="text-xs text-[var(--foreground-subtle)] mb-0.5">{label}</div>
        <div className={`text-sm ${type === 'new' ? 'text-[var(--charcoal)] font-medium' : 'text-[var(--foreground-muted)]'}`}>
          {value}
        </div>
      </div>
    </div>
  );
}

function EntityCard({ icon, title, count, description, color, highlighted }: {
  icon: React.ReactNode;
  title: string;
  count: string;
  description: string;
  color: string;
  highlighted?: boolean;
}) {
  return (
    <div className={`p-6 rounded-xl text-center ${highlighted ? 'bg-[var(--success)]/10 border-2 border-[var(--success)]' : 'bg-[var(--background-warm)]'}`}>
      <div
        className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4 text-white"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <h4 className="font-semibold text-[var(--charcoal)] mb-1">{title}</h4>
      <div className="text-2xl font-semibold text-[var(--terracotta)] mb-2">{count}</div>
      <p className="text-sm text-[var(--foreground-muted)]">{description}</p>
    </div>
  );
}

function PhaseCard({ number, title, description, isActive }: {
  number: number;
  title: string;
  description: string;
  isActive?: boolean;
}) {
  return (
    <div className="relative">
      {/* Circle */}
      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 relative z-10 ${isActive ? 'bg-[var(--terracotta)]' : 'bg-white/10'}`}>
        <span className={`text-lg font-semibold ${isActive ? 'text-white' : 'text-white/60'}`}>{number}</span>
      </div>
      <h4 className={`font-semibold mb-2 text-center ${isActive ? 'text-white' : 'text-white/80'}`}>{title}</h4>
      <p className="text-sm text-white/50 text-center">{description}</p>
    </div>
  );
}

function FilterChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <span className={`px-3 py-1.5 rounded-full text-sm ${active ? 'bg-[var(--terracotta)] text-white' : 'bg-[var(--background-warm)] text-[var(--foreground-muted)]'}`}>
      {label}
    </span>
  );
}

function ProductMockup({ type, price, selected }: { type: string; price: string; selected?: boolean }) {
  return (
    <div className={`rounded-xl overflow-hidden border-2 transition-all ${selected ? 'border-[var(--terracotta)] ring-2 ring-[var(--terracotta)]/20' : 'border-transparent'}`}>
      <div className="aspect-square bg-gradient-to-br from-[var(--terracotta-light)]/30 to-[var(--background-warm)] flex items-center justify-center">
        <ImageIcon className="w-12 h-12 text-[var(--terracotta-light)]" />
      </div>
      <div className="p-3 bg-white">
        <div className="font-medium text-sm text-[var(--charcoal)]">{type}</div>
        <div className="text-sm text-[var(--terracotta)]">{price}</div>
        {selected && (
          <div className="flex items-center gap-1 mt-1 text-xs text-[var(--success)]">
            <CheckCircle className="w-3 h-3" />
            Selected
          </div>
        )}
      </div>
    </div>
  );
}

function CustomizationOption({ title, description, delta }: { title: string; description: string; delta: string }) {
  return (
    <div className="card card-elevated text-center">
      <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--terracotta-light)] text-[var(--terracotta-dark)] flex items-center justify-center mb-4">
        <Sparkles className="w-6 h-6" />
      </div>
      <h4 className="font-semibold text-[var(--charcoal)] mb-2">{title}</h4>
      <p className="text-sm text-[var(--foreground-muted)] mb-3">{description}</p>
      <div className="text-lg font-semibold text-[var(--terracotta)]">{delta}</div>
    </div>
  );
}

function CycleStep({ number, icon, title, description, highlighted }: {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  highlighted?: boolean;
}) {
  return (
    <div className={`card ${highlighted ? 'border-2 border-[var(--terracotta)]' : ''}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${highlighted ? 'bg-[var(--terracotta)]' : 'bg-[var(--charcoal-light)]'}`}>
          {number}
        </div>
        <div className={`p-2 rounded-lg ${highlighted ? 'bg-[var(--terracotta-light)] text-[var(--terracotta-dark)]' : 'bg-[var(--background-warm)] text-[var(--foreground-muted)]'}`}>
          {icon}
        </div>
      </div>
      <h4 className="font-semibold text-[var(--charcoal)] text-sm mb-1">{title}</h4>
      <p className="text-xs text-[var(--foreground-muted)]">{description}</p>
    </div>
  );
}

function RoleTransformCard({ current, future }: {
  current: { title: string; focus: string };
  future: { title: string; focus: string };
}) {
  return (
    <div className="card card-elevated">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Current */}
        <div className="p-4 bg-[var(--background-warm)] rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-[var(--foreground-muted)]" />
            <span className="text-xs font-medium text-[var(--foreground-subtle)]">CURRENT</span>
          </div>
          <h4 className="font-semibold text-[var(--charcoal)] mb-1">{current.title}</h4>
          <p className="text-sm text-[var(--foreground-muted)]">{current.focus}</p>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ArrowRight className="w-6 h-6 text-[var(--terracotta)]" />
        </div>

        {/* Future */}
        <div className="p-4 bg-[var(--terracotta)]/5 rounded-lg border border-[var(--terracotta)]/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[var(--terracotta)]" />
            <span className="text-xs font-medium text-[var(--terracotta)]">FUTURE</span>
          </div>
          <h4 className="font-semibold text-[var(--charcoal)] mb-1">{future.title}</h4>
          <p className="text-sm text-[var(--foreground-muted)]">{future.focus}</p>
        </div>
      </div>
    </div>
  );
}

function BigStat({ value, label, suffix }: { value: string; label: string; suffix?: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-semibold text-white mb-2">{value}</div>
      <div className="text-white/80 font-medium">{label}</div>
      {suffix && <div className="text-white/50 text-sm mt-1">{suffix}</div>}
    </div>
  );
}
