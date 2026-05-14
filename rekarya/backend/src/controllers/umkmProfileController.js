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

const getUmkmProfile = async (req, res) => {
  try {
    const profile = await prisma.uMKMProfile.findUnique({
      where: {
        userId: req.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
            verificationStatus: true,
          },
        },
      },
    });

    if (!profile) {
      return errorResponse(res, "Profil UMKM tidak ditemukan", [], 404);
    }

    return successResponse(res, "Profil UMKM berhasil diambil", profile);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil profil UMKM", [error.message], 500);
  }
};

const updateUmkmProfile = async (req, res) => {
  try {
    const {
      ownerName,
      businessName,
      businessType,
      description,
      address,
      phone,
      mainProblem,
      specificNeeds,
      budgetMin,
      budgetMax,
      targetDuration,
      mentoringPreference,
    } = req.body;

    const existingProfile = await prisma.uMKMProfile.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (!existingProfile) {
      return errorResponse(res, "Profil UMKM tidak ditemukan", [], 404);
    }

    const updatedProfile = await prisma.uMKMProfile.update({
      where: {
        userId: req.user.id,
      },
      data: {
        ownerName,
        businessName,
        businessType,
        description,
        address,
        phone,
        mainProblem,
        specificNeeds,
        budgetMin:
          budgetMin !== undefined && budgetMin !== "" ? Number(budgetMin) : null,
        budgetMax:
          budgetMax !== undefined && budgetMax !== "" ? Number(budgetMax) : null,
        targetDuration:
          targetDuration !== undefined && targetDuration !== ""
            ? Number(targetDuration)
            : null,
        mentoringPreference,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
            verificationStatus: true,
          },
        },
      },
    });

    await createActivityLog({
      userId: req.user.id,
      type: "UPDATE_PROFILE",
      description: `UMKM ${req.user.email} memperbarui profil usaha`,
      metadata: {
        businessName,
        businessType,
        mainProblem,
      },
    });

    return successResponse(res, "Profil UMKM berhasil diperbarui", updatedProfile);
  } catch (error) {
    return errorResponse(res, "Gagal memperbarui profil UMKM", [error.message], 500);
  }
};

module.exports = {
  getUmkmProfile,
  updateUmkmProfile,
};