"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ChevronRight, ChevronDown,
  Brain, Sparkles, User, Database, Eye, Palette, CheckCircle2,
  AlertTriangle, FileText, Zap, Target, Clock, BarChart3, Shield
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

export default function AutomationPage() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);

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
            <Link href="/automation" className="btn-ghost text-sm text-[var(--terracotta)] font-medium">Automation</Link>
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
              <Link href="/current-state" className="text-[var(--foreground-muted)] hover:text-[var(--terracotta)] transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <span className="badge badge-accent">Chapter 02</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-hero mb-6">
              Automation
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-[var(--foreground-muted)] max-w-3xl mb-8">
              Recipe writing is a <em>design</em> problem with engineering constraints,
              not an engineering problem with design inputs. Our solution pairs two AI models,
              each playing to their strengths.
            </motion.p>

            {/* Core Insight */}
            <motion.div variants={fadeInUp} className="card bg-[var(--background-warm)] border-l-4 border-[var(--terracotta)] max-w-2xl">
              <p className="text-lg font-medium text-[var(--charcoal)]">
                &ldquo;Recipe writing is translation from vision to production—not formula application.&rdquo;
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Two Models */}
      <section className="section bg-[var(--background-warm)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="badge mb-4">The Partnership</span>
              <h2 className="text-title mb-4">Why Two Models?</h2>
              <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
                Claude and Gemini have complementary strengths. Together, they cover
                both the &ldquo;what&rdquo; (design decisions) and the &ldquo;how&rdquo; (logistics, data, constraints).
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Claude Card */}
              <div className="card card-elevated h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-heading">Claude</h3>
                    <p className="text-caption">Orchestrator</p>
                  </div>
                </div>

                <p className="text-[var(--foreground-muted)] mb-6">
                  Excels at the <strong className="text-[var(--charcoal)]">&ldquo;how&rdquo;</strong> — logistics, data retrieval, and constraint enforcement.
                </p>

                <div className="space-y-3">
                  <CapabilityRow label="Data orchestration & retrieval" strong />
                  <CapabilityRow label="Business constraint enforcement" strong />
                  <CapabilityRow label="Multi-step workflow coordination" strong />
                  <CapabilityRow label="Cost calculations" strong />
                  <CapabilityRow label="State management across products" strong />
                  <CapabilityRow label="Visual reasoning on photos" weak />
                  <CapabilityRow label="Floral design domain knowledge" weak />
                </div>
              </div>

              {/* Gemini Card */}
              <div className="card card-elevated h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--terracotta)] to-[#F97316] flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-heading">Gemini</h3>
                    <p className="text-caption">Floral Design Intelligence</p>
                  </div>
                </div>

                <p className="text-[var(--foreground-muted)] mb-6">
                  Excels at the <strong className="text-[var(--charcoal)]">&ldquo;what&rdquo;</strong> — aesthetic judgment and creative interpretation.
                </p>

                <div className="space-y-3">
                  <CapabilityRow label="Visual reasoning on flower photos" strong />
                  <CapabilityRow label="Floral design domain knowledge" strong />
                  <CapabilityRow label="Interpreting aesthetic intent" strong />
                  <CapabilityRow label="Color harmony and palette reasoning" strong />
                  <CapabilityRow label="Cross-product aesthetic cohesion" strong />
                  <CapabilityRow label="Business constraint enforcement" weak />
                  <CapabilityRow label="Data orchestration" weak />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="badge mb-4">System Design</span>
              <h2 className="text-title mb-4">Architecture Overview</h2>
              <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
                Three layers working together: Claude orchestrates, Gemini designs, humans approve.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
              <div className="card card-elevated p-0 overflow-hidden">
                {/* Claude Layer */}
                <div className="p-8 bg-gradient-to-r from-[#6366F1]/5 to-transparent border-b border-[var(--border-light)]">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-xl bg-[#6366F1] flex items-center justify-center flex-shrink-0">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-heading mb-3">Claude (Orchestrator)</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <ResponsibilityList items={[
                          "Workflow coordination & sequencing",
                          "Data retrieval from Postgres, Airtable",
                          "Assembling design briefs for Gemini",
                          "Business constraint enforcement"
                        ]} />
                        <ResponsibilityList items={[
                          "Availability checking by event date",
                          "Cost/margin calculations",
                          "Cross-product state management",
                          "Final recipe record generation"
                        ]} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center py-4 bg-[var(--background-warm)]">
                  <div className="flex flex-col items-center text-[var(--foreground-muted)]">
                    <ChevronDown className="w-5 h-5" />
                    <span className="text-xs font-medium">Structured handoffs</span>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>

                {/* Gemini Layer */}
                <div className="p-8 bg-gradient-to-r from-[var(--terracotta)]/5 to-transparent border-b border-[var(--border-light)]">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-xl bg-[var(--terracotta)] flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-heading mb-3">Gemini (Floral Design Intelligence)</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <ResponsibilityList items={[
                          "Inspiration photo interpretation",
                          "Style note translation",
                          "Color harmony and palette reasoning",
                          "Texture, proportion, movement judgment"
                        ]} />
                        <ResponsibilityList items={[
                          "Stem selection with design rationale",
                          "Cross-product aesthetic cohesion review",
                          "Scaling decisions (bouquet → boutonniere)",
                          '"Does this event flow?" assessment'
                        ]} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center py-4 bg-[var(--background-warm)]">
                  <div className="flex flex-col items-center text-[var(--foreground-muted)]">
                    <ChevronDown className="w-5 h-5" />
                    <span className="text-xs font-medium">Review queue</span>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>

                {/* Human Layer */}
                <div className="p-8 bg-gradient-to-r from-[var(--success)]/5 to-transparent">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-xl bg-[var(--success)] flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-heading mb-3">Human (Approver / Problem Solver)</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <ResponsibilityList items={[
                          "Final approval of agent-generated recipes",
                          "Tweaking when agent is close but not quite right"
                        ]} />
                        <ResponsibilityList items={[
                          "Handling edge cases and exceptions",
                          "Providing feedback that improves future automation"
                        ]} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7-Phase Workflow */}
      <section className="section bg-[var(--background-warm)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="badge mb-4">The Process</span>
              <h2 className="text-title mb-4">7-Phase Workflow</h2>
              <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
                From event data to approved recipes, each phase has a clear owner and purpose.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-3xl mx-auto">
              {recipeStats.workflowPhases.automation.map((phase, index) => (
                <PhaseAccordion
                  key={phase.phase}
                  phase={phase}
                  isExpanded={expandedPhase === phase.phase}
                  onToggle={() => setExpandedPhase(expandedPhase === phase.phase ? null : phase.phase)}
                  isLast={index === recipeStats.workflowPhases.automation.length - 1}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Design Brief Example */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="badge mb-4">In Practice</span>
              <h2 className="text-title mb-4">Design Brief Example</h2>
              <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
                Claude assembles everything a recipe writer would need into a structured brief for Gemini.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Brief Content */}
              <div className="card card-elevated p-0 overflow-hidden">
                <div className="bg-[var(--charcoal)] text-white px-6 py-4 flex items-center gap-3">
                  <FileText className="w-5 h-5" />
                  <span className="font-mono text-sm">EVENT DESIGN BRIEF</span>
                </div>
                <div className="p-6 font-mono text-sm space-y-4 max-h-[500px] overflow-auto">
                  <BriefSection title="Event Context">
                    <BriefLine label="Event ID" value="190656" />
                    <BriefLine label="Event Date" value="June 15, 2025" />
                    <BriefLine label="Color Palette" value="Pastels (blush, lavender, cream)" />
                    <BriefLine label="Venue" value="Garden venue, outdoor ceremony" />
                  </BriefSection>

                  <BriefSection title="Style Direction">
                    <div className="text-[var(--foreground-muted)] italic">
                      &ldquo;Romantic garden feel, loose and organic. Bride loves peonies but open to alternatives. Nothing too structured or formal.&rdquo;
                    </div>
                    <div className="mt-2 text-[var(--foreground-subtle)]">
                      + 3 inspiration photos attached
                    </div>
                  </BriefSection>

                  <BriefSection title="Products to Recipe">
                    <BriefLine label="Bridal Bouquet" value="Medium Lush (×1)" />
                    <BriefLine label="Bridesmaid" value="Medium Classic (×4)" />
                    <BriefLine label="Boutonniere" value="Garden (×6)" />
                    <BriefLine label="Centerpiece" value="Medium Garden (×12)" />
                    <BriefLine label="Arch Cluster" value="Medium (×2)" />
                  </BriefSection>

                  <BriefSection title="Available Stems (Pastels Palette)">
                    <div className="text-[var(--foreground-muted)]">
                      <div className="text-[var(--terracotta)] font-medium">FOCAL:</div>
                      Rose Peach Phoenix, Rose Beige Quicksand
                    </div>
                    <div className="text-[var(--foreground-muted)]">
                      <div className="text-[var(--terracotta)] font-medium">SECONDARY:</div>
                      Ranunculus Cream, Ranunculus Coral
                    </div>
                    <div className="text-[var(--foreground-muted)]">
                      <div className="text-[var(--terracotta)] font-medium">LINEAR:</div>
                      Delphinium, Stock Lavender, Larkspur
                    </div>
                  </BriefSection>
                </div>
              </div>

              {/* What Gemini Produces */}
              <div className="card card-elevated p-0 overflow-hidden">
                <div className="bg-[var(--terracotta)] text-white px-6 py-4 flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-mono text-sm">GEMINI DESIGN ANALYSIS</span>
                </div>
                <div className="p-6 space-y-6 max-h-[500px] overflow-auto">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--charcoal)] mb-2">Style Notes Translation</h4>
                    <div className="space-y-2 text-sm text-[var(--foreground-muted)]">
                      <div className="flex items-start gap-2">
                        <span className="text-[var(--terracotta)]">&ldquo;Romantic garden feel&rdquo;</span>
                        <span className="text-[var(--foreground-subtle)]">→</span>
                        <span>Open, blown roses; soft color transitions; visible texture variety</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[var(--terracotta)]">&ldquo;Loose and organic&rdquo;</span>
                        <span className="text-[var(--foreground-subtle)]">→</span>
                        <span>Asymmetrical arrangements; trailing greenery; natural placement</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[var(--terracotta)]">&ldquo;Loves peonies&rdquo;</span>
                        <span className="text-[var(--foreground-subtle)]">→</span>
                        <span>Quicksand roses + ranunculus capture the layered petal texture</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[var(--charcoal)] mb-2">Design Direction</h4>
                    <div className="p-3 bg-[var(--background-warm)] rounded-lg">
                      <div className="text-sm text-[var(--foreground-muted)]">
                        <strong className="text-[var(--charcoal)]">Hero Bloom:</strong> Rose Beige - Quicksand
                        <div className="text-xs mt-1">Soft, romantic, opens beautifully. Captures the &ldquo;peony feeling&rdquo; the customer wants.</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[var(--charcoal)] mb-2">Bridal Bouquet Selection</h4>
                    <div className="space-y-1 text-sm">
                      <StemSelectionRow role="FOCAL" stem="Rose Beige - Quicksand" qty={7} rationale="Hero bloom, soft romantic quality" />
                      <StemSelectionRow role="FOCAL" stem="Rose Peach - Phoenix" qty={5} rationale="Warm accent, prevents icy feel" />
                      <StemSelectionRow role="SECONDARY" stem="Ranunculus Cream" qty={5} rationale="Layered petals echo peonies" />
                      <StemSelectionRow role="LINEAR" stem="Delphinium Light Blue" qty={6} rationale="Airy movement, lavender note" />
                      <StemSelectionRow role="GREENERY" stem="Eucalyptus Parvifolia" qty={10} rationale="Silvery tone, cascading" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feedback Loop */}
      <section className="section bg-[var(--charcoal)] text-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="badge bg-white/10 text-white/80 mb-4">Continuous Improvement</span>
              <h2 className="text-title text-white mb-4">The Feedback Loop</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Human corrections become training signals. Every tweak and rejection teaches the system.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-6 mb-12">
              <FeedbackCard
                type="approve"
                percentage={recipeStats.automationTargets.automationRate.target}
                title="Approve"
                description="Logged as good example for future learning"
                icon={<CheckCircle2 className="w-6 h-6" />}
              />
              <FeedbackCard
                type="tweak"
                percentage={recipeStats.automationTargets.tweakRate.target}
                title="Tweak"
                description="Delta and reasoning logged for pattern recognition"
                icon={<AlertTriangle className="w-6 h-6" />}
              />
              <FeedbackCard
                type="reject"
                percentage={recipeStats.automationTargets.rejectionRate.target}
                title="Reject"
                description="Failure pattern captured with explanation"
                icon={<Shield className="w-6 h-6" />}
              />
            </motion.div>

            {/* Learning outcomes */}
            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-[var(--terracotta-light)]" />
                  <h4 className="font-semibold">Gemini Context Improvement</h4>
                </div>
                <p className="text-white/60 text-sm">
                  &ldquo;When customer says &lsquo;organic&rsquo;, they usually want 40%+ greenery&rdquo;
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-5 h-5 text-[#8B5CF6]" />
                  <h4 className="font-semibold">Claude Rules Refinement</h4>
                </div>
                <p className="text-white/60 text-sm">
                  &ldquo;Ranunculus in June requires supplier confirmation before proceeding&rdquo;
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="badge mb-4">Measuring Success</span>
              <h2 className="text-title mb-4">Target Metrics</h2>
              <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
                Clear goals for automation quality and efficiency.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <MetricCard
                icon={<Target className="w-6 h-6" />}
                value={`${recipeStats.automationTargets.automationRate.target}%`}
                label="Automation Rate"
                description={recipeStats.automationTargets.automationRate.description}
              />
              <MetricCard
                icon={<Zap className="w-6 h-6" />}
                value={`${recipeStats.automationTargets.timeSavings.target}%`}
                label="Time Savings"
                description={recipeStats.automationTargets.timeSavings.description}
              />
              <MetricCard
                icon={<Eye className="w-6 h-6" />}
                value={`${recipeStats.automationTargets.cohesionScore.target}/5`}
                label="Cohesion Score"
                description={recipeStats.automationTargets.cohesionScore.description}
              />
              <MetricCard
                icon={<BarChart3 className="w-6 h-6" />}
                value={`<${recipeStats.automationTargets.costAccuracy.target}%`}
                label="Cost Accuracy"
                description={recipeStats.automationTargets.costAccuracy.description}
              />
              <MetricCard
                icon={<Clock className="w-6 h-6" />}
                value={`<${recipeStats.automationTargets.tweakRate.target}%`}
                label="Tweak Rate"
                description={recipeStats.automationTargets.tweakRate.description}
              />
              <MetricCard
                icon={<Shield className="w-6 h-6" />}
                value={`<${recipeStats.automationTargets.rejectionRate.target}%`}
                label="Rejection Rate"
                description={recipeStats.automationTargets.rejectionRate.description}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[var(--background-warm)]">
        <div className="container text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-2xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-title mb-6">
              But What About the Customer Experience?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[var(--foreground-muted)] text-lg mb-8">
              Automating recipe writing is just part of the vision. The real transformation
              is in how customers discover and customize their wedding florals.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/future-vision" className="btn btn-primary">
                See the Future Vision
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

function CapabilityRow({ label, strong, weak }: { label: string; strong?: boolean; weak?: boolean }) {
  const isStrong = strong && !weak;
  return (
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${isStrong ? 'bg-[var(--success)]' : 'bg-[var(--border)]'}`} />
      <span className={isStrong ? 'text-[var(--charcoal)]' : 'text-[var(--foreground-subtle)]'}>{label}</span>
    </div>
  );
}

function ResponsibilityList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-[var(--foreground-muted)] flex items-start gap-2">
          <span className="w-1 h-1 rounded-full bg-[var(--terracotta)] mt-2 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function PhaseAccordion({ phase, isExpanded, onToggle, isLast }: {
  phase: { phase: number; name: string; actor: string; description: string };
  isExpanded: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  const actorColors = {
    Claude: { bg: 'bg-[#6366F1]', icon: <Brain className="w-4 h-4" /> },
    Gemini: { bg: 'bg-[var(--terracotta)]', icon: <Sparkles className="w-4 h-4" /> },
  };

  const actor = actorColors[phase.actor as keyof typeof actorColors] || actorColors.Claude;

  return (
    <div className={`${!isLast ? 'mb-3' : ''}`}>
      <button
        onClick={onToggle}
        className={`w-full card p-4 flex items-center gap-4 text-left transition-all ${isExpanded ? 'card-elevated border-[var(--terracotta)]' : ''}`}
      >
        <div className="w-10 h-10 rounded-full bg-[var(--background-warm)] flex items-center justify-center font-semibold text-[var(--charcoal)]">
          {phase.phase}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold text-[var(--charcoal)]">{phase.name}</h3>
            <span className={`${actor.bg} text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}>
              {actor.icon}
              {phase.actor}
            </span>
          </div>
          <p className="text-sm text-[var(--foreground-muted)]">{phase.description}</p>
        </div>
        <ChevronDown className={`w-5 h-5 text-[var(--foreground-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 ml-14 text-sm text-[var(--foreground-muted)]">
              {getPhaseDetails(phase.phase)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getPhaseDetails(phase: number): React.ReactNode {
  const details: Record<number, React.ReactNode> = {
    1: (
      <div className="space-y-2">
        <p>Claude gathers all inputs a recipe writer would see:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Event details (date, venue, color palette)</li>
          <li>Style notes and customer preferences</li>
          <li>Inspiration photos from the order</li>
          <li>Products needing recipes</li>
          <li>Available stems from the assigned palette</li>
        </ul>
      </div>
    ),
    2: (
      <div className="space-y-2">
        <p>Gemini interprets the aesthetic direction:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Analyzes inspiration photos for style, color, texture</li>
          <li>Translates vague style notes into specific design direction</li>
          <li>Identifies the &ldquo;hero bloom&rdquo; that captures customer intent</li>
          <li>Recommends substitutes when preferences aren&apos;t in palette</li>
        </ul>
      </div>
    ),
    3: (
      <div className="space-y-2">
        <p>Gemini selects stems for each product:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Assigns specific stems to each role slot</li>
          <li>Provides design rationale for each choice</li>
          <li>Scales selections appropriately per product type</li>
          <li>Considers how products will photograph together</li>
        </ul>
      </div>
    ),
    4: (
      <div className="space-y-2">
        <p>Claude validates all business constraints:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Checks stem availability for event date</li>
          <li>Calculates total costs and margin impact</li>
          <li>Flags any stems outside normal parameters</li>
          <li>Escalates issues back to Gemini if needed</li>
        </ul>
      </div>
    ),
    5: (
      <div className="space-y-2">
        <p>When stems aren&apos;t available, Gemini recommends alternatives:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Analyzes the design role the unavailable stem served</li>
          <li>Suggests alternatives that preserve the design intent</li>
          <li>May recommend sourcing anyway if stem is critical</li>
          <li>Escalates to human if no good substitute exists</li>
        </ul>
      </div>
    ),
    6: (
      <div className="space-y-2">
        <p>Gemini reviews all products together:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Checks visual flow across the entire event</li>
          <li>Ensures signature elements appear consistently</li>
          <li>Validates that boutonnieres &ldquo;echo&rdquo; bouquets</li>
          <li>Confirms the event tells one visual story</li>
        </ul>
      </div>
    ),
    7: (
      <div className="space-y-2">
        <p>Claude creates production-ready recipe records:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Generates database records for each recipe</li>
          <li>Calculates final costs and stem totals</li>
          <li>Flags items for human review if needed</li>
          <li>Queues recipes for approval workflow</li>
        </ul>
      </div>
    ),
  };
  return details[phase] || null;
}

function BriefSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[var(--terracotta)] font-semibold mb-2">{title}:</div>
      <div className="pl-4 border-l-2 border-[var(--border-light)]">{children}</div>
    </div>
  );
}

function BriefLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-[var(--foreground-muted)]">
      <span className="text-[var(--foreground-subtle)]">{label}:</span>
      <span className="text-[var(--charcoal)]">{value}</span>
    </div>
  );
}

function StemSelectionRow({ role, stem, qty, rationale }: {
  role: string;
  stem: string;
  qty: number;
  rationale: string;
}) {
  return (
    <div className="p-2 rounded bg-[var(--background)] border border-[var(--border-light)]">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-mono text-[var(--foreground-subtle)]">{role}</span>
        <span className="text-xs font-semibold text-[var(--terracotta)]">×{qty}</span>
      </div>
      <div className="text-[var(--charcoal)] font-medium">{stem}</div>
      <div className="text-xs text-[var(--foreground-muted)] mt-1">{rationale}</div>
    </div>
  );
}

function FeedbackCard({ type, percentage, title, description, icon }: {
  type: 'approve' | 'tweak' | 'reject';
  percentage: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  const colors = {
    approve: 'from-[var(--success)] to-[#10B981]',
    tweak: 'from-[var(--warning)] to-[#F59E0B]',
    reject: 'from-[#EF4444] to-[#DC2626]'
  };

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
      <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${colors[type]} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <div className="text-3xl font-semibold text-white mb-1">{percentage}%</div>
      <div className="text-white/80 font-medium mb-2">{title}</div>
      <p className="text-white/50 text-sm">{description}</p>
    </div>
  );
}

function MetricCard({ icon, value, label, description }: {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
}) {
  return (
    <motion.div variants={scaleIn} className="card card-elevated text-center">
      <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--terracotta-light)] text-[var(--terracotta-dark)] flex items-center justify-center mb-4">
        {icon}
      </div>
      <div className="text-3xl font-semibold text-[var(--terracotta)] mb-1">{value}</div>
      <div className="font-medium text-[var(--charcoal)] mb-2">{label}</div>
      <p className="text-sm text-[var(--foreground-muted)]">{description}</p>
    </motion.div>
  );
}
