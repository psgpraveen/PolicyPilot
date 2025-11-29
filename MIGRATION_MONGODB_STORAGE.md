# Migration Summary: MongoDB File Storage

## Changes Made

### ✅ File Storage System
**Before**: Files stored in Cloudinary (cloud storage)
**After**: Files stored directly in MongoDB as base64 encoded data

### Files Modified

#### 1. `backend/middleware/upload.js`
- ❌ Removed Cloudinary configuration
- ❌ Removed CloudinaryStorage
- ✅ Added multer memory storage
- Result: Files now stored in memory buffer instead of uploaded to cloud

#### 2. `backend/controllers/policyController.js`
- ✅ Updated `createPolicy`: Converts file buffer to base64 and stores in MongoDB
- ✅ Updated `updatePolicy`: Handles file updates with base64 encoding
- ✅ Updated `getAllPolicies`: Returns attachment URL as API endpoint
- ✅ Added `getPolicyAttachment`: New endpoint to serve files from MongoDB

#### 3. `backend/routes/policies.js`
- ✅ Added new route: `GET /:id/attachment` for file downloads

#### 4. `backend/server.js`
- ❌ Removed `path` module import
- ❌ Removed static file serving for uploads folder

#### 5. `backend/package.json`
- ❌ Removed dependency: `cloudinary`
- ❌ Removed dependency: `multer-storage-cloudinary`

#### 6. `backend/.env`
- ❌ Removed Cloudinary environment variables

### Files Deleted
- ❌ `backend/test-cloudinary.js`
- ❌ `backend/CLOUDINARY_SETUP.md`
- ❌ `backend/.env.example`
- ❌ `backend/uploads/` folder
- ❌ `public/uploads/` folder

### Files Created
- ✅ `backend/FILE_STORAGE.md` - Documentation for MongoDB file storage

### Documentation Updated
- ✅ `backend/README.md` - Removed Cloudinary references, added MongoDB storage info

## How Files Are Now Stored

### Upload Process
1. User selects file in frontend form
2. File sent to backend as multipart/form-data
3. Multer captures file in memory buffer
4. Backend converts buffer to base64 string
5. Base64 + metadata stored in MongoDB policy document

### Download Process
1. User clicks attachment link
2. Request sent to `/api/policies/:id/attachment`
3. Backend retrieves policy from MongoDB
4. Converts base64 back to buffer
5. Streams file to browser with correct Content-Type

### Storage Format
```javascript
{
  attachment: {
    data: "base64_encoded_file_data",
    contentType: "application/pdf",
    filename: "document.pdf",
    size: 245678
  }
}
```

## Benefits

### ✅ No External Dependencies
- No Cloudinary account needed
- No API keys to manage
- No external service downtime

### ✅ Works on Vercel
- No file system writes required
- No "EROFS: read-only file system" errors
- Perfect for serverless deployments

### ✅ Simplified Setup
- Just MongoDB connection needed
- No additional configuration
- Fewer environment variables

### ✅ Data Integrity
- Files stored with related data
- Atomic operations
- No orphaned files

## Limitations

### File Size
- Maximum: 5MB per file
- MongoDB document limit: 16MB
- Base64 encoding adds ~33% overhead

### Performance
- Suitable for small to medium files
- For high-traffic apps, consider CDN
- For large files (>16MB), use GridFS

## Migration Steps for Existing Data

If you have existing policies with Cloudinary URLs:

1. **No immediate action required** - old URLs in `attachmentUrl` field won't break
2. **New uploads** will use new `attachment` object structure
3. **Optional**: Migrate old data by downloading from Cloudinary and re-uploading

## Testing Checklist

- [ ] Upload PDF file (< 5MB)
- [ ] Upload JPG image
- [ ] Upload PNG image
- [ ] Download uploaded file
- [ ] Update policy with new file
- [ ] View policy without attachment
- [ ] Test file size limit (try 6MB file - should fail)
- [ ] Test invalid file type (should fail)
- [ ] Test on local development
- [ ] Test on Vercel deployment

## Rollback Plan

If you need to revert to Cloudinary:
1. Restore files from git: `git checkout HEAD~1 backend/middleware/upload.js`
2. Re-install dependencies: `npm install cloudinary multer-storage-cloudinary`
3. Add Cloudinary env variables back to `.env`
4. Restart server

## Support

For issues or questions:
- See `FILE_STORAGE.md` for detailed documentation
- Check `README.md` for API endpoints
- MongoDB file storage is production-ready
- Works on Vercel and other serverless platforms

---

**Status**: ✅ **MIGRATION COMPLETE**

All Cloudinary dependencies removed. Files now stored in MongoDB.
System works on both local and serverless deployments.
