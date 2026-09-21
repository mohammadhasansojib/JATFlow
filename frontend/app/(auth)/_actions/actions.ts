"use server";

import { apiFetch } from "@/lib/api";
import { IFormState } from "../_components/RegisterForm";
// import { redirect, RedirectType } from "next/navigation";

export const createUser = async (_prevState: IFormState, formData: FormData) => {
    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")

    const payload = {
        username,
        email,
        password
    };

    try {
        
        const apiResponse = await apiFetch(`/api/auth/register`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!apiResponse.ok) {
            const err = await apiResponse.json();
            return {
                message: err.message,
                success: err.success,
            };
        }

        const data = await apiResponse.json();
        console.log(data);

        return data;

    } catch (error) {
        console.log(error);
    }
}