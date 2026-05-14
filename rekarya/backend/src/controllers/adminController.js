const prisma = require("../config/prisma");
const { successResponse, errorResponse } = require("../utils/response");

const createActivityLog = async ({ userId, type, description, metadata = {} }) => {
  try {
    await prisma.activityLog.create({
      data: {
        userId,
        type,
        description,
        metadata,
      },
    });
  } catch (error) {
    console.error("Gagal membuat activity log:", error.message);
  }
};

const getPendingProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        status: "PENDING",
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
        categoryRef: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(res, "Produk pending berhasil diambil", products);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil produk pending", [error.message], 500);
  }
};

const getAdminProductDetail = async (req, res) => {
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
            mahasiswaProfile: true,
          },
        },
        categoryRef: true,
        verifiedBy: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!product) {
      return errorResponse(res, "Produk tidak ditemukan", [], 404);
    }

    return successResponse(res, "Detail produk admin berhasil diambil", product);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil detail produk admin", [error.message], 500);
  }
};

const verifyProduct = async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const { status, note } = req.body;

    if (Number.isNaN(productId)) {
      return errorResponse(res, "ID produk tidak valid", [], 400);
    }

    if (!status) {
      return errorResponse(res, "Status verifikasi wajib diisi", [], 400);
    }

    const allowedStatus = ["APPROVED", "REJECTED"];

    if (!allowedStatus.includes(status)) {
      return errorResponse(res, "Status hanya boleh APPROVED atau REJECTED", [], 400);
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      return errorResponse(res, "Produk tidak ditemukan", [], 404);
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        status,
        verificationNote: note || null,
        verifiedById: req.user.id,
        verifiedAt: new Date(),
      },
      include: {
        mahasiswa: {
          select: {
            id: true,
            username: true,
            email: true,
            mahasiswaProfile: true,
          },
        },
        verifiedBy: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
          },
        },
        categoryRef: true,
      },
    });

    await createActivityLog({
      userId: req.user.id,
      type: "VERIFY_PRODUCT",
      description: `Admin ${req.user.email} mengubah status produk ${updatedProduct.title} menjadi ${status}`,
      metadata: {
        productId: updatedProduct.id,
        status,
        note: note || null,
      },
    });

    return successResponse(res, "Status produk berhasil diperbarui", updatedProduct);
  } catch (error) {
    return errorResponse(res, "Gagal memverifikasi produk", [error.message], 500);
  }
};

module.exports = {
  getPendingProducts,
  getAdminProductDetail,
  verifyProduct,
};