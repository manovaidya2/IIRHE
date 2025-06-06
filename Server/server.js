const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const { connectDB } = require("./Database/DB")
const cors = require("cors")
const BannerRouter = require("./Routes/BannerRouter")
const DisciplinesRouter = require("./Routes/DisciplinesRouter")
const DisciplinesCourseRouter = require("./Routes/DisciplinesCourseRouter")
const UniversityRouter = require("./Routes/UniversityRouter")
const AllUniversityRouter = require("./Routes/AllUniversityRouter")
const ResourcesRouter = require("./Routes/ResourcesRouter")
const ProfessionalProfilesRouter = require("./Routes/ProfessionalProfilesRouter")
const MentorshipRequestRouter = require("./Routes/MentorshipRequestRouter")
const MentorOnboardingRouter = require("./Routes/MentorOnboardingRouter")
const GuideContactRouter = require("./Routes/guideContactRoutes")
const consultantRoutes = require("./Routes/consultantRoutes")
const ReachUsRouter = require("./Routes/ReachUsRouter")
const JoinGuideRouter = require("./Routes/JoinGuideRouter")
const DisciplinesCourseDetailsRouter = require("./Routes/DisciplinesCourseDetailsRouter")

const app = express()
app.use(cors())


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set(express.static("./Public"))
app.use("/Public", express.static("Public"))

app.use("/api", BannerRouter)
app.use("/api", DisciplinesRouter)
app.use("/api", DisciplinesCourseRouter)
app.use("/api", DisciplinesCourseDetailsRouter)
app.use("/api", UniversityRouter)
app.use("/api", AllUniversityRouter)
app.use("/api", ResourcesRouter)
app.use("/api", ProfessionalProfilesRouter)
app.use("/api", MentorshipRequestRouter)
app.use("/api", MentorOnboardingRouter)
app.use("/api", GuideContactRouter)
app.use("/api", consultantRoutes)
app.use("/api", ReachUsRouter)
app.use("/api", JoinGuideRouter)
app.get("/test", (req, res) => {
  res.send("API is working fine!");
});
app.listen(process.env.PORT, () => {
    console.log(`server is running at ${process.env.PORT}`)
})

connectDB()