import type { Route } from "./+types/home";
import { Link } from "react-router";
import { useSession } from "~/lib/auth-client";
import prisma from "~/lib/prisma";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Superblog" },
    { name: "description", content: "Welcome to Superblog!" },
  ];
}

export async function loader() {
  const users = await prisma.user.findMany();
  return { users };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { users } = loaderData;
  const { data: session } = useSession();

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Welcome to Superblog
          </h1>

          {session?.user ? (
            <div className="max-w-lg mx-auto">
              <p className="text-lg text-gray-600 mb-8">
                You're signed in! Start exploring or create your first post.
              </p>
              <div className="space-x-4">
                <Link
                  to="/posts"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-lg font-medium"
                >
                  View Posts
                </Link>
                <Link
                  to="/posts/new"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-lg font-medium"
                >
                  Create Post
                </Link>
              </div>
            </div>
          ) : (
            <div className="max-w-lg mx-auto">
              <p className="text-lg text-gray-600 mb-8">
                Sign up or sign in to start blogging and connect with other
                writers.
              </p>
              <div className="space-x-4">
                <Link
                  to="/auth/sign-up"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-lg font-medium"
                >
                  Get Started
                </Link>
                <Link
                  to="/posts"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md text-lg font-medium"
                >
                  Browse Posts
                </Link>
              </div>
            </div>
          )}

          {/* Users list */}
          {users.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Community
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {users.map((user) => (
                  <div key={user.id} className="bg-white p-4 rounded-lg shadow">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
