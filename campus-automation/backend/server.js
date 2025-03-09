const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = "mongodb+srv://saketh1607:1234@cluster0.fkjgj.mongodb.net/quickbite?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
});


const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  items: [{
    id: Number,
    name: String,
    price: Number,
    quantity: Number
  }],
  timeSlot: {
    from: String,
    to: String
  },
  totalAmount: Number,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

app.get('/health', (req, res) => res.status(200).send('OK'));


const router = express.Router();


router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().lean().maxTimeMS(10000);
    res.status(200).json(orders || []);
  } catch (error) {
    console.error('[SERVER ERROR]', error);
    res.status(500).json([]);
  }
});


router.post('/orders', async (req, res) => {
  try {
    const orderId = Math.random().toString(36).substring(2, 15);
    const order = new Order({ orderId, ...req.body });
    await order.save();
    res.status(201).json({ orderId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/verify-code', async (req, res) => {
  try {
    const order = await Order.findById(req.body.orderId);
    res.json({ valid: order?.orderId === req.body.code });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/orders/:orderId', async (req, res) => {
  try {
    console.log(`Updating order ${req.params.orderId} to status: ${req.body.status}`);
    
    const order = await Order.findOne({ orderId: req.params.orderId });
    
    if (!order) {
      console.log(`Order not found: ${req.params.orderId}`);
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = req.body.status;
    await order.save();

    console.log(`Order ${req.params.orderId} updated successfully`);
    res.status(200).json(order);
  } catch (error) {
    console.error(`Error updating order: ${error.message}`);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});


router.get('/orders/metrics', async (req, res) => {
  try {
 
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

  
    const todayOrders = await Order.find({
      createdAt: {
        $gte: today,
        $lt: tomorrow
      }
    });


    const metrics = {
      totalOrders: todayOrders.length,
      completedOrders: todayOrders.filter(order => order.status === 'completed').length,
      pendingOrders: todayOrders.filter(order => order.status === 'pending').length,
      totalAmount: todayOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
      mostSoldItems: []
    };

  
    const itemCounts = {};
    todayOrders.forEach(order => {
      order.items.forEach(item => {
        if (!itemCounts[item.name]) {
          itemCounts[item.name] = {
            name: item.name,
            quantity: 0,
            totalAmount: 0
          };
        }
        itemCounts[item.name].quantity += item.quantity;
        itemCounts[item.name].totalAmount += item.price * item.quantity;
      });
    });

    metrics.mostSoldItems = Object.values(itemCounts)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    res.status(200).json(metrics);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});


router.get('/timeslots/count', async (req, res) => {
  try {
    const orders = await Order.find();
    const slotCounts = {};
    orders.forEach(order => {
      const slot = `${order.timeSlot.from}-${order.timeSlot.to}`;
      slotCounts[slot] = (slotCounts[slot] || 0) + 1;
    });
    res.status(200).json(slotCounts);
  } catch (error) {
    console.error('Error fetching time slot counts:', error);
    res.status(500).json({ error: 'Failed to fetch time slot counts' });
  }
});

app.use('/api', router);


mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected');

  Order.findOne().then(order => {
    if (!order) {
      Order.create({
        orderId: "test123",
        items: [{ id: 1, name: "Test Item", price: 100, quantity: 2 }],
        timeSlot: { from: "10:00", to: "11:00" },
        totalAmount: 200,
        status: "pending"
      }).then(() => console.log('✅ Test order created'));
    }
  });
});


const PORT = process.env.PORT || 5000;
mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API Base URL: http://localhost:${PORT}/api`);
  });
});