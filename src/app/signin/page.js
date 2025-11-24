import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignInClient from "./SignInClient";

export default async function SignInPage() {
    const session = await getServerSession(authOptions);

    // If already logged in → redirect to scorecards
    if (session) {
        redirect("/scorecards");
    }

    return <SignInClient />;
}
