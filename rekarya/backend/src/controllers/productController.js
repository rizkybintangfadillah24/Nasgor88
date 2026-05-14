const prisma = require("../config/prisma");
const { successResponse, errorResponse } = require("../utils/response");

const buildProductFilePath = (file) => {
  if (!file) return null;
  return `/uploads/products/${file.filename}`;
};

const getApprovedProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        status: "APPROVED",
      },
      include: {
        mahasiswa: {
          select: {
            id: true,
            username: true,
            email: true,
            mahasiswaProfile: {
              select: {
                fullName: true,
                campus: true,
                major: true,
                studyProgram: true,
                photo: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(res, "Produk approved berhasil diambil", products);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil produk", [error.message], 500);
  }
};

const getProductDetail = async (req, res) => {
  try {
    const productId = Number(req.params.id);

    if (Number.isNaN(productId)) {
      return errorResponse(res, "ID produk tidak valid", [], 400);
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        mahasiswa: {
          select: {
            id: true,
            username: true,
            email: true,
            mahasiswaProfile: {
              select: {
                fullName: true,
                campus: true,
                major: true,
                studyProgram: true,
                bio: true,
                photo: true,
              },
            },
          },
        },
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!product) {
      return errorResponse(res, "Produk tidak ditemukan", [], 404);
    }

    if (
      product.status !== "APPROVED" &&
      req.user.role !== "ADMIN" &&
      product.mahasiswaId !== req.user.id
    ) {
      return errorResponse(res, "Produk belum tersedia di katalog", [], 403);
    }

    return successResponse(res, "Detail produk berhasil diambil", product);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil detail produk", [error.message], 500);
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      mainProblem,
      targetBusiness,
      mainFeatures,
      featureDetail,
      technology,
      trainingDuration,
      mentoringMethod,
      price,
    } = req.body;

    if (
      !title ||
      !category ||
      !description ||
      !mainProblem ||
      !targetBusiness ||
      !mainFeatures ||
      !featureDetail ||
      !technology ||
      !trainingDuration ||
      !mentoringMethod ||
      !price
    ) {
      return errorResponse(res, "Semua field produk wajib diisi", [], 400);
    }

    const screenshotPath = req.file ? buildProductFilePath(req.file) : null;

    const product = await prisma.product.create({
      data: {
        mahasiswaId: req.user.id,
        title,
        category,
        description,
        mainProblem,
        targetBusiness,
        mainFeatures,
        featureDetail,
        technology,
        trainingDuration: Number(trainingDuration),
        mentoringMethod,
        price: Number(price),
        screenshot: screenshotPath,
        status: "PENDING",
      },
    });

    return successResponse(res, "Produk berhasil dibuat dan menunggu verifikasi admin", product, 201);
  } catch (error) {
    return errorResponse(res, "Gagal membuat produk", [error.message], 500);
  }
};

const getMyProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        mahasiswaId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(res, "Produk saya berhasil diambil", products);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil produk saya", [error.message], 500);
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = Number(req.params.id);

    if (Number.isNaN(productId)) {
      return errorResponse(res, "ID produk tidak valid", [], 400);
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      return errorResponse(res, "Produk tidak ditemukan", [], 404);
    }

    if (existingProduct.mahasiswaId !== req.user.id) {
      return errorResponse(res, "Anda tidak berhak mengubah produk ini", [], 403);
    }

    const {
      title,
      category,
      description,
      mainProblem,
      targetBusiness,
      mainFeatures,
      featureDetail,
      technology,
      trainingDuration,
      mentoringMethod,
      price,
    } = req.body;

    const screenshotPath = req.file
      ? buildProductFilePath(req.file)
      : existingProduct.screenshot;

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        title: title ?? existingProduct.title,
        category: category ?? existingProduct.category,
        description: description ?? existingProduct.description,
        mainProblem: mainProblem ?? existingProduct.mainProblem,
        targetBusiness: targetBusiness ?? existingProduct.targetBusiness,
        mainFeatures: mainFeatures ?? existingProduct.mainFeatures,
        featureDetail: featureDetail ?? existingProduct.featureDetail,
        technology: technology ?? existingProduct.technology,
        trainingDuration:
          trainingDuration !== undefined && trainingDuration !== ""
            ? Number(trainingDuration)
            : existingProduct.trainingDuration,
        mentoringMethod: mentoringMethod ?? existingProduct.mentoringMethod,
        price: price !== undefined && price !== "" ? Number(price) : existingProduct.price,
        screenshot: screenshotPath,
        status: "PENDING",
        verificationNote: null,
        verifiedById: null,
        verifiedAt: null,
      },
    });

    return successResponse(
      res,
      "Produk berhasil diperbarui dan kembali menunggu verifikasi admin",
      updatedProduct
    );
  } catch (error) {
    return errorResponse(res, "Gagal memperbarui produk", [error.message], 500);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = Number(req.params.id);

    if (Number.isNaN(productId)) {
      return errorResponse(res, "ID produk tidak valid", [], 400);
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      return errorResponse(res, "Produk tidak ditemukan", [], 404);
    }

    if (existingProduct.mahasiswaId !== req.user.id) {
      return errorResponse(res, "Anda tidak berhak menghapus produk ini", [], 403);
    }

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return successResponse(res, "Produk berhasil dihapus", {
      id: productId,
    });
  } catch (error) {
    return errorResponse(res, "Gagal menghapus produk", [error.message], 500);
  }
};

module.exports = {
  getApprovedProducts,
  getProductDetail,
  createProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
};