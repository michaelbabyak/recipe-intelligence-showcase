"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft, Camera, Database, Palette, Flower2, MapPin, Calendar,
  TrendingUp, DollarSign, BarChart3, Layers, Package, Users
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend, LineChart, Line, AreaChart, Area
} from "recharts";
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
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

// Color helpers
const COLORS = {
  terracotta: '#E17055',
  terracottaLight: '#FAB1A0',
  charcoal: '#2D3436',
  charcoalLight: '#636E72',
  success: '#00B894',
  warning: '#FDCB6E',
};

const ROLE_COLORS: Record<string, string> = {
  FOCAL: COLORS.terracotta,
  SECONDARY: COLORS.terracottaLight,
  LINEAR: '#74B9FF',
  GREENERY: COLORS.success,
  FILLER: COLORS.warning,
};

const SEASON_COLORS: Record<string, string> = {
  Spring: '#7ED6A5',
  Summer: '#FDCB6E',
  Fall: '#E17055',
  Winter: '#74B9FF',
};

export default function DataExplorerPage() {
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
            <Link href="/data-explorer" className="btn btn-secondary ml-2 text-sm py-2 px-4 bg-[var(--terracotta)] text-white border-0">
              Explore Data
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="organic-blob w-[500px] h-[500px] -top-40 -right-20 opacity-10" />

        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
              <Link href="/future-vision" className="text-[var(--foreground-muted)] hover:text-[var(--terracotta)] transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <span className="badge badge-accent">Dashboard</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-hero mb-6">
              Data Explorer
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-[var(--foreground-muted)] max-w-3xl">
              A comprehensive view of Poppy&apos;s recipe data. Explore distributions across
              color palettes, arrangement types, stems, geography, and more.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics Row */}
      <section className="pb-12">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"
          >
            <MetricCard icon={<Package />} value={recipeStats.totals.recipes.toLocaleString()} label="Recipes" />
            <MetricCard icon={<Layers />} value={recipeStats.totals.templates.toLocaleString()} label="Templates" />
            <MetricCard icon={<Flower2 />} value={recipeStats.totals.stems.toLocaleString()} label="Stems" />
            <MetricCard icon={<Calendar />} value={recipeStats.totals.events.toLocaleString()} label="Events" />
            <MetricCard icon={<Camera />} value={(recipeStats.totals.designerPhotos / 1000).toFixed(0) + "K"} label="Photos" />
            <MetricCard icon={<Palette />} value={recipeStats.totals.stemPalettes.toString()} label="Palettes" />
            <MetricCard icon={<Database />} value={recipeStats.totals.formulas.toString()} label="Formulas" />
            <MetricCard icon={<Users />} value={recipeStats.totals.suppliers.toString()} label="Suppliers" />
          </motion.div>
        </div>
      </section>

      {/* Color Palettes & Arrangements */}
      <section className="section bg-[var(--background-warm)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-title mb-8">Recipe Distribution</motion.h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Color Palettes */}
              <ChartCard
                title="Recipes by Color Palette"
                subtitle="16 curated palettes across all recipes"
                icon={<Palette className="w-5 h-5" />}
              >
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={recipeStats.colorPaletteDistribution.slice(0, 10)} layout="vertical">
                    <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(v) => v.toLocaleString()} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={110}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: 'var(--foreground-muted)', fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value) => [`${Number(value).toLocaleString()} recipes`, '']}
                      contentStyle={{ borderRadius: '12px', border: '1px solid var(--border-light)' }}
                    />
                    <Bar dataKey="recipes" fill={COLORS.terracotta} radius={[0, 4, 4, 0]}>
                      {recipeStats.colorPaletteDistribution.slice(0, 10).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? COLORS.terracotta : COLORS.terracottaLight} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Arrangement Types */}
              <ChartCard
                title="Recipes by Arrangement Type"
                subtitle="Distribution across product categories"
                icon={<Flower2 className="w-5 h-5" />}
              >
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={recipeStats.arrangementTypeDistribution}>
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: 'var(--foreground-muted)', fontSize: 10 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => (v / 1000) + 'K'} />
                    <Tooltip
                      formatter={(value) => [`${Number(value).toLocaleString()} recipes`, '']}
                      contentStyle={{ borderRadius: '12px', border: '1px solid var(--border-light)' }}
                    />
                    <Bar dataKey="recipes" fill={COLORS.charcoal} radius={[4, 4, 0, 0]}>
                      {recipeStats.arrangementTypeDistribution.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={index < 3 ? COLORS.charcoal : COLORS.charcoalLight} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Top Stems */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-title mb-8">Most Used Stems</motion.h2>

            <ChartCard
              title="Top 12 Stems by Recipe Count"
              subtitle="Color-coded by stem role"
              icon={<Flower2 className="w-5 h-5" />}
              wide
            >
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={recipeStats.topStems}>
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'var(--foreground-muted)', fontSize: 10 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={120}
                  />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => (v / 1000) + 'K'} />
                  <Tooltip
                    formatter={(value) => [`${Number(value).toLocaleString()} recipes`, '']}
                    contentStyle={{ borderRadius: '12px', border: '1px solid var(--border-light)' }}
                  />
                  <Bar dataKey="recipes" radius={[4, 4, 0, 0]}>
                    {recipeStats.topStems.map((stem, index) => (
                      <Cell key={`cell-${index}`} fill={ROLE_COLORS[stem.role] || COLORS.charcoal} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-6 mt-6 pt-6 border-t border-[var(--border-light)]">
                {Object.entries(ROLE_COLORS).map(([role, color]) => (
                  <div key={role} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
                    <span className="text-sm text-[var(--foreground-muted)]">{role}</span>
                  </div>
                ))}
              </div>
            </ChartCard>
          </motion.div>
        </div>
      </section>

      {/* Season & Geography */}
      <section className="section bg-[var(--background-warm)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-title mb-8">Seasonal & Geographic</motion.h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Seasons */}
              <ChartCard
                title="Recipes by Season"
                subtitle="Wedding seasonality patterns"
                icon={<Calendar className="w-5 h-5" />}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={recipeStats.seasonDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="recipes"
                      nameKey="name"
                    >
                      {recipeStats.seasonDistribution.map((entry) => (
                        <Cell key={entry.name} fill={SEASON_COLORS[entry.name]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${Number(value).toLocaleString()} recipes`, '']}
                      contentStyle={{ borderRadius: '12px', border: '1px solid var(--border-light)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Geography */}
              <ChartCard
                title="Events by State"
                subtitle="Geographic distribution"
                icon={<MapPin className="w-5 h-5" />}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={recipeStats.geographicDistribution} layout="vertical">
                    <XAxis type="number" tickLine={false} axisLine={false} />
                    <YAxis
                      type="category"
                      dataKey="state"
                      width={90}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: 'var(--foreground-muted)', fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value) => [`${Number(value).toLocaleString()} events`, '']}
                      contentStyle={{ borderRadius: '12px', border: '1px solid var(--border-light)' }}
                    />
                    <Bar dataKey="events" fill={COLORS.success} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Budget & Complexity */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-title mb-8">Budget & Complexity</motion.h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Budget Tiers */}
              <ChartCard
                title="Events by Budget Tier"
                subtitle="Distribution across price points"
                icon={<DollarSign className="w-5 h-5" />}
              >
                <div className="space-y-6">
                  {recipeStats.budgetTierDistribution.map((tier, index) => (
                    <div key={tier.name}>
                      <div className="flex justify-between mb-2">
                        <div>
                          <span className="font-medium text-[var(--charcoal)]">{tier.name}</span>
                          <span className="text-sm text-[var(--foreground-muted)] ml-2">({tier.range})</span>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-[var(--terracotta)]">{tier.events.toLocaleString()}</span>
                          <span className="text-sm text-[var(--foreground-muted)] ml-1">events</span>
                        </div>
                      </div>
                      <div className="h-3 bg-[var(--border-light)] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tier.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: index === 1 ? COLORS.terracotta : COLORS.terracottaLight }}
                        />
                      </div>
                      <div className="text-xs text-[var(--foreground-subtle)] mt-1">
                        Avg {tier.avgRecipesPerEvent} recipes per event
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>

              {/* Recipe Complexity */}
              <ChartCard
                title="Recipe Complexity"
                subtitle="Stem count distribution"
                icon={<BarChart3 className="w-5 h-5" />}
              >
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-[var(--background-warm)] rounded-xl">
                    <div className="text-2xl font-semibold text-[var(--terracotta)]">
                      {recipeStats.recipeComplexity.avgStemsPerRecipe}
                    </div>
                    <div className="text-caption">Avg stems/recipe</div>
                  </div>
                  <div className="text-center p-4 bg-[var(--background-warm)] rounded-xl">
                    <div className="text-2xl font-semibold text-[var(--terracotta)]">
                      {recipeStats.recipeComplexity.avgRolesPerRecipe}
                    </div>
                    <div className="text-caption">Avg roles/recipe</div>
                  </div>
                  <div className="text-center p-4 bg-[var(--background-warm)] rounded-xl">
                    <div className="text-2xl font-semibold text-[var(--terracotta)]">
                      ${recipeStats.recipeComplexity.avgCostPerRecipe}
                    </div>
                    <div className="text-caption">Avg cost/recipe</div>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={recipeStats.recipeComplexity.stemCountDistribution}>
                    <XAxis dataKey="range" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => (v / 1000) + 'K'} />
                    <Tooltip
                      formatter={(value) => [`${Number(value).toLocaleString()} recipes`, '']}
                      contentStyle={{ borderRadius: '12px', border: '1px solid var(--border-light)' }}
                    />
                    <Bar dataKey="count" fill={COLORS.charcoal} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Year over Year Growth */}
      <section className="section bg-[var(--background-warm)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-title mb-8">Growth Over Time</motion.h2>

            <ChartCard
              title="Year over Year Trends"
              subtitle="Recipe volume and complexity growth (2021-2024)"
              icon={<TrendingUp className="w-5 h-5" />}
              wide
            >
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={recipeStats.yearOverYear}>
                  <XAxis dataKey="year" tickLine={false} axisLine={false} />
                  <YAxis
                    yAxisId="left"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => (v / 1000) + 'K'}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickLine={false}
                    axisLine={false}
                    domain={[7, 9]}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => {
                      if (name === 'recipes') return [value.toLocaleString() + ' recipes', 'Recipes'];
                      if (name === 'events') return [value.toLocaleString() + ' events', 'Events'];
                      return [value, 'Avg Stems'];
                    }}
                    contentStyle={{ borderRadius: '12px', border: '1px solid var(--border-light)' }}
                  />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="recipes"
                    stroke={COLORS.terracotta}
                    fill={COLORS.terracottaLight}
                    fillOpacity={0.3}
                    strokeWidth={2}
                    name="Recipes"
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="events"
                    stroke={COLORS.success}
                    fill={COLORS.success}
                    fillOpacity={0.2}
                    strokeWidth={2}
                    name="Events"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="avgStemsPerRecipe"
                    stroke={COLORS.charcoal}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: COLORS.charcoal }}
                    name="Avg Stems/Recipe"
                  />
                </AreaChart>
              </ResponsiveContainer>

              {/* Growth stats */}
              <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-[var(--border-light)]">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-[var(--terracotta)]">+106%</div>
                  <div className="text-caption">Recipe growth (2021→2024)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-[var(--success)]">+106%</div>
                  <div className="text-caption">Event growth (2021→2024)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-[var(--charcoal)]">+12%</div>
                  <div className="text-caption">Complexity increase</div>
                </div>
              </div>
            </ChartCard>
          </motion.div>
        </div>
      </section>

      {/* Stem Pricing */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-title mb-8">Stem Pricing</motion.h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Pricing Distribution */}
              <ChartCard
                title="Stem Count by Price Tier"
                subtitle="Distribution of 1,730 unique stems"
                icon={<DollarSign className="w-5 h-5" />}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={recipeStats.pricingTiers}>
                    <XAxis dataKey="range" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip
                      formatter={(value) => [`${Number(value)} stems`, '']}
                      contentStyle={{ borderRadius: '12px', border: '1px solid var(--border-light)' }}
                    />
                    <Bar dataKey="count" fill={COLORS.terracotta} radius={[4, 4, 0, 0]}>
                      {recipeStats.pricingTiers.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={index === 1 ? COLORS.terracotta : COLORS.terracottaLight} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Role Distribution */}
              <ChartCard
                title="Stems by Role"
                subtitle="Formula slot distribution"
                icon={<Layers className="w-5 h-5" />}
              >
                <div className="space-y-4">
                  {Object.entries(recipeStats.roleDistribution).map(([role, data]) => (
                    <div key={role} className="flex items-center gap-4">
                      <div
                        className="w-3 h-3 rounded flex-shrink-0"
                        style={{ backgroundColor: ROLE_COLORS[role.toUpperCase()] || COLORS.charcoal }}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-[var(--charcoal)] capitalize">{role}</span>
                          <span className="text-sm text-[var(--foreground-muted)]">{data.slots} slots</span>
                        </div>
                        <div className="h-2 bg-[var(--border-light)] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(data.slots / 727) * 100}%`,
                              backgroundColor: ROLE_COLORS[role.toUpperCase()] || COLORS.charcoal
                            }}
                          />
                        </div>
                        <div className="text-xs text-[var(--foreground-subtle)] mt-1">{data.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Match Rates Summary */}
      <section className="section bg-[var(--charcoal)] text-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2 variants={fadeInUp} className="text-title text-white mb-4">
              The Translation Gap
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/60 max-w-2xl mx-auto mb-12">
              How event recipes compare to their source templates
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <MatchRateStat value={recipeStats.matchRates.exact} label="Exact Match" color={COLORS.success} />
              <MatchRateStat value={recipeStats.matchRates.containsAll} label="Contains All" color="#7ED6A5" />
              <MatchRateStat value={recipeStats.matchRates.hasOverlap} label="Has Overlap" color={COLORS.terracottaLight} />
              <MatchRateStat value={recipeStats.matchRates.zeroOverlap} label="Zero Overlap" color="white" />
            </motion.div>

            <motion.p variants={fadeInUp} className="text-white/50 text-sm mt-8 max-w-xl mx-auto">
              Only 10.3% of recipes exactly match their templates. 32.1% are written entirely from scratch.
              This is the opportunity for intelligent automation.
            </motion.p>
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

function MetricCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <motion.div variants={fadeInUp} className="card text-center py-4 px-3">
      <div className="w-8 h-8 mx-auto rounded-lg bg-[var(--terracotta-light)] text-[var(--terracotta-dark)] flex items-center justify-center mb-2">
        {icon}
      </div>
      <div className="text-xl font-semibold text-[var(--terracotta)]">{value}</div>
      <div className="text-xs text-[var(--foreground-muted)]">{label}</div>
    </motion.div>
  );
}

function ChartCard({ title, subtitle, icon, children, wide }: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <motion.div variants={fadeInUp} className={`card card-elevated ${wide ? 'col-span-full' : ''}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[var(--background-warm)] text-[var(--foreground-muted)] flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-[var(--charcoal)]">{title}</h3>
          <p className="text-caption">{subtitle}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );
}

function MatchRateStat({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-semibold mb-2" style={{ color }}>{value}%</div>
      <div className="text-white/60 text-sm">{label}</div>
      <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
