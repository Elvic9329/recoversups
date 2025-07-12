:root {
  --background: #ffffff;
  --foreground: #1a202c;
  --card: #f7fafc;
  --card-foreground: #1a202c;
  --popover: #f7fafc;
  --popover-foreground: #1a202c;
  --primary: #b62921;
  --primary-foreground: #ffffff;
  --secondary: #2c3e50;
  --secondary-foreground: #f7fafc;
  --muted: #e2e8f0;
  --muted-foreground: #718096;
  --accent: #e74c3c;
  --accent-foreground: #ffffff;
  --destructive: #e53e3e;
  --destructive-foreground: #f7fafc;
  --border: #cbd5e0;
  --input: #e2e8f0;
  --ring: #b62921;
  --chart-1: #a78bfa;
  --chart-2: #6ee7b7;
  --chart-3: #fbbf24;
  --chart-4: #ef4444;
  --chart-5: #3b82f6;
  --sidebar: #f0f4f8;
  --sidebar-foreground: #1a202c;
  --sidebar-primary: #b62921;
  --sidebar-primary-foreground: #f7fafc;
  --sidebar-accent: #a0aec0;
  --sidebar-accent-foreground: #1a202c;
  --sidebar-border: #cbd5e0;
  --sidebar-ring: #b62921;
  --font-sans: Montserrat, sans-serif;
  --font-serif: Lora, serif;
  --font-mono: Menlo, monospace;
  --radius: 0.5rem;
  --shadow-2xs: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.05);
  --shadow-xs: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.05);
  --shadow-sm: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.10), 0.1rem 1px 2px -0.9px hsl(0 0% 0% / 0.10);
  --shadow: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.10), 0.1rem 1px 2px -0.9px hsl(0 0% 0% / 0.10);
  --shadow-md: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.10), 0.1rem 2px 4px -0.9px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.10), 0.1rem 4px 6px -0.9px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.10), 0.1rem 8px 10px -0.9px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.25);
  --tracking-normal: -0.025em;
  --spacing: 0.25rem;
}

.dark {
  --background: #1a1a1a;
  --foreground: #f7fafc;
  --card: #2d3748;
  --card-foreground: #e2e8f0;
  --popover: #2d3748;
  --popover-foreground: #e2e8f0;
  --primary: #b62921;
  --primary-foreground: #ffffff;
  --secondary: #2c3e50;
  --secondary-foreground: #f7fafc;
  --muted: #4a5568;
  --muted-foreground: #a0aec0;
  --accent: #e74c3c;
  --accent-foreground: #ffffff;
  --destructive: #e53e3e;
  --destructive-foreground: #f7fafc;
  --border: #4a5568;
  --input: #4a5568;
  --ring: #b62921;
  --chart-1: #a78bfa;
  --chart-2: #6ee7b7;
  --chart-3: #fbbf24;
  --chart-4: #ef4444;
  --chart-5: #3b82f6;
  --sidebar: #283141;
  --sidebar-foreground: #e2e8f0;
  --sidebar-primary: #b62921;
  --sidebar-primary-foreground: #f7fafc;
  --sidebar-accent: #a0aec0;
  --sidebar-accent-foreground: #1a202c;
  --sidebar-border: #4a5568;
  --sidebar-ring: #b62921;
  --font-sans: Montserrat, sans-serif;
  --font-serif: Lora, serif;
  --font-mono: Menlo, monospace;
  --radius: 0.5rem;
  --shadow-2xs: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.05);
  --shadow-xs: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.05);
  --shadow-sm: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.10), 0.1rem 1px 2px -0.9px hsl(0 0% 0% / 0.10);
  --shadow: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.10), 0.1rem 1px 2px -0.9px hsl(0 0% 0% / 0.10);
  --shadow-md: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.10), 0.1rem 2px 4px -0.9px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.10), 0.1rem 4px 6px -0.9px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.10), 0.1rem 8px 10px -0.9px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.25);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);

  --tracking-tighter: calc(var(--tracking-normal) - 0.05em);
  --tracking-tight: calc(var(--tracking-normal) - 0.025em);
  --tracking-normal: var(--tracking-normal);
  --tracking-wide: calc(var(--tracking-normal) + 0.025em);
  --tracking-wider: calc(var(--tracking-normal) + 0.05em);
  --tracking-widest: calc(var(--tracking-normal) + 0.1em);
}

body {
  letter-spacing: var(--tracking-normal);
}