const express=require('express')
const router=express.Router()
const authMiddleware=require('../middleware/auth')
const {ShareLink}=require('../schema/ShareLink.schema')
const {SharingByEmail}=require('../schema/shareByEmail.schema')
const {User}=require('../schema/user.schema')
router.post('/',authMiddleware,async(req,res)=>{
    try{
     const {token,dashboardId,folderIds,formIds,accessLevel='view',emailto}=req.body  

const sharedLink=new ShareLink({
    token,
    dashboardId,
    folderIds,
    formIds,
    accessLevel
});
await sharedLink.save();

if(emailto){
    const sharingByEmail=new SharingByEmail({
        emailto,
        accessLevel,
        dashboardId,
        folderIds,
        formIds,
        sharedBy:req.user._id,
    })
    await sharingByEmail.save() 
}
res.status(201).json({message:'Share link created successfully'})
 }catch(error){
        console.log('Error creating share link',error)
        res.status(500).json({message:'Failed to create share Link'});

    }
});

router.get('/myshare',authMiddleware,async(req,res)=>{
   

        try {
            // Fetch the user's details by _id from middleware
            const user = await User.findById(req.user._id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Fetch sharing records based on sharedBy (user's _id)
            const sharingByEmail = await SharingByEmail.find({ sharedBy: req.user._id })
                .populate('sharedBy', 'name'); // Ensure `sharedBy` references the User model
    
            res.json(sharingByEmail);
        } catch (error) {
            console.error('Error fetching sharing records:', error.message);
            res.status(500).json({ message: 'Failed to fetch sharing records' });
        }

})

module.exports=router;
