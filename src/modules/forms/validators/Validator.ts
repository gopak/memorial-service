export const PATTERN = {
  PHONE:
    /^((\+)?38)?(0(39|50|63|66|67|68|73|75|77|91|92|93|94|95|96|97|98|99)[0-9]{7})$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
};

export const MIN_LENGTH = {
  NAME: 2,
  CITY: 2,
  ADDRESS: 10,
  PASSWORD: 6,
  PHONE: 13,
  DESCRIPTION: 10,
};

export const MAX_LENGTH = {
  NAME: 50,
  CITY: 50,
  ADDRESS: 110,
  PASSWORD: 22,
  PHONE: 13,
  DESCRIPTION: 5000,
};

export const FORM_ERROR_MESSAGES = {
  DEFAULT: "Введіть коректне значення",
  REQUIRED: "Поле обов'язкове",
  MIN_LENGTH: "Введіть принаймні {length} символів",
  PATTERN_PHONE: "Введіть правильний номер телефону",
  PATTERN_EMAIL: "Введіть правильну електронну пошту",
  PASSWORD_VERIFY: "Паролі не збігаються",
};
