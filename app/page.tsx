import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getAllPosts } from "@/lib/blog"

export default async function HomePage() {
  const blogPosts = await getAllPosts()
  const recentPosts = blogPosts.slice(0, 4)

  return (
    <div className="min-h-screen terminal-bg text-green-400">
      <header className="border-b-2 border-green-400 bg-black/90">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center font-mono">
            <pre className="text-green-400 text-xs md:text-sm mb-4 leading-tight">
              {`
 ██████╗ ██╗      ██████╗  ██████╗ 
 ██╔══██╗██║     ██╔═══██╗██╔════╝ 
 ██████╔╝██║     ██║   ██║██║  ███╗
 ██╔══██╗██║     ██║   ██║██║   ██║
 ██████╔╝███████╗╚██████╔╝╚██████╔╝
 ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝ 
`}
            </pre>
            <h1 className="font-mono text-2xl md:text-4xl font-bold text-green-400 mb-2 glitch">~/theShell$</h1>
            <p className="font-mono text-sm text-green-300">&gt; Personal memory bank initialized...</p>
            <p className="font-mono text-xs text-green-500 mt-2">[STATUS] Loading retro.exe... Please wait...</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 font-mono">
        {/* About Section */}
        <section className="mb-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-black/80 border-2 border-green-400 p-6 mb-8">
              <h2 className="font-mono text-xl font-bold text-green-400 mb-4">&gt; whoami</h2>
              <div className="text-green-300 text-sm leading-relaxed space-y-2">
                <p>&gt; Executing personal_info.exe...</p>
                <p>&gt; Loading user profile...</p>
                <p>&gt; Hello, fellow code archaeologist!</p>
                <p>&gt; Welcome to my digital time capsule where memories</p>
                <p>&gt; are stored in binary and nostalgia runs on legacy code.</p>
                <p>&gt; Each post is a function call to the past.</p>
              </div>
            </div>
            <Link href="/blog">
              <Button className="bg-green-600 hover:bg-green-500 text-black font-mono font-bold px-6 py-2 border-2 border-green-400 transition-all duration-200 hover:shadow-lg hover:shadow-green-400/50">
                &gt; view_blog.bat
              </Button>
            </Link>
          </div>
        </section>

        {/* Featured Posts */}
        <section>
          <h2 className="font-mono text-xl font-bold text-green-400 mb-8 text-center">
            &gt; ls -la ~/recent_memories/
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="group bg-black/80 border-2 border-green-600 hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/30 cursor-pointer h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-green-600 text-black font-mono text-xs font-bold border border-green-400">
                        {post.category}
                      </Badge>
                      <span className="font-mono text-xs text-green-500">{post.readTime}</span>
                    </div>
                    <CardTitle className="font-mono text-lg font-bold text-green-400 group-hover:text-green-300 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="font-mono text-green-500 text-xs">{post.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-mono text-green-300 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="font-mono text-green-400 hover:text-green-300 p-0 h-auto font-bold text-sm group-hover:text-green-300 transition-colors">
                      &gt; cat {post.title.toLowerCase().replace(/\s+/g, "_")}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-black/80 border-2 border-green-400">
            <CardHeader>
              <CardTitle className="font-mono text-lg font-bold text-green-400">&gt; subscribe_to_feed.sh</CardTitle>
              <CardDescription className="font-mono text-green-300 text-sm">
                Get terminal updates piped directly to your inbox
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="user@domain.com"
                  className="flex-1 px-4 py-2 bg-black border-2 border-green-600 focus:border-green-400 text-green-400 font-mono text-sm placeholder-green-600 focus:outline-none"
                />
                <Button className="bg-green-600 hover:bg-green-500 text-black font-mono font-bold px-6 py-2 border-2 border-green-400 transition-all duration-200">
                  EXEC
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t-2 border-green-400 bg-black/90 mt-20">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <p className="font-mono text-green-500 text-sm">
            &gt; © 2024 Terminal Blog v1.0 | Generated By{" "}
            <a
              href="https://nctnetwork.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 underline transition-colors"
            >
              NCTNetwork
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
