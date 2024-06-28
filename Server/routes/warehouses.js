import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";

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

router.post("/add", async (req, res) => {
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

export default router;
