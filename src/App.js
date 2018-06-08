import React, { Component } from 'react';
import Counter from './components/Counter'
import { IntlProvider, addLocaleData } from 'react-intl';
import enLocaleData from "react-intl/locale-data/en";
import deLocaleData from "react-intl/locale-data/de";
import ukLocaleData from "react-intl/locale-data/uk";

import en from "./translations/en.json";
import de from "./translations/de.json";
import uk from "./translations/uk.json";

import logo from './logo.svg';
import './App.css';
import style from 'styled-components';

const translations = {
    'en': en,
    'de': de,
    'uk': uk
};

addLocaleData([...enLocaleData, ...deLocaleData, ...ukLocaleData]);

const Button = style.button`
    display: inline-block;
    height: 25px;
    width: 60px;
    font-size: 14px;
    margin-right: 10px;
`
const CheckBox = style.input`
    height: 15px;
    width: 15px;
`

const Locale = style.span`
    color: blue;
    font-size: 22px;
    text-transform: uppercase;
` 

const Label = style.label`
    margin-right: 10px;
` 

class App extends Component {
    
    state = {
        finalTime: 'Sep 01 2019 11:31:48',
        locale: 'en',
        additionalUnits: {
            isMonthSelected: false,
            isYearSelected: false
        }
    }

    changeDate (event) {
        this.setState({ finalTime: event.target.value });
    }

    changeLocale(newLocale) {
        this.setState({ locale: newLocale });
    }

    changeUnits(unit) {
        if (unit === 'month') {
            this.setState((prevState, props) => {
                return {isMonthSelected: !prevState.isMonthSelected }
             });
        } else  if (unit === 'year') {
            this.setState((prevState, props) => {
                return {isYearSelected: !prevState.isYearSelected }
             });
        }
    }

    render() {
        return (
        <IntlProvider locale={this.state.locale} messages={translations[this.state.locale]}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React Time Counter</h1>
                </header>
                <p className="App-intro">
                    Default counter time is set to "Sep 01 2019 11:31:48".
                </p>

                <p className="App-intro">
                    Current locale is <Locale>{this.state.locale}</Locale>.
                    You can pick language for counter (EN, DE, UK)".
                </p>

                <div>
                    <Button onClick={() => this.changeLocale('en')}>
                        EN
                    </Button>
                    <Button onClick={() => this.changeLocale('de')}>
                        DE
                    </Button>
                    <Button onClick={() => this.changeLocale('uk')}>
                        UK
                    </Button>
                </div>

                <p className="App-intro">
                    You can pick any date and time in future for example "Aug 18 2018 10:25:00".
                </p>
                <input type="text" name="finalDate" onChange={event => this.changeDate(event)}/>

                <p className="App-intro">
                    Also you can set some additional values you want to see, for example Month or Year.
                </p>

                <CheckBox type="checkbox" id="counter-month" value="month" 
                    defaultChecked={this.state.isMonthSelected} onChange={() => this.changeUnits('month')} />
                <Label htmlFor="counter-month">Month</Label>

                <CheckBox type="checkbox" id="counter-year" value="year" 
                    defaultChecked={this.state.isYearSelected} onChange={() => this.changeUnits('year')} />
                <Label htmlFor="counter-year">Year</Label>
                
                <div>
                    <Counter finalTime={this.state.finalTime} userLocale={this.state.userLocale} 
                            isMonthSelected={this.state.isMonthSelected} isYearSelected={this.state.isYearSelected}/>
                </div>
            </div>
        </IntlProvider>
        );
    }
}

export default App;
