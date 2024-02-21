from tkinter import Toplevel, Label

# Класс для генерации модальных окон
class ModalWindow:
    def __init__(self, parent, title, labeltext=''):
        self.buttons = []
        self.top = Toplevel(parent)
        self.top.transient(parent)
        self.top.grab_set()
        self.choice = None
        if len(title) > 0:
            self.top.title(title)
        if len(labeltext) == 0:
            labeltext = 'Default text'
        Label(self.top, text=labeltext).pack()

    def add_button(self, button):
        self.buttons.append(button)
        button.pack(pady=5)

    def button_ok(self):
        self.choice = True
        self.top.destroy()

    def button_cancel(self):
        self.choice = False
        self.top.destroy()
