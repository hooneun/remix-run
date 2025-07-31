import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("posts", "routes/posts/home.tsx")
] satisfies RouteConfig;
