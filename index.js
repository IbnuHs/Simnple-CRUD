const express = require("express");
const app = express();
const port = 3700;
const data = [];

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});

// a.	 index: Menampilkan semua data.
app.get("/book", (req, res) => {
  return res.status(200).json({ code: 200, data: data });
});

// b.	 store: Menambah data baru.
app.post("/book", (req, res) => {
  const { title, category } = req.body;
  const id = Date.now();
  data.push({ id, title, category });
  return res
    .status(201)
    .json({ code: 201, message: "Berhasil Menambahkan Data" });
});
// c.	show: Menampilkan data berdasarkan id.
app.get("/book/:idBuku", (req, res) => {
  const { idBuku } = req.params;
  const book = data.findIndex(({ id }) => id === Number(idBuku));
  if (book === -1)
    return res.status(404).json({ code: 404, message: "Item Tidak ditemukan" });
  return res.status(200).json({ code: 200, data: data });
});

// d.	update: Memperbarui data berdasarkan id.
app.patch("/book", (req, res) => {
  const { idBuku, title, category } = req.body;
  console.log(idBuku);
  const book = data.findIndex(({ id }) => id === idBuku);
  if (book === -1)
    return res.status(404).json({ code: 404, message: "Item Tidak ditemukan" });
  if (title) {
    data[book].title = title;
  }
  if (category) {
    data[book].category = category;
  }
  return res
    .status(202)
    .json({ code: 202, message: "Berhasil Mengupdate Item" });
});

// e.	destroy: Menghapus data berdasarkan id.
app.delete("/book/:idBuku", (req, res) => {
  const { idBuku } = req.params;
  const book = data.findIndex(({ id }) => id === Number(idBuku));
  if (book === -1)
    return res.status(404).json({ code: 404, message: "Item Tidak ditemukan" });
  data.splice(book, 1);
  return res
    .status(200)
    .json({ code: 200, message: "Berhasil Menghapus Item" });
});

app.listen(port, () => {
  console.log(`App Running At Port ${port}`);
});
