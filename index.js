const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const read_file = (file) => {
  const data = fs.readFileSync(path.join(__dirname, "data", file), "utf-8");
  return JSON.parse(data);
};

const write_file = (file, data) => {
  fs.writeFileSync(
    path.join(__dirname, "data", file),
    JSON.stringify(data, null, 2),
  );
};

// LAPTOPS /////////////////////////////
const laptops = "laptops.json";
app.get("/laptops", (req, res) => {
  res.json(read_file(laptops));
});

app.get("/laptops/:id", (req, res) => {
  const data = read_file(laptops);
  const item = data.find((u) => u.id == req.params.id);

  item ? res.json(item) : res.status(404).json({ message: "Not found" });
});

app.post("/laptops", (req, res) => {
  const data = read_file(laptops);
  data.push(req.body);
  write_file(laptops, data);

  res.json({ message: "Added", data: req.body });
});

app.put("/laptops/:id", (req, res) => {
  const data = read_file(laptops);
  const index = data.findIndex((u) => u.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Not found" });
  }

  data[index] = req.body;
  write_file(laptops, data);

  res.json({ message: "Updated", data: data[index] });
});

app.delete("/laptops/:id", (req, res) => {
  let data = read_file(laptops);
  data = data.filter((u) => u.id != req.params.id);

  write_file(laptops, data);
  res.json({ message: "Deleted" });
});

// PRODUCTS
const products = "products.json";
app.get("/products", (req, res) => {
  res.json(read_file(products));
});

app.post("/products", (req, res) => {
  const data = read_file(products);
  data.push(req.body);
  write_file(products, data);

  res.json({ message: "Added" });
});

// Subjects
const Subjects = "Subjects.json";
app.get("/Subjects", (req, res) => {
  res.json(read_file(Subjects));
});

app.post("/Subjects", (req, res) => {
  const data = read_file(Subjects);
  data.push(req.body);
  write_file(Subjects, data);

  res.json({ message: "Added" });
});

// CATEGORIES
const categories = "categories.json";
app.get("/categories", (req, res) => {
  res.json(read_file(categories));
});

app.post("/categories", (req, res) => {
  const data = read_file(categories);
  data.push(req.body);
  write_file(categories, data);

  res.json({ message: "Added" });
});

// BRANDS
const brands = "brands.json";
app.get("/brands", (req, res) => {
  res.json(read_file(brands));
});

app.post("/brands", (req, res) => {
  const data = read_file(brands);
  data.push(req.body);
  write_file(brands, data);

  res.json({ message: "Added" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
