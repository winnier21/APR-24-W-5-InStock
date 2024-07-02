import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
import {
  isValidEmailAddress,
  isValidPhoneNumber,
} from "../../Client/src/utils/utils.js";

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
    const errorMessage = `Error with getting warehouses data.`;
    res.status(400).send(errorMessage);
  }
});

router.get("/:id", async (req, res) => {
  const warehouseId = req.params.id;
  const errorMessage = `Warehouse with id ${warehouseId} does not exist.`;
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
      )
      .where({ id: warehouseId })
      .first();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).send(errorMessage);
    }
  } catch (error) {
    res.status(400).send(`Error with getting data: ${errorMessage}`);
  }
});

router.get("/:id/inventories", async (req, res) => {
  const warehouseId = req.params.id;
  const errorMessage = `Error with getting inventory for warehouse ${warehouseId}`;
  try {
    const data = await knex
      .from("inventories")
      .select("id", "item_name", "category", "status", "quantity")
      .where({ warehouse_id: warehouseId });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(errorMessage);
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const requestBody = req.body;
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = requestBody;

  // Validate email address
  if (!isValidEmailAddress(requestBody.contact_email)) {
    res.status(404).send(`Invalid email value.`);
    return;
  }

  // Validate phone number
  if (!isValidPhoneNumber(requestBody.contact_phone)) {
    res.status(404).send(`Invalid phone number format.`);
    return;
  }
  const remainingProperties = [
    "warehouse_name",
    "address",
    "city",
    "country",
    "contact_name",
    "contact_position",
  ];
  // Validate form values to have at least 2 characters
  for (let i = 0; i < remainingProperties.length; i++) {
    const property = remainingProperties[i];
    const value = requestBody[property];
    if (!value || value?.length < 3) {
      res.status(400).send(`Invalid ${property} value.`);
      return;
    }
  }
  try {
    const result = await knex("warehouses").where({ id }).update(req.body);
    if (!result) {
      const message = `Warehouse ${id} not found.`;
      res.status(404).send(message);
      return;
    }
    requestBody.id = id;
    res.status(201).json(requestBody);
  } catch (error) {
    const message = `Unable to update warehouse ${id}`;
    res.status(500).send(message);
  }
});

router.post("/", async (req, res) => {
  try {
    let requestBody = req.body;

    const propertiesToValidateWithRegex = ["contact_phone", "contact_email"];
    const remainingProperties = [
      "warehouse_name",
      "address",
      "city",
      "country",
      "contact_name",
      "contact_position",
    ];
    const requiredProperties =
      propertiesToValidateWithRegex.concat(remainingProperties);
    const newObject = {};

    // Validate email address
    if (!isValidEmailAddress(requestBody.contact_email)) {
      res.status(400).send(`Invalid email value.`);
      return;
    }

    // Validate phone number
    if (!isValidPhoneNumber(requestBody.contact_phone)) {
      res.status(404).send(`Invalid phone number format.`);
      return;
    }

    // Validate form values and add to new object for insertion
    for (let i = 0; i < requiredProperties.length; i++) {
      const property = requiredProperties[i];
      const value = requestBody[property];
      if (value && value.length > 2) {
        newObject[property] = requestBody[property];
      } else {
        res.status(400).send(`Invalid ${property} value.`);
        return;
      }
    }
    const newId = await knex("warehouses").insert(newObject);
    newObject.id = newId[0];
    res.status(201).json(newObject);
  } catch (error) {
    res.status(400).send(`Unable to post new warehouse`);
  }
});

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
