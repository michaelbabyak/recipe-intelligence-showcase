"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Filter, RefreshCw, Camera, Database, Palette,
  Flower2, MapPin, Calendar, TrendingUp, ChevronDown, X,
  Loader2, AlertCircle, ExternalLink
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
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
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// API URL
const MEDIA_SERVICE_URL = process.env.NEXT_PUBLIC_MEDIA_SERVICE_URL || 'https://media-service-952282550478.us-central1.run.app';

// Types
interface FacetData {
  color_palettes: { name: string; count: number }[];
  arrangement_types: { name: string; count: number }[];
  states: { name: string; count: number }[];
  flowers: { name: string; count: number }[];
  seasons: { name: string; count: number }[];
  total_images: number;
}

// Custom hook for fetching facets
function useFacets() {
  const [data, setData] = useState<FacetData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFacets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${MEDIA_SERVICE_URL}/api/v1/images/facets`);
      if (!response.ok) throw new Error('Failed to fetch facets');
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFacets();
  }, []);

  return { data, isLoading, error, refetch: fetchFacets };
}

export default function DataExplorerPage() {
  const { data: facets, isLoading, error, refetch } = useFacets();
  const [selectedPalette, setSelectedPalette] = useState<string | null>(null);
  const [selectedArrangement, setSelectedArrangement] = useState<string | null>(null);

  // Prepare chart data
  const colorChartData = facets?.color_palettes?.slice(0, 10).map(p => ({
    name: p.name,
    count: p.count
  })) || [];

  const arrangementChartData = facets?.arrangement_types?.slice(0, 8).map(a => ({
    name: formatArrangementType(a.name),
    count: a.count
  })) || [];

  const stateChartData = facets?.states?.slice(0, 10).map(s => ({
    name: s.name,
    count: s.count
  })) || [];

  const seasonChartData = facets?.seasons?.map(s => ({
    name: s.name,
    count: s.count
  })) || [];

  const flowerChartData = facets?.flowers?.slice(0, 12).map(f => ({
    name: f.name,
    count: f.count
  })) || [];

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
              <span className="badge badge-accent">Live Data</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-hero mb-6">
              Data Explorer
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-[var(--foreground-muted)] max-w-3xl mb-6">
              Explore live data from our indexed image catalog. See the real distribution of colors,
              arrangements, and locations across {facets?.total_images?.toLocaleString() || '...'} images.
            </motion.p>

            {/* Data source indicator */}
            <motion.div variants={fadeInUp} className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
                <Database className="w-4 h-4" />
                <span>Media Service API</span>
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[var(--terracotta)]" />
                ) : error ? (
                  <span className="text-[var(--error)]">Error</span>
                ) : (
                  <span className="text-[var(--success)]">Connected</span>
                )}
              </div>
              <button
                onClick={refetch}
                className="flex items-center gap-1 text-sm text-[var(--terracotta)] hover:underline"
              >
                <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="pb-12">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            <StatCard
              icon={<Camera className="w-5 h-5" />}
              value={facets?.total_images?.toLocaleString() || '...'}
              label="Total Images"
              loading={isLoading}
            />
            <StatCard
              icon={<Palette className="w-5 h-5" />}
              value={facets?.color_palettes?.length?.toString() || '...'}
              label="Color Palettes"
              loading={isLoading}
            />
            <StatCard
              icon={<Flower2 className="w-5 h-5" />}
              value={facets?.arrangement_types?.length?.toString() || '...'}
              label="Arrangement Types"
              loading={isLoading}
            />
            <StatCard
              icon={<MapPin className="w-5 h-5" />}
              value={facets?.states?.length?.toString() || '...'}
              label="States"
              loading={isLoading}
            />
            <StatCard
              icon={<Calendar className="w-5 h-5" />}
              value={facets?.seasons?.length?.toString() || '4'}
              label="Seasons"
              loading={isLoading}
            />
          </motion.div>
        </div>
      </section>

      {/* Error State */}
      {error && (
        <section className="pb-12">
          <div className="container">
            <div className="card bg-[var(--error)]/10 border border-[var(--error)]/20 text-center py-12">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-[var(--error)]" />
              <h3 className="text-heading mb-2">Unable to Load Live Data</h3>
              <p className="text-[var(--foreground-muted)] mb-4">
                The media service API is currently unavailable. Showing static data instead.
              </p>
              <button onClick={refetch} className="btn btn-primary">
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Charts Section */}
      {!error && (
        <>
          {/* Color Palettes & Arrangements Row */}
          <section className="section bg-[var(--background-warm)]">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Color Palettes Chart */}
                <ChartCard
                  title="Images by Color Palette"
                  subtitle="Top 10 color palettes in the catalog"
                  icon={<Palette className="w-5 h-5" />}
                  loading={isLoading}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={colorChartData} layout="vertical">
                      <XAxis type="number" tickLine={false} axisLine={false} />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={100}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: 'var(--foreground-muted)', fontSize: 12 }}
                      />
                      <Tooltip
                        formatter={(value: number) => [value.toLocaleString() + ' images', '']}
                        contentStyle={{
                          borderRadius: '12px',
                          border: '1px solid var(--border-light)',
                          boxShadow: 'var(--shadow-md)'
                        }}
                      />
                      <Bar dataKey="count" fill="var(--terracotta)" radius={[0, 4, 4, 0]}>
                        {colorChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index === 0 ? 'var(--terracotta)' : 'var(--terracotta-light)'}
                            cursor="pointer"
                            onClick={() => setSelectedPalette(entry.name === selectedPalette ? null : entry.name)}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>

                {/* Arrangement Types Chart */}
                <ChartCard
                  title="Images by Arrangement Type"
                  subtitle="Distribution of arrangement categories"
                  icon={<Flower2 className="w-5 h-5" />}
                  loading={isLoading}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={arrangementChartData}>
                      <XAxis
                        dataKey="name"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: 'var(--foreground-muted)', fontSize: 10 }}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis tickLine={false} axisLine={false} tick={{ fill: 'var(--foreground-muted)', fontSize: 12 }} />
                      <Tooltip
                        formatter={(value: number) => [value.toLocaleString() + ' images', '']}
                        contentStyle={{
                          borderRadius: '12px',
                          border: '1px solid var(--border-light)',
                          boxShadow: 'var(--shadow-md)'
                        }}
                      />
                      <Bar dataKey="count" fill="var(--charcoal)" radius={[4, 4, 0, 0]}>
                        {arrangementChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index === 0 ? 'var(--charcoal)' : 'var(--charcoal-light)'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
            </div>
          </section>

          {/* Geographic & Seasonal Row */}
          <section className="section">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* States Chart */}
                <ChartCard
                  title="Images by State"
                  subtitle="Geographic distribution of wedding photos"
                  icon={<MapPin className="w-5 h-5" />}
                  loading={isLoading}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stateChartData} layout="vertical">
                      <XAxis type="number" tickLine={false} axisLine={false} />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={120}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: 'var(--foreground-muted)', fontSize: 12 }}
                      />
                      <Tooltip
                        formatter={(value: number) => [value.toLocaleString() + ' images', '']}
                        contentStyle={{
                          borderRadius: '12px',
                          border: '1px solid var(--border-light)',
                          boxShadow: 'var(--shadow-md)'
                        }}
                      />
                      <Bar dataKey="count" fill="var(--success)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>

                {/* Seasons Chart */}
                <ChartCard
                  title="Images by Season"
                  subtitle="Seasonal distribution of the catalog"
                  icon={<Calendar className="w-5 h-5" />}
                  loading={isLoading}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={seasonChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="count"
                        nameKey="name"
                      >
                        {seasonChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getSeasonColor(entry.name)} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [value.toLocaleString() + ' images', '']}
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
                </ChartCard>
              </div>
            </div>
          </section>

          {/* Top Flowers */}
          <section className="section bg-[var(--background-warm)]">
            <div className="container">
              <ChartCard
                title="Most Common Flowers"
                subtitle="Top 12 flowers identified in the catalog"
                icon={<Flower2 className="w-5 h-5" />}
                loading={isLoading}
                wide
              >
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={flowerChartData}>
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: 'var(--foreground-muted)', fontSize: 11 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: 'var(--foreground-muted)', fontSize: 12 }} />
                    <Tooltip
                      formatter={(value: number) => [value.toLocaleString() + ' appearances', '']}
                      contentStyle={{
                        borderRadius: '12px',
                        border: '1px solid var(--border-light)',
                        boxShadow: 'var(--shadow-md)'
                      }}
                    />
                    <Bar dataKey="count" fill="var(--terracotta)" radius={[4, 4, 0, 0]}>
                      {flowerChartData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`rgba(225, 112, 85, ${1 - index * 0.07})`}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </section>
        </>
      )}

      {/* Static Data Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="badge mb-4">Recipe Database</span>
              <h2 className="text-title mb-4">Recipe Statistics</h2>
              <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
                Summary statistics from our recipe database - the foundation for visual-first proposals.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <RecipeStatCard
                value={recipeStats.totals.recipes.toLocaleString()}
                label="Total Recipes"
                sublabel="Event-specific production specs"
              />
              <RecipeStatCard
                value={recipeStats.totals.templates.toLocaleString()}
                label="Templates"
                sublabel="Catalog inspiration items"
              />
              <RecipeStatCard
                value={recipeStats.totals.stems.toLocaleString()}
                label="Unique Stems"
                sublabel="Flowers, greenery, filler"
              />
              <RecipeStatCard
                value={recipeStats.totals.formulas.toString()}
                label="Formulas"
                sublabel="Role-based composition rules"
              />
            </motion.div>

            {/* Match rates */}
            <motion.div variants={fadeInUp} className="grid md:grid-cols-4 gap-4 mt-8">
              <MatchRateCard value={recipeStats.matchRates.exact} label="Exact Match" color="var(--success)" />
              <MatchRateCard value={recipeStats.matchRates.containsAll} label="Contains All" color="#7ED6A5" />
              <MatchRateCard value={recipeStats.matchRates.hasOverlap} label="Has Overlap" color="var(--terracotta-light)" />
              <MatchRateCard value={recipeStats.matchRates.zeroOverlap} label="Zero Overlap" color="var(--charcoal)" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* API Documentation */}
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
              Explore the API
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/60 mb-8">
              This data is served by the Poppy Media Service API. All visualizations update in real-time
              as new images are indexed.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <a
                href={`${MEDIA_SERVICE_URL}/docs`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white text-[var(--charcoal)] hover:bg-white/90"
              >
                <ExternalLink className="w-4 h-4" />
                API Documentation
              </a>
              <a
                href={`${MEDIA_SERVICE_URL}/api/v1/images/facets`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-white/20 text-white hover:bg-white/10"
              >
                View Raw JSON
              </a>
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
            <Link href="/future-vision" className="text-[var(--foreground-muted)] hover:text-[var(--terracotta)]">Future Vision</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ============================================
// HELPERS
// ============================================

function formatArrangementType(type: string): string {
  return type
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());
}

function getSeasonColor(season: string): string {
  const colors: Record<string, string> = {
    'Spring': '#7ED6A5',
    'Summer': '#FDCB6E',
    'Fall': '#E17055',
    'Winter': '#74B9FF',
    'spring': '#7ED6A5',
    'summer': '#FDCB6E',
    'fall': '#E17055',
    'winter': '#74B9FF',
  };
  return colors[season] || 'var(--terracotta)';
}

// ============================================
// COMPONENTS
// ============================================

function StatCard({ icon, value, label, loading }: {
  icon: React.ReactNode;
  value: string;
  label: string;
  loading?: boolean;
}) {
  return (
    <motion.div variants={fadeInUp} className="card card-elevated text-center">
      <div className="w-10 h-10 mx-auto rounded-xl bg-[var(--terracotta-light)] text-[var(--terracotta-dark)] flex items-center justify-center mb-3">
        {icon}
      </div>
      {loading ? (
        <div className="h-8 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-[var(--terracotta)]" />
        </div>
      ) : (
        <div className="text-2xl font-semibold text-[var(--terracotta)]">{value}</div>
      )}
      <div className="text-caption">{label}</div>
    </motion.div>
  );
}

function ChartCard({ title, subtitle, icon, children, loading, wide }: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
  wide?: boolean;
}) {
  return (
    <div className={`card card-elevated ${wide ? 'col-span-full' : ''}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[var(--background-warm)] text-[var(--foreground-muted)] flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-[var(--charcoal)]">{title}</h3>
          <p className="text-caption">{subtitle}</p>
        </div>
      </div>
      {loading ? (
        <div className="h-[300px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--terracotta)]" />
        </div>
      ) : (
        children
      )}
    </div>
  );
}

function RecipeStatCard({ value, label, sublabel }: { value: string; label: string; sublabel: string }) {
  return (
    <div className="card card-elevated text-center">
      <div className="text-3xl font-semibold text-[var(--terracotta)] mb-2">{value}</div>
      <div className="font-medium text-[var(--charcoal)] mb-1">{label}</div>
      <div className="text-caption">{sublabel}</div>
    </div>
  );
}

function MatchRateCard({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="card text-center py-4">
      <div className="text-2xl font-semibold mb-1" style={{ color }}>{value}%</div>
      <div className="text-sm text-[var(--foreground-muted)]">{label}</div>
      <div className="mt-3 h-2 bg-[var(--border-light)] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
