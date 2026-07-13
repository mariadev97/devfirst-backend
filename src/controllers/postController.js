import Post from "../models/Post.js";

// GET /api/posts — listado público de posts publicados
export async function listarPosts(req, res) {
  try {
    const { categoria } = req.query;
    const filtro = { publicado: true };
    if (categoria) filtro.categoria = categoria;

    const posts = await Post.find(filtro)
      .select("titulo slug extracto imagenUrl categoria createdAt")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al listar posts.", error: error.message });
  }
}

// GET /api/posts/:slug — detalle de un post por slug
export async function obtenerPost(req, res) {
  try {
    const post = await Post.findOne({
      slug: req.params.slug,
      publicado: true,
    }).populate("autor", "email");

    if (!post) {
      return res.status(404).json({ message: "Artículo no encontrado." });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el post.", error: error.message });
  }
}

// POST /api/posts — crear post (solo admin)
export async function crearPost(req, res) {
  try {
    const { titulo, contenido, extracto, imagenUrl, categoria, publicado } = req.body;

    // Generamos el slug automáticamente a partir del título
    const slug = titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")  // quita acentos
      .replace(/[^a-z0-9\s-]/g, "")     // quita caracteres especiales
      .trim()
      .replace(/\s+/g, "-");             // espacios → guiones

    const post = await Post.create({
      titulo,
      slug,
      contenido,
      extracto,
      imagenUrl,
      categoria,
      publicado: !!publicado,
      autor: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Ya existe un artículo con ese título." });
    }
    res.status(500).json({ message: "Error al crear el post.", error: error.message });
  }
}

// PUT /api/posts/:id — editar post (solo admin)
export async function editarPost(req, res) {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Artículo no encontrado." });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al editar el post.", error: error.message });
  }
}

// DELETE /api/posts/:id — borrar post (solo admin)
export async function borrarPost(req, res) {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Artículo no encontrado." });
    }

    res.json({ message: "Artículo eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al borrar el post.", error: error.message });
  }
}