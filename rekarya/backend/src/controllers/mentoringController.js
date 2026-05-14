const prisma = require("../config/prisma");
const { successResponse, errorResponse } = require("../utils/response");

const getMyMentoring = async (req, res) => {
  try {
    const whereCondition =
      req.user.role === "UMKM"
        ? { umkmId: req.user.id }
        : req.user.role === "MAHASISWA"
        ? { mahasiswaId: req.user.id }
        : {};

    const mentoring = await prisma.mentoring.findMany({
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

    return successResponse(res, "Data pendampingan berhasil diambil", mentoring);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil data pendampingan", [error.message], 500);
  }
};

const createMentoring = async (req, res) => {
  try {
    const { collaborationId, schedule, progress, note } = req.body;

    if (!collaborationId || !progress) {
      return errorResponse(res, "Collaboration ID dan progress wajib diisi", [], 400);
    }

    const collaboration = await prisma.collaboration.findUnique({
      where: {
        id: Number(collaborationId),
      },
    });

    if (!collaboration) {
      return errorResponse(res, "Kerja sama tidak ditemukan", [], 404);
    }

    if (collaboration.mahasiswaId !== req.user.id) {
      return errorResponse(res, "Anda tidak berhak membuat pendampingan ini", [], 403);
    }

    if (collaboration.status !== "APPROVED") {
      return errorResponse(res, "Pendampingan hanya bisa dibuat untuk kerja sama APPROVED", [], 400);
    }

    const mentoring = await prisma.mentoring.create({
      data: {
        collaborationId: collaboration.id,
        umkmId: collaboration.umkmId,
        mahasiswaId: collaboration.mahasiswaId,
        schedule: schedule ? new Date(schedule) : null,
        progress,
        note: note || null,
        status: "PROGRESS",
      },
      include: {
        collaboration: {
          include: {
            product: true,
          },
        },
      },
    });

    return successResponse(res, "Pendampingan berhasil dibuat", mentoring, 201);
  } catch (error) {
    return errorResponse(res, "Gagal membuat pendampingan", [error.message], 500);
  }
};

const updateMentoring = async (req, res) => {
  try {
    const mentoringId = Number(req.params.id);
    const { schedule, progress, note, status } = req.body;

    if (Number.isNaN(mentoringId)) {
      return errorResponse(res, "ID pendampingan tidak valid", [], 400);
    }

    const existingMentoring = await prisma.mentoring.findUnique({
      where: {
        id: mentoringId,
      },
    });

    if (!existingMentoring) {
      return errorResponse(res, "Pendampingan tidak ditemukan", [], 404);
    }

    if (existingMentoring.mahasiswaId !== req.user.id) {
      return errorResponse(res, "Anda tidak berhak mengubah pendampingan ini", [], 403);
    }

    const updatedMentoring = await prisma.mentoring.update({
      where: {
        id: mentoringId,
      },
      data: {
        schedule: schedule ? new Date(schedule) : existingMentoring.schedule,
        progress: progress ?? existingMentoring.progress,
        note: note ?? existingMentoring.note,
        status: status ?? existingMentoring.status,
      },
    });

    return successResponse(res, "Pendampingan berhasil diperbarui", updatedMentoring);
  } catch (error) {
    return errorResponse(res, "Gagal memperbarui pendampingan", [error.message], 500);
  }
};

const completeMentoring = async (req, res) => {
  try {
    const mentoringId = Number(req.params.id);

    if (Number.isNaN(mentoringId)) {
      return errorResponse(res, "ID pendampingan tidak valid", [], 400);
    }

    const existingMentoring = await prisma.mentoring.findUnique({
      where: {
        id: mentoringId,
      },
    });

    if (!existingMentoring) {
      return errorResponse(res, "Pendampingan tidak ditemukan", [], 404);
    }

    if (existingMentoring.umkmId !== req.user.id) {
      return errorResponse(res, "Anda tidak berhak menyelesaikan pendampingan ini", [], 403);
    }

    const updatedMentoring = await prisma.mentoring.update({
      where: {
        id: mentoringId,
      },
      data: {
        status: "COMPLETED",
      },
    });

    return successResponse(res, "Pendampingan berhasil ditandai selesai", updatedMentoring);
  } catch (error) {
    return errorResponse(res, "Gagal menyelesaikan pendampingan", [error.message], 500);
  }
};

module.exports = {
  getMyMentoring,
  createMentoring,
  updateMentoring,
  completeMentoring,
};