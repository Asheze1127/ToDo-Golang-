import AuthForm from "@/components/forms/AuthForm";
import AuthLayout from "@/components/layouts/AuthLayout";

export default function SignupPage() {
    return (
        <AuthLayout
            title="アカウント作成"
            subtitle="新しいアカウントを作成してください"
        >
            <AuthForm type="signup" />
        </AuthLayout>
    )
}
