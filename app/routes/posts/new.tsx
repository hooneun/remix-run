import {Form, redirect} from "react-router"
import type {Route} from "./+types/new";
import prisma from "~/lib/prisma"
import {auth} from "~/lib/auth"
import { Link } from "react-router"

export async function action({request}: Route.ActionArgs) {
	// 현재 로그인한 사용자 세션 확인
	const session = await auth.api.getSession({
		headers: request.headers
	});

	// 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
	if (!session) {
		throw redirect("/auth/sign-in");
	}

	const formData = await request.formData();
	const title = formData.get("title") as string;
	const content = formData.get("content") as string;

	try {
		await prisma.post.create({
			data: {
				title,
				content,
				userId: session.user.id, // 현재 로그인한 사용자 ID 사용
				published: false, // Default to unpublished
			},
		});
	} catch (error) {
		console.error("Error creating post:", error);
		throw new Response("Failed to create post", {status: 500});
	}

	return redirect("/posts");
}

export async function loader({request}: Route.LoaderArgs) {
	// 로더에서도 세션 확인하여 UI에서 미리 체크
	const session = await auth.api.getSession({
		headers: request.headers
	});

	return { session };
}

export default function NewPost({ loaderData }: Route.ComponentProps) {
	const { session } = loaderData;

	// 로그인하지 않은 사용자에게 보여줄 UI
	if (!session) {
		return (
			<div className="max-w-2xl mx-auto p-4 text-center">
				<h1 className="text-2xl font-bold mb-4">로그인이 필요합니다</h1>
				<p className="text-gray-600 mb-6">
					새 포스트를 작성하려면 로그인해야 합니다.
				</p>
				<div className="space-x-4">
					<Link
						to="/auth/sign-in"
						className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
					>
						로그인
					</Link>
					<Link
						to="/auth/sign-up"
						className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
					>
						회원가입
					</Link>
				</div>
			</div>
		);
	}

	// 로그인한 사용자를 위한 UI
	return (
		<div className="max-w-2xl mx-auto p-4">
			<div className="mb-6">
				<h1 className="text-2xl font-bold mb-2">Create New Post</h1>
				<p className="text-gray-600">
					작성자: {session.user.name || session.user.email}
				</p>
			</div>
			<Form method="post"
						className="space-y-6">
				<div>
					<label htmlFor="title"
								 className="block text-lg mb-2">
						Title
					</label>
					<input
						type="text"
						id="title"
						name="title"
						placeholder="Enter your post title"
						className="w-full px-4 py-2 border rounded-lg"
					/>
				</div>
				<div>
					<label htmlFor="content"
								 className="block text-lg mb-2">
						Content
					</label>
					<textarea
						id="content"
						name="content"
						placeholder="Write your post content here..."
						rows={6}
						className="w-full px-4 py-2 border rounded-lg"
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
				>
					Create Post
				</button>
			</Form>
		</div>
	)
}