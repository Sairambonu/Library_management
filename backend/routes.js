const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Location, Book, Store, User } = require('./database');

router.post('/register', async (req, res) => {
  try {
    const { email, username, password, renterPassword, message } = req.body;
    console.log(email, username, password);

    const existingUser = await User.findOne({ _id: email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    if (password !== renterPassword) {
      return res.status(400).send('Password mismatch');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const Newuser = new User({
      _id: email,
      username: username,
      password: hashedPassword,
    });

    await Newuser.save();
    console.log('Data added successfully to User');
    res.status(200).send('Data added successfully');
  } catch (error) {
    console.log('Could not add data to user:', error.message);
    res.status(500).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password, message } = req.body;
    console.log(email);

    const user = await User.findOne({ _id: email });
    console.log(user)
    if (!user) {
      return res.status(400).send('No email found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send('Password mismatch');
    }

    res.status(200).send('Login successful');
  } catch (error) {
    console.log('Error retrieving data:', error.message);
    res.status(500).send(error.message);
  }
});

router.post('/send', async (req, res) => {
  try {
    const {location_id, names, address,message} = req.body;
    const intLocationId = parseInt(location_id);
    console.log(intLocationId,names, address);
    const existinglocation_id = await Location.findOne({_id:intLocationId});

    if (existinglocation_id){
      console.log(existinglocation_id, "----------")
      return res.status(400).send('Location ID already exists');
    }
    const newLocation = new Location({
      _id: intLocationId,
      name: names,
      address: address
    });

    await newLocation.save();
    console.log('Data added to database');
    res.status(200).send('Data added successfully');
  } catch (error) {
    console.log('Could not add data to location:', error.message);
    res.status(500).send(error.message);
  }
});

router.get('/fetch', async (req, res) => {
  try {
    const locations = await Location.find();
    const locationIds = locations.map(location => location._id);
    res.send({
      dating: locations, // Sending full data of all documents in the Location collection
      locationIds: locationIds // Sending only _id values as locationIds
    });
  } catch (error) {
    console.log('Error retrieving data:', error.message);
    res.status(500).send(error.message);
  }
});

router.post('/send/book', async (req, res) => {
  try {
    const {bookId,title,author,publication_year,genre,ISBN,description,message} = req.body;
    const intbookId = parseInt(bookId);
    const intpublication_year = parseInt(publication_year)
    console.log(intbookId,author,intpublication_year,genre,ISBN,description);
    const existingbookId = await Book.findOne({_id:intbookId});
    if (existingbookId){
      return res.status(400).send('Book ID already exists');
    }
    const newLocation = new Book({
      _id: intbookId,
      title:title,
      author:author,
      publication_year:intpublication_year,
      genre: genre,
      ISBN:ISBN,
      description:description
    });

    await newLocation.save();
    console.log('Data added to database');
    res.status(200).send('Data added successfully');
  } catch (error) {
    console.log('Could not add data to book:', error.message);
    res.status(500).send(error.message);
  }
});

router.get('/fetch/book', async (req, res) => {
  try {
    const datas = await Book.find();
    res.send(datas);
  } catch (error) {
    console.log('Error retrieving data:', error.message);
    res.status(500).send(error.message);
  }
});

router.post('/send/store', async (req, res) => {
  try {
    const {store_id,location_id,book_id,location_name, book_name,message} = req.body;
    const intstore_id = parseInt(store_id)
    const newlocation_id = parseInt(location_id)
    const newbook_id = parseInt(book_id)
    console.log(intstore_id,newlocation_id,newbook_id,location_name, book_name);
    const existingStore_id = await Store.findOne({ _id: intstore_id });

    if (existingStore_id) {
      console.log('storeid  already exists')
      return res.status(400).send('StoreID ID already exists'); // Send a response indicating the conflict
    }

    const existingLocation = await Location.findOne({ _id: newlocation_id });
    console.log(existingLocation)
    if (!existingLocation) {
      return res.status(400).send('Location ID does not exist');
    }

    // Check if the provided book_id exists in the Book collection
    const existingBook = await Book.findOne({ _id: newbook_id });
    if (!existingBook) {
      return res.status(400).send('Book ID does not exist');
    }
    const newStore = new Store({
      _id:intstore_id,
      location_id:newlocation_id,
      book_id:newbook_id,
      location_name: location_name,
      book_name: book_name
    });

    await newStore.save();
    console.log('Data added to database');
    res.status(200).send('Data added successfully');
  } catch (error) {
    console.log('Could not add data to store:', error.message);
    res.status(500).send(error.message);
  }
});


router.get('/fetch/store', async (req, res) => {
  try {
    const datas = await Store.find()
    const locations = await Location.find();
    const locationId = await locations.map(location => location._id);
    const Books = await Book.find();
    const booksID = await Books.map(book=> book._id)
    res.send({
      dating:datas,
      locationIds:locationId,
      booksIDS:booksID,
    });
  } catch (error) {
    console.log('Error retrieving data:', error.message);
    res.status(500).send(error.message);
  }
});


// Example: Update the location_name for a specific store with a given _id
router.put('/fetch/store/:storeId', async (req, res) => {
  const { storeId } = req.params;
  const { locationName } = req.body;
  const intstoreId = parseInt(storeId)
  console.log(storeId)
  try {
    const updatedStore = await Store.findOneAndUpdate(
      { _id: intstoreId }, 
      { $set: { location_name: locationName } }, 
      { new: true } // To return the updated document
    );
    console.log(updatedStore)
    if (!updatedStore) {
      return res.status(404).send('StoreID not found');
    }
    
    res.status(200).json(updatedStore);
  } catch (error) {
    console.error('Error updating store:', error.message);
    res.status(500).send(error.message);
  }
});


router.delete('/fetch/store/:storeId', async (req, res) => {
  const { storeId } = req.params;
  const newstoreId = storeId
  try {
    // Use your Store model to find and delete the store connection by its ID
    const deletedStore = await Store.findOneAndDelete({ _id: newstoreId });

    if (!deletedStore) {
      return res.status(404).send('Store connection not found');
    }

    res.status(200).send('Store connection deleted successfully');
  } catch (error) {
    console.error('Error deleting store connection:', error.message);
    res.status(500).send(error.message);
  }
});

router.put('/fetch/location/:locationId', async (req, res) => {
  const { locationId } = req.params;
  const { locationName } = req.body;
  const intlocationId = parseInt(locationId)
  console.log(intlocationId)
  try {
    const updatedLocation = await Store.findOneAndUpdate(
      { _id: intlocationId }, 
      { $set: { location_name: locationName } }, 
      { new: true } // To return the updated document
    );
    console.log(updatedLocation)
    if (!updatedLocation) {
      return res.status(404).send('Location ID not found');
    }
    
    res.status(200).send('Location connection updated successfully');
  } catch (error) {
    console.error('Error updating store:', error.message);
    res.status(500).send(error.message);
  }
});

router.delete('/fetch/location/:locationId', async (req, res) => {
  const { locationId } = req.params;
  const intlocationId = locationId
  try {
    // Use your Store model to find and delete the store connection by its ID
    const deletedLocation = await Store.findOneAndDelete({ _id: intlocationId });

    if (!deletedLocation) {
      return res.status(404).send('Location connection not found');
    }

    res.status(200).send('Location connection deleted successfully');
  } catch (error) {
    console.error('Error deleting Location connection:', error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;