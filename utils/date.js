function date() {
  const today = new Date().setHours(new Date().getHours() + 9);

  return new Date(today)
    .toISOString()
    .slice(2, 10)
    .replaceAll("-", "");
}

module.exports = date;
