

class Banner:
    """
    Banner
    ~~~~~~

    Contains methods used for basic creation of images
    """

    def __init__(self):
        pass

    
    """Constructs a basic image template and saves to self.image"""
    def _construct_image(self):
        pass
    

class UserBanner(Banner):
    """
    UserBanner
    ~~~~~~~~~~

    Inherits From: Banner

    Specialized methods for applying customized assets to the banner
    """

    def __init__(self):
        super().__init__()

    
    def _apply_pfp(self):
        """Applies a users profile picture by url"""

        pass

    
    def _apply_message(self):
        """Applies a basic welcome/goodbye text centered in the image"""

        pass
    
    
    def _apply_username(self):
        """Applies the username of a member under the applied message"""

        pass