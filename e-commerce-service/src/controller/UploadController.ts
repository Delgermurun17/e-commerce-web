import { handleUpload } from "../config/cloudinary";
import { Request, Response } from "express";

const uploader = async (req: Request, res: Response) => {
    const files = req.files
    console.log(files)
    if (!files) return res.status(400).send('No file uploaded')
    try {

        const uploadedImages: string[] = [];
        
        

        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataURI = `data:${file.mimetype};base64,${b64}`

        const result = await handleUpload(dataURI);
        uploadedImages.push(result)
           


        res.json(uploadedImages)
        res.send({success: true})
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading the file')
    }
}

export { uploader }