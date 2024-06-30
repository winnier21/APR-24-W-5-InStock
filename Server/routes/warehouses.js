import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
import { isValidEmailAddress } from "../../Client/src/utils/utils.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await knex
      .from("warehouses")
      .select(
        "warehouses.id",
        "warehouse_name",
        "address",
        "city",
        "country",
        "contact_name",
        "contact_position",
        "contact_phone",
        "contact_email"
      );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error with getting data: ${error}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const warehouseId = req.params.id;
    const data = await knex
      .from("warehouses")
      .select(
        "warehouses.id",
        "warehouse_name",
        "address",
        "city",
        "country",
        "contact_name",
        "contact_position",
        "contact_phone",
        "contact_email"
      )
      .where({ id: warehouseId })
      .first();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error with getting data: ${error}`);
  }
});

router.get("/:id/inventories", async (req, res) => {
  try {
    const warehouseId = req.params.id;
    const data = await knex
      .from("inventories")
      .select("id", "item_name", "category", "status", "quantity")
      .where({ warehouse_id: warehouseId });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error with getting data: ${error}`);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const warehouseId = req.params.id;
    const data = await knex("warehouses")
      .select(
        "id",
        "warehouse_name",
        "address",
        "city",
        "country",
        "contact_name",
        "contact_position",
        "contact_phone",
        "contact_email"
      )
      .where({ id: warehouseId })
      .first();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "Warehouse not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const {
    warehouseName,
    address,
    city,
    country,
    contactName,
    contactPosition,
    contactPhone,
    contactEmail,
  } = req.body;

  try {
    const result = await knex("warehouses").where({ id }).update({
      warehouse_name: warehouseName,
      address,
      city,
      country,
      contact_name: contactName,
      contact_position: contactPosition,
      contact_phone: contactPhone,
      contact_email: contactEmail,
    });

    if (result) {
      res.status(200).json({ message: "Warehouse updated successfully" });
    } else {
      res.status(404).json({ error: "Warehouse not found" });
    }
  } catch (error) {
    console.error("Error updating warehouse:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const {
    warehouseName,
    address,
    city,
    country,
    contactName,
    contactPosition,
    contactPhone,
    contactEmail,
  } = req.body;

  if (!isValidEmailAddress(contactEmail)) {
    console.log("Invalid email detected"); 
    res.status(400).send('Invalid email value.');
    return;
  }
  try {
    console.log("Received data:", req.body);
    const [id] = await knex("warehouses").insert({
      warehouse_name: warehouseName,
      address,
      city,
      country,
      contact_name: contactName,
      contact_position: contactPosition,
      contact_phone: contactPhone,
      contact_email: contactEmail,
    });

    console.log("Inserted warehouse ID:", id);
    res.status(201).json({ message: "Warehouse added successfully", id });
  } catch (error) {
    console.error("Error adding warehouse:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// router.post('/', async (req, res) => {
//   try {
//     let requestBody = req.body;

//     const propertiesToValidateWithRegex = ['contact_phone', 'contact_email'];
//     const remainingProperties = [
//       'warehouse_name', 'address', 'city', 'country',
//       'contact_name', 'contact_position',
//     ]
//     const requiredProperties = propertiesToValidateWithRegex.concat(remainingProperties);
//     const newObject = {};

//     // Validate email address
//     if (!isValidEmailAddress(requestBody.contact_email)) {
//       res.status(400).send(`Invalid email value.`);
//       return;
//     }

//     // Validate form values and add to new object for insertion
//     for (let i = 0; i < requiredProperties.length; i++) {
//       const property = requiredProperties[i];
//       const value = requestBody[property]
//       if (value && value.length > 2) {
//         newObject[property] = requestBody[property];
//       } else {
//         res.status(400).send(`Invalid ${property} value.`);
//         return;
//       }
//     }
//     const newId = await knex('warehouses').insert(newObject);
//     newObject.id = newId[0];
//     res.status(201).json(newObject);
//   } catch (error) {
//     res.status(400).send(`Unable to post new warehouse`);
//   }
// })

router.delete("/:id", async (req, res) => {
  try {
    const idToDelete = req.params.id;
    const nDeletedRows = await knex("warehouses")
      .where({ id: idToDelete })
      .del();
    if (nDeletedRows > 0) {
      const message = `${nDeletedRows} records deleted: id ${idToDelete}.`;
      res.status(204).send(message);
    } else {
      res
        .status(404)
        .send(`Failed to delete warehouse with id ${req.params.id}.`);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Failed to delete warehouse with id ${req.params.id}.`);
  }
});

export default router;

// router.post("/", async (req, res) => {
//   const {
//     warehouse_name,
//     address,
//     city,
//     country,
//     contact_name,
//     contact_position,
//     contact_phone,
//     contact_email,
//   } = req.body;

//   if (!isValidEmailAddress(contact_email)) {
//     console.log("Invalid email detected");
//     res.status(400).send(`Invalid email value.`);
//     return;
//   }
//   try {
//     console.log("Received data:", req.body);
//     const [id] = await knex("warehouses").insert({
//       warehouse_name,
//       address,
//       city,
//       country,
//       contact_name,
//       contact_position,
//       contact_phone,
//       contact_email,
//     });

//     console.log("Inserted warehouse ID:", id);
//     res.status(201).json({ message: "Warehouse added successfully", id });
//   } catch (error) {
//     console.error("Error adding warehouse:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


// const warehouse_name = requestBody.warehouse_name;
// const address = requestBody.address;
// const city = requestBody.city;
// const country = requestBody.country;
// const contact_name = requestBody.contact_name;
// const contact_position = requestBody.contact_position;
// const contact_phone = requestBody.contact_phone;
// const contact_email = requestBody.contact_email;
// const requestBodyKeys = new Set(Object.keys(requestBody));
