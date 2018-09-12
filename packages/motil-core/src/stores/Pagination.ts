import { observable, computed, action} from "mobx";

export abstract class PaginationStore {
    @observable count = 0;

    @observable start = 0;
    @observable end = 10;

    @action
    next () {
        let start = this.start + 10;
        if (start > this.count) {
            start = this.count;
        }
        
        this.start = start;
        this.setEnd();
    }

    @action
    setEnd () {
        let end = this.start + 10;
        if (end > this.count) {
            end = this.count;
        }

        this.end = end;
    }

    @action
    previous () {
        let start = this.start - 10;
        if (start < 0) {
            start = 0;
        }

        this.start = start;
        this.setEnd();
    }

    abstract get ();

    @action
    init () {
        this.get();
    }
}