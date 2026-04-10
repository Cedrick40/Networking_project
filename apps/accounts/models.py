from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """Custom User Model"""
    # Personal Info
    bio = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    location = models.CharField(max_length=100, blank=True)
    
    # Professional Info
    job_title = models.CharField(max_length=100, blank=True)
    company = models.CharField(max_length=100, blank=True)
    experience_years = models.IntegerField(default=0, blank=True)
    
    # Skills (store as comma-separated values)
    skills = models.TextField(blank=True, help_text="Enter skills separated by commas")
    
    # Social Links
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    website = models.URLField(blank=True)
    
    # Profile visibility
    is_public = models.BooleanField(default=True)
    
    # Stats
    profile_views = models.IntegerField(default=0)
    joined_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # Add this field with your other fields
    has_seen_welcome = models.BooleanField(default=False)   
    
    def __str__(self):
        return self.username
    
    def get_skills_list(self):
        """Return skills as a list"""
        if self.skills:
            return [skill.strip() for skill in self.skills.split(',')]
        return []
    
    @property
    def profile_completion_percentage(self):
        """Calculate profile completion percentage"""
        # List of fields to check for profile completion
        fields = ['bio', 'avatar', 'location', 'job_title', 'company', 'skills']
        filled = 0
        for field in fields:
            value = getattr(self, field, None)
            if value and value != '':
                filled += 1
        return int((filled / len(fields)) * 100)  