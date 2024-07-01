import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InventoryCard from '../InventoryCard/InventoryCard';
import sortIcon from '../../assets/icons/sort-24px.svg';

const InventoryList = (props) => {
  const {
    warehouseId, inventoryArray, setInventoryArray, 
  } = props;
  const pathParamsWarehouseId = useParams().warehouseId;
  let editPath;
  if (pathParamsWarehouseId) {
    editPath = `warehouse/${warehouseId}`
  } else {
    editPath = `inventory`;
  }

  // If warehouseId exists, apply a className that allows for wider columns to account for fewer columns.
  let sectionWidth;
  warehouseId ? sectionWidth = "--wide" : sectionWidth = "";
  return (
    <section>
      <InventoryCard itemObject={warehouseId} sectionWidth={sectionWidth} />
      <ul>
      {
        inventoryArray.map(itemObject => {
          const { id } = itemObject;
          return <InventoryCard
            key={id}
            itemObject={itemObject}
            sectionWidth={sectionWidth}
            editPath={editPath}
            inventoryArray={inventoryArray}
            setInventoryArray={setInventoryArray}
            />
          }
        )
      }
      </ul>
    </section>
  )
}

export default InventoryList
