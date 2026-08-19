import {InferenceClient} from '@huggingface/inference'
import "dotenv/config"

export const client = new InferenceClient(process.env.HUGGING_FACE_ACCESS_TOKEN)