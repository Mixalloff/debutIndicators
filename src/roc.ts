/**
 * The Rate-of-Change (ROC) indicator, which is also referred to as simply Momentum,
 * is a pure momentum oscillator that measures the percent change in price from one period to the next.
 * The ROC calculation compares the current price with the price “n” periods ago.
 * The plot forms an oscillator that fluctuates above and below the zero line as the Rate-of-Change moves from positive to negative.
 * As a momentum oscillator, ROC signals include centerline crossovers, divergences and overbought-oversold readings.
 * Divergences fail to foreshadow reversals more often than not, so this article will forgo a detailed discussion on them.
 * Even though centerline crossovers are prone to whipsaw, especially short-term,
 * these crossovers can be used to identify the overall trend.
 * Identifying overbought or oversold extremes comes naturally to the Rate-of-Change oscillator.
 **/
export class ROC {
    private values: number[] = [];

    constructor(private period = 5) {}

    nextValue(value: number) {
        return this.calculate(value, this.values);
    }

    momentValue(value: number) {
        return this.calculate(value, this.values.slice(0));
    }

    private calculate(value: number, values: number[]) {
        let outed: number;

        if (values.length === this.period) {
            outed = values.shift();
        }

        values.push(value);

        if (values.length !== this.period || outed === undefined) {
            /**
             * The values needs to have N prices in it before a result can be calculated with the following value. For
             * an period of 5, the first result can be given on the 6th value.
             */
            return;
        }

        return (value - outed) / outed;
    }
}