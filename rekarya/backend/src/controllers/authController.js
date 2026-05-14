const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const { successResponse, errorResponse } = require("../utils/response");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
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

const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, role } = req.body;

    if (!username || !email || !password || !confirmPassword || !role) {
      return errorResponse(res, "Semua field wajib diisi", [], 400);
    }

    if (password !== confirmPassword) {
      return errorResponse(res, "Password dan konfirmasi password tidak sama", [], 400);
    }

    if (password.length < 6) {
      return errorResponse(res, "Password minimal 6 karakter", [], 400);
    }

    const allowedRoles = ["MAHASISWA", "UMKM"];

    if (!allowedRoles.includes(role)) {
      return errorResponse(res, "Role hanya boleh MAHASISWA atau UMKM", [], 400);
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return errorResponse(res, "Username atau email sudah digunakan", [], 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role,
          verificationStatus: "PENDING",
        },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          verificationStatus: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (role === "MAHASISWA") {
        await tx.mahasiswaProfile.create({
          data: {
            userId: user.id,
          },
        });
      }

      if (role === "UMKM") {
        await tx.uMKMProfile.create({
          data: {
            userId: user.id,
          },
        });
      }

      await tx.activityLog.create({
        data: {
          userId: user.id,
          type: "REGISTER",
          description: `User ${email} register sebagai ${role}`,
          metadata: {
            role,
          },
        },
      });

      return user;
    });

    const token = generateToken(result);

    return successResponse(
      res,
      "Register berhasil",
      {
        user: result,
        token,
      },
      201
    );
  } catch (error) {
    return errorResponse(res, "Register gagal", [error.message], 500);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, "Email dan password wajib diisi", [], 400);
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return errorResponse(res, "Email atau password salah", [], 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return errorResponse(res, "Email atau password salah", [], 401);
    }

    const token = generateToken(user);

    await createActivityLog({
      userId: user.id,
      type: "LOGIN",
      description: `User ${user.email} login`,
      metadata: {
        role: user.role,
      },
    });

    return successResponse(res, "Login berhasil", {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        verificationStatus: user.verificationStatus,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    });
  } catch (error) {
    return errorResponse(res, "Login gagal", [error.message], 500);
  }
};

const me = async (req, res) => {
  try {
    return successResponse(res, "Data user aktif berhasil diambil", {
      user: req.user,
    });
  } catch (error) {
    return errorResponse(res, "Gagal mengambil data user aktif", [error.message], 500);
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return errorResponse(res, "Password lama, password baru, dan konfirmasi password wajib diisi", [], 400);
    }

    if (newPassword !== confirmNewPassword) {
      return errorResponse(res, "Password baru dan konfirmasi password tidak sama", [], 400);
    }

    if (newPassword.length < 6) {
      return errorResponse(res, "Password baru minimal 6 karakter", [], 400);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return errorResponse(res, "User tidak ditemukan", [], 404);
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isOldPasswordValid) {
      return errorResponse(res, "Password lama salah", [], 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    await createActivityLog({
      userId: req.user.id,
      type: "UPDATE_PROFILE",
      description: `User ${req.user.email} mengubah password`,
      metadata: {
        action: "CHANGE_PASSWORD",
      },
    });

    return successResponse(res, "Password berhasil diubah", {});
  } catch (error) {
    return errorResponse(res, "Gagal mengubah password", [error.message], 500);
  }
};

module.exports = {
  register,
  login,
  me,
  changePassword,
};