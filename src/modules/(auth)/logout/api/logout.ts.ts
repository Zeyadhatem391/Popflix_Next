import { Session } from "next-auth";

export async function logout(session: Session | null) {
    if (!session?.accessToken) return;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_SING}/auth/logout`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                Accept: "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to logout");
    }

    return res.json();
}