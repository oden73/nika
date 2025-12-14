import logging

from auth.google.agents import GoogleAgent
from cal.base.agents import DeleteEventAgent
from cal.google.services import GoogleEventService


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(name)s | %(message)s",
    datefmt="[%d-%b-%y %H:%M:%S]",
)


class DeleteGoogleEventAgent(DeleteEventAgent, GoogleAgent):
    def __init__(self):
        self._service: GoogleEventService | None = None
        super().__init__("action_delete_google_calendar_event")

    @property
    def event_service(self):
        if self._service is None:
            self._service = GoogleEventService(self.logger)
        return self._service
