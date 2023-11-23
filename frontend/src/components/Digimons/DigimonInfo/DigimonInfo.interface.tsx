import { IDigimon } from "../../../types/digimon";
import { DigimonInfoResponse } from "../../../types/digimonInfo";

export interface DigimonInfoProps {
  digimon: IDigimon;
  onClick: () => void;
}

export interface ModalInfoProps {
  digimonInfo: DigimonInfoResponse;
  handleClose: () => void;
  open: boolean;
  loading: boolean;
}
