// Mock blog posts for preview environment
const mockPosts = [
  {
    slug: "welcome-to-the-shell",
    title: "Welcome to theShell",
    date: "2025.03.15",
    category: "INTRO",
    excerpt: "A brief introduction to theShell blog and what to expect from this digital time capsule.",
    readTime: "3 cycles",
    content: `# Welcome to theShell

This is your new blog. Write your thoughts, ideas, and memories here.

## What is theShell?

theShell is a retro-inspired markdown blog built with Next.js and hosted on Vercel.

### Features
- Write posts in pure markdown
- Retro 8-bit terminal aesthetic
- Lightning fast deployments
- SEO friendly

Start writing your first post today!`,
  },
  {
    slug: "getting-started-with-markdown",
    title: "Getting Started with Markdown",
    date: "2025.03.14",
    category: "TUTORIAL",
    excerpt: "Learn how to write your first blog post using markdown syntax and frontmatter metadata.",
    readTime: "5 cycles",
    content: `# Getting Started with Markdown

Markdown is a simple way to write formatted text.

## Basic Syntax

### Headings
Use # for headings, ## for subheadings, etc.

### Bold and Italic
**Bold text** and *italic text*

### Lists
- Item 1
- Item 2
- Item 3

### Code
\`\`\`javascript
console.log("Hello, theShell!");
\`\`\`

Happy writing!`,
  },
  {
    slug: "deploying-to-vercel",
    title: "Deploying to Vercel",
    date: "2025.03.13",
    category: "DEPLOYMENT",
    excerpt: "Step-by-step guide to deploy your markdown blog to Vercel with zero configuration.",
    readTime: "4 cycles",
    content: `# Deploying to Vercel

Deploying your blog to Vercel is incredibly simple.

## Steps

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Click deploy
4. Your blog is live!

That's it! Vercel will automatically redeploy whenever you push new changes.

## Custom Domain

You can also connect a custom domain to your Vercel project.`,
  },
]

export interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  readTime: string
  content: string
}

// Fetch posts from API (works in preview and production)
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/posts`, {
      cache: "no-store",
    })
    if (response.ok) {
      const posts = await response.json()
      return posts
    }
  } catch (error) {
    console.warn("Failed to fetch posts from API, using mock data")
  }

  // Fallback to mock data for preview
  return mockPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Fetch single post from API
export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/posts/${slug}`, {
      cache: "no-store",
    })
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.warn(`Failed to fetch post ${slug} from API, using mock data`)
  }

  // Fallback to mock data for preview
  return mockPosts.find((post) => post.slug === slug) || null
}

// Get post slugs
export async function getPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts()
  return posts.map((post) => post.slug)
}
