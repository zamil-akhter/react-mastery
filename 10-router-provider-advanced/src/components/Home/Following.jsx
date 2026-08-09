import { useLoaderData } from "react-router-dom";

export default function Following() {
  const following = useLoaderData() || [];

  return (
    <div className="py-16 bg-white">
      <div className="mx-auto max-w-5xl px-6 text-gray-700 md:px-12 xl:px-6">
        <h1 className="text-3xl font-bold text-gray-900">Following</h1>
        <p className="mt-2 text-sm text-gray-500">Showing GitHub following IDs and avatars.</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {following.map((user) => (
            <div key={user.id} className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
              <img src={user.avatar_url} alt={user.login} className="h-50 w-50 rounded-full object-cover" />
              <div className="mt-4">
                <div className="flex items-center">
                  <p className="text-lg uppercase text-gray-500">ID </p>
                  <p className="ml-2 text-lg font-semibold text-gray-900">{user.id}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-lg uppercase text-gray-500">username </p>
                  <p className="ml-2 text-sm text-gray-600">{user.login}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const followingLoader = async ({ params }) => {
  const { userid } = params;
  const response = await fetch(`https://api.github.com/users/${userid}/following`);
  const data = await response.json();
  return data;
};
