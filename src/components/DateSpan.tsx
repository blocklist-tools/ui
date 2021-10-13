import React, {FunctionComponent} from "react";

interface IDateSpanProps {
  date: Date|null,
  altText: string|null
}

export const DateSpan: FunctionComponent<IDateSpanProps> = ({date, altText}) => {
  let text = '';
  let title = null;
  if (date) {
    text = date.toDateString();
    title = date.toISOString();
  }
  if (altText) {
    text = altText;
  }
  title = title || text;
  return (<span title={title}>{text}</span>)
}
