from typing import Optional, Union

class Configuration:
  """
  A guild configuration class
  that holds methods and values that allow
  you to format to and from a json serializable string, 
  dictionary, and this object.  

  :param configuruation: A Optional Initial Paramter which can form the object automatically depending on what is inserted.
  :type configuuration: Optional[Union[str, dict, None]] = None
  :return: Nothing
  :rtype: None  
  """

  def __init__(self, configuration: Optional[Union[str, dict, None]] = None):
    self._base_level_configuration = configuration

