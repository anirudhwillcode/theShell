import { getPost, getPostSlugs } from "@/lib/blog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | ~/theShell`,
    description: post.excerpt,
  }
}

function markdownToHtml(markdown: string): string {
  let html = markdown

  // Headers
  html = html.replace(/^### (.*?)$/gm, '<h3 class="text-lg font-bold text-green-400 mt-4 mb-3">$1</h3>')
  html = html.replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold text-green-400 mt-6 mb-4">$1</h2>')
  html = html.replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold text-green-400 mt-6 mb-4">$1</h1>')

  // Bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

  // Code blocks
  html = html.replace(
    /```(.*?)\n([\s\S]*?)```/g,
    '<pre class="block bg-black/80 border-2 border-green-600 p-4 mb-4 overflow-x-auto"><code>$2</code></pre>',
  )

  // Inline code
  html = html.replace(/`(.*?)`/g, '<code class="bg-black/50 border border-green-600 px-2 py-1">$1</code>')

  // Links
  html = html.replace(
    /\[(.*?)\]$$(.*?)$$/g,
    '<a href="$2" class="text-green-300 hover:text-green-400 underline">$1</a>',
  )

  // Lists
  html = html.replace(/^- (.*?)$/gm, '<li class="text-green-300 mb-2">$1</li>')
  html = html.replace(/(<li.*?<\/li>[\s\S]*?<li)/gs, "$1")
  html = html.replace(/(<li[\s\S]*?<\/li>)/g, '<ul class="list-disc list-inside text-green-300 mb-4">$1</ul>')

  // Paragraphs
  html = html.replace(/\n\n/g, "</p><p>")
  html = html.replace(/^(?!<[h|u|p|l|b|code|pre])(.*?)$/gm, '<p class="text-green-300 mb-4 leading-relaxed">$1</p>')

  return html
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const htmlContent = markdownToHtml(post.content)

  return (
    <div className="min-h-screen terminal-bg text-green-400">
      <header className="border-b-2 border-green-400 bg-black/90">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="font-mono">
            <Link href="/blog">
              <Button
                variant="ghost"
                className="font-mono text-green-400 hover:text-green-300 hover:bg-green-900/30 p-0 h-auto font-bold text-sm mb-4"
              >
                &gt; cd ~/blog
              </Button>
            </Link>
            <h1 className="text-2xl md:text-4xl font-bold text-green-400 mb-2">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-green-500">
              <span>{post.date}</span>
              <span className="px-2 py-1 bg-green-600/30 border border-green-600 text-green-400">{post.category}</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <article className="font-mono text-green-300">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="prose prose-invert max-w-none space-y-4" />
        </article>
      </main>

      <footer className="border-t-2 border-green-400 bg-black/90 mt-20">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <Link href="/blog">
            <Button
              variant="ghost"
              className="font-mono text-green-400 hover:text-green-300 hover:bg-green-900/30 p-0 h-auto font-bold text-sm mb-4"
            >
              &gt; cd ~/blog
            </Button>
          </Link>
          <p className="font-mono text-green-500 text-sm">&gt; © 2025 Terminal Blog v1.0</p>
        </div>
      </footer>
    </div>
  )
}
