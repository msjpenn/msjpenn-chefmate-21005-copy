from django.apps import AppConfig


class CommentConfig(AppConfig):
    name = "comment"

    def ready(self) -> None:
        from actstream import registry
        import comment.signals
        registry.register(self.get_model("Comment"))

        return super().ready()
