import type { Request, Response } from "express";
import { loginUserSchema, registerUserSchema } from "../schema/user.schema.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { Prompt } from "../models/prompt.model.js";
import { generateNames } from "../utils/generateNames.js";
import { Setting } from "../models/setting.model.js";

export const getUserDetails = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user?.id)

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            })
        }
        const prompts = await Prompt.find({
            createdBy: req.user?.id
        }).sort({ createdBy: -1 })

        return res.status(200).json({
            user: {
                _id: user._id,
                email: user.email,
                role: user.role,
                prompts
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            erorr: "Internal server error"
        })
    }
}

export const registerUser = async (req: Request, res: Response): Promise<any> => {
    try {
        // Input sanitization & validation
        const parsed = registerUserSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(403).json({
                error: "Invalid request"
            })
        }
        const { email, password } = parsed.data;
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(403).json({
                error: "User already exists!"
            })
        }
        const hashedPassword = bcrypt.hashSync(password, 5);
        await User.create({
            email,
            password: hashedPassword
        })
        return res.status(201).json({
            message: "User created successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

export const loginUser = async (req: Request, res: Response): Promise<any> => {
    try {

        const parsed = loginUserSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(403).json({
                error: "Invalid request"
            })
        }
        const { email, password } = parsed.data;
        const user = await User.findOne({
            email
        })
        if (!user) {
            return res.status(403).json({
                error: "email or password incorrect"
            })
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(403).json({
                error: "email or password incorrect"
            })
        }

        // JWT token handling
        const token = jwt.sign({ email, role: user.role, id: user._id }, process.env.JWT_SECRET!, {
            expiresIn: "30d"
        })
        res.setHeader("authorization", token)
        return res.status(200).json({
            "user": {
                "email": user.email,
                "role": user.role,
                "id": user._id
            },
            message: "logged in successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}


const ipTracker: { [key: string]: { requests: number, expires: Date } } = {};
// Todo use Redis instead 

export const generate_names = async (req: Request, res: Response): Promise<any> => {
    try {
        const setting = await Setting.findOne();
        const FREE_USER_LIMIT = setting?.maxFreeRequests || 3;
        const WINDOW_MS = (setting?.limitWindowMinutes || 60) * 60 * 1000;
        const { keywords, style, creativity, brandInfo } = req.body;
        if (!keywords || !style || !creativity) {
            return res.status(400).json({
                error: "Missing required parameters: 'keywords', 'style', and 'creativity'."
            });
        }

        if (!req.user) {
            const ip = req.ip as string;
            let guest = ipTracker[ip];
            const now = new Date();

            if (guest && guest.expires < now) {
                // Window expired: delete old record to reset the counter
                delete ipTracker[ip];
                guest = undefined;
            }

            if (!guest) {
                // First request
                ipTracker[ip] = {
                    requests: 1,
                    expires: new Date(now.getTime() + WINDOW_MS)
                };
            }
            // limit not reached
            else if (guest.requests < FREE_USER_LIMIT) {
                guest.requests += 1;
            }
            else {
                // Has hit or exceeded the limit: Block the request
                const remainingTime = Math.ceil((guest.expires.getTime() - now.getTime()) / 60000); // Minutes remaining

                return res.status(429).json({ // 429 is the correct status code for rate limiting
                    error: `Limit request(s) per hour exceeded. Please wait ${remainingTime} minutes or login for unlimited access.`,
                });
            }
        }

        const generatedNames = await generateNames(
            keywords,
            style,
            creativity,
            brandInfo
        );
        return res.json(generatedNames);

    } catch (error) {
        console.error(error); // Use console.error
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}
