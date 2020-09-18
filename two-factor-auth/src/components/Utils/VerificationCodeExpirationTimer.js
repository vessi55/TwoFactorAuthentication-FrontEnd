import React, { Component } from 'react'

class VerificationCodeExpirationTimer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            minutes: this.props.minutes,
            seconds: this.props.seconds
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const { seconds, minutes } = this.state
            if (seconds > 0) {
                this.setState(({ seconds }) => ({seconds: seconds - 1}))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.interval)
                } 
                else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }   

    render() {
        const { minutes, seconds } = this.state
        return (
            <div>
                <br/>
                <i>За по-голяма сигурност, кодът за верификация изтича след: 0{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</i>
            </div>
        )
    }
}
export default VerificationCodeExpirationTimer