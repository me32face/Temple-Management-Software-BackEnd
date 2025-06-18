const Donation = require('../models/Donation');
const Expense = require('../models/Expense');
const Devotee = require('../models/Devotee');
const Pooja = require('../models/Pooja');  // ✅ Import Pooja model

exports.getDashboardData = async (req, res) => {
  try {
    const donationTotalAgg = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const poojaTotalAgg = await Pooja.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const expenseTotalAgg = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const devoteeCount = await Devotee.countDocuments();

    const donationTotal = donationTotalAgg[0]?.total || 0;
    const poojaTotal = poojaTotalAgg[0]?.total || 0;
    const expenseTotal = expenseTotalAgg[0]?.total || 0;
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
