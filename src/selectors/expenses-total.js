export default (expenses) => {
  return expenses.map((e) => e.amount).reduce((total, amount) => total + amount, 0);
}