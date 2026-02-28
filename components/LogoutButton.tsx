import { logout } from "@/app/actions/auth";

export default function LogoutButton() {
    return (
        <form action={logout}>
            <button className="text-sm font-bold tracking-widest uppercase border border-white/30 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors">
                Logout
            </button>
        </form>
    );
}
