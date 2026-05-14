const normalizeText = (text) => {
  if (!text) return "";
  return String(text).toLowerCase().trim();
};

const splitKeywords = (text) => {
  return normalizeText(text)
    .split(/[\s,.-]+/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const hasTextOverlap = (source, target) => {
  const sourceWords = splitKeywords(source);
  const targetWords = splitKeywords(target);

  if (sourceWords.length === 0 || targetWords.length === 0) {
    return false;
  }

  return sourceWords.some((word) => targetWords.includes(word));
};

const getMatchLabel = (score) => {
  if (score >= 80) return "Sangat Cocok";
  if (score >= 60) return "Cocok";
  if (score >= 40) return "Cukup Sesuai";
  return "Kurang Sesuai";
};

const calculateMatchScore = (product, requestData) => {
  let score = 0;
  const reasons = [];

  const {
    keyword,
    mainProblem,
    problemDetail,
    budgetMin,
    budgetMax,
    trainingDuration,
    mentoringMethod,
  } = requestData;

  const productMainProblem = normalizeText(product.mainProblem);
  const requestMainProblem = normalizeText(mainProblem);

  if (
    productMainProblem &&
    requestMainProblem &&
    productMainProblem === requestMainProblem
  ) {
    score += 40;
    reasons.push("Sesuai dengan masalah utama usaha");
  } else if (
    hasTextOverlap(product.mainProblem, mainProblem) ||
    hasTextOverlap(product.description, problemDetail)
  ) {
    score += 25;
    reasons.push("Masalah utama produk masih berhubungan dengan kebutuhan UMKM");
  }

  if (
    hasTextOverlap(product.mainFeatures, problemDetail) ||
    hasTextOverlap(product.featureDetail, problemDetail) ||
    hasTextOverlap(product.description, problemDetail)
  ) {
    score += 25;
    reasons.push("Fitur produk sesuai kebutuhan UMKM");
  }

  const productPrice = Number(product.price);
  const minBudget = Number(budgetMin);
  const maxBudget = Number(budgetMax);

  if (
    !Number.isNaN(productPrice) &&
    !Number.isNaN(minBudget) &&
    !Number.isNaN(maxBudget) &&
    productPrice >= minBudget &&
    productPrice <= maxBudget
  ) {
    score += 15;
    reasons.push("Harga produk sesuai budget");
  } else if (
    !Number.isNaN(productPrice) &&
    !Number.isNaN(maxBudget) &&
    productPrice <= maxBudget
  ) {
    score += 10;
    reasons.push("Harga produk masih masuk batas budget");
  }

  const productDuration = Number(product.trainingDuration);
  const requestedDuration = Number(trainingDuration);

  if (
    !Number.isNaN(productDuration) &&
    !Number.isNaN(requestedDuration) &&
    productDuration <= requestedDuration
  ) {
    score += 10;
    reasons.push("Durasi implementasi sesuai target waktu");
  }

  if (
    normalizeText(product.mentoringMethod) &&
    normalizeText(mentoringMethod) &&
    normalizeText(product.mentoringMethod) === normalizeText(mentoringMethod)
  ) {
    score += 5;
    reasons.push("Pendampingan sesuai preferensi UMKM");
  }

  if (
    hasTextOverlap(product.category, keyword) ||
    hasTextOverlap(product.title, keyword) ||
    hasTextOverlap(product.description, keyword) ||
    hasTextOverlap(product.mainFeatures, keyword)
  ) {
    score += 5;
    reasons.push("Keyword atau kategori masih berhubungan");
  }

  if (score > 100) {
    score = 100;
  }

  return {
    matchScore: score,
    matchLabel: getMatchLabel(score),
    reasons,
  };
};

module.exports = {
  calculateMatchScore,
  getMatchLabel,
};