import logging

from auth.base.agents import CheckTokenAgent
from auth.base.models import OauthClient
from auth.google.services import GoogleOauthTokenService
from secrets_env import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(name)s | %(message)s",
    datefmt="[%d-%b-%y %H:%M:%S]",
)


class CheckGoogleTokenAgent(CheckTokenAgent):
    def __init__(self):
        super().__init__("action_check_google_token")

    @property
    def service(self) -> GoogleOauthTokenService:
        client = OauthClient(
            secret=GOOGLE_CLIENT_SECRET,
            id=GOOGLE_CLIENT_ID,
        )
        return GoogleOauthTokenService(client)
