"use server";

export async function subscribe(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!email || !email.includes("@")) {
        return { error: "Please enter a valid email address." };
    }

    // In a real app, you would save this to your database or mailing list service
    console.log(`Newsletter subscription for: ${email}`);

    return { success: "Thank you for subscribing to NasyrX drops!" };
}
