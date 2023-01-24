
import React, { useState, useEffect } from "react";
import {init, coinInserted, turnstilePushed, setStateChangedCallback } from "library-fsm"

const initialData = {
    coinCost: 1,
    step: 'locked',
    entryAllowed: false,
    coinsInserted: 0,
    message: null
}

function TurnstileComponent() {
    const [state, setState] = useState(initialData);

    useEffect(() => {
        init({
            state: initialData,
        });
    }, []);

    useEffect(() => {
        setStateChangedCallback(newState => {
            
            setState({...newState});
        });
    }, []);


    const onInsertCoin = () => {
        coinInserted();
    }

    const onEnter = () => {
        turnstilePushed();
    }

    const handleChange = (e) => {
        let value = e.target.value;
        let newState = { ...state, coinCost: value };
        setState(newState)
        init({
            state: newState,
        })
    }
    
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center">Welcome to FSM Turnstile</h1>
                        <p className="text-center"><span className="font">State: </span>{state.step}</p>
                        <p className="text-center"><span className="font">Coins needed : </span>
                            <input type="text" name="coinsNeeded" value={state.coinCost} onChange={handleChange}></input></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button className="btn btn-primary" disabled={state.entryAllowed || state.coinCost === "" || state.coinCost === null} style={{ marginRight: 10 }} onClick={onInsertCoin}>Insert Coin ({state.coinsInserted})</button>
                        <button className="btn btn-success" disabled={!state.entryAllowed} onClick={onEnter}>Enter</button>
                    </div>
                </div>
                {state.message != null && <div>
                    <div>
                        <p className="text-center"><span className="font">Message: </span>{state.message}</p>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default TurnstileComponent;
