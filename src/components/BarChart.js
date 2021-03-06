import React, {Component, PropTypes} from 'react'
import Bar from './Bar'

export default class BarChart extends Component {

    render() {
        // Required props
        const {bars} = this.props
        // Optional props
        const {width, height} = this.props
        const minValue = (this.props.minValue) ? this.props.minValue : 0
        const maxValue = (this.props.maxValue) ? this.props.maxValue : 
            bars
            .reduce((curr, next) => {
                if (curr.value < next.value) {
                    return next
                } else {
                    return curr
                }
            }).value

        const widthOfBars = Math.round(1/bars.length*(parseInt(width, 0) - 40))

        const styles = {
            root: {
                width: '100%',
                height: '100%',
                margin: '0px auto',
                padding: '50px 20px 0px 20px'
            },
            barsContainer: {
                width: '100%',
                height: '100%',
                position: 'relative'
            }
        }

        return (
            <div className="barchart-container">
                <div style={Object.assign({}, styles.root, {width, height})}>
                    <div id="bars-container" style={styles.barsContainer}>
                        {bars.map((bar, i) => {
                            return (
                                <Bar 
                                    key={'bar-' + i}
                                    value={bar.value}
                                    index={i}
                                    orderIndex={bar.orderIndex}
                                    label={bar.label}
                                    width={widthOfBars}
                                    parentWidth={parseInt(width, 0)}
                                    height={(parseInt(bars[i].value,0)/(maxValue - minValue)*100).toFixed(2) + '%'}
                                    style={bar.style}
                                    sorted={bar.sorted} />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

BarChart.propTypes = {
    bars: PropTypes.array,
    width: PropTypes.string,
    height: PropTypes.string,
    minValue: PropTypes.number,
    maxValue: PropTypes.number
}