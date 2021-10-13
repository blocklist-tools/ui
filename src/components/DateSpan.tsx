import React, {FunctionComponent} from "react";

interface IDateSpanProps {
  date: Date|null,
  children: React.ReactNode
}

export const DateSpan: FunctionComponent<IDateSpanProps> = ({date, children}) => {
  const title = date ? date.toISOString() : '';
  return (<span title={title}>{children}</span>)
}
