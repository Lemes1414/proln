﻿import React, { Component } from "react";
import './AddColor.css';
import Sidebar from '../Sidebar';


export class AddColor extends Component {
    displayName = AddColor.name;
    constructor(props) {
        super(props);
    }

    handleAddColor = (event) => {
        event.preventDefault();
        const receiver = {
            color: this.refs.color.value,
            user: {
                login: sessionStorage.getItem('login')
            }
        }

        fetch(`api/Magazine/Add_Color_Admin`, {
            method: "post",
            body: JSON.stringify(receiver),
            headers: {
                'Content-Type': 'application/json'
            }
        })

            .then(res => res.json())
            .then(json => {
                console.log(json)
                return (json);
                
            })
            .then(json => {
                if (json[0] === 'Color_alredy_exist') {
                    alert("Kolor już istnieje")
                }
                else {
               alert("Dodano kolor do bazy danych")
                    this.props.history.push('/glassatibutes')
                }
            })
    }

    cancelAddColor = (event) => {
        this.props.history.push('/glassatibutes')
    }

    render() {
        if (sessionStorage.getItem('valid') === '') {
            return (
                <div className="HomePage">
                    <h1>Zaloguj się, aby usyskać dostęp!</h1>
                    <button type="submit" className="success_login" onClick={this.goback} >Logowanie</button>
                </div>
            );
        }
        else {
            return (
                <div className="AddColor">
                    <Sidebar />
                    <div className="add_Color">
                        <form>
                            <div className="form-group">
                                <h2>Dodaj kolor szkła:</h2>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputColor"
                                    placeholder="Wprowadź kolor szkła"
                                    ref="color"
                                />
                            </div>
                            <div className="form-group">
                                <button type="button" className="danger_glass_color_add" onClick={this.cancelAddColor}>Anuluj</button>
                                <button type="button" className="success_glass_color_add" onClick={this.handleAddColor}>Dodaj</button>

                            </div>

                        </form>
                    </div>
                </div>
            );
        }
    }
}