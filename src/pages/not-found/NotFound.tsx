import React from "react";

interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = (props) => {
  return (
    <div className="wrapper">
      <h1>Not Found</h1>
    </div>
  );
};

export default NotFound;
