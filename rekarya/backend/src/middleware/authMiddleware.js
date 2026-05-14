const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const { errorResponse } = require("../utils/response");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, "Token tidak ditemukan", [], 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
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

    if (!user) {
      return errorResponse(res, "User tidak ditemukan", [], 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, "Token tidak valid atau sudah kedaluwarsa", [], 401);
  }
};

const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, "User belum login", [], 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return errorResponse(res, "Akses ditolak", [], 403);
    }

    next();
  };
};

module.exports = {
  authMiddleware,
  roleMiddleware,
};