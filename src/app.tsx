import React from "react";
import "./index.less";

interface PropsType {
  name: string;
}
const App = (props: PropsType) => {
  const { name } = props;
  return <div className="text">{name}</div>;
};
export default App;
