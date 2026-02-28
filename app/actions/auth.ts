"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
    const password = formData.get("password");

    // In a real app, use environment variables for passwords
    // e.g., process.env.ADMIN_PASSWORD
    if (password === "PONTY2007") {
        (await cookies()).set("admin_session", "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });
        redirect("/admin");
    } else {
        return { error: "Invalid password" };
    }
}

export async function logout() {
    (await cookies()).delete("admin_session");
    redirect("/admin/login");
}
