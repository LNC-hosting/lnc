export interface GitHubRepoData {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  homepage?: string;
  created_at: string;
  updated_at: string;
  open_issues_count: number;
  watchers_count: number;
}

export interface EnrichedProject {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
  link: string;
  owner: string;
  ownerAvatar: string;
  homepage?: string;
  updatedAt: string;
  issues: number;
  watchers: number;
  image?: string;
  readmeContent?: string;
}

const GITHUB_API_BASE = "https://api.github.com";

function extractFirstImageFromMarkdown(markdown: string): string | undefined {
  // Match markdown images: ![alt](url)
  const mdImageMatch = markdown.match(/!\[.*?\]\((.*?)\)/);
  if (mdImageMatch) {
    return mdImageMatch[1];
  }

  // Match HTML images: <img src="url"
  const htmlImageMatch = markdown.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (htmlImageMatch) {
    return htmlImageMatch[1];
  }

  return undefined;
}

async function fetchReadme(
  owner: string,
  repo: string
): Promise<{ content: string; firstImage?: string } | null> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/readme`,
      {
        headers,
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    // README content is base64 encoded - use atob for client-side compatibility
    const content = typeof window !== "undefined"
      ? atob(data.content.replace(/\s/g, ''))
      : Buffer.from(data.content, "base64").toString("utf-8");
    const firstImage = extractFirstImageFromMarkdown(content);

    // Convert relative URLs to absolute GitHub URLs
    let absoluteImageUrl = firstImage;
    if (firstImage && !firstImage.startsWith("http")) {
      absoluteImageUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${firstImage.replace(
        /^\.\//,
        ""
      )}`;
    }

    return {
      content,
      firstImage: absoluteImageUrl,
    };
  } catch (error) {
    console.error("Error fetching README:", error);
    return null;
  }
}

export async function fetchGitHubRepo(
  githubUrl: string
): Promise<EnrichedProject | null> {
  try {
    const match = githubUrl.match(
      /github\.com\/([^\/]+)\/([^\/]+)/
    );

    if (!match) {
      console.error("Invalid GitHub URL:", githubUrl);
      return null;
    }

    const [, owner, repo] = match;
    const cleanRepo = repo.replace(/\.git$/, "");

    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };

    // Add GitHub token if available (increases rate limit from 60 to 5000/hour)
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${cleanRepo}`,
      {
        headers,
        next: {
          revalidate: 3600,
        },
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(
        `Failed to fetch ${owner}/${cleanRepo}:`,
        response.status,
        errorData
      );

      // Return basic project info even if API fails
      return {
        id: `${owner}-${cleanRepo}`,
        name: cleanRepo,
        description: "Visit GitHub to learn more about this project",
        language: "Unknown",
        stars: 0,
        forks: 0,
        topics: [],
        link: githubUrl,
        owner: owner,
        ownerAvatar: `https://github.com/${owner}.png`,
        updatedAt: "Recently",
        issues: 0,
        watchers: 0,
      };
    }

    const data: GitHubRepoData = await response.json();

    // Fetch README
    const readmeData = await fetchReadme(owner, cleanRepo);

    return {
      id: `${owner}-${cleanRepo}`,
      name: data.name,
      description: data.description || "No description available",
      language: data.language || "Unknown",
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      topics: data.topics || [],
      link: data.html_url,
      owner: data.owner.login,
      ownerAvatar: data.owner.avatar_url,
      homepage: data.homepage || undefined,
      updatedAt: new Date(data.updated_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      issues: data.open_issues_count || 0,
      watchers: data.watchers_count || 0,
      image: readmeData?.firstImage,
      readmeContent: readmeData?.content,
    };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return null;
  }
}

export async function fetchAllProjects(
  githubUrls: string[]
): Promise<EnrichedProject[]> {
  const promises = githubUrls.map((url) => fetchGitHubRepo(url));
  const results = await Promise.all(promises);
  return results.filter((project): project is EnrichedProject => project !== null);
}
