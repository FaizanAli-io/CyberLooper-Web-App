import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

def upload_image_to_cloudinary(file):
    try:
        upload_result = cloudinary.uploader.upload(file)
        return upload_result.get("secure_url"), upload_result.get("public_id")
    except Exception as e:
        print(f"Cloudinary upload failed: {e}")
        return None, None

def delete_image_from_cloudinary(public_id):
    try:
        cloudinary.uploader.destroy(public_id)
    except Exception as e:
        print(f"Cloudinary deletion failed: {e}")