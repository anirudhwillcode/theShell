import fs from "fs"
import path from "path"

interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  readTime: string
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/
  const match = fileContent.match(frontmatterRegex)

  if (!match) return {}

  const frontmatterStr = match[1]
  const frontmatter: Record<string, any> = {}

  frontmatterStr.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(": ")
    if (key && valueParts.length > 0) {
      let value = valueParts.join(": ").trim()
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      frontmatter[key.trim()] = value
    }
  })

  return frontmatter
}

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), "content/posts")

    if (!fs.existsSync(postsDirectory)) {
      return Response.json([])
    }

    const files = fs.readdirSync(postsDirectory)
    const markdownFiles = files.filter((file) => file.endsWith(".md"))

    const posts: BlogPost[] = markdownFiles.map((file) => {
      const filePath = path.join(postsDirectory, file)
      const fileContent = fs.readFileSync(filePath, "utf-8")
      const frontmatter = parseFrontmatter(fileContent)

      return {
        slug: file.replace(".md", ""),
        title: frontmatter.title || "Untitled",
        date: frontmatter.date || new Date().toISOString().split("T")[0],
        category: frontmatter.category || "UNCATEGORIZED",
        excerpt: frontmatter.excerpt || "No excerpt provided",
        readTime: frontmatter.readTime || "5 cycles",
      }
    })

    return Response.json(posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
  } catch (error) {
    console.error("Error reading posts:", error)
    return Response.json([])
  }
}
