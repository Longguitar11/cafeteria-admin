export interface Props {
    className?: string

}

export type Hovered = { header?: boolean; sidebar?: boolean };

export type DropdownHoverType = {
  account?: Hovered;
};