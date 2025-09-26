# 📸 Photo Setup Guide

## Adding Titu's Profile Photo

To add Titu's profile photo to the website, follow these steps:

### 1. Prepare the Photo
- **Format**: JPG, PNG, or WebP
- **Size**: At least 400x400 pixels (square recommended)
- **Quality**: High resolution for best results
- **File name**: `titu-avatar.jpg`

### 2. Add the Photo
1. Place the photo file in the `public/images/` directory
2. Name it exactly `titu-avatar.jpg`
3. The website will automatically display it in the About section

### 3. File Structure
```
public/
├── images/
│   └── titu-avatar.jpg  ← Your photo goes here
├── index.html
└── manifest.json
```

### 4. Fallback
If the photo is not found or fails to load, the website will automatically show a placeholder with an elegant design.

### 5. Optimization Tips
- **Compress the image** for faster loading
- **Use square dimensions** for perfect circular display
- **Keep file size under 500KB** for optimal performance

### 6. Testing
After adding the photo:
1. Refresh the website
2. Navigate to the About section
3. Verify the photo displays correctly
4. Test on different devices (mobile, tablet, desktop)

## Current Status
✅ Photo placeholder is ready
✅ Fallback system implemented
✅ Responsive design configured
⏳ Waiting for photo upload

---

**Note**: The photo will be displayed in a beautiful circular frame with elegant shadows and hover effects, maintaining the luxury aesthetic of the website.
