import React, {FunctionComponent, useState} from "react";
import "./EntrySearch.css";

interface IEntrySearch {
    onSubmit: (arg0: string)=>void;
}

export const EntrySearch: FunctionComponent<IEntrySearch> = (props: IEntrySearch) =>  {
    const [query, setQuery] = useState('');

    function handleChangedQuery(event: { target: HTMLInputElement; }) {
        setQuery(event.target.value.trim().toLowerCase());
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        try {
            const hostname = new URL(query).hostname
            props.onSubmit(hostname);
        } catch (e) {
            props.onSubmit(query);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={"component-entry-search"}>
            <label hidden htmlFor="entry-search-input">URL Search</label>
            <input
                id="entry-search-input"
                title="Search for domain name or URL"
                type="text"
                spellCheck="false"
                name="urlSearch"
                placeholder="Domain or URL"
                value={query}
                onChange={handleChangedQuery}
            />
            <button type={"submit"}>&#128269;</button>
        </form>
    );
};