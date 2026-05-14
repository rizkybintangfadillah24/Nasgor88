const prisma = require("../config/prisma");
const { successResponse, errorResponse } = require("../utils/response");

const createTransaction = async (req, res) => {
  try {
    const { collaborationId } = req.body;

    if (!collaborationId) {
      return errorResponse(res, "Collaboration ID wajib diisi", [], 400);
    }

    const collaboration = await prisma.collaboration.findUnique({
      where: {
        id: Number(collaborationId),
      },
      include: {
        product: true,
        transaction: true,
      },
    });

    if (!collaboration) {
      return errorResponse(res, "Kerja sama tidak ditemukan", [], 404);
    }

    if (collaboration.umkmId !== req.user.id) {
      return errorResponse(res, "Anda tidak berhak membuat transaksi ini", [], 403);
    }

    if (collaboration.status !== "APPROVED") {
      return errorResponse(res, "Transaksi hanya bisa dibuat setelah kerja sama disetujui", [], 400);
    }

    if (collaboration.transaction) {
      return errorResponse(res, "Transaksi untuk kerja sama ini sudah ada", [], 409);
    }

    const transaction = await prisma.transaction.create({
      data: {
        collaborationId: collaboration.id,
        umkmId: collaboration.umkmId,
        mahasiswaId: collaboration.mahasiswaId,
        amount: collaboration.product.price,
        status: "UNPAID",
      },
      include: {
        collaboration: {
          include: {
            product: true,
          },
        },
      },
    });

    return successResponse(res, "Transaksi berhasil dibuat", transaction, 201);
  } catch (error) {
    return errorResponse(res, "Gagal membuat transaksi", [error.message], 500);
  }
};

const getMyTransactions = async (req, res) => {
  try {
    const whereCondition =
      req.user.role === "UMKM"
        ? { umkmId: req.user.id }
        : req.user.role === "MAHASISWA"
        ? { mahasiswaId: req.user.id }
        : {};

    const transactions = await prisma.transaction.findMany({
      where: whereCondition,
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
            umkmProfile: true,
          },
        },
        mahasiswa: {
          select: {
            id: true,
            username: true,
            email: true,
            mahasiswaProfile: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(res, "Data transaksi berhasil diambil", transactions);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil data transaksi", [error.message], 500);
  }
};

module.exports = {
  createTransaction,
  getMyTransactions,
};