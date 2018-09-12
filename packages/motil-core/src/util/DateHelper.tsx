import TimeAgo from "react-timeago";
import en from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import * as React from "react";

import * as moment from "moment";

const formatter: any = buildFormatter(en);

const months: any = {
    long: {
        dutch: [
            "januari",
            "februari",
            "maart",
            "april",
            "mei",
            "juni",
            "juli",
            "augustus",
            "september",
            "oktober",
            "november",
            "december"
        ],
        english: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]
    },
    short: {
        dutch: [
            "jan",
            "feb",
            "mrt",
            "apr",
            "mei",
            "jun",
            "jul",
            "aug",
            "sep",
            "okt",
            "nov",
            "dec"
        ],
        enlgish: [
            "Jan",
            "Feb",
            "March",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Okt",
            "Nov",
            "Dec"
        ]
    }
};

export function getMonthFull(
    number: number,
    language: string = "english"
): string {
    return months.long[language][number];
}

export function getMonthShort(
    number: number,
    language: string = "english"
): string {
    return months.short[language][number];
}

export function str_pad(n: number): string {
    return String("00" + n).slice(-2);
}

export function getDate(date: Date): string {
    return `${str_pad(date.getDate())} ${getMonthShort(
        date.getMonth()
    )} ${date.getFullYear()}`;
}

export function getDateStandardNotation(date: Date): string {
    return `${date.getFullYear()}-${str_pad(date.getMonth())}-${str_pad(
        date.getDate()
    )}`;
}

export function getTime(date: Date): string {
    return `${str_pad(date.getHours())}:${str_pad(date.getMinutes())}:${str_pad(
        date.getSeconds()
    )}`;
}

export function getTimeStamp (date: Date) : string {
    return getDateStandardNotation(date) + " - " + getTime(date);
}

export function getTimePast(date: Date): TimeAgo {
    return <TimeAgo date={date} formatter={formatter} />;
}

export function toLocalDate(date: Date | string): Date {
    return moment(moment.utc(date))
        .local()
        .toDate();
}

