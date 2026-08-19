import { Content } from "../models/content.model.js";
import { reWriteContentAPI } from "../services/generateContent.js";
import fs from "fs";
import { ACTIONS, CONTENT_ACTIONS } from "../utils/constants.js";
import mongoose from "mongoose";

export const generateContentController = async (req, res) => {
  // console.log("params", req.params.action);
  try {
    console.log(
      "Started processing of rewriting the content for user id -->",
      req.user.id,
    );

    const { content } = req.body;
    const{action} = req.params;
    

    if (!content) {
      console.log("content is required");
      return res.status(400).json({
        success: false,
        message: "Content is required for rewriting",
      });
    }

    const prompt = 
    `${ACTIONS[action].prompt}
     Here is the content: ${content}`;

    console.log(prompt);

    const response = await reWriteContentAPI(prompt);

    const newContent = await Content.create({
        content_type: action,
        input_content: content,
        output_content: response,
        user_id: req.user.id
    })

    return res.status(200).json({
        success: true,
        message: ACTIONS[action].prompt,
        output: response
    })
  } catch (error) {
    console.log("Error in generating content --> ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getContentHistory = async (req, res) => {
  try {

    const id = req.user.id;

    const content = await Content.find({user_id: id});

    return res.status(200).json({
      success: true,
      message: "Content History fetched Successfully",
      content
    })

  } catch (error) {
    console.log("Error in getting content history --> ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export const searchContent = async (req, res) => {
  try {

    const id = new mongoose.Types.ObjectId(req.user.id);
    const { query } = req.query;


  const searchQuery = query.trim();

  const content = await Content.aggregate([
    {
      $match: {
        user_id: id,
        $or: [
          { input_content: { $regex: searchQuery, $options: "i" } },
          { output_content: { $regex: searchQuery, $options: "i" } },
        ],
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

    return res.status(200).json({
      success: true,
      message: "Content Searched Successfully",
      content
    })

  } catch (error) {
    console.log("Error in getting content history --> ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export const getContentById = async (req, res) => {
  try {
    
    const id = new mongoose.Types.ObjectId(req.params.id);

    const content = await Content.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $project: {
          _id: 0,
          contentId: "$_id",
          prompt: "$input_content",
          output: "$output_content",
          createdAt: 1,
          type: "$content_type"
        }
      }
    ])

    res.status(200).json({
      success: true,
      message: "Content fetched Successfully",
      content,
    })


  } catch (error) {
    console.log("Error in getting content by id --> ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}