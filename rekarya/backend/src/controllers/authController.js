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
        OR: [
          {
            email,
          },
          {
            username,
          },
        ],
      },
    });

    if (existingUser) {
      return errorResponse(res, "Username atau email sudah digunakan", [], 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
        isVerified: true,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (role === "MAHASISWA") {
      await prisma.mahasiswaProfile.create({
        data: {
          userId: user.id,
        },
      });
    }

    if (role === "UMKM") {
      await prisma.uMKMProfile.create({
        data: {
          userId: user.id,
        },
      });
    }

    const token = generateToken(user);

    return successResponse(
      res,
      "Register berhasil",
      {
        user,
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

    return successResponse(res, "Login berhasil", {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
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

module.exports = {
  register,
  login,
  me,
};