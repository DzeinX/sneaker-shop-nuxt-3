export interface IGender {
  nameForGender: string;
  nameForTitle: string;
}

export const male: IGender = {
  nameForGender: 'Мужской',
  nameForTitle: 'Мужские',
}

export const female: IGender = {
  nameForGender: 'Женский',
  nameForTitle: 'Женские',
}

export const universal: IGender = {
  nameForGender: 'Универсальный',
  nameForTitle: 'Универсальные',
}