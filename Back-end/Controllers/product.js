import productSchema from "../Models/productModel.js";
// import userSchema from "../Models/userModel.js";

//add product
export const CreateProduct = async (req, res) => {
  const { imageURL, title, price, description } = req.body;
  try {
    if (!imageURL || !title || !price || !description) {
      return res.status(400).json({ message: "Something is missing" });
    }

    const newProduct = new productSchema({
      imageURL,
      title,
      price,
      description,
    });

    await newProduct.save();

    res.status(200).json({
      message: "Product created successfully",
      result: newProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating product");
  }
};

//get all product
export const getAllProdocts = async (req, res) => {
  try {
    const getProducts = await productSchema.find();
    res.status(200).json({
      message: "done",
      data: getProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "probelem" });
  }
};

// by id
export const getById = async (req, res) => {
  const id = req.params.id;
  try {
    const getProductById = await productSchema.findOne({ _id: id });
    if (getProductById) {
      res.status(200).json({
        message: "done",
        data: getProductById,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "error",
    });
  }
};

// update
export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { imageURL, title, price, description } = req.body;
  try {
    const findProduct = await productSchema.findOne({ _id: id });
    if (findProduct) {
      const updateProduct = await productSchema.findByIdAndUpdate(
        id,
        { imageURL, title, price, description },
        { new: true }
      );
      res.status(200).json({
        message: "done",
        data: updateProduct,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "error",
    });
  }
};

//delete
export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const findProduct = await productSchema.deleteOne({ _id: id });

    res.status(404).json({
      message: "delete successfuly",
      data: findProduct,
    });
  } catch (error) {
    console.error(error);
  }
};
