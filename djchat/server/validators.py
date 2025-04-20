from PIL import Image, UnidentifiedImageError
from django.core.exceptions import ValidationError
import os


def validate_icon(image):
    ext = os.path.splitext(image.name)[1]
    if ext.lower() not in [".svg", ".jpg", ".jpeg", ".png"]:
        print(ext)
        raise ValidationError(
            "only ['.svg', '.jpg', '.jpeg','.png'] filetypes are supported"
        )
    if ext.lower() in [".jpg", ".jpeg", ".png"]:
        try:
            with Image.open(image) as img:
                if img.width > 70 or img.height > 70:
                    raise ValidationError(
                        f"Maximum size of image can't be exceeded 70x70 , your image is {img.size}"
                    )
        except UnidentifiedImageError:
            raise ValidationError("Could not process the image")
    return True


def validate_image_file_type(image):
    ext = os.path.splitext(image.name)[1]
    if ext.lower() not in [".jpg", ".jpeg", ".png"]:
        raise ValidationError("only [ '.jpg', '.jpeg','.png'] filetypes are supported")
    return True
