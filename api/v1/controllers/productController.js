import Product from "../models/Product.js"

export const create = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(200).json(newProduct)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const findAll = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).send(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const findOne = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)

    if (product === null)
      return res.status(404).json({ message: "Product not found." })

    res.status(200).send(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body)

    if (product === null)
      return res.status(404).json({ message: "Product not found." })

    const updatedProduct = await Product.findById(id)
    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const destroy = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)

    if (product === null)
      return res.status(404).json({ message: "Product not found." })

    res.status(200).json({ message: `Successfully deleted product ${id}.` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default { create, findAll, findOne, update, destroy }