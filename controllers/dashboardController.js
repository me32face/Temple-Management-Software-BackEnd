const Donation = require('../models/Donation');
const Expense = require('../models/Expense');
const Devotee = require('../models/Devotee');
const Pooja = require('../models/Pooja');

exports.getDashboardData = async (req, res) => {
  try {
    const { type, from, to } = req.query;

    let matchQuery = {};

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);

    if (type === 'daily') {
      matchQuery.date = { $gte: startOfDay, $lte: endOfDay };
    } else if (type === 'monthly') {
      matchQuery.date = { $gte: startOfMonth, $lte: endOfMonth };
    } else if (type === 'yearly') {
      matchQuery.date = { $gte: startOfYear, $lte: endOfYear };
    } else if (type === 'custom') {
      if (!from || !to) {
        return res.status(400).json({ msg: 'Please provide both from and to dates' });
      }
      matchQuery.date = {
        $gte: new Date(new Date(from).setHours(0, 0, 0, 0)),
        $lte: new Date(new Date(to).setHours(23, 59, 59, 999)),
      };
    }

    // Donations
    const donationAgg = await Donation.aggregate([
      { $match: matchQuery },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    // Poojas
    const poojaAgg = await Pooja.aggregate([
      { $match: matchQuery },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    // Expenses
    const expenseAgg = await Expense.aggregate([
      { $match: matchQuery },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    // Devotee count (always total)
    const devoteeCount = await Devotee.countDocuments();

    const donationTotal = donationAgg[0]?.total || 0;
    const poojaTotal = poojaAgg[0]?.total || 0;
    const expenseTotal = expenseAgg[0]?.total || 0;
    const totalIncome = donationTotal + poojaTotal;

    res.json({
      donationTotal,
      poojaTotal,
      totalIncome,
      expenseTotal,
      devoteeCount
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
