import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

export default function Github() {
  const githubData = useLoaderData();
  const { avatar_url, followers, following, login, name, location, bio, public_repos } = githubData || {};

  console.log("data --->>> ", githubData);
  return (
    <div className="py-16 bg-white">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12">
            <img src={avatar_url} alt={login || "GitHub avatar"} className="rounded-xl shadow-lg" />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h1 className="text-3xl text-gray-900 font-bold md:text-5xl">{name || login}</h1>
            <p className="text-sm text-gray-500 mt-1">{login}</p>
            {bio && <p className="mt-6 text-gray-600">{bio}</p>}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Location</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{location || "Not available"}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Public repos</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{public_repos ?? 0}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Followers</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{followers ?? 0}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Following</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{following ?? 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const githubProfileData = async ({ params }) => {
  const { userid } = params;
  const response = await fetch(`https://api.github.com/users/${userid}`);
  const data = await response.json();
  return data;
};

export { githubProfileData };
