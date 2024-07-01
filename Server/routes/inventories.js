import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express, { request } from 'express';


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


router.get("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const data = await knex("inventories")
      .select(
        "inventories.id",
        "warehouse_name",
        "item_name",
        "description",
        "category",
        "status",
        "quantity"
      ).join('warehouses', {'inventories.warehouse_id': 'warehouses.id'})
      .where({ 'inventories.id': itemId })
      .first();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "Inventory item not found" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/', async (req, res) => {
  const requestBody = req.body;
  const {warehouse_id} = requestBody;
  const quantity = parseInt(requestBody.quantity);
  let itemToInsert = {};

  if (typeof quantity !== 'number' || quantity < 0) {
    res.status(400).send('"Quantity" must be a non-negative numeric value.')
    return;
  } else if (quantity === 0) {
    itemToInsert.quantity = 0;
  }

  const requiredProperties = [
    'warehouse_id',
    'item_name',
    'description',
    'category',
    'status',
    'quantity'
  ];
  
  for (let i = 0; i < requiredProperties.length; i++) {
    const property = requiredProperties[i];
    const value = requestBody?.[property];
    if (!value && property !== 'quantity') {
      console.log('missing value', property)
      const message = `Missing "${property}" property in request body.`
      res.status(400).send(message);
      return;
    } else {
      itemToInsert[property] = value;
    }  
  }

  let warehouseIds = await knex('warehouses')
    .select('id')
  warehouseIds = warehouseIds.map(object => object.id);
  if (!(warehouseIds).includes(warehouse_id)) {
    const message = `Warehouse ID ${warehouse_id} does not exist.`
    res.status(400).send(message)
  }
  try {
    console.log("Received data:", req.body); 
    const [id] = await knex("inventories").insert(itemToInsert);

    const responseObject = { id: id, ...itemToInsert };
    res.status(201).json(responseObject);
  } catch (error) {
    res.status(500).send('Unable to add new item to inventory.');
  }
})

router.put('/:id', async (req, res) => {
  console.log(req.body);
  const id = parseInt(req.params.id, 10);
  const { warehouse_id, item_name, description, category, status, quantity } = req.body;
  if (quantity < 0) {
    res.status(400).send('Quantity must be a non-negative number.')
    return;
  }

  if (!warehouse_id ||!item_name ||!description ||!category ||!status) {
    res.status(400).send('Missing properties in request body');
    return;
  }

  try {
    const warehouse = await knex('warehouses').where({ id: warehouse_id }).first();
    if (!warehouse) {
      res.status(400).send('Warehouse ID does not exist');
      return;
    }

    if (typeof quantity!== 'number') {
      res.status(400).send('Quantity must be a number');
      return;
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
      res.status(404).send(`Unable to update inventory item with ID of ${id}.`);
      return;
    }

    const inventory = await knex('inventories')
      .select(
        "id", "warehouse_id", "item_name", "description",
        "category", "status", "quantity"
      )
      .where({ id }).first();
    res.json(inventory);
  } catch (err) {
    res.status(400).send(`Unable to update inventory item with ID of ${id}.`);
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
