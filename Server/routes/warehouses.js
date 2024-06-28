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

router.post('/', async (req, res) => {
  try {
    let requestBody = req.body;
    
    const requiredProperties = [
      'warehouse_name', 'address', 'city', 'country',
      'contact_name', 'contact_position', 'contact_phone', 'contact_email'
    ]
    let newObject = {}
    
    for (let i = 0; i < requiredProperties.length; i++) {
      const property = requiredProperties[i];
      if (!requestBody[property]) {
        res.status(400).send(`Missing ${property} value.`);
      } else {
        newObject[property] = requestBody[property];
      }
    }
    const newId = await knex('warehouses').insert(newObject);
    newObject.id = newId[0];
    res.status(201).json(newObject);
  } catch (error) {
    res.status(400).send(`Unable to post new warehouse`);
  }
})

export default router;


  // const warehouse_name = requestBody.warehouse_name;
  // const address = requestBody.address;
  // const city = requestBody.city;
  // const country = requestBody.country;
  // const contact_name = requestBody.contact_name;
  // const contact_position = requestBody.contact_position;
  // const contact_phone = requestBody.contact_phone;
  // const contact_email = requestBody.contact_email;
  // const requestBodyKeys = new Set(Object.keys(requestBody));