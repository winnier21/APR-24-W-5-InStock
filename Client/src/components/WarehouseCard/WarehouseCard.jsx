import './WarehouseCard.scss';

const WarehouseCard = ({ warehouseObject }) => {
  const {
    id, warehouse_name, address, city,
    country, contact_name, contact_position,
    contact_phone, contact_email
  } = warehouseObject;

  return (
    <div className="warehouse__card">
      {warehouse_name}
    </div>
  )
}

export default WarehouseCard
