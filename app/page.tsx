import Link from 'next/link';
import { Notebook, Sparkles, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12 md:py-24">
        <div className="container px-4 md:px-6 max-w-5xl">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center p-2 rounded-full bg-primary/10 mb-2">
              <Notebook className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              Elevate Your Note-Taking with{' '}
              <span className="text-primary">AI-Driven</span> Intelligence
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              NotePilot empowers professionals to capture, organize, and distill insights with advanced AI technology, delivering a seamless and elegant user experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Begin Your Journey
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container px-4 md:px-6 max-w-5xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Core Capabilities</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              Engineered to enhance efficiency, organization, and insight in note-taking.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center space-y-4 p-6 bg-background rounded-lg shadow-sm border">
              <div className="p-3 rounded-full bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Intelligent Summarization</h3>
              <p className="text-center text-muted-foreground">
                Effortlessly generate concise summaries of your notes, enabling rapid identification of critical insights.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-background rounded-lg shadow-sm border">
              <div className="p-3 rounded-full bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Cross-Platform Synchronization</h3>
              <p className="text-center text-muted-foreground">
                Experience a refined interface with real-time synchronization across all your devices.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-background rounded-lg shadow-sm border">
              <div className="p-3 rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Robust Security</h3>
              <p className="text-center text-muted-foreground">
                Protect your notes with advanced encryption and a secure authentication framework.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container px-4 md:px-6 max-w-5xl">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Transform Your Productivity Today</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              Join a global community of professionals enhancing their workflow with NotePilot’s innovative tools.
            </p>
            <Link href="/register">
              <Button size="lg" className="mt-4">
                Try NotePilot Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Notebook className="h-5 w-5" />
            <span className="font-bold">NotePilot</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 NotePilot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}