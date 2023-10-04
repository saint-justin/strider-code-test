import * as React from 'react';
import SideNav from '../components/SideNav';
import { Link } from 'react-router-dom';
import { Paths } from '../Paths';

const HomePage = () => {
  return (
    <>
      <SideNav />
      <main>henlo</main>
      <br/>
      <Link to={Paths.ORDERS}>go to orders</Link>
      <br/>
      <Link to={`/order/123`}>go to order 123</Link>
    </>
  )
}

export default HomePage;