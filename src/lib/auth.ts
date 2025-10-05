export const SubmitLoginAuth = (
    email: string,
    password: string,
    setIsLoading: (isLoading: boolean) => void,
    router: () => void,
) => {
    setIsLoading(true);
    console.log(email, password);
    console.log("login");

    setTimeout(() => {
        setIsLoading(false);
        router();
    }, 2000);
}

export const SubmitSignupAuth = (
    email: string,
    password: string,
    setIsLoading: (isLoading: boolean) => void,
    router: () => void,
) => {
    setIsLoading(true);
    console.log(email, password);
    console.log("signup");

    setTimeout(() => {
        setIsLoading(false);
        router();
    }, 2000);
}