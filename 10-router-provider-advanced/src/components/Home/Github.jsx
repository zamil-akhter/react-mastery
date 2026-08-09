import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

export default function Github() {
  const githubData = useLoaderData();
  // const { userid } = useParams("zamil-akhter");
  // const [githubData, setGithubData] = useState([]);
  // useEffect(() => {
  //   fetch(`https://api.github.com/users/${userid}`)
  //     .then((res) => res.json())
  //     .then((data) => setGithubData(data));
  // }, []);

  console.log("data --->>> ", githubData);
  return (
    <div className="py-16 bg-white">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12">
            <img src={githubData.avatar_url} alt="image" />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">Github Followers: {githubData.followers}</h2>
            <p className="mt-6 text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!</p>
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
