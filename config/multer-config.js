const multer= require('multer')

const storage=multer.memoryStrorage()
const upload=multer({storage:storage})