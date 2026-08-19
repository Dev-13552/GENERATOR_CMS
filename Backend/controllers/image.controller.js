import 'dotenv/config'
import { RESOLUTION_MAP } from '../utils/constants.js';
import { generateImageBlob } from '../services/generateImageHF.js';
import fs from 'fs'
import { uploadImage } from '../utils/uploadImage.js';
import { Image } from '../models/image.model.js';
import mongoose from 'mongoose';

export const generateImageController = async (req, res) => {
    try {
        const {prompt, resolution} = req.body;

        // hugging face api key check from env --> add later

        if(!prompt){
            return res.status(400).json({
                success: false,
                message: "Invalid Input",
            })
        }

        const dimension = RESOLUTION_MAP[resolution];
        
        // Call service for generating the image
        const image = await generateImageBlob(prompt, dimension);

        // Handle the image format
        const buffer = Buffer.from(await image.arrayBuffer());

        // fs.writeFileSync("output.png", buffer);

        const result = await uploadImage(buffer);

        await Image.create({
            prompt,
            image_url: result?.secure_url,
            user_id: req.user.id
        })
        
        return res.status(200).json({
            success: true,
            message: "Image generated Successfully",
            imageUrl: result?.secure_url,
        })

    } catch (error) {
        console.log("Error in generating image -->",error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}
export const getImageHistoryController = async (req, res) => {
    try {
        const id = req.user.id;
        console.log(typeof id)
        const images = await Image.find({user_id: id});
        console.log("Images-->",images)
        return res.status(200).json({
            success: true,
            message: "Images fetched Successfully",
            images
        })

    } catch (error) {
        console.log("Error in getting image history -->",error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}


