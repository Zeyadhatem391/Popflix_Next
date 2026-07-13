import { auth } from "@/auth";
import { getProfile, type Profile } from "./getProfile";

export default async function checkProfile(): Promise<Profile | null> {
    const session = await auth();

    if (!session) {
        return null;
    }

    if (session.provider === "credentials") {
        return await getProfile();
    }

    return {
        id: session.user.id,
        name: session.user.name ?? "",
        email: session.user.email ?? "",
        image: session.user.image ?? "",
        role: "",
        provider: "google",
    };
}