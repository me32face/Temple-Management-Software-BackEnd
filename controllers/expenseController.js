const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid data', error: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid data', error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });
    res.json({ msg: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
