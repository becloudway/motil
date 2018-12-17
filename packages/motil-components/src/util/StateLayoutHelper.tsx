import { ClientState, ServerState } from "../enum/State";
import { LabelHelper } from "./LabelHelper";

export interface MarkupObject {
    color: string;
    bgColor: string;
    label: string;
    button: string;
    textarea: string;
    textbox: string;
    box: string;
    spinner: string;
    spinnerActive: boolean;
    notifyMessage: string;
    notification: string;
}

export function stateToLabelLayout(state: ClientState | ServerState, value?: any) {
    value = value || state;

    switch (state) {
    case ClientState.COMPLETED:
    case ClientState.SUCCESFULL:
    case ClientState.SUCCESS:
    case ClientState.PROVISIONED:
        return LabelHelper.success(value);

    case ClientState.WARNING:
    case ClientState.ROLLING:
    case ClientState.WAITING:
        return LabelHelper.warning(value);

    case ClientState.PENDING:
    case ClientState.PROVISIONING:
    case ClientState.LOADING:
        return LabelHelper.info(value);

    case ClientState.ERROR:
    case ClientState.COMPLETED_WITH_ERRORS:
    case ClientState.TIMEDOUT:
        return LabelHelper.danger(value);
    default:
        return LabelHelper.info("INVALID_STATE");
    }
}

export function stateToMarkupObject(state: ClientState | ServerState) : MarkupObject {
    switch (state) {
    case ClientState.COMPLETED:
    case ClientState.SUCCESFULL:
    case ClientState.SUCCESS:
    case ClientState.PROVISIONED:
        return {
            color: "white",
            bgColor: "green",
            label: "badge bg-green",
            button: "btn btn-success",
            textarea: "br-success",
            textbox: "txt-success",
            box: "box-success",
            spinner: "spinner-success",
            spinnerActive: false,
            notifyMessage: "notify-success",
            notification: "notification-message",
        };

    case ClientState.WARNING:
    case ClientState.ROLLING:
    case ClientState.WAITING:
        return {
            color: "white",
            bgColor: "orange",
            label: "badge bg-orange",
            button: "btn btn-warning",
            textarea: "br-warning",
            textbox: "txt-warning",
            box: "box-warning",
            spinner: "spinner-warning",
            spinnerActive: false,
            notifyMessage: "notify-warning",
            notification: "notification-message",
        };

    case ClientState.PENDING:
    case ClientState.PROVISIONING:
    case ClientState.LOADING:
    default:
        return {
            color: "white",
            bgColor: "primary",
            label: "badge bg-primary",
            button: "btn btn-primary",
            textarea: "br-primary",
            textbox: "txt-primary",
            box: "box-primary",
            spinner: "spinner-primary",
            spinnerActive: false,
            notifyMessage: "notify-primary",
            notification: "notification-message",
        };

    case ClientState.ERROR:
    case ClientState.COMPLETED_WITH_ERRORS:
    case ClientState.TIMEDOUT:
        return {
            color: "white",
            bgColor: "red",
            label: "badge bg-danger",
            button: "btn btn-danger",
            textarea: "br-danger",
            textbox: "txt-danger",
            box: "box-danger",
            spinner: "spinner-danger",
            spinnerActive: false,
            notifyMessage: "notify-danger",
            notification: "notification-danger",
        };
    }
}
