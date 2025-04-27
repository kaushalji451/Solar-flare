import React from "react";
import Templete1 from "../homecomponents/Templete1";
import Templete2 from "../homecomponents/Templete2";
import Templete3 from "../homecomponents/Templete3";
import Templete4 from "../homecomponents/Templete4";
import Templete5 from "../homecomponents/Templete5";

const Home = () => {
  return (
    <>
      <div className="pt-18 pb-18">
        {/* home 1 template */}
        <Templete1></Templete1>
        {/* home 2 template cursole 1 */}
        <Templete2></Templete2>
        {/* home 2 template home cursole 2 */}
        <Templete3></Templete3>
        {/* home cursole3 */}
        <Templete4></Templete4>
        {/* home cursole4 */}
        <Templete5></Templete5>
      </div>
    </>
  );
};

export default Home;
