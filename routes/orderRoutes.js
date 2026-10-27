
import express from "express";
import mongoose from "mongoose";
import Order from "../models/order.js";
import Product from "../models/product.js";

const router = express.Router();

// POST: Create a new order
router.post("/", async (req, res) => {
    try {
        const {
            productId,
            quantity,
            size,
            color,
            customer
        } = req.body;

        // Check required fields
        if (!productId || !quantity || !customer) {
            return res.status(400).json({
                success: false,
                message: "Product ID, quantity and customer details are required."
            });
        }

        // Validate product ID
        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID."
            });
        }

        // Validate quantity
        const parsedQuantity = Number(quantity);

        if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a positive whole number."
            });
        }

        // Check customer details
        if (
            !customer.name?.trim() ||
            !customer.phone?.trim() ||
            !customer.address?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Name, phone and address are required."
            });
        }

        // Find product in MongoDB
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        // Validate selected size and colour
        if (product.sizes.length && (!size || !product.sizes.includes(size))) {
            return res.status(400).json({
                success: false,
                message: "Please select a valid size."
            });
        }

        if (product.colors.length && (!color || !product.colors.includes(color))) {
            return res.status(400).json({
                success: false,
                message: "Please select a valid colour."
            });
        }

        // Calculate amount using database price
        const totalAmount = product.price * parsedQuantity;

        // Save order in MongoDB
        const order = await Order.create({
            product: product._id,
            productName: product.name,
            price: product.price,
            quantity: parsedQuantity,
            size: size || null,
            color: color || null,
            totalAmount,
            customer: {
                name: customer.name.trim(),
                phone: customer.phone.trim(),
                address: customer.address.trim()
            }
        });

        return res.status(201).json({
            success: true,
            message: "Order created successfully!",
            order
        });

    } catch (error) {
        console.error("Order creation error:", error);

        return res.status(500).json({
            success: false,
            message: "Could not create order."
        });
    }
});

// GET: Fetch all orders (for development/testing)
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("product", "name brand image")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        console.error("Fetch orders error:", error);

        res.status(500).json({
            success: false,
            message: "Could not fetch orders."
        });
    }
});

export default router;
