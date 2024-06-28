import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import inventoryRoutes from './routes/inventories.js';
import warehouseRoutes from './routes/warehouses.js';



const app = express();
app.use(cors());


const PORT = process.env.PORT || 8080;
const BACKEND_URL = process.env.BACKEND_URL;

app.use(express.json());
app.use('/api/inventories', inventoryRoutes);
app.use('/api/warehouse', warehouseRoutes);



// start Express on port 8080
app.listen(PORT, () => {
  console.log(`Server Started on ${BACKEND_URL}:${PORT}`);
  console.log('Press CTRL + C to stop server');
});