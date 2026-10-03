export interface NumberedListItem {
  title: string;
  description?: string;
}

export interface AppNumberedListProps {
  items: NumberedListItem[];
  className?: string;
  itemClassName?: string;
  numberClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}
