import express from 'express';
import inventoryItems from '../testData/inventories.js';


const router = express.Router()


router.get('/', (req, res) => {
  console.log('Inventories requested')
  res.status(200).json(inventoryItems);
})

export default router;

// console.log(inventoryArray);
