const prisma = require("../config/prisma");
const { successResponse, errorResponse } = require("../utils/response");

const createOffer = async (req, res) => {
  try {
    const { collaborationId, title, description, price, note } = req.body;

    if (!collaborationId || !title || !description || !price) {
      return errorResponse(res, "Collaboration ID, title, description, dan price wajib diisi", [], 400);
    }

    const collaboration = await prisma.collaboration.findUnique({
      where: {
        id: Number(collaborationId),
      },
      include: {
        product: true,
      },
    });

    if (!collaboration) {
      return errorResponse(res, "Kerja sama tidak ditemukan", [], 404);
    }

    if (collaboration.mahasiswaId !== req.user.id) {
      return errorResponse(res, "Anda tidak berhak membuat penawaran untuk kerja sama ini", [], 403);
    }

    if (collaboration.status !== "APPROVED") {
      return errorResponse(res, "Penawaran hanya bisa dibuat setelah kerja sama disetujui", [], 400);
    }

    const offer = await prisma.offer.create({
      data: {
        collaborationId: collaboration.id,
        productId: collaboration.productId,
        mahasiswaId: collaboration.mahasiswaId,
        umkmId: collaboration.umkmId,
        title,
        description,
        price: Number(price),
        note: note || null,
        status: "WAITING",
      },
      include: {
        product: true,
        collaboration: true,
        mahasiswa: {
          select: {
            id: true,
            username: true,
            email: true,
            mahasiswaProfile: true,
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
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: req.user.id,
        type: "CREATE_OFFER",
        description: `Mahasiswa ${req.user.email} membuat penawaran`,
        metadata: {
          offerId: offer.id,
          collaborationId: collaboration.id,
          price: offer.price,
        },
      },
    });

    return successResponse(res, "Penawaran berhasil dibuat", offer, 201);
  } catch (error) {
    return errorResponse(res, "Gagal membuat penawaran", [error.message], 500);
  }
};

const getMyOffers = async (req, res) => {
  try {
    const whereCondition =
      req.user.role === "MAHASISWA"
        ? { mahasiswaId: req.user.id }
        : { umkmId: req.user.id };

    const offers = await prisma.offer.findMany({
      where: whereCondition,
      include: {
        product: true,
        collaboration: true,
        mahasiswa: {
          select: {
            id: true,
            username: true,
            email: true,
            mahasiswaProfile: true,
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
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(res, "Data penawaran berhasil diambil", offers);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil data penawaran", [error.message], 500);
  }
};

const updateOfferStatus = async (req, res) => {
  try {
    const offerId = Number(req.params.id);
    const { status } = req.body;

    if (Number.isNaN(offerId)) {
      return errorResponse(res, "ID penawaran tidak valid", [], 400);
    }

    const allowedStatus = ["APPROVED", "REJECTED"];

    if (!allowedStatus.includes(status)) {
      return errorResponse(res, "Status hanya boleh APPROVED atau REJECTED", [], 400);
    }

    const offer = await prisma.offer.findUnique({
      where: {
        id: offerId,
      },
    });

    if (!offer) {
      return errorResponse(res, "Penawaran tidak ditemukan", [], 404);
    }

    if (offer.umkmId !== req.user.id) {
      return errorResponse(res, "Anda tidak berhak mengubah status penawaran ini", [], 403);
    }

    const updatedOffer = await prisma.offer.update({
      where: {
        id: offerId,
      },
      data: {
        status,
      },
      include: {
        product: true,
        collaboration: true,
        mahasiswa: {
          select: {
            id: true,
            username: true,
            email: true,
            mahasiswaProfile: true,
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
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: req.user.id,
        type: "UPDATE_OFFER",
        description: `UMKM ${req.user.email} mengubah status penawaran menjadi ${status}`,
        metadata: {
          offerId,
          status,
        },
      },
    });

    return successResponse(res, "Status penawaran berhasil diperbarui", updatedOffer);
  } catch (error) {
    return errorResponse(res, "Gagal memperbarui status penawaran", [error.message], 500);
  }
};

module.exports = {
  createOffer,
  getMyOffers,
  updateOfferStatus,
};