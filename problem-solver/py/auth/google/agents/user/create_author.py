import logging

from auth.base.agents import CreateAuthorAgent
from auth.google.services import GoogleOauthUserService


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(name)s | %(message)s",
    datefmt="[%d-%b-%y %H:%M:%S]",
)


class CreateGoogleAuthorAgent(CreateAuthorAgent):
    def __init__(self):
        super().__init__("action_create_google_author")

    @property
    def service(self) -> GoogleOauthUserService:
        return GoogleOauthUserService()

    @property
    def token_agent_action(self) -> str:
        return "action_create_google_tokens"
