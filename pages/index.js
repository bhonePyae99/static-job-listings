import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";

export const getServerSideProps = async () => {
  const resp = await axios.get("http://localhost:3000/api/data");
  return { props: { data: resp.data } };
};

export default function Home({ data }) {
  const [tags, setTags] = useState([]);
  let showData = [...data];
  showData = showData.filter((item) => {
    const values = Object.values(item);
    const single = [].concat(...values);
    return tags.every((r) => single.includes(r));
  });
  console.log(showData);
  const handleRemove = (tag) => {
    const copyTags = [...tags];
    const filtered = copyTags.filter((item) => item !== tag);
    setTags(filtered);
  };

  const handleTagSelect = (e) => {
    const copyTags = [...tags];
    if (!copyTags.includes(e.target.id)) {
      copyTags.push(e.target.id);
      setTags(copyTags);
    }
  };
  return (
    <div>
      <Head>
        <title>Static Job Listing</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/favicon-32x32.png" />
      </Head>
      <header className="h-36 bg-lightGrayishCyanBg header relative">
        <div className="md:w-4/6 min-h-[50px] w-5/6 flex flex-wrap items-center p-2 -translate-x-1/2 translate-y-1/2 shadow-md bg-white absolute bottom-0 left-1/2">
          {tags.map((tag) => (
            <div className="flex my-1 mr-3 items-center" key={tag}>
              <span className="text-xs px-2 py-1 bg-lightGrayishCyanFt text-primary font-bold">
                {tag}
              </span>
              <span
                className="bg-primary p-1 cursor-pointer hover:bg-veryDarkGrayishCyan"
                onClick={() => {
                  handleRemove(tag);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#fff"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                  />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </header>
      <main className="mt-20 md:w-4/6 w-5/6 mx-auto">
        <ul>
          {showData.map((item) => (
            <li className="list-none mb-10" key={item.id}>
              <div className="bg-white p-6 flex flex-wrap justify-between shadow-lg relative">
                <div className="flex py-4 md:py-0 leading-loose md:leading-none">
                  <div className="mr-2 static hidden md:block">
                    <Image src={item.logo} width={90} height={90} alt="wht" />
                  </div>
                  <div className="absolute top-0 left-0 md:hidden translate-x-1/2 -translate-y-1/2">
                    <Image src={item.logo} width={50} height={50} alt="wht" />
                  </div>
                  <div className="grid grid-cols-1">
                    <div className="leading-loose">
                      <h4 className="inline-block text-sm text-primary font-bold mr-2">
                        {item.company}
                      </h4>
                      {item.new && (
                        <span className="bg-primary badge mr-1">New!</span>
                      )}
                      {item.featured && (
                        <span className="bg-veryDarkGrayishCyan badge">
                          Featured
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-veryDarkGrayishCyan">
                        {item.position}
                      </h3>
                    </div>
                    <div className="text-gray-400 font-bold text-xs">
                      <span className="mr-5">{item.postedAt}</span>
                      <div className="inline-block">
                        <ul className="list-disc flex">
                          <li className="mr-5">{item.contract}</li>
                          <li>{item.location}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center flex-wrap">
                  <span
                    className="px-2 hover:text-white hover:bg-primary mr-3 py-1 my-1 cursor-pointer text-xs font-bold rounded-sm bg-lightGrayishCyanFt text-primary"
                    id={item.role}
                    onClick={handleTagSelect}
                  >
                    {item.role}
                  </span>
                  <span
                    className="px-2 hover:text-white hover:bg-primary py-1 mr-3 my-1 cursor-pointer text-xs font-bold rounded-sm bg-lightGrayishCyanFt text-primary"
                    id={item.level}
                    onClick={handleTagSelect}
                  >
                    {item.level}
                  </span>
                  {item.languages.map((lan) => (
                    <span
                      className="px-2 hover:text-white hover:bg-primary mr-3 py-1 my-1 cursor-pointer text-xs font-bold rounded-sm bg-lightGrayishCyanFt text-primary"
                      id={lan}
                      onClick={handleTagSelect}
                      key={lan + "1"}
                    >
                      {lan}
                    </span>
                  ))}
                  {item.tools.map((tool) => (
                    <span
                      className="px-2 hover:text-white hover:bg-primary mr-3 py-1 my-1 cursor-pointer text-xs font-bold rounded-sm bg-lightGrayishCyanFt text-primary"
                      id={tool}
                      onClick={handleTagSelect}
                      key={tool + "2"}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <footer></footer>
    </div>
  );
}
