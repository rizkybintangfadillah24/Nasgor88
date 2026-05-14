const prisma = require("../config/prisma");
const { successResponse, errorResponse } = require("../utils/response");

const createTransaction = async (req, res) => {
  try {
    const { offerId, note } = req.body;

    if (!offerId) {
      return errorResponse(res, "Offer ID wajib diisi", [], 400);
    }

    const offer = await prisma.offer.findUnique({
      where: {
        id: Number(offerId),
      },
      include: {
        collaboration: true,
        product: true,
      },
    });

    if (!offer) {
      return errorResponse(res, "Penawaran tidak ditemukan", [], 404);
    }

    if (offer.umkmId !== req.user.id) {
      return errorResponse(res, "Anda tidak berhak membuat transaksi untuk penawaran ini", [], 403);
    }

    if (offer.status !== "APPROVED") {
      return errorResponse(res, "Transaksi hanya bisa dibuat setelah penawaran disetujui", [], 400);
    }

    const existingTransaction = await prisma.transaction.findFirst({
      where: {
        offerId: offer.id,
      },
    });

    if (existingTransaction) {
      return errorResponse(res, "Transaksi untuk penawaran ini sudah ada", [], 409);
    }

    const transaction = await prisma.transaction.create({
      data: {
        collaborationId: offer.collaborationId,
        offerId: offer.id,
        umkmId: offer.umkmId,
        mahasiswaId: offer.mahasiswaId,
        amount: offer.price,
        status: "UNPAID",
        note: note || null,
      },
      include: {
        offer: true,
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
    });

    await prisma.activityLog.create({
      data: {
        userId: req.user.id,
        type: "CREATE_TRANSACTION",
        description: `UMKM ${req.user.email} membuat transaksi`,
        metadata: {
          transactionId: transaction.id,
          offerId: offer.id,
          amount: transaction.amount,
          status: transaction.status,
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
        : { mahasiswaId: req.user.id };

    const transactions = await prisma.transaction.findMany({
      where: whereCondition,
      include: {
        offer: true,
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