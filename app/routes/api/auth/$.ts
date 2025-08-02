import {auth} from "~/lib/auth"
import type { Route } from "./+types/$"

export async function loader({request}: Route.LoaderArgs) {
	console.log("API Route Hit - GET:", request.url)
	try {
		return auth.handler(request)
	} catch (error) {
		console.error("Auth handler error:", error)
		return new Response("Auth error", { status: 500 })
	}
}

export async function action({request}: Route.ActionArgs) {
	console.log("API Route Hit - POST:", request.url)
	try {
		return auth.handler(request)
	} catch (error) {
		console.error("Auth handler error:", error)
		return new Response("Auth error", { status: 500 })
	}
}