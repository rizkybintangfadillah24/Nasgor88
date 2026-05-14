const prisma = require("../config/prisma");
const { successResponse, errorResponse } = require("../utils/response");

const createCollaboration = async (req, res) => {
  try {
    const { productId, message } = req.body;

    if (!productId) {
      return errorResponse(res, "Product ID wajib diisi", [], 400);
    }

    const product = await prisma.product.findFirst({
      where: {
        id: Number(productId),
        status: "APPROVED",
      },
    });

    if (!product) {
      return errorResponse(res, "Produk tidak ditemukan atau belum approved", [], 404);
    }

    const existingCollaboration = await prisma.collaboration.findFirst({
      where: {
        productId: product.id,
        umkmId: req.user.id,
        status: {
          in: ["WAITING", "APPROVED"],
        },
      },
    });

    if (existingCollaboration) {
      return errorResponse(res, "Pengajuan kerja sama untuk produk ini masih aktif", [], 409);
    }

    const collaboration = await prisma.collaboration.create({
      data: {
        productId: product.id,
        umkmId: req.user.id,
        mahasiswaId: product.mahasiswaId,
        message: message || null,
        status: "WAITING",
      },
      include: {
        product: true,
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

    return successResponse(res, "Pengajuan kerja sama berhasil dibuat", collaboration, 201);
  } catch (error) {
    return errorResponse(res, "Gagal membuat pengajuan kerja sama", [error.message], 500);
  }
};

const getMyCollaborations = async (req, res) => {
  try {
    const whereCondition =
      req.user.role === "UMKM"
        ? { umkmId: req.user.id }
        : req.user.role === "MAHASISWA"
        ? { mahasiswaId: req.user.id }
        : {};

    const collaborations = await prisma.collaboration.findMany({
      where: whereCondition,
      include: {
        product: true,
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
        transaction: true,
        mentoring: true,
        reviews: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(res, "Data kerja sama berhasil diambil", collaborations);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil data kerja sama", [error.message], 500);
  }
};

const updateCollaborationStatus = async (req, res) => {
  try {
    const collaborationId = Number(req.params.id);
    const { status } = req.body;

    if (Number.isNaN(collaborationId)) {
      return errorResponse(res, "ID kerja sama tidak valid", [], 400);
    }

    const allowedStatus = ["APPROVED", "REJECTED", "DONE"];

    if (!allowedStatus.includes(status)) {
      return errorResponse(res, "Status hanya boleh APPROVED, REJECTED, atau DONE", [], 400);
    }

    const collaboration = await prisma.collaboration.findUnique({
      where: {
        id: collaborationId,
      },
      include: {
        product: true,
      },
    });

    if (!collaboration) {
      return errorResponse(res, "Kerja sama tidak ditemukan", [], 404);
    }

    if (collaboration.mahasiswaId !== req.user.id) {
      return errorResponse(res, "Anda tidak berhak mengubah status kerja sama ini", [], 403);
    }

    const updatedCollaboration = await prisma.collaboration.update({
      where: {
        id: collaborationId,
      },
      data: {
        status,
      },
      include: {
        product: true,
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

    return successResponse(res, "Status kerja sama berhasil diperbarui", updatedCollaboration);
  } catch (error) {
    return errorResponse(res, "Gagal memperbarui status kerja sama", [error.message], 500);
  }
};

module.exports = {
  createCollaboration,
  getMyCollaborations,
  updateCollaborationStatus,
};