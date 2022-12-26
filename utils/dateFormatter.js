function dateFormatter(date) {
  const localKRDate = new Date(date).setHours(new Date(date).getHours() + 9);

  return new Date(localKRDate)
    .toISOString()
    .slice(2, 10)
    .replaceAll("-", "");
}

module.exports = dateFormatter;
