import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from 'express';



const router = express.Router()


router.get('/', async (req, res) => {
  try {
    const data = await knex.from("warehouses")
      .select(
        'warehouses.id', 'warehouse_name', 'address', 'city', 'country', 'contact_name', 'contact_position', 'contact_phone', 'contact_email'
      );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error with getting data: ${error}`)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const warehouseId = req.params.id
    const data = await knex.from("warehouses")
      .select(
        'warehouses.id', 'warehouse_name', 'address', 'city', 'country', 'contact_name', 'contact_position', 'contact_phone', 'contact_email'
      ).where({id: warehouseId}).first();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error with getting data: ${error}`)
  }
})

router.get('/:id/inventories', async (req, res) => {
  try {
    const warehouseId = req.params.id
    const data = await knex.from("inventories")
      .select(
        'id', 'item_name', 'category', 'status', 'quantity', 
      ).where({warehouse_id: warehouseId});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error with getting data: ${error}`)
  }
})

export default router;