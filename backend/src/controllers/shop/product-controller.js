import { Product } from "../../models/product.js";

export const getFilteredProducts = async (req, res) => {
  try {
    // filtering

    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }
    

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
      case "price-lowtohigh":
        sort.price = 1;
        break;
    }

    //console.log(filters, "filters")


    const products = await Product.find(filters).sort(sort);

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
