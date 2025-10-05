"use client"

const TOKEN_STORAGE_KEY = "todo_app_access_token"

export function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null
  }
  return localStorage.getItem(TOKEN_STORAGE_KEY)
}

export function setAccessToken(token: string): void {
  if (typeof window === "undefined") {
    return
  }
  localStorage.setItem(TOKEN_STORAGE_KEY, token)
}

export function clearAccessToken(): void {
  if (typeof window === "undefined") {
    return
  }
  localStorage.removeItem(TOKEN_STORAGE_KEY)
}

export const SubmitLoginAuth = (
  email: string,
  password: string,
  setIsLoading: (isLoading: boolean) => void,
  router: () => void
) => {
  setIsLoading(true)
  console.log(email, password)
  console.log("login")

  setTimeout(() => {
    setAccessToken("demo-token")
    setIsLoading(false)
    router()
  }, 2000)
}

export const SubmitSignupAuth = (
  email: string,
  password: string,
  setIsLoading: (isLoading: boolean) => void,
  router: () => void
) => {
  setIsLoading(true)
  console.log(email, password)
  console.log("signup")

  setTimeout(() => {
    setAccessToken("demo-token")
    setIsLoading(false)
    router()
  }, 2000)
}
