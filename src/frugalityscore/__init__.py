"""
frugalityscore.

A fuzzy-based frugality scoring toolbox for Python.
"""

__version__ = "0.1.0"
__author__ = 'Anonymous'
__credits__ = 'Anonymous'

from . import defuzz
from . import variable
from . import membership
from . import system

# import all the membership functions to the top level so that they can be accessed as frugalityscore.memberships._function
__all__ = []
__all__.extend(defuzz.__file__)
__all__.extend(variable.__file__)
__all__.extend(membership.__file__)
__all__.extend(system.__file__)
