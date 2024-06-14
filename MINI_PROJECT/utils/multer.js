const multer=require("multer");
const path=require("path");
const crypto=require("crypto");

const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,"./public/images/uploads");
    },
    filename:(req,res,cb)=>{
        crypto.randomBytes(12,(err,name)=>{
            const fn=name.toString("hex")+path.extname(file.originalname);
            cb(null,fn);
        })
    }
})
const upload=multer({storage:storage});
module.exports=upload;