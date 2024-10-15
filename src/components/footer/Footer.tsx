import React from 'react';
import {Link} from "react-router-dom";

interface Props {}

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return "I came from the About.tsx loader function!";
}

const Header: React.FC<Props> = props => {

  return (
      <header>
        <Link to="/about">About</Link>
      </header>
  );
}

export default Header;

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