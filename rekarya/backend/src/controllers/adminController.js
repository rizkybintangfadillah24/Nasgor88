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

const getDashboard = async (req, res) => {
  try {
    const [
      pendingProducts,
      approvedProducts,
      reviewTransactions,
      unpaidTransactions,
      totalMahasiswa,
      totalUmkm,
      activeCollaborations,
    ] = await Promise.all([
      prisma.product.count({ where: { status: "PENDING" } }),
      prisma.product.count({ where: { status: "APPROVED" } }),
      prisma.transaction.count({ where: { status: "REVIEW" } }),
      prisma.transaction.count({ where: { status: "UNPAID" } }),
      prisma.user.count({ where: { role: "MAHASISWA" } }),
      prisma.user.count({ where: { role: "UMKM" } }),
      prisma.collaboration.count({ where: { status: "APPROVED" } }),
    ]);

    return successResponse(res, "Dashboard admin berhasil diambil", {
      pendingProducts,
      approvedProducts,
      reviewTransactions,
      unpaidTransactions,
      totalMahasiswa,
      totalUmkm,
      activeCollaborations,
    });
  } catch (error) {
    return errorResponse(res, "Gagal mengambil dashboard admin", [error.message], 500);
  }
};

const getPendingUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          in: ["MAHASISWA", "UMKM"],
        },
        verificationStatus: "PENDING",
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        verificationStatus: true,
        mahasiswaProfile: true,
        umkmProfile: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(res, "Akun pending berhasil diambil", users);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil akun pending", [error.message], 500);
  }
};

const verifyUser = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { status } = req.body;

    if (Number.isNaN(userId)) {
      return errorResponse(res, "ID user tidak valid", [], 400);
    }

    const allowedStatus = ["APPROVED", "REJECTED"];

    if (!allowedStatus.includes(status)) {
      return errorResponse(res, "Status hanya boleh APPROVED atau REJECTED", [], 400);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return errorResponse(res, "User tidak ditemukan", [], 404);
    }

    if (user.role === "ADMIN") {
      return errorResponse(res, "Akun admin tidak perlu diverifikasi", [], 400);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        verificationStatus: status,
        verifiedById: req.user.id,
        verifiedAt: new Date(),
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        verificationStatus: true,
        verifiedAt: true,
      },
    });

    await createActivityLog({
      userId: req.user.id,
      type: "VERIFY_USER",
      description: `Admin ${req.user.email} mengubah status akun ${updatedUser.email} menjadi ${status}`,
      metadata: {
        targetUserId: updatedUser.id,
        status,
      },
    });

    return successResponse(res, "Status akun berhasil diperbarui", updatedUser);
  } catch (error) {
    return errorResponse(res, "Gagal memverifikasi akun", [error.message], 500);
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
            mahasiswaProfile: true,
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

    const allowedStatus = ["APPROVED", "REJECTED"];

    if (!allowedStatus.includes(status)) {
      return errorResponse(res, "Status hanya boleh APPROVED atau REJECTED", [], 400);
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
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
        productId,
        status,
        note: note || null,
      },
    });

    return successResponse(res, "Status produk berhasil diperbarui", updatedProduct);
  } catch (error) {
    return errorResponse(res, "Gagal memverifikasi produk", [error.message], 500);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(res, "Kategori berhasil diambil", categories);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil kategori", [error.message], 500);
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, type, description } = req.body;

    if (!name || !type) {
      return errorResponse(res, "Nama dan tipe kategori wajib diisi", [], 400);
    }

    const category = await prisma.category.create({
      data: {
        name,
        type,
        description: description || null,
      },
    });

    await createActivityLog({
      userId: req.user.id,
      type: "MANAGE_CATEGORY",
      description: `Admin ${req.user.email} membuat kategori ${name}`,
      metadata: {
        categoryId: category.id,
        type,
      },
    });

    return successResponse(res, "Kategori berhasil dibuat", category, 201);
  } catch (error) {
    return errorResponse(res, "Gagal membuat kategori", [error.message], 500);
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = Number(req.params.id);
    const { name, type, description } = req.body;

    if (Number.isNaN(categoryId)) {
      return errorResponse(res, "ID kategori tidak valid", [], 400);
    }

    const existingCategory = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!existingCategory) {
      return errorResponse(res, "Kategori tidak ditemukan", [], 404);
    }

    const category = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: name ?? existingCategory.name,
        type: type ?? existingCategory.type,
        description: description ?? existingCategory.description,
      },
    });

    await createActivityLog({
      userId: req.user.id,
      type: "MANAGE_CATEGORY",
      description: `Admin ${req.user.email} memperbarui kategori ${category.name}`,
      metadata: {
        categoryId: category.id,
      },
    });

    return successResponse(res, "Kategori berhasil diperbarui", category);
  } catch (error) {
    return errorResponse(res, "Gagal memperbarui kategori", [error.message], 500);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = Number(req.params.id);

    if (Number.isNaN(categoryId)) {
      return errorResponse(res, "ID kategori tidak valid", [], 400);
    }

    const existingCategory = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!existingCategory) {
      return errorResponse(res, "Kategori tidak ditemukan", [], 404);
    }

    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    await createActivityLog({
      userId: req.user.id,
      type: "MANAGE_CATEGORY",
      description: `Admin ${req.user.email} menghapus kategori ${existingCategory.name}`,
      metadata: {
        categoryId,
      },
    });

    return successResponse(res, "Kategori berhasil dihapus", {
      id: categoryId,
    });
  } catch (error) {
    return errorResponse(res, "Gagal menghapus kategori", [error.message], 500);
  }
};

const getActivities = async (req, res) => {
  try {
    const activities = await prisma.activityLog.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100,
    });

    return successResponse(res, "Monitoring aktivitas berhasil diambil", activities);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil aktivitas", [error.message], 500);
  }
};

const getAdminTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
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

    return successResponse(res, "Monitoring transaksi berhasil diambil", transactions);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil transaksi admin", [error.message], 500);
  }
};

const updateTransactionStatus = async (req, res) => {
  try {
    const transactionId = Number(req.params.id);
    const { status, note } = req.body;

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
        note: note ?? transaction.note,
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

    await createActivityLog({
      userId: req.user.id,
      type: "UPDATE_TRANSACTION",
      description: `Admin ${req.user.email} mengubah status transaksi menjadi ${status}`,
      metadata: {
        transactionId,
        status,
      },
    });

    return successResponse(res, "Status transaksi berhasil diperbarui", updatedTransaction);
  } catch (error) {
    return errorResponse(res, "Gagal memperbarui status transaksi", [error.message], 500);
  }
};

const getAdminMentoring = async (req, res) => {
  try {
    const mentoring = await prisma.mentoring.findMany({
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

    return successResponse(res, "Monitoring pendampingan berhasil diambil", mentoring);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil monitoring pendampingan", [error.message], 500);
  }
};

const getProblemStatistics = async (req, res) => {
  try {
    const profiles = await prisma.uMKMProfile.findMany({
      where: {
        mainProblem: {
          not: null,
        },
      },
      select: {
        mainProblem: true,
      },
    });

    const total = profiles.length;
    const grouped = {};

    profiles.forEach((profile) => {
      const key = profile.mainProblem || "LAINNYA";
      grouped[key] = (grouped[key] || 0) + 1;
    });

    const statistics = Object.entries(grouped)
      .map(([mainProblem, count]) => ({
        mainProblem,
        count,
        percentage: total > 0 ? Number(((count / total) * 100).toFixed(2)) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    return successResponse(res, "Statistik masalah UMKM berhasil diambil", {
      total,
      statistics,
    });
  } catch (error) {
    return errorResponse(res, "Gagal mengambil statistik masalah UMKM", [error.message], 500);
  }
};

const getReports = async (req, res) => {
  try {
    const [
      totalProducts,
      totalApprovedProducts,
      totalDemoRequests,
      totalCollaborations,
      totalOffers,
      totalTransactions,
      totalMentoring,
      totalReviews,
      paidTransactions,
      latestActivities,
      popularProducts,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { status: "APPROVED" } }),
      prisma.demoRequest.count(),
      prisma.collaboration.count(),
      prisma.offer.count(),
      prisma.transaction.count(),
      prisma.mentoring.count(),
      prisma.review.count(),
      prisma.transaction.findMany({
        where: {
          status: "PAID",
        },
        select: {
          amount: true,
        },
      }),
      prisma.activityLog.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
        include: {
          user: {
            select: {
              username: true,
              email: true,
              role: true,
            },
          },
        },
      }),
      prisma.product.findMany({
        where: {
          status: "APPROVED",
        },
        include: {
          _count: {
            select: {
              demoRequests: true,
              collaborations: true,
              reviews: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      }),
    ]);

    const totalPaidAmount = paidTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    return successResponse(res, "Laporan sistem berhasil diambil", {
      summary: {
        totalProducts,
        totalApprovedProducts,
        totalDemoRequests,
        totalCollaborations,
        totalOffers,
        totalTransactions,
        totalMentoring,
        totalReviews,
        totalPaidAmount,
      },
      latestActivities,
      popularProducts,
    });
  } catch (error) {
    return errorResponse(res, "Gagal mengambil laporan sistem", [error.message], 500);
  }
};

module.exports = {
  getDashboard,
  getPendingUsers,
  verifyUser,
  getPendingProducts,
  getAdminProductDetail,
  verifyProduct,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getActivities,
  getAdminTransactions,
  updateTransactionStatus,
  getAdminMentoring,
  getProblemStatistics,
  getReports,
};