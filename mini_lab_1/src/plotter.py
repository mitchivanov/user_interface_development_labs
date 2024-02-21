import numexpr as ne
import numpy as np
from matplotlib import pyplot as plt


# Класс для построения графиков
class Plotter:
    def __init__(self, x_min=-20, x_max=20, dx=0.01):
        self.x_min = x_min
        self.x_max = x_max
        self.dx = dx
        self._last_plotted_list_of_function = None
        self._last_plotted_figure = None
        self.parent_window = None

    def set_parent_window(self, parent_window):
        self.parent_window = parent_window

    # Построение графиков функций
    def plot(self, list_of_function, title='Графики функций', x_label='x', y_label='y',
             need_legend=True):
        fig = plt.figure()

        x = np.arange(self.x_min, self.x_max, self.dx)

        new_funcs = [f if 'x' in f else 'x/x * ({})'.format(f) for f in list_of_function]

        ax = fig.add_subplot(1, 1, 1)
        for func in new_funcs:
            ax.plot(x, ne.evaluate(func), linewidth=1.5)

        fig.suptitle(title)
        plt.xlabel(x_label)
        plt.ylabel(y_label)
        if need_legend:
            plt.legend(list_of_function)
        self._last_plotted_list_of_function = list_of_function
        self._last_plotted_figure = fig
        return fig
