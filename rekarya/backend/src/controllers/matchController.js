const prisma = require("../config/prisma");
const { successResponse, errorResponse } = require("../utils/response");
const { calculateMatchScore } = require("../services/matchService");

const getRecommendations = async (req, res) => {
  try {
    const {
      keyword,
      mainProblem,
      problemDetail,
      budgetMin,
      budgetMax,
      trainingDuration,
      mentoringMethod,
    } = req.body;

    if (
      !mainProblem ||
      !problemDetail ||
      budgetMin === undefined ||
      budgetMax === undefined ||
      !trainingDuration ||
      !mentoringMethod
    ) {
      return errorResponse(res, "Data kebutuhan rekomendasi wajib diisi", [], 400);
    }

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
                studyProgram: true,
                photo: true,
              },
            },
          },
        },
        categoryRef: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const recommendations = products
      .map((product) => {
        const matchResult = calculateMatchScore(product, {
          keyword,
          mainProblem,
          problemDetail,
          budgetMin,
          budgetMax,
          trainingDuration,
          mentoringMethod,
        });

        const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating =
          product.reviews.length > 0 ? totalRating / product.reviews.length : 0;

        return {
          productId: product.id,
          title: product.title,
          shortDescription: product.description,
          category: product.category,
          price: product.price,
          screenshot: product.screenshot,
          mahasiswa: product.mahasiswa,
          averageRating,
          matchScore: matchResult.matchScore,
          matchLabel: matchResult.matchLabel,
          reasons: matchResult.reasons,
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);

    await prisma.activityLog.create({
      data: {
        userId: req.user.id,
        type: "CREATE_COLLABORATION",
        description: `UMKM ${req.user.email} mencari rekomendasi ReKarya Match`,
        metadata: {
          keyword,
          mainProblem,
          totalResult: recommendations.length,
        },
      },
    });

    return successResponse(res, "Rekomendasi berhasil ditemukan", recommendations);
  } catch (error) {
    return errorResponse(res, "Gagal mencari rekomendasi", [error.message], 500);
  }
};

const getProductMatchDetail = async (req, res) => {
  try {
    const productId = Number(req.params.productId);

    if (Number.isNaN(productId)) {
      return errorResponse(res, "ID produk tidak valid", [], 400);
    }

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        status: "APPROVED",
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
        reviews: {
          include: {
            umkm: {
              select: {
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
        },
      },
    });

    if (!product) {
      return errorResponse(res, "Produk tidak ditemukan atau belum approved", [], 404);
    }

    return successResponse(res, "Detail produk rekomendasi berhasil diambil", product);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil detail produk rekomendasi", [error.message], 500);
  }
};

module.exports = {
  getRecommendations,
  getProductMatchDetail,
};