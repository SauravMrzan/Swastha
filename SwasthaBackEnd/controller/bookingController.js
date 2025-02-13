const Booking = require('../model/Booking');

    const createBook = async (req, res) => {
        try {
          const { userId, clinicId, doctorId, startTime, endTime } = req.body;
      
          const book = await Booking.create({
            userId,
            clinicId,
            doctorId,
            startTime,
            endTime
          });
      
          res.status(201).json(book);
        } catch (error) {
          console.log(error)
          res.status(500).json({ error: error.message });
        }
      };
      
      // Get all booking
      const getAllBook = async (req, res) => {
        try {
          const book = await Booking.findAll();
          res.status(200).json(book);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };
      
      // Get a single booking by ID
      const getBookById = async (req, res) => {
        try {
          const { id } = req.params;
          const book = await Booking.findByPk(id);
      
          if (!book) {
            return res.status(404).json({ error: 'Booking table not found' });
          }
      
          res.status(200).json(book);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };
      
      // Update a booking table
      const updateBook = async (req, res) => {
        try {
          const { id } = req.params;
          const { doctorId, clinicId, startTime,endTime } = req.body;
          const book = await Booking.findByPk(id);
      
          if (!book) {
            return res.status(404).json({ error: 'Booking Table not found' });
          }
      
    
          await book.update({
            doctorId,
            clinicId,
            startTime,
            endTime,
          });
      
          res.status(200).json(book);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };
      
      // Delete a booking
      const deleteBook = async (req, res) => {
        try {
          const { id } = req.params;
          const book = await Booking.findByPk(id);
      
          if (!book) {
            return res.status(404).json({ error: 'Booking table not found' });
          }
      
          await book.destroy();
          res.status(200).json({ message: 'Booking deleted successfully' });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };
      
      module.exports ={createBook, getAllBook, getBookById,updateBook, deleteBook}
