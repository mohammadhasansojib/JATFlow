"use client";

import { apiFetch } from "@/lib/api";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter();

    const handleClick = async () => {
        try {
            const apiResponse = await apiFetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    
                }
            });

            const response = await apiResponse.json();
            console.log(response);

            router.push("/login");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Button
            className="w-fit rounded-sm bg-slate-800 px-5 text-white hover:bg-slate-700 cursor-pointer"
            onClick={handleClick}
        >
            Logout
        </Button>
    );
};

export default LogoutButton;