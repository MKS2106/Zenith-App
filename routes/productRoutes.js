import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

//route to POST/Create a new porduct
router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body); // Create product from request body
    res.status(200).json(newProduct); // Respond with the created product
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Could not creata a new porduct" }); // Respond with error message
  }
});

//route to Update a porduct based on ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    }); // Update and return new doc
    res.status(200).json(updatedProduct); // Respond with updated product
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Could not update the product" }); // Respond with error message
  }
});

// Get all products with optional filters, sorting, and pagination
router.get("/", async (req, res) => {
  let { page, limit } = req.query;
  const { category, sortBy, minPrice, maxPrice } = req.query;

  const query = {}; // Filter conditions
  const sort = {}; // Sorting options

  // Filter by category if provided
  if (category) {
    query.category = { $eq: category };
  }

  /**
     * This will work only when we want to bring any one condition in our query(URL) either minPrice or maxPrice
     *   if(minPrice) {
        query.price = {$gte: minPrice}
    }

    if(maxPrice) {
        query.price = {$lte: maxPrice}
    }
     */

    // Filter by price range if provided
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = minPrice;
    if (maxPrice) query.price.$lte = maxPrice;
  }
// Sort by price in ascending or descending order
  if (sortBy) {
    const [price, value] = sortBy.split("_");
    sort.price = value === "asc" ? 1 : -1;
  }

  console.log("QUERY OBJ: ", query);
  console.log("SORT OBJ: ", sort);

  // Default pagination values
  if (!page) {page = 1;}
  if (!limit) {limit = 10;}

  try {
    const products = await Product.find(query)
      .select({ __v: 0, _id: 1 }) //excluse __v and include _id
      .sort(sort)
      .skip((page - 1) * limit) //Pagination skip
      .limit(limit); //Pagination Limit

    res.status(200).json(products); // Respond with filtered and paginated products
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

//Route to get a single product based on the ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

//Delete a product based on the ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message });
  }
});

export default router;
