const prisma = require("../config/prisma");
const { successResponse, errorResponse } = require("../utils/response");

const createReview = async (req, res) => {
  try {
    const { productId, collaborationId, rating, comment } = req.body;

    if (!productId || !collaborationId || !rating) {
      return errorResponse(res, "Product ID, collaboration ID, dan rating wajib diisi", [], 400);
    }

    const numericRating = Number(rating);

    if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return errorResponse(res, "Rating harus berupa angka 1 sampai 5", [], 400);
    }

    const collaboration = await prisma.collaboration.findUnique({
      where: {
        id: Number(collaborationId),
      },
      include: {
        product: true,
        mentoring: true,
      },
    });

    if (!collaboration) {
      return errorResponse(res, "Kerja sama tidak ditemukan", [], 404);
    }

    if (collaboration.umkmId !== req.user.id) {
      return errorResponse(res, "Anda tidak berhak memberi ulasan untuk kerja sama ini", [], 403);
    }

    if (collaboration.productId !== Number(productId)) {
      return errorResponse(res, "Produk tidak sesuai dengan kerja sama", [], 400);
    }

    const hasDoneMentoring = collaboration.mentoring.some(
      (mentoring) => mentoring.status === "DONE"
    );

    if (collaboration.status !== "DONE" && !hasDoneMentoring) {
      return errorResponse(res, "Ulasan hanya bisa dibuat setelah proses selesai", [], 400);
    }

    const existingReview = await prisma.review.findFirst({
      where: {
        productId: Number(productId),
        collaborationId: Number(collaborationId),
        umkmId: req.user.id,
      },
    });

    if (existingReview) {
      return errorResponse(res, "Ulasan untuk kerja sama ini sudah dibuat", [], 409);
    }

    const review = await prisma.review.create({
      data: {
        productId: Number(productId),
        collaborationId: Number(collaborationId),
        umkmId: req.user.id,
        mahasiswaId: collaboration.mahasiswaId,
        rating: numericRating,
        comment: comment || null,
      },
      include: {
        product: true,
        collaboration: true,
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
        type: "CREATE_REVIEW",
        description: `UMKM ${req.user.email} memberi ulasan produk`,
        metadata: {
          reviewId: review.id,
          productId: Number(productId),
          rating: numericRating,
        },
      },
    });

    return successResponse(res, "Ulasan berhasil dibuat", review, 201);
  } catch (error) {
    return errorResponse(res, "Gagal membuat ulasan", [error.message], 500);
  }
};

const getReviewsByProduct = async (req, res) => {
  try {
    const productId = Number(req.params.productId);

    if (Number.isNaN(productId)) {
      return errorResponse(res, "ID produk tidak valid", [], 400);
    }

    const reviews = await prisma.review.findMany({
      where: {
        productId,
      },
      include: {
        umkm: {
          select: {
            id: true,
            username: true,
            umkmProfile: {
              select: {
                businessName: true,
                ownerName: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(res, "Ulasan produk berhasil diambil", reviews);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil ulasan produk", [error.message], 500);
  }
};

const getMyReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        mahasiswaId: req.user.id,
      },
      include: {
        product: true,
        collaboration: true,
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

    return successResponse(res, "Ulasan untuk produk mahasiswa berhasil diambil", reviews);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil ulasan saya", [error.message], 500);
  }
};

module.exports = {
  createReview,
  getReviewsByProduct,
  getMyReviews,
};