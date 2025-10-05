"use client";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { SubmitLoginAuth, SubmitSignupAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface AuthFormProps {
    type: "login" | "signup";
}

export default function AuthForm(
    { type }: AuthFormProps
) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleLoginSubmit = () => SubmitLoginAuth(email, password, setIsLoading, () => router.push("/todos"));
    const handleSignupSubmit = () => SubmitSignupAuth(email, password, setIsLoading, () => router.push("/todos"));
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{type === "login" ? "Login to your account" : "Sign up to your account"}</CardTitle>
                <CardDescription>
                    Enter your email below to {type === "login" ? "login" : "sign up"} to your account
                </CardDescription>
                <CardAction>
                    <Button variant="link" onClick={() => router.push(type === "login" ? "/signup" : "/login")}>
                        {type === "login" ? "Sign Up" : "Login"}
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                {type === "login" && (
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                )}
                            </div>
                            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full" onClick={type === "login" ? handleLoginSubmit : handleSignupSubmit}>
                    {isLoading && <Spinner />}
                    {type === "login" ? "Login" : "Sign up"}
                </Button>
                <Button variant="outline" className="w-full">
                    {type === "login" ? "Login with Google" : "Sign up with Google"}
                </Button>
            </CardFooter>
        </Card>
    )
}