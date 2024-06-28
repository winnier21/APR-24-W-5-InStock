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
});

router.post('/', async (req, res) => {
  
})


router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { warehouse_id, item_name, description, category, status, quantity } = req.body;

  if (!warehouse_id ||!item_name ||!description ||!category ||!status ||!quantity) {
    return res.status(400).send({ message: 'Missing properties in request body' });
  }

  try {
    const warehouse = await knex('warehouses').where({ id: warehouse_id }).first();
    if (!warehouse) {
      return res.status(400).send({ message: 'Warehouse ID does not exist' });
    }

    if (typeof quantity!== 'number') {
      return res.status(400).send({ message: 'Quantity must be a number' });
    }

    const updatedInventory = await knex('inventories').where({ id }).update({
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity,
    });

    if (!updatedInventory) {
      return res.status(500).send({ message: 'Error updating inventory item' });
    }

    const inventory = await knex('inventories').where({ id }).first();
    res.send(inventory);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error updating inventory item' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const idToDelete = req.params.id;
    const nDeletedRows = await knex('inventories')
      .where({ id: idToDelete }).del();
    if (nDeletedRows > 0) {
      const message = `${nDeletedRows} records deleted: id ${idToDelete}.`;
      res.status(204).send(message);
    } else {
      res.status(404).send(`Failed to delete item with id ${req.params.id}.`);
    }
  } catch (error) {
    res.status(404).send(`Failed to delete item with id ${req.params.id}.`);
  }
})

export default router;
