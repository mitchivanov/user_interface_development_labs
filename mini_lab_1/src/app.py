from functools import partial
from tkinter import Tk, BOTH, Menu
from typing import Optional

from src.buttons import Buttons
from src.commands import Commands
from src.entries import Entries
from src.plotter import Plotter


# Класс приложения
class App(Tk):
    def __init__(self, buttons, plotter, commands, entries):
        super().__init__()
        self.buttons: Optional[Buttons] = buttons
        self.plotter: Optional[Plotter] = plotter
        self.commands: Optional[Commands] = commands
        self.entries: Optional[Entries] = entries
        for obj in [self.entries, self.commands, self.plotter, self.buttons]:
            obj.set_parent_window(self)

    def add_button(self, name, text, command_name, *args, **kwargs):
        hot_key = kwargs.get('hot_key')
        if hot_key:
            kwargs.pop('hot_key')
        callback = partial(self.commands.get_command_by_name(command_name), *args, **kwargs)
        new_button = self.buttons.add_button(name=name, text=text, command=callback)
        if hot_key:
            self.bind(hot_key, callback)
        new_button.pack(fill=BOTH)

    def add_hot_key(self, hot_key, command_name, *args, **kwargs):
        callback = partial(self.commands.get_command_by_name(command_name), *args, **kwargs)
        self.bind(hot_key, callback)

    def get_button_by_name(self, name):
        return self.buttons.buttons.get(name)

    def create_menu(self):
        menu = Menu(self)
        self.config(menu=menu)

        file_menu = Menu(menu)
        file_menu.add_command(label="Save as...",
                              command=self.commands.get_command_by_name('save_as'))
        file_menu.add_command(label="Open as...",
                              command=self.commands.get_command_by_name('open_as'))
        menu.add_cascade(label="File", menu=file_menu)
