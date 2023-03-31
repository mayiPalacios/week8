import { Fragment } from "react";
import Characters from "../../components/cardsSections/characters";
import Comics from "../../components/cardsSections/comics";
import Stories from "../../components/cardsSections/stories";

const Home = () => {
  return (
    <Fragment>
      <Characters />
      <Comics />
      <Stories />
    </Fragment>
  );
};

export default Home;
