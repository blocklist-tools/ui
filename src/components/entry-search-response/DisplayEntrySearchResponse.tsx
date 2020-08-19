import React, {FunctionComponent} from "react";
import {EntrySearchResponse, EntrySummary} from "../../services/ApiClient";
import "./DisplayEntrySearchResponse.css";

interface IDisplayEntrySearchResponse {
    entrySearchResponse: EntrySearchResponse|null
}

function dateSpan(date: Date) {
    return (<span title={date.toISOString()}>{date.toDateString()}</span>)
}

function includedIcon(entry: EntrySummary) {
    const isIncluded = entry.removedVersionId !== null;
    const className = [
        'included-icon',
        isIncluded ? 'is-removed' : 'is-included'
    ].join(' ');
    const icon = isIncluded ? '🚫' : '✔';

    return (<span className={className}>{icon}</span>);
}

function entryStatus(entry: EntrySummary) {
    const isIncluded = entry.removedVersionId !== null;

    let blockedStatusHtml = (<span>Current</span>);
    if (isIncluded) {
        blockedStatusHtml = dateSpan(entry.removedOn);
    }
    return (
        <div>
            {includedIcon(entry)}
            {dateSpan(entry.addedOn)} - {blockedStatusHtml}
        </div>
    );
}

export const DisplayEntrySearchResponse: FunctionComponent<IDisplayEntrySearchResponse> = (props: IDisplayEntrySearchResponse) =>  {
    if (!props.entrySearchResponse) {
        return null;
    }
    let content = null
    if (props.entrySearchResponse.summaries.length === 0) {
        content = (
            <div>No known list contains {props.entrySearchResponse.query}</div>
        );
    } else {
        const listItems = props.entrySearchResponse.summaries.map((entry) => {
            return (
                <li key={entry.addedVersionId}>
                    <div className={'blocklist-name'}>{entry.blocklistName}</div>
                    {entryStatus(entry)}
                </li>
            );
        });
        content = (
            <div>
                <p>Blocklists that contain a matching entry, including the date it was first added, and optionally removed.</p>
                <ul>{listItems}</ul>
            </div>
        )
    }

    return (
        <section className={'component-display-entry-search-response'}>
            <h2>
                List Entries
            </h2>
            {content}
        </section>
    );
};