const prisma = require("../config/prisma");
const { successResponse, errorResponse } = require("../utils/response");

const buildFilePath = (folder, file) => {
  if (!file) return null;
  return `/uploads/${folder}/${file.filename}`;
};

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

const getMahasiswaProfile = async (req, res) => {
  try {
    const profile = await prisma.mahasiswaProfile.findUnique({
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
      return errorResponse(res, "Profil mahasiswa tidak ditemukan", [], 404);
    }

    return successResponse(res, "Profil mahasiswa berhasil diambil", profile);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil profil mahasiswa", [error.message], 500);
  }
};

const updateMahasiswaProfile = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      bankAccount,
      campus,
      major,
      studyProgram,
      educationStatus,
      bio,
    } = req.body;

    const files = req.files || {};

    const existingProfile = await prisma.mahasiswaProfile.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (!existingProfile) {
      return errorResponse(res, "Profil mahasiswa tidak ditemukan", [], 404);
    }

    const photoPath = files.photo?.[0]
      ? buildFilePath("profiles", files.photo[0])
      : existingProfile.photo;

    const studentCardPath = files.studentCard?.[0]
      ? buildFilePath("documents", files.studentCard[0])
      : existingProfile.studentCard;

    const identityCardPath = files.identityCard?.[0]
      ? buildFilePath("documents", files.identityCard[0])
      : existingProfile.identityCard;

    const updatedProfile = await prisma.mahasiswaProfile.update({
      where: {
        userId: req.user.id,
      },
      data: {
        fullName,
        phone,
        bankAccount,
        campus,
        major,
        studyProgram,
        educationStatus,
        bio,
        photo: photoPath,
        studentCard: studentCardPath,
        identityCard: identityCardPath,
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
      description: `Mahasiswa ${req.user.email} memperbarui profil`,
      metadata: {
        uploadedPhoto: Boolean(files.photo?.[0]),
        uploadedStudentCard: Boolean(files.studentCard?.[0]),
        uploadedIdentityCard: Boolean(files.identityCard?.[0]),
      },
    });

    return successResponse(res, "Profil mahasiswa berhasil diperbarui", updatedProfile);
  } catch (error) {
    return errorResponse(res, "Gagal memperbarui profil mahasiswa", [error.message], 500);
  }
};

module.exports = {
  getMahasiswaProfile,
  updateMahasiswaProfile,
};