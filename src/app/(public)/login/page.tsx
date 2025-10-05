import AuthForm from "@/components/forms/AuthForm";
import AuthLayout from "@/components/layouts/AuthLayout";

export default function LoginPage() {
    return (
        <AuthLayout
            title="ログイン"
            subtitle="アカウントにログインしてください"
        >
            <AuthForm type="login" />
        </AuthLayout>
    )
}