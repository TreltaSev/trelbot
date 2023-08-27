class snowflake(str, int):
    def __new__(cls, value):
        if isinstance(value, int):
            obj = int.__new__(cls, value)
        else:
            obj = str.__new__(cls, value)
        return obj

    def __init__(self, value) -> None:
        if isinstance(value, int):
            super().__init__()
        else:
            super().__init__(value)

    def __str__(self):
        return str(self)

    def __int__(self):
        return int(self)
