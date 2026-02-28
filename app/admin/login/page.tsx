"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, null) as any;

    return (
        <main className="flex-grow flex items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-md p-8 border border-white/10 bg-white/5 rounded-2xl relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary"></div>
                <h1 className="text-3xl font-bold tracking-tighter mb-8 uppercase text-center">Admin Access</h1>

                <form action={formAction} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold uppercase tracking-widest opacity-60">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter admin password"
                            className="w-full bg-transparent border-b border-white/30 py-4 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors"
                            required
                        />
                    </div>

                    {state?.error && (
                        <div className="text-red-400 text-sm font-medium">{state.error}</div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full mt-4 group relative overflow-hidden rounded-full border border-white/30 hover:border-white bg-white text-primary transition-all duration-300 disabled:opacity-50"
                    >
                        <div className="relative flex items-center justify-center px-8 py-4">
                            <span className="text-sm font-bold tracking-widest uppercase">
                                {isPending ? "Authenticating..." : "Login"}
                            </span>
                        </div>
                    </button>
                </form>
            </div>
        </main>
    );
}
