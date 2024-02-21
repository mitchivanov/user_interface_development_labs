import matplotlib

from src.app import App
from src.buttons import Buttons
from src.commands import Commands
from src.entries import Entries
from src.plotter import Plotter

matplotlib.use('TkAgg')

if __name__ == "__main__":
    # Создаем кнопки
    buttons_main = Buttons()
    # Создаем отрисовщик графиков
    plotter_main = Plotter()
    # Создаем команды для хоткеев
    commands_main = Commands()
    # Создаем текстовые поля
    entries_main = Entries()
    # Регистрация команд
    commands_main.add_command('plot', commands_main.plot)
    commands_main.add_command('add_func', commands_main.add_func)
    commands_main.add_command('save_as', commands_main.save_as)
    commands_main.add_command('open_as', commands_main.open_as)
    commands_main.add_command('delete_focus_entry', commands_main.delete_focus_entry)
    commands_main.add_command('delete_last_entry', commands_main.delete_last_entry)
    # Создаем экземпляр приложения
    app = App(buttons_main, plotter_main, commands_main, entries_main)
    # Добавляем кнопку добавления новой функции
    app.add_button('add_func', 'Добавить функцию', 'add_func', hot_key='<Control-a>')
    app.add_button('delete_focus_entry', 'Удалить активное текстовое поле',
                   'delete_focus_entry')
    app.add_hot_key('<Alt-a>', 'delete_last_entry')
    # Создаем поле ввода
    entries_main.add_entry()
    app.create_menu()
    # Запуск приложеня в цикле
    app.mainloop()
