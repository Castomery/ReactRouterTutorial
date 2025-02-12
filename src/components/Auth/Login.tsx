import React, { useState } from "react"
import { ActionFunctionArgs, Form, LoaderFunctionArgs, redirect, useActionData, useLoaderData, useNavigate, useNavigation } from "react-router-dom"
import '../../css/components/Login.css'
import { loginUser } from "../../api/api";

export async function loginLoader({ request }: LoaderFunctionArgs) {
    return new URL(request.url).searchParams.get('message');
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    const pathname = new URL(request.url).searchParams.get('redirectTo') || '/host';

    try {
        const data = await loginUser({ email, password })
        localStorage.setItem('loggedin', "true");
        const response = redirect(pathname);
        response.body = true;
        return response;
        
    }
    catch(err : any){
        return err.message;
    }
}

export function Login() {

    const navigationState = useNavigation().state;
    const errorMessage = useActionData() as string;
    const message = useLoaderData() as string;


    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {errorMessage && <h3 className="red">{errorMessage}</h3>}
            {message && <h3 className="red">{message}</h3>}
            <Form method="post" className="login-form" replace>
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button disabled={navigationState === "submitting"}>Log in</button>
            </Form>
        </div>
    )

}