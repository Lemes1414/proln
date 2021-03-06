﻿import React, { Component } from 'react';
import './Acount.css';
import { OneHistory } from './OneHistory';
import * as FiIcons from 'react-icons/fi';
import  Sidebar from '../Sidebar';



export class ControlPanel extends Component {
    displayName = ControlPanel.name;
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(sessionStorage.getItem('manager'))
    }
    logOut = (event) => {
        event.preventDefault();
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('login')
        sessionStorage.removeItem('name')
        sessionStorage.removeItem('password')
        sessionStorage.removeItem('surname')
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('admin')
        sessionStorage.removeItem('superAdmin')
        sessionStorage.removeItem('manager')
        sessionStorage.removeItem('magazineManagement')
        sessionStorage.removeItem('machineManagement')
        sessionStorage.removeItem('orderManagement')
        sessionStorage.removeItem('cutManagement')
        this.props.history.push('/')
    }

    homePage = (event) => {
        this.props.history.push('/home')
    }

    

    changePassword = (event) => {
        this.props.history.push('/change_password')
    }
    changeEmail = (event) => {
        this.props.history.push('/change_email')
    }

    adminPermissionsRender() {
        if (sessionStorage.getItem('admin') === 'true') {
            return (<option>Admin</option>)
        }
    }
   /* userPermissionsRender() {
        if (sessionStorage.getItem('user') === 'true') {
            return (<option>Pracownik</option>)
        }
    }*/
    /*superAdminPermissionsRender() {
        if (sessionStorage.getItem('superAdmin') === 'true') {
            return (<option>Super admin</option>)
        }
    }*/
    /*managerPermissionsRender() {
        if (sessionStorage.getItem('manager') === 'true') {
            return (<option>Menedżer</option>)
        }
    }*/
    /*magazineManagerPermissionsRender() {
        if (sessionStorage.getItem('magazineManagement') === 'true') {
            return (<option>Magazynier</option>)
        }
    }
    machineManagerPermissionsRender() {
        if (sessionStorage.getItem('machineManagement') === 'true') {
            return (<option>Menedżer maszyn</option>)
        }
    }
    orderManagerPermissionsRender() {
        if (sessionStorage.getItem('orderManagement') === 'true') {
            return (<option>Menedżer zleceń</option>)
        }
    }
    cutManagerPermissionsRender() {
        if (sessionStorage.getItem('cutManagement') === 'true') {
            return (<option>Menedżer cięcia</option>)
        }
    }*/

    permRender() {
        if (sessionStorage.getItem('manager') === 'true') {
            return (<option>Menedżer</option>)
        }
        else if (sessionStorage.getItem('superAdmin') === 'true') {
            return (<option>Super admin</option>)
        }
        else if (sessionStorage.getItem('user') === 'true' && sessionStorage.getItem('magazineManagement') === 'true' ) {
            return (<option>Pracownik</option>
            )
            /*else if (sessionStorage.getItem('magazineManagement') === 'true') {
                return (<option>Magazynier</option>)
            }
            else if (sessionStorage.getItem('machineManagement') === 'true') {
                return (<option>Menedżer maszyn</option>)
            }
            else if (sessionStorage.getItem('orderManagement') === 'true') {
                return (<option>Menedżer zleceń</option>)
            }
            else if (sessionStorage.getItem('cutManagement') === 'true') {
                return (<option>Menedżer cięcia</option>)
            }*/
        }
        else {
            return (<option>Admin</option>)
        }
    }


    render() {
        /*let admin = this.adminPermissionsRender();
        let user = this.userPermissionsRender();
        let superAdmin = this.superAdminPermissionsRender();
        let manager = this.managerPermissionsRender();
        let magazineManagement = this.magazineManagerPermissionsRender();
        let orderManagement = this.orderManagerPermissionsRender();
        let machineManagement = this.machineManagerPermissionsRender();
        let cutManagement = this.cutManagerPermissionsRender();*/
        //let userHistoryTable = this.usersHistoryTable();
        let perm = this.permRender();
        if (sessionStorage.getItem('valid') === '') {
            return (
                <div className="HomePage">
                    <h1>Log in to have access!</h1>
                    <button type="submit" className="success_login" onClick={this.goback} >Log in</button>
                </div>
            );
        }
        else {
            return (
                <div className="ControlPanel" >


                    <Sidebar />
                    <div className="title">
                        <h1 className="titletext">Your account</h1>
                    </div>
                    <div className="conteiner_cp">


                        <div className="">
                            <form>
                                <div className="form-group">
                                    <label>Login: {sessionStorage.getItem('login')}</label>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <div> Password:</div>
                                        <button type="button" className="prim_password_change" onClick={this.changePassword}>Change password</button>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <div> E-mail: {sessionStorage.getItem('email')}</div>

                                        <button type="button" className="prim_email_change" onClick={this.changeEmail}>Change email</button>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>Permission:
                                    {perm}
                                    </label>
                                </div>
                            </form>
                        </div>
                        <OneHistory />
                    </div>
                </div>

            )
        }}


}