import { Webhook } from "svix";
import User from "../models/User.js";


// api controller function to manage clerk user with database

// export const clerkWebhooks = async (req, res) => {
//     try {
//         console.log('Webhook received');
        
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//         await whook.verify(JSON.stringify(req.body), {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"]
//         })


//         const {data, type} = req.body;

//         switch (type) {
//             case 'user.created': {
//                 const userData = {
//                     _id: data.id,
//                     email: data.email_addresses[0].email_address,
//                     name: data.first_name + " " + data.last_name,
//                     imageUrl : data.image_url,
//                 }
//                 await User.create(userData);
//                 res.json({})
//                 break;
//             }

//             case 'user.updated': {
//                 const userData = {
           
//                     email: data.email_addresses[0].email_address,
//                     name: data.first_name + " " + data.last_name,
//                     imageUrl : data.image_url,
//                 }
//                 await User.findByIdAndUpdate(data.id, userData);
//                 res.json({})
//                 break;
//             }


//             case 'user.deleted': {
             
//                 await User.findByIdAndDelete(data.id);
//                 res.json({})
//                 break;
//             }
        
//             default:
//                 break;
//         }
//     } catch (error) {
//                 res.json({success: false, message: error.message})
        
//     }
// }

export const clerkWebhooks = async (req, res) => {
  try {
    console.log('Webhook received:', req.rawBody);

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    await whook.verify(req.rawBody, headers);

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
                     _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl : data.image_url,
        };
        console.log('Creating user:', userData);
        await User.create(userData);
        break;
      }


      case "user.updated": {
        const userData = {
           email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl : data.image_url,
        };
        console.log('Updating user:', userData);

        const existingUser = await User.findById(data.id);
        if (existingUser) {
          await User.findByIdAndUpdate(data.id, {
            ...userData,
            role: existingUser.role || 'user',
          });
        }
        break;
      }


      case "user.deleted": {
        console.log('Deleting user:', data.id);
        await User.findByIdAndDelete(data.id);
        break;
      }


      default:
        break;
    }

    res.json({ success: true, message: "Webhook received successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Something is wrong" });
  }
};