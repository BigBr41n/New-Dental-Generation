import mongoose from "mongoose"
const LectureProgressSchema = new mongoose.Schema({
    lectureId:String,
    viewed:Boolean,
    dateViewed: Date
}
)
const CourseProgressSchema = new mongoose.Schema({
    userId: String,
    courseId: String,
    completed: Boolean,
    complitionDate: Date,
    lectureProgress: [LectureProgressSchema]
})
const CourseProgress = mongoose.model('Progress', CourseProgressSchema) 

export default CourseProgress;