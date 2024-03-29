import React from 'react';
import { useLoaderData, Link } from "react-router-dom";
import Services from '../Services/Services'
import Fornitori from '../components/FornitoriComponent';

export async function loader() {
    const fornitori = await Services.get('fornitori');
    const fornitoriFields = await Services.getTableFields('fornitori');
    //console.log('fornitori loader fornitori', fornitori)
    //console.log('fornitori loader fields', fornitoriFields.propertyNames)
    return { fornitori,fornitoriFields };
}

function FornitoriPage() {
    const {fornitori,fornitoriFields} = useLoaderData();
  return (
      <Fornitori fornitori={fornitori} tableFields={fornitoriFields}/>
  );
}

export default FornitoriPage;