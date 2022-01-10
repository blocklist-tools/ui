import React, {FunctionComponent} from "react";

interface DateSpanProps {
  date: Date|null,
  children: React.ReactNode
}

export const DateSpan: FunctionComponent<DateSpanProps> = ({date, children}) => {
  const title = date ? date.toISOString() : '';
  return (<span title={title}>{children}</span>)
}
