const prisma = require("../config/prisma");
const { successResponse, errorResponse } = require("../utils/response");

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
              },
            },
          },
        },
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
      },
    });

    return successResponse(res, "Status produk berhasil diperbarui", updatedProduct);
  } catch (error) {
    return errorResponse(res, "Gagal memverifikasi produk", [error.message], 500);
  }
};

const updateTransactionStatus = async (req, res) => {
  try {
    const transactionId = Number(req.params.id);
    const { status } = req.body;

    if (Number.isNaN(transactionId)) {
      return errorResponse(res, "ID transaksi tidak valid", [], 400);
    }

    const allowedStatus = ["UNPAID", "REVIEW", "PAID"];

    if (!allowedStatus.includes(status)) {
      return errorResponse(res, "Status transaksi hanya boleh UNPAID, REVIEW, atau PAID", [], 400);
    }

    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });

    if (!transaction) {
      return errorResponse(res, "Transaksi tidak ditemukan", [], 404);
    }

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        status,
      },
      include: {
        collaboration: {
          include: {
            product: true,
          },
        },
        umkm: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        mahasiswa: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return successResponse(res, "Status transaksi berhasil diperbarui", updatedTransaction);
  } catch (error) {
    return errorResponse(res, "Gagal memperbarui status transaksi", [error.message], 500);
  }
};

module.exports = {
  getPendingProducts,
  verifyProduct,
  updateTransactionStatus,
};