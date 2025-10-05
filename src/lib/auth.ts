export const SubmitAuth = (
    email: string,
    password: string,
    setIsLoading: (isLoading: boolean) => void,
    type: "login" | "signup"
) => {
    setIsLoading(true);
    console.log(email, password);

    // 実際のAPI呼び出しをシミュレート
    setTimeout(() => {
        setIsLoading(false);
    }, 2000);
}