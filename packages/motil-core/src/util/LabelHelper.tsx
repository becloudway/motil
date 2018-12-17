import * as React from "react";
export class LabelHelper {
    static priority(priority: string): React.ReactElement<any> {
        switch (priority) {
        case "High":
            return this.danger("High");
        case "Normal":
            return this.warning("Normal");
        default:
            return this.success("Low");
        }
    }

    static boolean(
    value: boolean | number | any,
    trueText: string = "Ok",
    falseText: string = "Not ok",
  ): React.ReactElement<any> {
        if (value || value === 1) {
            return this.success(trueText);
        }

        return this.danger(falseText);
    }

    static numbered(
    amount: number | null = 0,
    low: number = 10,
    high: number = 50,
  ): React.ReactElement<any> {
        amount = amount || 0;

        if (amount < low) {
            return this.success(amount);
        } else if (amount < high) {
          return this.warning(amount);
      } else {
          return this.danger(amount);
      }
    }

    static success(text: string | number): React.ReactElement<any> {
        return <span className="badge bg-green">{text}</span>;
    }
    static warning(text: string | number): React.ReactElement<any> {
        return <span className="badge bg-orange">{text}</span>;
    }
    static info(text: string | number): React.ReactElement<any> {
        return <span className="badge bg-blue">{text}</span>;
    }
    static danger(text: string | number): React.ReactElement<any> {
        return <span className="badge bg-red">{text}</span>;
    }
}
