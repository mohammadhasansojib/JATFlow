"use server";

import { apiFetch } from "@/lib/api";
import { IFormState } from "../_components/RegisterForm";
import { ILoginFormState } from "../_components/LoginForm";
import { cookies } from "next/headers";
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

export const loginUser = async (_prevState: ILoginFormState, formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const payload = {
        email,
        password,
    };

    try {

        const apiResponse = await apiFetch(`/api/auth/login`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const response = await apiResponse.json();
        console.log(response);

        if (response.success) {
            const cookieStore = await cookies();

            cookieStore.set("accessToken", response.data.accessToken, {
                secure: false,
                httpOnly: true,
                path: "/",
            });
        }

        return response;

    } catch(error) {
        console.log(error);
    }
}