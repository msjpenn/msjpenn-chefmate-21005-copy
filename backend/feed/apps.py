from django.apps import AppConfig


class FeedConfig(AppConfig):
    name = "feed"

    def ready(self) -> None:
        import feed.signals

        return super().ready()
