interface Field {
  headerName?: string;
  value?: string | JSX.Element;
}

interface CardButton {
  buttonLabel: string;
  onClick: (id?: string) => void;
}

export interface ReusableCardType {
  name: string | JSX.Element;
  id: string | JSX.Element;
  fields: Field[] | [];
  cardButtons: CardButton[];
}

export interface ReusableCardDrawerOptions {
  topRow: JSX.Element[];
  bottomRow: JSX.Element[];
}
