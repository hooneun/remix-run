import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("posts", "routes/posts/home.tsx"),
	route("posts/:postId", "routes/posts/post.tsx"),
	route("posts/new", "routes/posts/new.tsx"),
	route("auth/sign-up", "routes/auth/sign-up.tsx"),
	route("auth/sign-in", "routes/auth/sign-in.tsx"),
	route("api/auth/*", "routes/api/auth/$.ts"),
] satisfies RouteConfig;
