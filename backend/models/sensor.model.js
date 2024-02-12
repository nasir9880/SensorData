const mongoose=require('mongoose')

const Schema=mongoose.Schema

const sensorScheme= new Schema(
    {
        air_quality:{type:Number,required:true},
        temperature:{type:Number,required:true},
        humidity:{type:Number,required:true},
        sound_level:{type:Number,required:true},
        wind_speed:{type:Number,required:true},
        water_ph:{type:Number,required:true},
        
    },{
        timestamps:true,
    }
)

const SensorData=mongoose.model('SensorData',sensorScheme)

module.exports=SensorData