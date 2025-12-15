import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, BookOpen, Search, GitCommit, Sparkles, Code2, Users, Zap,
  Brain, FileText, Rocket, Shield, Clock, TrendingUp, CheckCircle2,
  Terminal, Boxes, Globe, Star, MessageSquare, BarChart3, FolderGit2,
  Layers, AlertCircle, Lightbulb, RefreshCw
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-gray-800 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary p-1.5">
                <Code2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">CodeLens</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How it Works</Link>
              <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/sign-in">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.100),transparent)] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.950),transparent)]" />
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Badge variant="secondary" className="text-xs sm:text-sm">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Powered by Advanced AI
            </Badge>
            <Badge variant="outline" className="text-xs sm:text-sm">
              <Star className="mr-1.5 h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              Trusted by 1000+ teams
            </Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Developer collaboration,{" "}
            <span className="text-primary">reimagined</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
          Onboard developers in hours, not weeks. Find any code in seconds. Stay in sync effortlessly.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground/80 mb-10 max-w-2xl mx-auto">
           
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/sign-in">
              <Button size="lg" className="w-full sm:w-auto text-base px-8 h-12">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 h-12">
                <MessageSquare className="mr-2 h-5 w-5" />
                See it in Action
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Free for 14 days</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 sm:p-12 border-2 border-dashed border-orange-200 dark:border-orange-900 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-950/10 dark:to-red-950/10">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="rounded-full bg-orange-100 dark:bg-orange-950 p-4 flex-shrink-0">
                <AlertCircle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  The Developer Onboarding Problem
                </h2>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  New developers spend weeks trying to understand your codebase. Documentation is outdated. 
                  Commit messages are cryptic. Finding the right code feels like archaeology.
                </p>
                <p className="text-xl font-semibold text-foreground">
                  CodeLens solves this—automatically. ✨
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4">
            <Boxes className="mr-1.5 h-3.5 w-3.5" />
            Core Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Everything you need to ship faster
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features that make developer collaboration effortless and productive
          </p>
        </div>

        {/* Main 3 Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-6">
          {/* Documentation Feature */}
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-900 hover:shadow-xl transition-all">
            <div className="rounded-xl bg-blue-500/10 dark:bg-blue-500/20 p-3 w-fit mb-6">
              <BookOpen className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Automatic Documentation
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              AI analyzes your entire codebase and generates comprehensive, up-to-date documentation automatically. 
              Perfect for onboarding and keeping teams aligned.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="text-sm">Code structure analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="text-sm">Natural language explanations</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="text-sm">Auto-updates with changes</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="text-sm">Multi-language support</span>
              </div>
            </div>
          </Card>

          {/* Search Feature */}
          <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-900 hover:shadow-xl transition-all">
            <div className="rounded-xl bg-purple-500/10 dark:bg-purple-500/20 p-3 w-fit mb-6">
              <Search className="h-12 w-12 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Context-Aware Search
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Intelligent semantic search that understands code context and relationships. 
              Find what you need in seconds, not hours.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-purple-500/10 dark:bg-purple-500/20 p-2">
                  <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Lightning fast</p>
                  <p className="text-xs text-muted-foreground">Millisecond search</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-purple-500/10 dark:bg-purple-500/20 p-2">
                  <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Semantic understanding</p>
                  <p className="text-xs text-muted-foreground">Conceptual matching</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-purple-500/10 dark:bg-purple-500/20 p-2">
                  <Lightbulb className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Smart suggestions</p>
                  <p className="text-xs text-muted-foreground">AI-powered ranking</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Commit Summaries Feature */}
          <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-900 hover:shadow-xl transition-all">
            <div className="rounded-xl bg-green-500/10 dark:bg-green-500/20 p-3 w-fit mb-6">
              <GitCommit className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              AI Commit Summaries
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Every commit gets a clear, natural language summary. Understand changes at a glance 
              without diving into diffs.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-sm">Automatic summaries</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-sm">Impact analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-sm">Change tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-sm">Real-time updates</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Secondary Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <Card className="p-6 hover:shadow-xl transition-all">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-primary/10 p-3">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Team Collaboration</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Built for teams of all sizes. Share insights, track progress, and keep everyone on the same page.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Role-based access</Badge>
                  <Badge variant="secondary">Team chat</Badge>
                  <Badge variant="secondary">Analytics</Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-primary/10 p-3">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Ship with Confidence</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Reduce onboarding from weeks to days. Deploy faster with comprehensive code understanding.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Quick onboarding</Badge>
                  <Badge variant="secondary">Code reviews</Badge>
                  <Badge variant="secondary">Quality checks</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className=" w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4">
            <Terminal className="mr-1.5 h-3.5 w-3.5" />
            How it works
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Get started in minutes
          </h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to transform your development workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 text-center hover:shadow-xl transition-all relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div className="rounded-xl bg-primary/10 dark:bg-primary/20 p-4 w-fit mx-auto mb-6 mt-4">
              <FolderGit2 className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Connect Your Repo</h3>
            <p className="text-muted-foreground mb-4">
              Link your GitHub, GitLab, or Bitbucket repository with one click. 
              We support all major platforms and private repos.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary">GitHub</Badge>
              <Badge variant="secondary">GitLab</Badge>
              <Badge variant="secondary">Bitbucket</Badge>
            </div>
          </Card>

          <Card className="p-8 text-center hover:shadow-xl transition-all relative border-primary/50">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div className="rounded-xl bg-primary/10 dark:bg-primary/20 p-4 w-fit mx-auto mb-6 mt-4">
              <RefreshCw className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI Analyzes Everything</h3>
            <p className="text-muted-foreground mb-4">
              Our AI reads your entire codebase, understands structure and relationships, 
              and generates comprehensive documentation automatically.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Usually takes 2-5 minutes</span>
              </div>
            </div>
          </Card>

          <Card className="p-8 text-center hover:shadow-xl transition-all relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div className="rounded-xl bg-primary/10 dark:bg-primary/20 p-4 w-fit mx-auto mb-6 mt-4">
              <Rocket className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Start Collaborating</h3>
            <p className="text-muted-foreground mb-4">
              Search your codebase, read AI-generated docs, and track commits—all in one place. 
              Invite your team and watch productivity soar.
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              <MessageSquare className="mr-2 h-4 w-4" />
              Try Demo
            </Button>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4">
            <Layers className="mr-1.5 h-3.5 w-3.5" />
            Use Cases
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Built for every developer workflow
          </h2>
          <p className="text-lg text-muted-foreground">
            From onboarding to code reviews, CodeLens adapts to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <Card className="p-8 hover:shadow-xl transition-all border-l-4 border-l-blue-500">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Onboarding New Developers</h3>
                <p className="text-muted-foreground mb-4">
                  New team members can understand the codebase in hours instead of weeks. 
                  Auto-generated documentation and intelligent search make ramping up painless.
                </p>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Reduce onboarding time by 80%
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-all border-l-4 border-l-purple-500">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-purple-50 dark:bg-purple-950/30 p-3">
                <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Legacy Code Modernization</h3>
                <p className="text-muted-foreground mb-4">
                  Working with old codebases? CodeLens documents undocumented systems and 
                  helps teams understand complex legacy code instantly.
                </p>
                <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  Make sense of any codebase
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-all border-l-4 border-l-green-500">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-3">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Scaling Engineering Teams</h3>
                <p className="text-muted-foreground mb-4">
                  As your team grows, keeping everyone aligned becomes harder. CodeLens ensures 
                  knowledge is shared automatically and nothing gets lost.
                </p>
                <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                  Scale without friction
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-all border-l-4 border-l-orange-500">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-orange-50 dark:bg-orange-950/30 p-3">
                <Code2 className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Code Review & Maintenance</h3>
                <p className="text-muted-foreground mb-4">
                  Understand changes faster with AI commit summaries. Review code more effectively 
                  and catch potential issues before they become problems.
                </p>
                <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                  Ship with confidence
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className=" mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Trusted by developers worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of teams already shipping faster with CodeLens
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 text-center hover:shadow-lg transition-all">
            <p className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">5M+</p>
            <p className="text-sm sm:text-base text-muted-foreground font-medium">Lines Documented</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-all">
            <p className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">1.2K+</p>
            <p className="text-sm sm:text-base text-muted-foreground font-medium">Active Repositories</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-all">
            <p className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">99.9%</p>
            <p className="text-sm sm:text-base text-muted-foreground font-medium">Uptime SLA</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-all">
            <p className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">&lt;2h</p>
            <p className="text-sm sm:text-base text-muted-foreground font-medium">Avg. Response</p>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4">
            <Star className="mr-1.5 h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Loved by developers
          </h2>
          <p className="text-lg text-muted-foreground">
            See what teams are saying about CodeLens
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 hover:shadow-xl transition-all">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4">
              "CodeLens cut our onboarding time from 3 weeks to 3 days. New devs are productive immediately."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                SM
              </div>
              <div>
                <p className="font-semibold">Sarah Martinez</p>
                <p className="text-sm text-muted-foreground">Engineering Manager, TechCorp</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all border-primary/50">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4">
              "The AI search is incredible. I find what I need in seconds, not hours. Game changer for our team."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                JC
              </div>
              <div>
                <p className="font-semibold">James Chen</p>
                <p className="text-sm text-muted-foreground">Senior Developer, StartupX</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4">
              "Finally, documentation that actually stays up to date. CodeLens has transformed how we work."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                AP
              </div>
              <div>
                <p className="font-semibold">Alex Patel</p>
                <p className="text-sm text-muted-foreground">CTO, DevTools Inc</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4">
            <Zap className="mr-1.5 h-3.5 w-3.5" />
            Credit-Based Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Pay for what you use
          </h2>
          <p className="text-lg text-muted-foreground">
            Purchase credits and use them for documentation, searches, and AI summaries. No monthly commitments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Pack */}
          <Card className="p-8 hover:shadow-xl transition-all">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <p className="text-muted-foreground text-sm">Perfect for trying out</p>
            </div>
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">$10</span>
              </div>
              <p className="text-muted-foreground text-sm mt-2">500 credits</p>
              <p className="text-xs text-muted-foreground mt-1">$0.02 per credit</p>
            </div>
            <Link href="/sign-in">
              <Button variant="outline" className="w-full mb-6">
                Get Started
              </Button>
            </Link>
            <div className="space-y-3 text-sm">
              <p className="font-semibold mb-2">What you get:</p>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>~50 doc generations</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>~100 AI searches</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>~250 commit summaries</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Credits never expire</span>
              </div>
            </div>
          </Card>

          {/* Pro Pack */}
          <Card className="p-8 hover:shadow-xl transition-all border-2 border-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold">
              BEST VALUE
            </div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-muted-foreground text-sm">Most popular choice</p>
            </div>
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">$49</span>
              </div>
              <p className="text-muted-foreground text-sm mt-2">3,000 credits</p>
              <p className="text-xs text-muted-foreground mt-1">$0.016 per credit · Save 20%</p>
            </div>
            <Link href="/sign-in">
              <Button className="w-full mb-6">
                Buy Credits
              </Button>
            </Link>
            <div className="space-y-3 text-sm">
              <p className="font-semibold mb-2">What you get:</p>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>~300 doc generations</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>~600 AI searches</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>~1,500 commit summaries</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Credits never expire</span>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Priority support</span>
              </div>
            </div>
          </Card>

          {/* Enterprise Pack */}
          <Card className="p-8 hover:shadow-xl transition-all bg-gradient-to-br from-muted/50 to-muted/30">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-muted-foreground text-sm">For large teams</p>
            </div>
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">$199</span>
              </div>
              <p className="text-muted-foreground text-sm mt-2">15,000 credits</p>
              <p className="text-xs text-muted-foreground mt-1">$0.013 per credit · Save 35%</p>
            </div>
            <Link href="/sign-in">
              <Button variant="outline" className="w-full mb-6">
                Buy Credits
              </Button>
            </Link>
            <div className="space-y-3 text-sm">
              <p className="font-semibold mb-2">What you get:</p>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>~1,500 doc generations</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>~3,000 AI searches</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>~7,500 commit summaries</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Credits never expire</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Dedicated support</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Custom integrations</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Credit Usage Info */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="p-6 bg-muted/50">
            <h4 className="font-semibold mb-4 text-center">How credits work</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm">
              <div>
                <div className="rounded-lg bg-background p-4 mb-2">
                  <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">Documentation</p>
                  <p className="text-2xl font-bold text-primary mt-1">10</p>
                  <p className="text-xs text-muted-foreground">credits per file</p>
                </div>
              </div>
              <div>
                <div className="rounded-lg bg-background p-4 mb-2">
                  <Search className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">AI Search</p>
                  <p className="text-2xl font-bold text-primary mt-1">5</p>
                  <p className="text-xs text-muted-foreground">credits per query</p>
                </div>
              </div>
              <div>
                <div className="rounded-lg bg-background p-4 mb-2">
                  <GitCommit className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">Commit Summary</p>
                  <p className="text-2xl font-bold text-primary mt-1">2</p>
                  <p className="text-xs text-muted-foreground">credits per commit</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className=" mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about CodeLens
            </p>
          </div>
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">What programming languages do you support?</h3>
              <p className="text-muted-foreground">
                CodeLens supports all major programming languages including JavaScript, TypeScript, Python, Java, 
                Go, Rust, C++, PHP, Ruby, and many more. Our AI can understand and document any codebase.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">How secure is my code?</h3>
              <p className="text-muted-foreground">
                We take security seriously. Your code is encrypted in transit and at rest. We never train our AI models 
                on your private code, and we're SOC 2 Type II compliant. Enterprise customers can opt for self-hosted deployments.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">Do credits expire?</h3>
              <p className="text-muted-foreground">
                No! Your credits never expire. Purchase once and use them whenever you need. You can also top up 
                your balance at any time if you run low.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">What if I need a refund?</h3>
              <p className="text-muted-foreground">
                If you're not satisfied with your purchase within the first 7 days and haven't used more than 10% of your credits, 
                we'll provide a full refund, no questions asked.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className=" mx-auto">
          <Card className="p-10 sm:p-16 lg:p-20 text-center bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground border-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_70%)]" />
            <div className="relative z-10">
              <Badge variant="secondary" className="mb-6">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Start your journey today
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Ready to transform your development workflow?
              </h2>
              <p className="text-lg sm:text-xl text-primary-foreground/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of developers who have already accelerated their workflows with CodeLens. 
                Purchase credits and start documenting, searching, and collaborating better—today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/sign-in">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base px-8 h-14 text-lg font-semibold">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 h-14 text-lg font-semibold border-white/20 hover:bg-white/10 text-white hover:text-white">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    See Demo
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/80">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Credits never expire</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>No monthly fees</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Setup in minutes</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-lg bg-primary p-1.5">
                  <Code2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">CodeLens</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Transforming developer collaboration with AI-powered code understanding.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Demo</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Changelog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Security</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Compliance</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © 2025 CodeLens. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
