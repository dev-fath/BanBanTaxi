import { ILand } from '../../interfaces/geocodeResponse';

export const getTargetName = (land: ILand) => {
  if (land?.addition0?.value !== '') {
    return `${land?.addition0?.value}`;
  } else {
    return `${land.name} ${land.number1} ${land.number2}`;
  }
};
