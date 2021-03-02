﻿import React, { Component } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { Link } from 'react-router-dom';
import './glassAttributes.css';
import Sidebar from '../Sidebar';

export class GlassAtributes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: {
                columns: [],
                rows: []
            },
            table2: {
                columns: [],
                rows: []
            },
        };
    }

    componentDidMount() {
        var table2 = [];
        fetch(`api/Magazine/Return_All_Colors`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
              
                for (var i = 0; i < json.length; i++) {
                    table2.push({
                        number: i+1,
                        color:json[i],
                        edit:
                            <Link to="/glasscoloredit"><button className="info_t" id={i}
                                onClick={
                                    (e) => {
                                       
                                        sessionStorage.setItem('color', json[e.target.id]);
                                    }
                                }>Edit</button>
                            </Link>
                    })
                };
                this.setState({
                    table: {
                        columns: [
                            {
                                label: 'No.',
                                field: 'number',
                                sort: 'asc',
                                width: 150
                            },
                            {
                                label: 'Color',
                                field: 'color',
                                sort: 'asc',
                                width: 150
                            },
                            {
                                label: 'Edit',
                                field: 'edit',
                                width: 150
                            },                            
                        ],
                        rows: table2
                    }
                });
            })


        var table3 = [];
        fetch(`api/Magazine/Return_All_Type`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
              
                for (var i = 0; i < json.length; i++) {
                    table3.push({
                        number: i + 1,
                        type: json[i],
                         edit:
                             <Link to="/glasstypeedit"><button className="info_t" id={i}
                                onClick={
                                    (e) => {
                                        
                                        sessionStorage.setItem('type', json[e.target.id]);
                                    }
                                }>Edit</button>
                            </Link>
                    })
                };
                this.setState({
                    table2: {
                        columns: [
                            {
                                label: 'No.',
                                field: 'number',
                                sort: 'asc',
                                width: 150
                            },
                            {
                                label: 'Type',
                                field: 'type',
                                sort: 'asc',
                                width: 150
                            },
                            {
                                label: 'Edit',
                                field: 'edit',
                                width: 150
                            },
                        ],
                        rows: table3
                    }
                });
            })
};

    backToHome = (event) => {
        this.props.history.push('/controlpanel');
    }

    addType = (event) => {
        this.props.history.push('/add_type')
    }

    addColor = (event) => {
        this.props.history.push('/add_color')
    }
    goback = (event) => {
        this.props.history.push('/')
    }
    goback2 = (event) => {
        this.props.history.push('/home')
    }


    ///funkcjie do dokończenia
    colorEdit = (event) => {
        event.prefentDefault();
        this.props.history.push('/glasscoloredit')
    }

    typeEdit = (event) => {
        event.prefentDefault();
        this.props.history.push('/glasstypeedit')
    }

    colorDel = (event) => {
        event.prefentDefault();
    }


    table() {
        return (
            <MDBDataTableV5


                data={this.state.table}
                hover
                entriesOptions={[10, 20, 50, 100]}
                entries={10}
                pagesAmount={10}
                searchTop
                materialSearch
                searchBottom={false}
                responsive
                bordered
                paginationLabel={["Previous", "Next"]}
                sortable
                // small
                theadTextWhite
                theadTextWhite
                className="table_corection"


            />
        )
    }

    table2() {
        return (
            <MDBDataTableV5


                data={this.state.table2}
                hover
                entriesOptions={[10, 20, 50, 100]}
                entries={10}
                pagesAmount={10}
                searchTop
                materialSearch
                searchBottom={false}
                responsive
                bordered
                paginationLabel={["Previous", "Next"]}
                sortable
                // small
                theadTextWhite
                theadTextWhite
                className="table_corection"


            />
        )
    }

    render() {
        let colorTable = this.table();
        let typeTable = this.table2();
        if (sessionStorage.getItem('valid') === '') {
            return (
                <div className="HomePageFail">
                    <h1>Log in to have access!</h1>
                    <button type="submit" className="success_login2" onClick={this.goback} >Log in</button>
                </div>
            );
        }
        else if (sessionStorage.getItem('superAdmin') === 'true' || sessionStorage.getItem('manager') === 'true' || sessionStorage.getItem('admin') === 'true') {
            return (

                <div className="glassattributes">
                    <Sidebar />
                    <div className="title">
                        <h1 className="titletext">Glass attributes</h1>
                    </div>
                    <div className="glass_attributes_conteiner">

                        <div className="conteiner_ga1">
                            <button type="button" className="success_glass_att" onClick={this.addColor}>Add color</button>
                            {colorTable}
                            <button type="button" className="success_glass_att" onClick={this.addType}>Add type</button>
                            {typeTable}
                        </div>



                    </div>
                </div>

            )
        }
        else {
            return (
                <div className="HomePageFail">
                    <h1>Check if you have perrmission to this panel</h1>
                    <button type="submit" className="success_login2" onClick={this.goback2} >Back to home page</button>
                </div>
            );
        }
    }


}