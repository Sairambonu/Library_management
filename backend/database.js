const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/testing',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log('db connected')
}).catch((err)=>{
  console.error('could not connect to db:', err.message)
})


const locationSchema = new mongoose.Schema({
  _id:Number,
  name: String,
  address: String,
});

const Location = mongoose.model('Location', locationSchema);


const bookSchema = new mongoose.Schema({
  _id:Number,
  title: String,
  author: String,
  publication_year: Number,
  genre: String,
  ISBN: Number,
  description: String,
});

const Book = mongoose.model('Book', bookSchema);

const storeSchema = new mongoose.Schema({
  _id:Number,
  location_id: { type: Number, ref: 'Location' },
  book_id: { type: Number, ref: 'Book' },
  location_name: String,
  book_name: String,
});

const Store = mongoose.model('Store', storeSchema);

const UserSchema = new mongoose.Schema({
  _id:String,
  username:String,
  password:String,
})

const User = mongoose.model('User', UserSchema)

const MemberSchema = new mongoose.Schema({
  _id:String,
  username:String,
  role:String,
  late_fee:Number,
  books:Array,
  contact_info:{
    phone:Number,
    address:String
  }
})

const Member = mongoose.model('Member', MemberSchema)


const TranscationSchema = new mongoose.Schema({
  user_id:String,
  books:Array,
  checkin: String,
  checkout:String
}) 

const Transaction =  mongoose.model('Transaction',TranscationSchema)


module.exports = {
  Location,
  Book,
  Store,
  User,
  Member,
  Transaction,
};

