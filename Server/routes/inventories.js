import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from 'express';
// import inventoryItems from '../testData/inventories.js';


const router = express.Router()


router.get('/', async (req, res) => {
  try {
    const data = await knex("inventories");
    res.status(200).json(data);
    console.log('Inventories table requested');
  } catch (error) {
    console.error(`Error with getting data: ${error}`)
  }
})

export default router;

// console.log(inventoryArray);
