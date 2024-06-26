import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from 'express';


const router = express.Router()


router.get('/', async (req, res) => {
  try {
    const data = await knex.from("inventories")
      .select(
        'inventories.id', 'warehouse_name', 'item_name', 'description', 'category', 'status', 'quantity', 
      ).join('warehouses', {'inventories.warehouse_id': 'warehouses.id'});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error with getting data: ${error}`)
  }
})

app.put('/api/inventories/:id', (req, res) => {
  const id = req.params.id;
  const { warehouse_id, item_name, description, category, status, quantity } = req.body;

  // Validate request body data
  if (!warehouse_id ||!item_name ||!description ||!category ||!status ||!quantity) {
    return res.status(400).send({ message: 'Missing properties in request body' });
  }

  // Check if warehouse_id exists in warehouses table
  knex('warehouses').where({ id: warehouse_id }).then((warehouse) => {
    if (!warehouse) {
      return res.status(400).send({ message: 'Warehouse ID does not exist' });
    }

    // Check if quantity is a number
    if (typeof quantity!== 'number') {
      return res.status(400).send({ message: 'Quantity must be a number' });
    }

    // Update inventory item
    knex('inventories').where({ id }).update({
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity,
    }).then(() => {
      // Return updated inventory item
      knex('inventories').where({ id }).then((inventory) => {
        res.send(inventory[0]);
      }).catch((err) => {
        console.error(err);
        res.status(500).send({ message: 'Error updating inventory item' });
      });
    }).catch((err) => {
      console.error(err);
      res.status(500).send({ message: 'Error updating inventory item' });
    });
  }).catch((err) => {
    console.error(err);
    res.status(500).send({ message: 'Error checking warehouse ID' });
  });
});


export default router;
