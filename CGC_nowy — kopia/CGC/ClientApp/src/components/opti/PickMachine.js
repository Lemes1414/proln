﻿import React, { Component } from "react";
import Sidebar from '../Sidebar';
import './PickMachine.css'

export class PickMachine extends Component {
    displayName = PickMachine;
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            machine: [],
        }
    }

    
    componentDidMount() {
        var table2 = [];
        fetch(`api/Cut/Return_Machine_To_Cut`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                for (var i = 0; i < json.length; i++) {
                    table2.push({
                        color: json[i].no,
                        type: json[i].type,
                    })
                };
                this.setState({
                    machine: table2

                });
            })
    }

    machineSelector = (event) => {
        var tab = []
        for (var i = 0; i < this.state.machine.length; i++) {

            tab.push(< option value={this.state.machine[i].color}> {this.state.machine[i].color + ', ' + this.state.machine[i].type} </option >)


        }
        return (tab)
    }

    cancelAdding = (event) => {
        this.props.history.push('/test')
    }

    saveProject = (event) => {
        event.preventDefault();
        const receiver = {
            machines: {
                no: this.refs.type.value
            },
            cut_Project: {
                Cut_id: sessionStorage.getItem('id_order')
            }
        }


        fetch(`api/Cut/Start_Production`, {
            method: "post",
            body: JSON.stringify(receiver),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            /*.then(json => {
                console.log(receiver)
                console.log(json)
                return (json)
            })*/

        if (window.confirm("Czy chcesz dodać odpadki do magazynu?")) {
            this.props.history.push('/add_glass');
        } else {
            this.props.history.push('/selection_of_orders');
        }

        /*this.props.history.push('/glasswarehouse');

        console.log(receiver)*/

    }

    render() {
        let x = this.machineSelector()
        if (sessionStorage.getItem('valid') === '') {
            return (
                <div className="HomePage">
                    <h1>Log in to have access!</h1>
                    <button type="submit" className="success_login" onClick={this.goback} >Log in</button>
                </div>
            );
        }
        else if (sessionStorage.getItem('cutManagement') === 'true' ||sessionStorage.getItem('superAdmin') === 'true' || sessionStorage.getItem('manager') === 'true' || sessionStorage.getItem('admin') === 'true') {
            return (

                <div>
                    <Sidebar />
                    <div className="title">
                        <h1 className="titletext">Pick machine</h1>
                    </div>
                    <div className="AddOrder1">
                        <form>
                            <div className="form-group">
                                <label>Choose machine:</label>
                                <select ref="type" type="text" className="form-control">
                                    {x}
                                </select>
                            </div>
                            <div className="form-group">
                                <button type="button" className="danger_pick_machine" onClick={this.cancelAdding}>Cancel</button>
                                <button type="button" className="success_pick_machine" onClick={this.saveProject}>Cut</button>

                            </div>
                        </form>
                    </div>

                </div>
            )
        }
        else {
            return (
                <div className="HomePage">
                    <h1>Check if you have perrmission to this panel</h1>
                    <button type="submit" className="success_login" onClick={this.goback2} >Back to home page</button>
                </div>
            );
        }
    }

}