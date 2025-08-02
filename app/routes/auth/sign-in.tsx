import { useState } from "react"
import { signIn } from "~/lib/auth-client"
import type { Route } from "./+types/sign-in"
import { Link } from "react-router"

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Sign In" },
		{ name: "description", content: "Sign in to your account" },
	]
}

export default function SignIn() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError("")

		try {
			await signIn.email(
				{
					email,
					password,
				},
				{
					onRequest: () => {
						setIsLoading(true)
					},
					onSuccess: () => {
						// 성공시 홈으로 리다이렉트
						window.location.href = "/"
					},
					onError: (ctx) => {
						if (ctx.error.status === 403) {
							setError("Please verify your email address")
						} else {
							setError(ctx.error.message)
						}
						setIsLoading(false)
					},
				},
			)
		} catch (err) {
			setError("An unexpected error occurred")
			setIsLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Sign in to your account
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Or{" "}
						<Link
							to="/auth/sign-up"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							create a new account
						</Link>
					</p>
				</div>
				
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					{error && (
						<div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
							{error}
						</div>
					)}
					
					<div className="space-y-4">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email Address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Enter your email address"
							/>
						</div>
						
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Enter your password"
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="text-sm">
							<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
								Forgot your password?
							</a>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={isLoading}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? "Signing in..." : "Sign in"}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}