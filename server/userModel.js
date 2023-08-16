const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a new schema for our save user 

const UserSchema = new Schema({
    name: {type : String, required: true},
    email: {type : String, required: true, unique: true},
    password: {type : String, required: true},
    profilePic: {type : String, required: true , default : "https://s3-alpha-sig.figma.com/img/c373/419d/749b3ba6942427a90b4eb80c1511812a?Expires=1692576000&Signature=gUxmAwe7hMq0th5HBRhh6sBPCfsM2rZjbqvwJ9p1N~qXonXlRZm99NeF1Kx7tVuMr4nBRQp8YvbtEC0bp3QL7zEhdktnt1KHvMETVbuZ6mouZtKMvXA~dxsjUM2GVMQOslYS2biT-b2uraBtVWC3wMnlQr61RxdLNpijj1hRH0xA8DLb-Oxzph5cHu6qGycq65LhEAhiCUVIouc-cOB9AIyxELOKKqcJveC8q7SymRgq3jEU0FsZj-S4nXwW3RD-XCBCPv7ylzYWz73GvAwmqqszG1dVnO1ju1FdPCeBb8u~vCJKR4rn5n-LZb8jZOxd7TmYE8Ss16Zvk0YiozK0OQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"},
    phoneNumber: {type : String, required: true},
    address: {type : String},
    aboutMe : {type : String},
    certifications : [{name : {type : String , required : true} , authorizedBy : {type : String , required : true} }],
    education : [{institute : String, year : String , description : String , grade : String, degree : String}],
    experience : [{company : {type : String}, role: {type : String},startDate : {type : String} ,endDate : {type : String}, type: {type : String} , description : {type : String}}],
    skills : [{type : String}],
    projects : [{name : String, year : String , description : String}],
    heading : {type : String},
    connections : [{type : Schema.Types.ObjectId, ref : 'User'}]
});

module.exports = mongoose.model('User', UserSchema);
