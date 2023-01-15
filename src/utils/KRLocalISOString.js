function KRLocalISOString() {
  const localKRDate = new Date().setHours(new Date().getHours() + 9);
  return new Date(localKRDate).toISOString();
}

export default KRLocalISOString;
