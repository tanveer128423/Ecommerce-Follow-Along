const express = require('express');
const router = express.Router();
const Cart = require('../cart/cartSchema');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.user.id }).populate({
            path: 'productId',
            select: 'name price images',
        });

        const filteredCart = cart.filter((item) => item.productId !== null);

        res.json(filteredCart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load cart' });
    }
});


router.post('/', auth, async (req, res) => {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ error: 'Product ID and quantity are required' });
    }
  
    try {
      let item = await Cart.findOne({ userId: req.user.id, productId });
  
      if (item) {
        item.quantity += quantity;
      } else {
        item = new Cart({ userId: req.user.id, productId, quantity });
      }
  
      await item.save();
      await item.populate('productId');
      
      // ✅ Send back updated cart data
      const cart = await Cart.find({ userId: req.user.id }).populate('productId');
      res.json(cart);
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Failed to add to cart' });
    }
  });
  

router.put('/increase/:id', auth, async (req, res) => {
    try {
        let item = await Cart.findOne({
            userId: req.user.id,
            productId: req.params.id,
        });

        if (item) {
            item.quantity += 1;
            await item.save();
        }

        const updatedCart = await Cart.find({ userId: req.user.id }).populate({
            path: 'productId',
            select: 'name price images'
        });

        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to increase quantity' });
    }
});

router.put('/decrease/:id', auth, async (req, res) => {
    try {
        let item = await Cart.findOne({
            userId: req.user.id,
            productId: req.params.id,
        });

        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
                await item.save();
            } else {
                await Cart.deleteOne({ _id: item._id });
            }
        }

        const updatedCart = await Cart.find({ userId: req.user.id }).populate({
            path: 'productId',
            select: 'name price images'
        });

        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to decrease quantity' });
    }
});

router.delete('/clear', auth, async (req, res) => {
    try {
        await Cart.deleteMany({ userId: req.user.id });

        res.json([]); // Send back an empty cart
    } catch (error) {
        res.status(500).json({ error: 'Failed to clear cart' });
    }
});



module.exports = router;
