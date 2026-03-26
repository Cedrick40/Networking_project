from django.conf import settings

def user_context(request):
    """Global context for all templates"""
    context = {
        'logo_url': 'images/logo/techhoodnet-logo.png',  # Change to your filename
        'logo_alt': 'TechHoodNet',
        'site_name': 'TechHoodNet',
        'tagline': 'connect · collaborate · grow',
    }
    
    if request.user.is_authenticated:
        context['unread_notifications_count'] = getattr(request.user, 'unread_notifications', 0)
    
    return context

def site_settings(request):
    """Site-wide settings"""
    return {
        'site_settings': {
            'name': 'TechHoodNet',
            'description': 'Connect with IT and CS professionals worldwide',
            'year': 2026,
        }
    }