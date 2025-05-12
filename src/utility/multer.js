import multer from 'multer'
import path from 'path'
import * as url from 'url'

const _dirname = url.fileURLToPath(new URL('.',import.meta.url))
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(_dirname,'../upload'))
    },
    filename:(req,file,cb)=>{
        const uploadPath = path.join(_dirname,'../upload',file.originalname);
        if(fs.existsSync(uploadPath))
    {
        cb(new Error('File already exists!'));
    }else{
        cb(null, file.originalname);
    }
    },
});
const upload = multer({
    storage,
    limits:{
        filesize:1024*1024*5,
    },
    fileFilter:(req,file,cb)=>{
        if(file.mimetype.startsWith('image/')){
            cb(null,true);

        }else{
            cb(new Error('Only image files are allowed!'), false);

        }
    },
});
export default upload