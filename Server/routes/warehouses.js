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
    console.log('Warehouses table requested');
  } catch (error) {
    console.error(`Error with getting data: ${error}`)
  }
})

export default router;