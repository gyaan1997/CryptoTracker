import React from "react";
// import { Suspense,lazy } from 'react';
import Banner from "../Components/Banner";
import CoinsTable from "../Components/CoinsTable"
// const CoinsTable=lazy(()=>import('../Components/CoinsTable'))
function Homepage() {
  return <>
  <Banner/>
  {/* <Suspense fallback={<div>Loading...</div>}> */}
  {/* <div>Loading...</div> */}
  <CoinsTable />
  {/* </Suspense> */}
  </>;
}

export default Homepage;
