from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.shortcuts import get_object_or_404

from .validators import validate_icon, validate_image_file_type

# Create your models here.


def upload_category_image_path(instance, filename):
    return f"category/{instance.id}/icon/{filename}"


def upload_server_icon_path(instance, filename):
    return f"server/{instance.id}/icon/{filename}"


def upload_server_banner_path(instance, filename):
    return f"server/{instance.id}/banner/{filename}"


class Category(models.Model):
    name = models.CharField(
        max_length=100,
        null=True,
    )
    description = models.TextField(blank=True, null=True)
    icon = models.FileField(
        blank=True,
        null=True,
        upload_to=upload_category_image_path,
        validators=[
            validate_icon,
        ],
    )

    def save(self, *args, **kwargs):
        if not self.id and not self.pk:
            icon_file = self.icon
            self.icon = None
            super().save(*args, **kwargs)
            self.icon = icon_file
        elif self.id:
            this = get_object_or_404(Category, id=self.id)
            if this.icon != self.icon:
                this.icon.delete(save=False)

        super(Category, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class Server(models.Model):
    name = models.CharField(max_length=100, null=True, blank=False)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.RESTRICT,
        related_name="server_owner",
        null=False,
    )
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="server_category", null=True
    )
    description = models.CharField(blank=True, null=True, max_length=500)
    member = models.ManyToManyField(settings.AUTH_USER_MODEL)
    icon = models.FileField(
        blank=True,
        null=True,
        upload_to=upload_server_icon_path,
        validators=[
            validate_icon,
        ],
    )
    banner = models.ImageField(
        blank=True,
        null=True,
        upload_to=upload_server_banner_path,
        validators=[
            validate_image_file_type,
        ],
    )

    def save(self, *args, **kwargs):
        if not self.id and not self.pk:
            icon_file = self.icon
            banner_file = self.banner
            self.icon = None
            self.banner = None
            super().save(*args, **kwargs)
            self.icon = icon_file
            self.banner = banner_file
            self.save()

        elif self.id:
            this = get_object_or_404(Server, id=self.id)
            if this.icon != self.icon:
                this.icon.delete(save=False)
            if this.banner != self.banner:
                this.banner.delete(save=False)
            super(Server, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.id}"


class Channel(models.Model):
    name = models.CharField(max_length=100, null=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="channel_owner"
    )
    topic = models.CharField(max_length=100)
    server = models.ForeignKey(
        Server, on_delete=models.CASCADE, related_name="channel_server"
    )

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        super(Channel, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


# Signals


@receiver(models.signals.pre_delete, sender="server.Category")
def category_delete_files(sender, instance, **kwargs):
    for field in instance._meta.fields:
        if field.name == "icon":
            file = getattr(instance, field.name)
            if file:
                print("file deleted")
                file.delete(save=False)


@receiver(models.signals.pre_delete, sender="server.Server")
def server_delete_files(sender, instance, **kwargs):
    print(instance.pk)
    for field in instance._meta.fields:
        if field.name in ["icon", "banner"]:
            file = getattr(instance, field.name)
            if file:
                print("file deleted")
                file.delete(save=False)
