﻿import React, { Component} from 'react';
import { MDBDataTableV5  } from 'mdbreact';
import { Link } from 'react-router-dom';
import './Acount.css';
import './UserTable.css';
import { Route } from 'react-router-dom';
import Sidebar from '../Sidebar';



export class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table333: {
                columns: [],
                rows: []
            },
        };
    }
    


    componentDidMount() {
        var table = [];
        var link = '';
        if (sessionStorage.getItem('manager') === 'true') {
            link = 'api/Users/Return_All_Users'
        }
        else if (sessionStorage.getItem('superAdmin') === 'true') {
            link = 'api/Users/Return_All_SuperAdmin'
        }
        else {
            link = 'api/Users/Return_All_Admin'
        }
            fetch(`${link}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then(json => {
                console.log(json.length);
                console.log(json);
                for (var i = 0; i < json.length; i++) {
                    var deleted = '';
                    if (json[i].deleted === false) {
                        deleted = 'Aktywny'
                    }
                    else {
                        deleted = 'Usunięty'
                    }
                    table.push({
                        id: i + 1,
                        name: json[i].name,
                        login: json[i].login,
                        password: json[i].password,
                        secondName: json[i].surname,
                        email: json[i].email,
                        permissions: 'Pracownik',
                        deleted: deleted,
                        action: <Link to="/user_change"><button className="info_t" id={i}
                            onClick={
                                (e) => {
                                    console.log(e.target.id);
                                    console.log(table[e.target.id].email);
                                    sessionStorage.setItem('editPerm', table[e.target.id].permissions);
                                    sessionStorage.setItem('editLogin', table[e.target.id].login);
                                    sessionStorage.setItem('editPassword', table[e.target.id].password);
                                    sessionStorage.setItem('editName', table[e.target.id].name);
                                    sessionStorage.setItem('editSecondName', table[e.target.id].secondName);
                                    sessionStorage.setItem('editMail', table[e.target.id].email);
                                }
                            }>Edytuj</button></Link>,
                        del: <button className="danger_t" id={i} onClick={(e) => { this.delete(table[e.target.id].login, table[e.target.id].deleted) }}> Usuń/Przywróć  </button> 
                    })
                };
               
                for (var k = 0; k < table.length; k++) {
                    if (json[k].admin === true) {
                        table[k].permissions = table[k].permissions +', '+ 'Admin'
                    }
                    if (json[k].super_Admin === true) {
                        table[k].permissions = table[k].permissions + ', ' + 'Super admin'
                    }
                    if (json[k].manager === true) {
                        table[k].permissions = table[k].permissions + ', ' + 'Menedżer'
                    }
                    if (json[k].magazine_management === true) {
                        table[k].permissions = table[k].permissions + ', ' + 'Magazynier'
                    }
                    if (json[k].machine_management === true) {
                        table[k].permissions = table[k].permissions + ', ' + 'Menedżer maszyn'
                    }
                    if (json[k].order_management === true) {
                        table[k].permissions = table[k].permissions + ', ' + 'Menedżer zleceń'
                    }
                    if (json[k].cut_management === true) {
                        table[k].permissions = table[k].permissions +', '+ 'Menedżer cięcia'
                    }
                }
                this.setState({
                    table333: {
                        columns: [
                            {
                                label: 'Login',
                                field: 'login',
                                sort: 'asc',
                                width: 150
                            },
                            {
                                label: 'Imie',
                                field: 'name',
                                sort: 'asc',
                                width: 250
                            },
                            {
                                label: 'Nazwisko',
                                field: 'secondName',
                                sort: 'asc',
                                width: 200
                            },
                            {
                                label: 'Uprawnienia',
                                field: 'permissions',
                                sort: 'asc',
                                width: 100
                            },
                            {
                                label: 'Edytuj',
                                field: 'action',
                                width: 100
                            },
                            {
                                label: 'Status konta',
                                field: 'deleted',
                                width: 100
                            },
                            {
                                label: 'Usuń',
                                field: 'del',
                                width: 100
                            }
                    ],
                        rows: table 
                    }
                });
            })
    };

    delete(user, deleted) {
        const receiver = {
            user: {
                login: user
            },
            admin: {
                login: sessionStorage.getItem('login')
            }
        }
        console.log(receiver)

        if (deleted === 'Aktywny') {
            fetch(`api/Users/Remove_User_Admin`, {
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
                    alert("Usunięto użytkownika")
                })
                .then(json => {
                    window.location.reload();
                })
        }
        else {
            fetch(`api/Users/Restore_User_Admin`, {
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
                    alert("Aktywowano użytkownika")
                })
                .then(json => {
                    window.location.reload();
                })
        }
        

    }
 

    table() {  
        return (
            <MDBDataTableV5
               

                hover
                entriesOptions={[10,20,50,100]}
                entries={15}
                pagesAmount={10}
                data={this.state.table333}
                searchTop


                 materialSearch
                searchBottom={false}
                // barReverse
                //  pagingTop
                // scrollX
                // scrollY
                responsive
                // maxHeight="35vh"
                bordered



                //   maxHeight="20vh"
                // borderless
                // btn
                // dark


                //maxHeight="400px"

               // paginationLabel={["<", ">"]}

                sortable


               // small
                // tego w ciemnym trybie nie ruszać/ striped/
                // theadColor="indigo"
                theadTextWhite
                // theadColor="indigo"
                theadTextWhite
                // barReverse
                className="User_table"
                // noBottomColumns
                sortable
                //info={false}


             //   autoWidth


            />
        )
    }

    render() {
        let xd = this.table();
        return (
            
            <div>
                {xd}
            </div>
            )
    }

}