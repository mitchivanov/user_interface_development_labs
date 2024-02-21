import json
from tkinter import Button, TOP, BOTH, Entry
from typing import Optional

from matplotlib.backends.backend_tkagg import (FigureCanvasTkAgg,
                                               NavigationToolbar2Tk)
from tkinter.filedialog import asksaveasfile, askopenfilename

from .modal_window import ModalWindow

# Класс для хранения команд
class Commands:
    class State:
        def __init__(self):
            self.list_of_function = []

        def save_state(self):
            tmp_dict = {'list_of_function': self.list_of_function}
            file_out = asksaveasfile(defaultextension=".json")
            if file_out is not None:
                json.dump(tmp_dict, file_out)
            return self

        def import_state(self):
            file_in = askopenfilename(defaultextension=".json")
            imported_func = []
            if file_in is not None:
                with open(file_in, "r") as f:
                    tmp_dict = json.load(f)
                for func in tmp_dict["list_of_function"]:
                    imported_func.append(func)
            return imported_func

        def reset_state(self):
            self.list_of_function = []

    def __init__(self):
        self.command_dict = {}
        self.__figure_canvas: Optional[FigureCanvasTkAgg] = None
        self.__navigation_toolbar = None
        self._state = Commands.State()
        self.__empty_entry_counter = 0
        self.parent_window = None

    def set_parent_window(self, parent_window):
        self.parent_window = parent_window

    def add_command(self, name, command):
        self.command_dict[name] = command

    def get_command_by_name(self, command_name):
        return self.command_dict[command_name]

    def __forget_canvas(self):
        if self.__figure_canvas is not None:
            self.__figure_canvas.get_tk_widget().pack_forget()

    def __forget_navigation(self):
        if self.__navigation_toolbar is not None:
            self.__navigation_toolbar.pack_forget()

    def plot(self, *args, **kwargs):
        def is_not_blank(s):
            return bool(s and not s.isspace())
        self._state.reset_state()
        list_of_function = []
        for entry in self.parent_window.entries.entries_list:
            get_func_str = entry.get()
            self._state.list_of_function.append(get_func_str)
            if is_not_blank(get_func_str):
                list_of_function.append(get_func_str)
            else:
                if self.__empty_entry_counter == 0:
                    mw = ModalWindow(parent=self.parent_window, title='Пустая строка',
                                     labeltext='Это пример модального окна, '
                                               'возникающий, если ты ввел '
                                               'пустую '
                                               'строку. С этим ничего '
                                               'делать не нужно. '
                                               'Просто нажми OK :)')
                    ok_button = Button(master=mw.top, text='OK', command=mw.button_cancel)
                    mw.add_button(ok_button)
                    self.__empty_entry_counter = 1

        self.__empty_entry_counter = 0
        figure = self.parent_window.plotter.plot(list_of_function)
        self._state.figure = figure
        self.__forget_canvas()
        self.__figure_canvas = FigureCanvasTkAgg(figure, self.parent_window)
        self.__forget_navigation()
        self.__navigation_toolbar = NavigationToolbar2Tk(self.__figure_canvas, self.parent_window)
        self.__figure_canvas.get_tk_widget().pack(side=TOP, fill=BOTH, expand=1)
        plot_button = self.parent_window.get_button_by_name('plot')
        if plot_button:
            plot_button.destroy()

    def add_func(self, *args, **kwargs):
        self.__forget_canvas()
        self.__forget_navigation()
        self.parent_window.entries.add_entry()

    def save_as(self):
        self._state.save_state()
        return self

    def open_as(self):
        self.__forget_canvas()
        self.__forget_navigation()
        imported_list = self._state.import_state()
        for func in imported_list:
            self.parent_window.entries.add_filled_entry(func)
        return self

    def delete_focus_entry(self):
        focus_entry: Entry = self.parent_window.focus_get()
        if not focus_entry:
            return
        for i, entry in enumerate(self.parent_window.entries.entries_list):
            if focus_entry == entry:
                if entry.get():
                    if not self.choice_delete():
                        return
                self.parent_window.entries.entries_list.pop(i)
                focus_entry.pack_forget()
                break
        if not self.parent_window.get_button_by_name("plot").winfo_exists():
            self.plot()

    def delete_last_entry(self, e):
        if self.parent_window.entries.entries_list:
            deleted_entry = self.parent_window.entries.entries_list[-1]
            if deleted_entry.get():
                if not self.choice_delete():
                    return
            deleted_entry.pack_forget()
            self.parent_window.entries.entries_list.pop(-1)

            if not self.parent_window.get_button_by_name("plot").winfo_exists():
                self.plot()

    def choice_delete(self):
        mw = ModalWindow(parent=self.parent_window, title='Удаление непустой строки',
                         labeltext="""Ты уверен, что хочешь удалить непустую строку?""")
        ok_button = Button(master=mw.top, text='Да', command=mw.button_ok)
        cancel_button = Button(master=mw.top, text='Нет', command=mw.button_cancel)
        mw.add_button(ok_button)
        mw.add_button(cancel_button)
        self.parent_window.wait_window(mw.top)
        return mw.choice
