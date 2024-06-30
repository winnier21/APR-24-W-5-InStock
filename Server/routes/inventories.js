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
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "Intentory item not found" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server error" });
  }
});

// router.post('/', async (req, res) => {
//   const {
//     warehouse_id,
//     item_name,
//     description,
//     category,
//     status,
//     quantity
//   } = req.body;

//   try {
//     console.log("Received data:", req.body); 
//     const [id] = await knex("warehouses").insert({
//       warehouse_name: warehouseName,
//       address,
//       city,
//       country,
//       contact_name: contactName,
//       contact_position: contactPosition,
//       contact_phone: contactPhone,
//       contact_email: contactEmail,
//     });

//     console.log("Inserted warehouse ID:", id); 
//     res.status(201).json({ message: "Warehouse added successfully", id });
//   } catch (error) {
//     console.error("Error adding warehouse:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
  
// })

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

    const inventory = await knex('inventories')
      .select(
        "id", "warehouse_id", "item_name", "description",
        "category", "status", "quantity"
      )
      .where({ id }).first();
    res.send(inventory);
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: 'Error updating inventory item' });
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
