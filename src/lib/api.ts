const DEFAULT_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

type ApiFetchOptions = RequestInit & {
  skipAuth?: boolean
}

function resolveUrl(path: string): string {
  if (path.startsWith("http")) {
    return path
  }

  const base = DEFAULT_API_BASE_URL.replace(/\/$/, "")
  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  return `${base}${normalizedPath}`
}

export async function apiFetch<TResponse = unknown>(
  path: string,
  { headers, body, skipAuth = false, ...init }: ApiFetchOptions = {}
): Promise<TResponse> {
  const url = resolveUrl(path)
  const finalHeaders = new Headers(headers)

  if (body && !(body instanceof FormData) && !finalHeaders.has("Content-Type")) {
    finalHeaders.set("Content-Type", "application/json")
  }

  if (!skipAuth && typeof window !== "undefined") {
    const { getAccessToken } = await import("@/lib/auth")
    const token = getAccessToken()
    if (token && !finalHeaders.has("Authorization")) {
      finalHeaders.set("Authorization", `Bearer ${token}`)
    }
  }

  const response = await fetch(url, {
    ...init,
    headers: finalHeaders,
    body,
  })

  if (!response.ok) {
    const message = await safeParseError(response)
    throw new Error(message)
  }

  if (response.status === 204) {
    return undefined as TResponse
  }

  const text = await response.text()
  return text ? (JSON.parse(text) as TResponse) : (undefined as TResponse)
}

async function safeParseError(response: Response): Promise<string> {
  try {
    const errorBody = await response.clone().json()
    if (typeof errorBody === "object" && errorBody && "message" in errorBody) {
      return String(errorBody.message)
    }
    return response.statusText || "Unknown API error"
  } catch {
    return response.statusText || "Unknown API error"
  }
}
