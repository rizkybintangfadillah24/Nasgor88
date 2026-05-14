const prisma = require("../config/prisma");
const { successResponse, errorResponse } = require("../utils/response");

const createDemoRequest = async (req, res) => {
  try {
    const { productId, message, requestedAt } = req.body;

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

    const demoRequest = await prisma.demoRequest.create({
      data: {
        productId: product.id,
        umkmId: req.user.id,
        mahasiswaId: product.mahasiswaId,
        message: message || null,
        requestedAt: requestedAt ? new Date(requestedAt) : null,
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

    await prisma.activityLog.create({
      data: {
        userId: req.user.id,
        type: "REQUEST_DEMO",
        description: `UMKM ${req.user.email} request demo produk ${product.title}`,
        metadata: {
          productId: product.id,
          demoRequestId: demoRequest.id,
        },
      },
    });

    return successResponse(res, "Request demo berhasil dibuat", demoRequest, 201);
  } catch (error) {
    return errorResponse(res, "Gagal membuat request demo", [error.message], 500);
  }
};

const getMyDemoRequests = async (req, res) => {
  try {
    const whereCondition =
      req.user.role === "UMKM"
        ? { umkmId: req.user.id }
        : { mahasiswaId: req.user.id };

    const demoRequests = await prisma.demoRequest.findMany({
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
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(res, "Data request demo berhasil diambil", demoRequests);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil request demo", [error.message], 500);
  }
};

const updateDemoRequestStatus = async (req, res) => {
  try {
    const demoRequestId = Number(req.params.id);
    const { status, note } = req.body;

    if (Number.isNaN(demoRequestId)) {
      return errorResponse(res, "ID request demo tidak valid", [], 400);
    }

    const allowedStatus = ["APPROVED", "REJECTED"];

    if (!allowedStatus.includes(status)) {
      return errorResponse(res, "Status hanya boleh APPROVED atau REJECTED", [], 400);
    }

    const demoRequest = await prisma.demoRequest.findUnique({
      where: {
        id: demoRequestId,
      },
      include: {
        product: true,
      },
    });

    if (!demoRequest) {
      return errorResponse(res, "Request demo tidak ditemukan", [], 404);
    }

    if (demoRequest.mahasiswaId !== req.user.id) {
      return errorResponse(res, "Anda tidak berhak mengubah request demo ini", [], 403);
    }

    const updatedDemoRequest = await prisma.demoRequest.update({
      where: {
        id: demoRequestId,
      },
      data: {
        status,
        note: note || null,
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

    await prisma.activityLog.create({
      data: {
        userId: req.user.id,
        type: "UPDATE_DEMO_REQUEST",
        description: `Mahasiswa ${req.user.email} mengubah status request demo menjadi ${status}`,
        metadata: {
          demoRequestId,
          status,
        },
      },
    });

    return successResponse(res, "Status request demo berhasil diperbarui", updatedDemoRequest);
  } catch (error) {
    return errorResponse(res, "Gagal memperbarui status request demo", [error.message], 500);
  }
};

module.exports = {
  createDemoRequest,
  getMyDemoRequests,
  updateDemoRequestStatus,
};