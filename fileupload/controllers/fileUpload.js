const File=require("../model/file");

const cloudinary=require("cloudinary").v2;



exports.localFileUpload=async (req,res)=>{
try{ 
   const file=req.files.file;

    console.log(file);

    let path=__dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`; //giving path to a file to upload in a backend server

    console.log(path);

    file.mv(path,(err)=>{
        console.log(err);
    })
    
    res.status(200).json({
        success:true,
        msg:"local file uploaded successfully"
    })
  }
catch(err){
  console.log(err);
}
  }


   

  // image upload
function isSupported(file,supportedType)
{
  return supportedType.includes(file);
}

async function uploadFileToCloudinary(file,folder,quality)
{
  const options={folder}; //used for passing multiple optioins as an object with file in cloudinary
if(quality)
{
  options.quality=quality;// for reducing quality of image while uploading
}
 options.resource_type="auto";//without this videouploading is creating issues

  return await cloudinary.uploader.upload(file.tempFilePath,options);// options can also be passed as {folder}
}

  exports.imageUpload=async(req,res)=>{
   try
    {
      const{name,tags,email}=req.body;
    console.log(name,tags,email);

    const file=req.files.imageFile;
    console.log(file);
    const supportedType=["jpg","jpeg","png"];
    const fileType=file.name.split(".")[1].toLowerCase();
    
    if(!isSupported(fileType,supportedType))
    {
      return res.status(400).json({
        success:false,
        message:"file format not supported"
      })
    }

    //uploading file to cloudinary
    
    const response=await uploadFileToCloudinary(file,"example");
    console.log(response);

    //creating entry in database as well
    const fileData=await File.create({
      name,
      tags,
      email,
      imageUrl:response.secure_url
    })


    res.status(200).json({
      success:true,
      imageUrl:response.secure_url,
      msg:"file uploaded to cloudinary successfully"
    })
}
catch(err){
  console.error(err)
  res.status(400).json({
    success:false,
    msg:"something went wrong"
  })

}
  }

//video upload
exports.videoUpload=async (req,res)=>{
  try{
    const {name,tags,email}=req.body;
    console.log(name,tags,email);

    const file=req.files.videoFile;
    console.log(file);

    const supportedType=["mp4","mov"];
    const fileType=file.name.split(".")[1].toLowerCase();

  if(!isSupported(fileType,supportedType))
  {
    return res.status(400).json({
      success:false,
      msg:"file type not supported"
    })
  }

  const response= await uploadFileToCloudinary(file,"example")
  console.log(response);

    //creating entry in database as well
    const fileData=await File.create({
      name,
      tags,
      email,
      videoUrl:response.secure_url
    })


    res.status(200).json({
      success:true,
      imageUrl:response.secure_url,
      msg:"file uploaded to cloudinary successfully"
    })

  }
  catch(err)
  {
    console.error(err);
    res.status(400).json({
      success:false,
      msg:"something went wrong"
    })
  }
}

//reduced image upload

exports.reducedImageUpload=async(req,res)=>{
  try
   {
     const{name,tags,email}=req.body;
   console.log(name,tags,email);

   const file=req.files.imageFile;
   console.log(file);
   const supportedType=["jpg","jpeg","png"];
   const fileType=file.name.split(".")[1].toLowerCase();
   
   if(!isSupported(fileType,supportedType))
   {
     return res.status(400).json({
       success:false,
       message:"file format not supported"
     })
   }

   //uploading file to cloudinary
   
   const response=await uploadFileToCloudinary(file,"example",90);
   console.log(response);

   //creating entry in database as well
   const fileData=await File.create({
     name,
     tags,
     email,
     imageUrl:response.secure_url
   })


   res.status(200).json({
     success:true,
     imageUrl:response.secure_url,
     msg:"file uploaded to cloudinary successfully"
   })
}
catch(err){
 console.error(err)
 res.status(400).json({
   success:false,
   msg:"something went wrong"
 })

}
 }