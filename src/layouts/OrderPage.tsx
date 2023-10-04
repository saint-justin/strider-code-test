import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Paths } from '../Paths';

const Order = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>i am the single order page for id {id}<br/><Link to={Paths.HOME}>go home</Link></>
  )
}

export default Order;