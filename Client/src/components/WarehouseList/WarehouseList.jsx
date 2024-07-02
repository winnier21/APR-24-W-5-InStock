import React from "react";
import Placeholder from "../Placeholder/Placeholder";
import WarehouseCard from "../WarehouseCard/WarehouseCard";

const WarehouseList = (props) => {
  const { warehousesArray, totalEdits, setTotalEdits } = props;

  if (!warehousesArray) {
    return <Placeholder />;
  }

  return (
    <section>
      <WarehouseCard itemObject={null} />
      <ul>
        {warehousesArray.map((warehouseObject) => {
          const { id } = warehouseObject;
          return (
            <WarehouseCard
              key={id}
              warehouseObject={warehouseObject}
              totalEdits={totalEdits}
              setTotalEdits={setTotalEdits}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default WarehouseList;
