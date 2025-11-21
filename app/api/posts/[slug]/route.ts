import fs from "fs"
import path from "path"

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = fileContent.match(frontmatterRegex)

  if (!match) {
    return { frontmatter: {}, content: fileContent }
  }

  const frontmatterStr = match[1]
  const content = match[2]
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

  return { frontmatter, content }
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    const filePath = path.join(process.cwd(), "content/posts", `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return Response.json({ error: "Post not found" }, { status: 404 })
    }

    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { frontmatter, content } = parseFrontmatter(fileContent)

    return Response.json({
      slug,
      title: frontmatter.title || "Untitled",
      date: frontmatter.date || new Date().toISOString().split("T")[0],
      category: frontmatter.category || "UNCATEGORIZED",
      excerpt: frontmatter.excerpt || "No excerpt provided",
      readTime: frontmatter.readTime || "5 cycles",
      content,
    })
  } catch (error) {
    console.error("Error reading post:", error)
    return Response.json({ error: "Failed to read post" }, { status: 500 })
  }
}
