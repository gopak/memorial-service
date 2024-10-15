import React from 'react';

interface Props {}

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return "I came from the About.tsx loader function!";
}

const About: React.FC<Props> = props => {

  return (
      <h1>About</h1>
  );
}

export default About;

// import { useLoaderData } from "react-router-dom";
//
// export async function loader() {
//   await new Promise((r) => setTimeout(r, 500));
//   return "I came from the About.tsx loader function!";
// }
//
// export function Component() {
//   let data = useLoaderData() as string;
//
//   return (
//       <div>
//         <h2>About</h2>
//         <p>{data}</p>
//       </div>
//   );
// }
//
// Component.displayName = "AboutPage";