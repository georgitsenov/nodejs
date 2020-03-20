var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogdbNodejs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

var Schema = mongoose.Schema;

var UserSchema = Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['administrator', 'contributor'], default: 'contributor' },
    isActive: { type: String, enum: ['active', 'inactive'], default: 'inactive' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);