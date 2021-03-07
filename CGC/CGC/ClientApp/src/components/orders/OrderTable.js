﻿import React, { Component } from 'react';

import { MDBDataTable } from 'mdbreact';
import { MDBDataTableV5 } from 'mdbreact';
import { Link } from 'react-router-dom';
import './OrderTable.css';
import Sidebar from '../Sidebar';

export class OrderTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: {
                columns: [],
                rows: []
            },
        };
    }



    componentDidMount() {
        var table2 = [];
        const receiver = {
            user: {
                company: sessionStorage.getItem('company'),
            }
        }
        fetch(`api/Order/Return_All_Orders`, {
            method: "post",
            body: JSON.stringify(receiver),
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                for (var i = 0; i < json.length; i++) {
                   
                        table2.push({
                            number: json[i].id_Order,
                            status: json[i].status,
                            klient: json[i].owner,
                            x: json[i].stan,
                            priority: json[i].priority,
                            deadline: json[i].deadline,
                            items: json[i].items,
                            more: <Link to="/oneorder"><button className="prim_t" id={i}
                                onClick={
                                    (e) => {
                                        /* console.log(table2[e.target.id].items);*/
                                        sessionStorage.setItem('orderId', table2[e.target.id].number);
                                        sessionStorage.setItem('klient', table2[e.target.id].klient);
                                        sessionStorage.setItem('deadline', table2[e.target.id].deadline);
                                        sessionStorage.setItem('priority', table2[e.target.id].priority);

                                    }
                                }>Details</button></Link>
                        })
                    
                };
                
                    this.setState({
                        table: {
                            columns: [
                                {
                                    label: 'Id',
                                    field: 'number',
                                    sort: 'asc',
                                    width: 30
                                },
                                {
                                    label: 'Client',
                                    field: 'klient',
                                    sort: 'asc',
                                    width: 150
                                },
                                /*{
                                    label: 'X',
                                    field: 'x',
                                    sort: 'asc',
                                    width: 150
                                },
                                {
                                    label: 'Y',
                                    field: 'y',
                                    sort: 'asc',
                                    width: 30
                                },
                                {
                                    label: 'z',
                                    field: 'z',
                                    sort: 'asc',
                                    width: 30
                                },*/
                                {
                                    label: 'Priority',
                                    field: 'priority',
                                    sort: 'asc',
                                    width: 30
                                },
                                {
                                    label: 'Deadline',
                                    field: 'deadline',
                                    sort: 'asc',
                                    width: 30
                                },
                                {
                                    label: 'Status',
                                    field: 'status',
                                    sort: 'asc',
                                    width: 30
                                },
                                {
                                    label: 'Details',
                                    field: 'more',
                                    width: 30
                                }
                            ],
                            rows: table2
                        }
                    });
               
                
            })
    };
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

    render() {
        let table = this.table();
        return (

            <div>
                {table}
            </div>
        )
    }

}