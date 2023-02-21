const validateCarInput = (data) => {
  const error = {};
  if (!data.name || typeof data.name !== "string" || data.name.length < 2) {
    error.name =
      "Name field is required and must be a string with at least 2 characters.";
  }
  if (!data.model || typeof data.model !== "string" || data.model.length < 2) {
    error.model =
      "Model field is required and must be a string with at least 2 characters.";
  }
  if (
    !data.year ||
    typeof data.year !== "number" ||
    data.year < 1800 ||
    data.year > 2022
  ) {
    error.year =
      "Year field is required and must be a number between 1800 and 2022.";
  }
  if (
    !data.pricePerDay ||
    typeof data.pricePerDay !== "number" ||
    data.pricePerDay < 0
  ) {
    error.pricePerDay =
      "PricePerDay field is required and must be a positive number.";
  }
  if (
    !data.imageUrls ||
    !Array.isArray(data.imageUrls) ||
    !data.imageUrls.length
  ) {
    error.imageUrls =
      "ImageUrls field is required and must be an array with at least one url.";
  }
  if (Object.keys(error).length > 0) {
    return { message: error };
  } else {
    return {};
  }
};

module.exports = validateCarInput;
