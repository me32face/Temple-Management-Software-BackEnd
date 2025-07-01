const MonthlyPoojaPerson = require('../models/MonthlyPoojaPerson');
const MonthlyPoojaRecord = require('../models/MonthlyPoojaRecord');

// List all persons
exports.getAllPersons = async (req, res) => {
  try {
    const persons = await MonthlyPoojaPerson.find().sort({ createdAt: -1 });
    res.json(persons);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch persons' });
  }
};

// Create a new person
exports.createPerson = async (req, res) => {
  try {
    const { name, poojaName, phone, nakshatra, address } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const person = new MonthlyPoojaPerson({ name, poojaName, phone, nakshatra, address });
    await person.save();
    res.status(201).json(person);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create person' });
  }
};

// Get records by person
exports.getRecordsByPerson = async (req, res) => {
  try {
    const { id } = req.params;
    const records = await MonthlyPoojaRecord.find({ person: id }).sort({ month: 1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch records' });
  }
};

// Create new record
exports.createRecord = async (req, res) => {
  try {
    const { person, year, month, dates, amount, isPaid, paymentMode, notes } = req.body;

    if (!person || !year || !month) {
      return res.status(400).json({ error: 'person, year, and month are required' });
    }

    const existing = await MonthlyPoojaRecord.findOne({ person, year, month });
    if (existing) {
      return res.status(400).json({ error: `Record for ${month} ${year} already exists for this person.` });
    }

    const record = new MonthlyPoojaRecord({
      person,
      year,
      month,
      dates: Array.isArray(dates) ? dates : [],
      amount,
      isPaid,
      paymentMode,
      notes
    });

    await record.save();
    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create record' });
  }
};

// Update existing record
exports.updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await MonthlyPoojaRecord.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Record not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update record' });
  }
};

// Delete person and related records
exports.deletePerson = async (req, res) => {
  const { id } = req.params;
  try {
    await MonthlyPoojaRecord.deleteMany({ person: id });
    await MonthlyPoojaPerson.findByIdAndDelete(id);
    res.json({ message: 'Person and related records deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete person' });
  }
};

// Get single person by ID
exports.getPersonById = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await MonthlyPoojaPerson.findById(id);
    if (!person) return res.status(404).json({ error: 'Person not found' });
    res.json(person);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch person' });
  }
};

// Update person details
exports.updatePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await MonthlyPoojaPerson.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Person not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update person' });
  }
};
